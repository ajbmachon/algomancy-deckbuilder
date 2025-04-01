<script>
  import { createEventDispatcher } from 'svelte';
  import { flip } from 'svelte/animate';
  import Card from '$lib/Card.svelte';

  const dispatch = createEventDispatcher();
  const click_event = (entry) => () => dispatch('click', entry);

  export let list;
  export let crossfade;
  export let compact = false;
  export let disabledCards = [];

  $: [send, receive] = crossfade;
  $: isDisabled = (id) => disabledCards.includes(id);
</script>

<div class="card-grid" class:compact>
  {#each list as entry (entry.id)}
    <div
      class="card-item"
      class:disabled={isDisabled(entry.id)}
      in:receive={{ key: entry.id }}
      out:send={{ key: entry.id }}
      animate:flip={{ duration: 500 }}
    >
      <Card
        name={entry.card.name}
        image_name={entry.card.image_name}
        faction={entry.card.factions[0]}
        on:click={!isDisabled(entry.id) ? click_event(entry) : null}
      />
    </div>
  {/each}
</div>

<style>
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5em;
    width: 100%;
    height: calc(120vh - 300px);
    overflow-y: auto;
  }
  
  .card-grid.compact {
    height: calc(130vh - 500px);
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 5px;
    padding: 2px;

  }

  .card-item {
    margin-top: 1em;
    transition: transform 0.2s;
    min-height: 280px;
  }

  .card-item:hover {
    z-index: 10;
  }
  
  .card-item.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  
  .card-item :global(img) {
    width: 100%;
    height: auto;
    margin: 0;
  }
</style>
