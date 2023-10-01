<script>
  import CardPicker from '$lib/CardPicker.svelte';

  let cards = [
    {name:"Rook", faction:"earth"},
    {name:"Abduct", faction:"wood"},
    {name:"Aggressive One", faction:"fire"},
    {name:"Astralith", faction:"metal"},
    {name:"Bulging Bolus", faction:"water"},
  ];

  let selected = [];
</script>

<h1>Algomancy Deck Builder</h1>


Picked:
{#each selected as card}
  <span>{card.name}</span>,
{:else}
  None
{/each}

<CardPicker {cards} selected={(selection) => selected = selection} />
