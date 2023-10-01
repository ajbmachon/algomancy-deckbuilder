<script>
  import Card from '$lib/Card.svelte';
  import Pool from '$lib/Pool.svelte';
  import { create_crossfade } from '$lib/crossfade';

  const [send, receive] = create_crossfade();

  export let cards;
  export let selected;

  $: cardpool = cardpool || cards.map((card, idx) => {
    return {
      key: idx,
      selected: false,
      inflight: false,
      card,
    }
  });

  function toggle_selected(item) {
    return () => {
      if (item.inflight) {
	return;
      }

      item.inflight = true;
      item.selected = !item.selected;
      if (selected) {
	selected(cardpool.filter(c => c.selected).map(item => item.card));
      }
      // trigger re-render
      cardpool = cardpool;
    }
  }

  function arrived(item) {
    item.inflight = false;
  }

</script>

<div class="cardpool">
  <p>Card Pool</p>
  <Pool pool={cardpool.filter(c => !c.selected)}
    outroend={arrived}
    {send} {receive}
    let:item>
    <Card name={item.card.name} on:click={toggle_selected(item)} />
  </Pool>
</div>

<div class="selected">
  <p>Selected Cards</p>
  <Pool pool={cardpool.filter(c => c.selected)}
    outroend={arrived}
    {send} {receive}
    let:item>
    <Card name={item.card.name} on:click={toggle_selected(item)} />
  </Pool>
</div>

<style>
  .cardpool, .selected {
    float: left;
    width: 50%;
  }
</style>
