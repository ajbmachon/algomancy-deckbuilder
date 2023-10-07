<script>
  import { create_crossfade } from '$lib/crossfade';
  import { next_card_id } from '$lib/search.js';

  import CardList from '$lib/components/CardList.svelte';

  // pool: [{id, card}, ...]
  export let pool;

  // picked: [{id, card}, ...]
  export let picked;

  function pick_card(event) {
    const entry = event.detail;
    picked.push(entry);
    for (let pool_entry of pool) {
      if (pool_entry.id === entry.id) {
        // Update the entry id for the picked card (to get a "replace" effect).
        pool_entry.id = next_card_id();
        break;
      }
    }
    picked = picked;
    pool = pool;
  }

  function drop_card(event) {
    const id = event.detail.id;
    picked = picked.filter((entry) => entry.id !== id);
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
