<script>
  import cards_db from '$lib/stores/cards_db.js';
  import { cards_by_name, filtered_pool } from '$lib/stores/cards_db.js';
  import Filter from '$lib/components/Filter.svelte';
  import PoolPicker from '$lib/components/PoolPicker.svelte';
  import { pool_entry, to_pool_by_key, filter_card_pool } from '$lib/search.js';
  import Button from '$lib/components/Button.svelte';

  // import { ConicGradient } from '@skeletonlabs/skeleton';

  const pool_by_key = to_pool_by_key($cards_db.cards.map(pool_entry));

  let filter = {};
  let picked = [];

  $: filter_card_pool(filter, pool_by_key, $cards_db.search_scopes);

  function get_deck_txt() {
    return Object.values(
      picked.reduce((acc, entry) => {
        const key = entry.card.key;
        if (acc[key] === undefined) {
          acc[key] = [];
        }
        acc[key].push(entry.card);
        return acc;
      }, {})
    )
      .map((cards) => `${cards.length}x ${cards[0].name}`)
      .join('\n');
  }

  let copy_msg = undefined;
  function copy_deck_to_clipboard() {
    navigator.clipboard.writeText(get_deck_txt()).then(
      () => (copy_msg = 'Deck copied to clipboard!'),
      (e) => (copy_msg = `Sorry, copy deck to clipboard failed /: ${e}`)
    );
  }

  function paste_deck_from_clipboard() {
    navigator.clipboard.readText().then((text) => {
      picked = text
        .split('\n')
        .map((ln) => /(\d+)x\s+(.*)$/.exec(ln))
        .filter((m) => !!m)
        .map((m) => {
          const count = parseInt(m[1]);
          return Array.from(Array(count), () => pool_entry(cards_by_name[m[2]]));
        })
        .reduce((acc, entries) => acc.concat(entries), []);
      copy_msg = 'Pasted deck from clipboard!';
    });
  }

  /*const conicStops = [
    { color: 'transparent', start: 0, end: 25 },
    { color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
    ];
  {#await searching}
    <ConicGradient stops={conicStops} spin>Searching...</ConicGradient>
  {:then}
    <p>got it</p>
  {/await}
  */
</script>

<p class="text-4xl/loose">Algomancy Deck Builder</p>

<div>
  Deck: {picked.length} card{picked.length !== 1 ? 's' : ''}
  <div>
    <Button on:click={copy_deck_to_clipboard}>Copy deck to clipboard</Button>
  </div>
  <div>
    <Button on:click={paste_deck_from_clipboard}>Paste deck from clipboard</Button>
  </div>
  {#if copy_msg}
    <div>
      {copy_msg}
    </div>
  {/if}
</div>

<div class="filter">
  <Filter bind:filter />
</div>

<div class="picker">
  <PoolPicker bind:pool={$filtered_pool} bind:picked />
</div>

<style>
  .filter {
    padding: 2em;
  }

  .picker {
    padding: 2em;
  }
</style>
