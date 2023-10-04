<script>
  import cards from '$lib/assets/cards.json';
  import CardPicker from '$lib/CardPicker.svelte';
  import Button from '$lib/Button.svelte';

  let selected = [];
  $: num_cards = selected.reduce((count, s) => count + s.count, 0);

  function get_deck_txt() {
    return selected.map((item) => `${item.count}x ${item.card.name}`).join('\n');
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
      selected = text
        .split('\n')
        .map((ln) => /(\d+)x\s+(.*)$/.exec(ln))
        .filter((m) => !!m)
        .map((m) => ({
          card: { name: m[2] },
          count: parseInt(m[1])
        }));
      copy_msg = 'Pasted deck from clipboard!';
    });
  }
</script>

<h1>Algomancy Deck Builder</h1>

<h4>
  Notice: performance tweaks and refactorings are needed as issues surfaced when I started adding
  more features ;)
</h4>

<div class="hint">
  <p>
    Search tips: free form words will match against card <code>name</code>, <code>text</code>,
    <code>type</code>
    and <code>faction</code> by default. To limit the scope, the search term may be prefixed with
    <code>`name:...`</code>
    to only match against the card <code>name</code>, for instance.
  </p>

  <p>
    The default search scope is <code>any</code>, other scopes are any available card data field,
    such as <code>power</code>, <code>toughness</code> or <code>cost</code>.
  </p>

  <p>
    To search for an exact word, or a specific sentence, use double quotes e.g.: <code
      >"aggressive one"</code
    >, or to find all virus cards: <code>type:virus</code>. Remember that the scope is per search
    term, so go nuts and combine them all: <code>type:haste power:1 text:"create a"</code> ;)
  </p>
</div>

<div>
  Deck: {num_cards} card{num_cards !== 1 ? 's' : ''}
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

<CardPicker {cards} bind:selected />

<style>
  .hint {
    border-radius: 8px;
    border: var(--val, 1px) solid lightgray;
    padding: 8px;
    margin: 12px;
    max-width: 800px;
  }
</style>
