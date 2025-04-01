<script>
  import { filtered_pool } from '$lib/stores/cards_db.js';
  import { search_filter } from '$lib/stores/filter.js';
  import { decklist } from '$lib/stores/decklist.js';
  import Filter from '$lib/components/Filter.svelte';
  import PoolPicker from '$lib/components/PoolPicker.svelte';
</script>

<div class="filter">
  <Filter bind:filter={$search_filter} />
</div>

<div class="main-content">
  <PoolPicker pool={$filtered_pool} bind:picked={$decklist} />
</div>

<style>
  .filter {
    padding: 1em;
  }

  .main-content {
    padding: 0 1.5em 1.5em;
    height: calc(100vh - 150px);
    overflow: hidden;
  }
</style>
