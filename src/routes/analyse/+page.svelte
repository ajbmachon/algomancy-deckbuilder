<script>
  import { decklist } from '$lib/stores/decklist.js';
  import CardsPropDistributionPie from '$lib/components/CardsPropDistributionPie.svelte';

  const attrs = ['factions', 'affinity', 'cost', 'power', 'toughness', 'attributes', 'complexity'];
  $: cards = $decklist.map((e) => e.card);
</script>

<div class="flex flex-wrap gap-24">
  {#each attrs as attr}
    <CardsPropDistributionPie {cards} {attr} />
  {/each}
</div>
