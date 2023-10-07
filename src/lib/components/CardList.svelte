<script>
  import { createEventDispatcher } from 'svelte';
  import { flip } from 'svelte/animate';
  import Card from '$lib/Card.svelte';

  const dispatch = createEventDispatcher();
  const click_event = (entry) => () => dispatch('click', entry);

  export let list;
  export let crossfade;
  export let height = undefined;
  export let card_splay = 40;

  $: [send, receive] = crossfade;
  $: total_list_height = 32 + height + Math.max(0, list.length - 1) * card_splay;
</script>

<div class="relative" style:height="{total_list_height}px">
  {#each list as entry, idx (entry.id)}
    <div
      class="absolute card-slot"
      style:top={`${idx * 40}px`}
      in:receive={{ key: entry.id }}
      out:send={{ key: entry.id }}
      animate:flip={{ duration: 500 }}
    >
      <Card
        name={entry.card.name}
        faction={entry.card.factions[0]}
        on:click={click_event(entry)}
        bind:height
      />
    </div>
  {/each}
</div>

<style>
  .card-slot:hover {
    z-index: 1;
  }
</style>
