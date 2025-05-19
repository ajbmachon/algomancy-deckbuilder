<!--
  StackedCardList component
  Displays cards grouped by name with count indicators
-->
<script>
  import { createEventDispatcher } from 'svelte';
  import { flip } from 'svelte/animate';
  import Card from '$lib/Card.svelte';
  import { groupCardsByName } from '$lib/card-utils';

  const dispatch = createEventDispatcher();
  const click_event = (entry) => () => dispatch('click', entry);

  /**
   * List of cards to display
   * @type {Array}
   */
  export let list;

  /**
   * Crossfade animation configuration
   * @type {Array}
   */
  export let crossfade;

  /**
   * Whether to use compact layout
   * @type {boolean}
   */
  export let compact = false;

  /**
   * List of card IDs that should be disabled
   * @type {Array}
   */
  export let disabledCards = [];

  $: [send, receive] = crossfade;
  $: isDisabled = (ids) => ids.some((id) => disabledCards.includes(id));
  $: groupedCards = groupCardsByName(list);
</script>

<div class="card-grid" class:compact>
  {#each groupedCards as entry (entry.id)}
    <div
      class="card-item"
      class:disabled={isDisabled(entry.ids)}
      in:receive={{ key: entry.id }}
      out:send={{ key: entry.id }}
      animate:flip={{ duration: 500 }}
    >
      <div class="relative">
        <!-- Card count badge -->
        {#if entry.count > 1}
          <div class="card-count-badge bg-faction-{entry.card.factions[0]} text-white">
            {entry.count}
          </div>
        {/if}

        <!-- Card image -->
        <Card
          name={entry.card.name}
          image_name={entry.card.image_name}
          faction={entry.card.factions[0]}
          on:click={!isDisabled(entry.ids) ? click_event(entry) : null}
        />
      </div>
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

  .card-count-badge {
    position: absolute;
    top: -10px;
    right: -10px;
    z-index: 10;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    font-weight: bold;
    font-size: 14px;
    box-shadow: 0 0 0 2px #000;
  }

  /* Faction-specific badge colors */
  .bg-faction-earth {
    background-color: #d97706;
  }

  .bg-faction-wood {
    background-color: #10b981;
  }

  .bg-faction-fire {
    background-color: #ef4444;
  }

  .bg-faction-water {
    background-color: #0ea5e9;
  }

  .bg-faction-metal {
    background-color: #94a3b8;
  }
</style>
