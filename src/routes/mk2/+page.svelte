<script>
  import { cards_by_key, cards_list } from '$lib/stores/cards_db.js';
  import { create_crossfade } from '$lib/crossfade';

  import CardList from '$lib/components/CardList.svelte';

  const crossfade = create_crossfade();

  let picked = {};
  $: picked_list = Object.values(picked).reduce((acc, entries) => {
    entries.map((entry) => {
      if (entry.card) {
        acc.push(entry);
      }
    });
    return acc;
  }, []);

  function pool_entry(card) {
    const copies = picked[card.key] || [];
    return { id: `${card.key}-${copies.length + 1}`, card };
  }

  let pool = cards_list([1001, 1002, 1003, 1004, 1005]).map(pool_entry);

  function pick_card(event) {
    const entry = event.detail;
    if (picked[entry.card.key] === undefined) {
      picked[entry.card.key] = [];
    }
    picked[entry.card.key].push(entry);
    picked = picked;
    pool = pool.map((pe) => {
      if (pe.id === entry.id) {
        return pool_entry(entry.card);
      }
      return pe;
    });
  }

  function drop_card(event) {
    const entry = event.detail;
    entry.card = null;
    // Invalidate picked list.
    picked_list = picked_list;
  }
</script>

<h1>Algomancy Deck Builder mk-II</h1>

<div class="list">
  <div>Card Pool</div>
  <CardList {crossfade} list={pool} on:click={pick_card} />
</div>

<div class="list">
  <div>Picked Cards</div>
  <CardList {crossfade} list={picked_list} on:click={drop_card} />
</div>

<style>
  .list {
    border: 2px solid black;
    float: left;
    width: 50%;
  }
</style>
