<script>
  import { create_crossfade } from '$lib/crossfade';
  import { pool_entry } from '$lib/search.js';

  import CardList from '$lib/components/CardList.svelte';

  // pool: [{id, card}, ...]
  export let pool;

  // picked: [{id, card}, ...]
  export let picked;

  function pick_card(event) {
    const entry = event.detail;
    picked.push(entry);
    picked = picked;
    pool = pool.map((pe) => {
      if (pe.id === entry.id) {
        // Update the entry id for the picked card (to get a "replace" effect).
        return pool_entry(pe.card);
      } else {
        return pe;
      }
    });
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
