<script>
  import Checkbox from '$lib/components/Checkbox.svelte';
  import Search from '$lib/components/Search.svelte';
  import cards_db from '$lib/stores/cards_db.js';
  import { search_terms } from '$lib/search.js';

  export let filter = {};

  let factions = {
    colorless: false
  };
  let hybrids_only = false;
  let search_value = '';

  $: filter = {
    factions,
    hybrids_only,
    search_terms: search_terms(search_value)
  };
</script>

<div>
  <Search bind:value={search_value} />

  <div class="factions">
    {#each $cards_db.factions as faction, tabindex}
      <div class="faction">
        <Checkbox bind:checked={factions[faction]} {tabindex}>
          {faction}
        </Checkbox>
      </div>
    {/each}
    <div class="faction">
      <Checkbox bind:checked={hybrids_only} hybrid tabindex={$cards_db.factions.length}>
        hybrids only
      </Checkbox>
    </div>
  </div>
</div>

<style>
  .factions {
    padding-top: 1em;
  }

  .faction {
    display: inline-block;
    margin-right: 1em;
  }
</style>
