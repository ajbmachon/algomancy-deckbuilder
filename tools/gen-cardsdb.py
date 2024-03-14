from __future__ import annotations

import re
import json
import click
import requests
from dataclasses import dataclass, field, fields, asdict
from collections import defaultdict
from functools import partial
from typing import DefaultDict, Mapping, MutableMapping


@dataclass
class Tags:
    cloud: DefaultDict[str, set[int]] = field(default_factory=partial(defaultdict, set))

    def add(self, tag: str, key: int) -> None:
        # We add spaces to the tag to make it easy to search for an exact match while still using
        # sub-string matching by including the surrounding spaces in the search term as well in that
        # case.
        self.cloud[f" {tag} "].add(key)

    def asdict(self) -> Mapping[str, tuple[int]]:
        return {tag: tuple(values) for tag, values in self.cloud.items()}


def searchable(opt: bool=True):
    return field(metadata=dict(searchable=opt))


@dataclass
class AlgoCard:
    key: int = searchable(False)
    name: str = searchable(True)
    power: str = searchable(True)
    toughness: str = searchable(True)
    affinity: str = searchable(True)
    cost: str = searchable(True)
    type: str = searchable(True)
    attributes: tuple[str, ...] = searchable(True)
    complexity: str = searchable(True)
    text: str = searchable(True)
    rev: str = searchable(False)
    details: str = searchable(False)
    factions: tuple[str, ...] = searchable(True)
    rulings: tuple[str, ...] = searchable(False)
    image_name: str = searchable(False)

    def asdict(self) -> Mapping[str, Any]:
        return asdict(self)

    @classmethod
    def from_upstream(cls, key: int, src: Mapping[str, Any]) -> AlgoCard:
        img_name = src["name"].replace(",", "").replace(" ", "-")
        factions = src["factions"]
        if not isinstance(factions, list):
            factions = []
        if len(factions) > 1:
            factions.append("hybrid")
        return cls(
            key=key,
            name=src["name"],
            power=str(src["power"]),
            toughness=str(src["toughness"]),
            affinity=''.join(sorted(str(src["cost"]))),
            cost=str(src["total_cost"]),
            type=src["type"],
            attributes=re.findall(r"{([^}]*)}", src["type"]),
            complexity=src["complexity"],
            text=src["text"],
            rev=src["revision_date_time"],
            details=src["details"],
            factions=factions,
            rulings=src["rulings"],
            image_name=f'{img_name}.jpg',
        )

    @classmethod
    def search_scopes(cls) -> Iterator[str]:
        for fld in fields(cls):
            if fld.metadata["searchable"]:
                yield fld.name

    def search_tags(self, scope: str) -> Iterator[str]:
        value = getattr(self, scope)
        if isinstance(value, str):
            value = re.sub(
                "|".join(
                    f"(?:{r})"
                    for r in (
                            r"\{[^}]*\}",
                            r"[^a-z0-9']+",
                    )
                ), " ", value.lower()
            ).strip()
            value = value.split(" ")
        yield from (v for v in map(str.strip, value) if v)


@dataclass
class AlgoDB:
    cards: MutableMapping[int, AlgoCard] = field(default_factory=dict)
    factions: Sequence[str] = field(default_factory=set)
    search_scopes: DefaultDict[str, Tags] = field(default_factory=partial(defaultdict, Tags))

    def add_from_upstream(self, key: int, src: Mapping[str, Any]) -> None:
        card = AlgoCard.from_upstream(key, src)
        self.cards[key] = card
        self.factions |= set(card.factions)

        all_tags = self.search_scopes["any"]
        for scope in AlgoCard.search_scopes():
            tags = self.search_scopes[scope]
            for tag in card.search_tags(scope):
                if not tag:
                    continue
                all_tags.add(tag, card.key)
                tags.add(tag, card.key)

    def asdict(self) -> Mapping[str, Any]:
        faction_prio = {
            "hybrid": "zza",
            "colorless": "zzb",
        }
        return dict(
            cards=[
                card.asdict() for card in self.cards.values()
            ],
            factions=sorted(tuple(self.factions), key=lambda f: faction_prio.get(f, f)),
            search_scopes={
                scope: tags.asdict() for scope, tags in self.search_scopes.items()
            },
        )


@click.command
@click.option("--upstream-url", default="https://calebgannon.com/wp-content/uploads/algomancy-extras/AlgomancyCards.json")
def main(upstream_url):
    upstream_data = requests.get(upstream_url).json()
    db = AlgoDB()

    for key, [src] in enumerate(upstream_data.values(), start=1001):
        if src["name"] == "Ephemeral Dreamthief":
            # Skip -- this card has been remodeled into a different one and is merely a lingering
            # ghost card by now..
            continue
        db.add_from_upstream(key, src)

    click.echo(json.dumps(db.asdict()))


if __name__ == "__main__":
    main()
