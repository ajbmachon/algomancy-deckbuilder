<script>
  import Checkbox from '$lib/Checkbox.svelte';
  import debounce from '$lib/debounce.js';

  export let pool;

  let search_term = '';
  let searched_pool = pool;

  const apply_search_filter = debounce((cardpool, search) => {
    if (!search) {
      searched_pool = cardpool;
      return;
    }
    const terms = search
      .toLowerCase()
      .split(' ')
      .map((s) => s.replaceAll('"', ' '));
    searched_pool = cardpool.filter((i) => {
      const search_space = ` ${i.card.name} ${i.card.type} ${i.card.text} ${i.card.factions.join(
        ' '
      )} `.toLowerCase();
      return terms.every((term) => search_space.includes(term));
    });
  }, 250);
  $: apply_search_filter(pool, search_term);

  let hybrids = false;
  $: hybrids_pool = !hybrids
    ? searched_pool
    : searched_pool.filter((i) => i.card.factions.length > 1);

  let factions = {
    earth: true,
    wood: true,
    fire: true,
    water: true,
    metal: true,
    colorless: true
  };

  $: factions_pool = hybrids_pool.filter((i) => i.card.factions.every((f) => factions[f]));

  $: final_pool = factions_pool;
</script>

<div class="root">
  <div class="search">
    <input bind:value={search_term} placeholder="Space separated list of search terms" />
  </div>

  {#each Object.keys(factions) as faction}
    <Checkbox bind:checked={factions[faction]}>
      {faction}
    </Checkbox>
  {/each}

  <Checkbox bind:checked={hybrids}>Hybrids only</Checkbox>
</div>

<slot pool={final_pool} />

<style>
  .root {
    margin-bottom: 16px;
  }
  .search {
    margin-right: 32px;

    & input {
      margin-bottom: 8px;
      width: 100%;
    }
  }
</style>
