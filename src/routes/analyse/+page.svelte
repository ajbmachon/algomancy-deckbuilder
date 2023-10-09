<script>
  import { base } from '$app/paths';
  import { card_pool } from '$lib/stores/cards_db.js';
  import { decklist } from '$lib/stores/decklist.js';
  import { analyse_scope, search_filter, default_filter } from '$lib/stores/filter.js';
  import CardsPropDistributionPie from '$lib/components/CardsPropDistributionPie.svelte';

  const attrs = ['factions', 'affinity', 'cost', 'power', 'toughness', 'attributes', 'complexity'];
  $: raw_cards = $decklist.length > 0 ? $decklist.map((e) => e.card) : $card_pool.cards;
  $: cards = $analyse_scope.reduce(
    (cards, scope) =>
      cards.filter((card) => {
        const value = card[scope.attr];
        if (Array.isArray(value)) {
          if (scope.value === 'hybrid' && scope.attr === 'factions') {
            return value.length > 1;
          } else {
            return value.includes(scope.value);
          }
        } else {
          return value === scope.value;
        }
      }),
    raw_cards
  );

  function unscope(idx) {
    return () => {
      analyse_scope.update((scopes) => {
        scopes.splice(idx, 1);
        return scopes;
      });
    };
  }

  function search_scoped() {
    const search_value = $analyse_scope.map(({ attr, value }) => `${attr}:${value}`).join(' ');
    search_filter.set({
      ...default_filter(),
      search_value
    });
  }
</script>

{#if $analyse_scope.length > 0}
  <div class="mb-8">
    {#each $analyse_scope as scope, idx}
      <div>
        Scoped on <code class="badge variant-ghost-secondary">{scope.attr}</code>
        for <code class="badge variant-ghost-secondary">{scope.value}</code>
        <span class="anchor cursor-pointer" on:click={unscope(idx)}>drop</span>
      </div>
    {/each}
    <div>
      with <a class="anchor" href={base || '/'} on:click={search_scoped}>
        {cards.length} card{cards.length === 1 ? '' : 's'}
      </a>
      (out of {raw_cards.length} card{raw_cards.length === 1 ? '' : 's'})
    </div>
  </div>
{/if}

<div class="flex flex-wrap gap-24">
  {#each attrs as attr}
    <CardsPropDistributionPie {cards} {attr} />
  {/each}
</div>
