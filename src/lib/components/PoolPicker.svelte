<script>
  import { create_crossfade } from '$lib/crossfade';
  import { pool_entry } from '$lib/search.js';

  import CardList from '$lib/components/CardList.svelte';

  // pool: [{id, card}, ...]
  export let pool;

  // picked: [{id, card}, ...]
  export let picked;

  let picked_by_key = {};

  function invalidate_picked() {
    picked = Object.values(picked_by_key).reduce((acc, entries) => {
      entries.map((entry) => {
        if (entry.card) {
          acc.push(entry);
        }
      });
      return acc;
    }, []);
    if (picked.length === 0) {
      picked_by_key = {};
      pool = pool.map((entry) => pool_entry(entry.card));
    }
  }

  function pick_card(event) {
    const entry = event.detail;
    if (picked_by_key[entry.card.key] === undefined) {
      picked_by_key[entry.card.key] = [];
    }
    picked_by_key[entry.card.key].push(entry);
    pool = pool.map((pe) => {
      if (pe.id === entry.id) {
        // Replace picked card with a new copy.
        return pool_entry(entry.card);
      }
      return pe;
    });
    invalidate_picked();
  }

  function drop_card(event) {
    const entry = event.detail;
    entry.card = null;
    invalidate_picked();
  }

  const crossfade = create_crossfade();
</script>

<div class="list">
  <div>Card Pool <small>[{pool.length}]</small></div>
  <CardList {crossfade} list={pool} on:click={pick_card} />
</div>

<div class="list">
  <div>Picked Cards <small>[{picked.length}]</small></div>
  <CardList {crossfade} list={picked} on:click={drop_card} />
</div>

<style>
  .list {
    float: left;
    width: 50%;
  }
</style>
