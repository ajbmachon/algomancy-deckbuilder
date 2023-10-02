<script>
  import Card from '$lib/Card.svelte';
  import CardPickerPartition from '$lib/CardPickerPartition.svelte';
  import Pool from '$lib/Pool.svelte';
  import { create_crossfade } from '$lib/crossfade';

  const [send, receive] = create_crossfade();

  export let cards;
  export let selected;
  export let stacked = 40;

  $: cardpool = cardpool || cards.map((card, idx) => ({
    key: idx,
    selected: false,
    inflight: false,
    card,
  }));

  $: partitions = {
    ["Card Pool"]: (p) => p.filter(c => !c.selected),
    ["Selected Cards"]: (p) => p.filter(c => c.selected),
  };

  function toggle_selected(item) {
    return () => {
      if (item.inflight) {
	return;
      }

      item.inflight = true;
      item.selected = !item.selected;
      selected = cardpool.filter(c => c.selected).map(item => item.card);

      // trigger re-render
      cardpool = cardpool;
    }
  }

  function arrived(item) {
    item.inflight = false;
  }

</script>

<Pool pool={cardpool}
      outroend={arrived}
      {send} {receive}
      {partitions}
      PartitionComponent={CardPickerPartition}
      let:item
      >
  <Card name={item.card.name}
	faction={item.card.factions[0]}
	{stacked}
	on:click={toggle_selected(item)}
	/>
</Pool>
