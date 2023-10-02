<script>
  import cards from '$lib/assets/cards.json';
  import CardPicker from '$lib/CardPicker.svelte';

  let selected = [];
</script>

<h1>Algomancy Deck Builder</h1>

<!--
Picked:
{#each selected as card}
  <span>{card.name}</span>,
{:else}
  None
{/each}
-->

<CardPicker {cards} bind:selected />
