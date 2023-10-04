<script>
  import { createEventDispatcher } from 'svelte';
  import { flip } from 'svelte/animate';
  import Card from '$lib/Card.svelte';

  const dispatch = createEventDispatcher();
  const click_event = (entry) => () => dispatch('click', entry);

  export let list;
  export let crossfade;

  $: [send, receive] = crossfade;
</script>

{#each list as entry (entry.id)}
  <div in:receive={{ key: entry.id }} out:send={{ key: entry.id }} animate:flip={{ duration: 500 }}>
    <Card
      name={entry.card.name}
      faction={entry.card.factions[0]}
      on:click={click_event(entry)}
      stacked="40"
    />
  </div>
{/each}
