<script>
  import { create_crossfade } from '$lib/crossfade';
  import { pool_entry } from '$lib/search.js';

  import CardList from '$lib/components/CardList.svelte';

  // pool: [{id, card}, ...]
  export let pool;

  // picked: [{id, card}, ...]
  export let picked;

  // Track card counts in the deck
  $: cardCounts = picked.reduce((counts, entry) => {
    const cardName = entry.card.name;
    counts[cardName] = (counts[cardName] || 0) + 1;
    return counts;
  }, {});

  // Cards that have reached the limit (2 copies)
  $: disabledCardIds = pool
    .filter(entry => cardCounts[entry.card.name] >= 2)
    .map(entry => entry.id);

  function pick_card(event) {
    const entry = event.detail;
    // Check if we already have 2 copies
    if (cardCounts[entry.card.name] >= 2) return;
    
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

<div class="deck-builder-container">
  <div class="card-pool-section">
    <h2 class="section-title">Card Pool <span class="count">[{pool.length}]</span></h2>
    <CardList {crossfade} list={pool} on:click={pick_card} disabledCards={disabledCardIds} />
  </div>

  <div class="picked-cards-section">
    <h2 class="section-title">Deck <span class="count">[{picked.length}]</span></h2>
    <CardList {crossfade} list={picked} on:click={drop_card} compact={true} />
  </div>
</div>

<style>
  .deck-builder-container {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 20px;
    height: 100%;
    width: 100%;
  }

  .section-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
    padding: 0 20px;
  }

  .count {
    font-size: 1rem;
    opacity: 0.7;
  }

  .card-pool-section, .picked-cards-section {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .picked-cards-section {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 10px 0;
    min-width: 250px;
  }

  @media (max-width: 1200px) {
    .deck-builder-container {
      grid-template-columns: 1fr;
      grid-template-rows: 5fr 2fr;
    }
    
    .picked-cards-section {
      min-width: 100%;
    }
  }
</style>
