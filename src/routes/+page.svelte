<script>
  import CardPicker from '$lib/CardPicker.svelte';

  let cards = [
    {name:"Rook", selected:false, inflight:false},
    {name:"Abduct", selected:false, inflight:false},
    {name:"Aggressive One", selected:false, inflight:false}
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
