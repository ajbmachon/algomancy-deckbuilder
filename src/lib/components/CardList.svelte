<script>
  import { createEventDispatcher } from 'svelte';
  import { flip } from 'svelte/animate';
  import Card from '$lib/Card.svelte';

  const dispatch = createEventDispatcher();
  const click_event = (entry) => () => dispatch('click', entry);
  const height = 400;

  export let list;
  export let crossfade;
  export let card_splay = 40;

  $: [send, receive] = crossfade;
</script>

<div class="relative card-list">
  {#each list as entry, idx (entry.id)}
    <div
      class="absolute card-slot"
      style:top={`${20 + idx * card_splay}px`}
      in:receive={{ key: entry.id }}
      out:send={{ key: entry.id }}
      animate:flip={{ duration: 500 }}
    >
      <Card
        name={entry.card.name}
        image_name={entry.card.image_name}
        faction={entry.card.factions[0]}
        on:click={click_event(entry)}
      />
    </div>
  {/each}
</div>

<style>
  .card-list {
    height: calc(100vh - 300px);
    overflow-y: scroll;
  }

  .card-slot :global(img) {
    margin: 0px 20px 20px;
  }

  .card-slot:hover {
    z-index: 1;
  }
</style>
