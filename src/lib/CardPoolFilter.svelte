<script>
  import Checkbox from '$lib/Checkbox.svelte';

  export let pool;

  let hybrids = false;
  $: hybrids_pool = !hybrids ? pool : pool.filter(
    i => i.card.factions.length > 1
  );

  let factions = {
    earth: true,
    wood: true,
    fire: true,
    water: true,
    metal: true,
    colorless: true,
  };

  $: factions_pool = hybrids_pool.filter(
    i => i.card.factions.every(f => factions[f])
  );

  $: final_pool = factions_pool;
</script>

<div class="root">

  {#each Object.keys(factions) as faction}
    <Checkbox bind:checked={factions[faction]}>
      {faction}
    </Checkbox>
  {/each}

  <Checkbox bind:checked={hybrids}>
    Hybrids only
  </Checkbox>

</div>

<slot pool={final_pool} />

<style>
  .root {
    margin-bottom: 16px;
  }
</style>
