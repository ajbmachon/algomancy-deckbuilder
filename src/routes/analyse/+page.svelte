<script>
  import { base } from '$app/paths';
  import { card_pool } from '$lib/stores/cards_db.js';
  import { decklist } from '$lib/stores/decklist.js';
  import { analyse_scope, search_filter, default_filter } from '$lib/stores/filter.js';
  import CardsPropDistributionPie from '$lib/components/CardsPropDistributionPie.svelte';

  const attrs = ['factions', 'affinity', 'cost', 'power', 'toughness', 'attributes', 'complexity'];
  $: raw_cards = $decklist.length > 0 ? $decklist.map((e) => e.card) : $card_pool.cards;
  $: cards = $analyse_scope
    ? raw_cards.filter((card) => {
        const value = card[$analyse_scope.attr];
        if (Array.isArray(value)) {
          return value.includes($analyse_scope.value);
        } else {
          return value === $analyse_scope.value;
        }
      })
    : raw_cards;

  function unscope() {
    analyse_scope.set(null);
  }

  function search_scoped() {
    const attr = $analyse_scope.attr;
    const value = $analyse_scope.value;
    search_filter.set({
      ...default_filter(),
      search_value: `${attr}:${value}`
    });
  }
</script>

{#if $analyse_scope}
  <div class="mb-8">
    <button on:click={unscope} type="button" class="btn btn-sm variant-ghost-secondary">
      Unscope
    </button>

    Scoped on <code class="badge variant-ghost-secondary">{$analyse_scope.attr}</code>
    for <code class="badge variant-ghost-secondary">{$analyse_scope.value}</code>
    with
    <a class="anchor" href={base || '/'} on:click={search_scoped}
      >{cards.length} card{cards.length === 1 ? '' : 's'}</a
    >
    (out of {raw_cards.length} card{raw_cards.length === 1 ? '' : 's'})
  </div>
{/if}

<div class="flex flex-wrap gap-24">
  {#each attrs as attr}
    <CardsPropDistributionPie {cards} {attr} />
  {/each}
</div>
