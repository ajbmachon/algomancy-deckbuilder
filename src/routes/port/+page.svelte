<script>
  import Button from '$lib/components/Button.svelte';
  import { CodeBlock } from '@skeletonlabs/skeleton';
  import { decklist } from '$lib/stores/decklist.js';
  import { pool_entry } from '$lib/search.js';
  import { cards_by_name } from '$lib/stores/cards_db.js';

  function paste_decklist_from_clipboard() {
    navigator.clipboard.readText().then((text) => {
      decklist.set(
        text
          .split('\n')
          .map((ln) => /(\d+)x\s+(.*)$/.exec(ln))
          .filter((m) => !!m)
          .map((m) => {
            const count = parseInt(m[1]);
            return Array.from(Array(count), () => pool_entry(cards_by_name[m[2]]));
          })
          .reduce((acc, entries) => acc.concat(entries), [])
      );
    });
  }

  function get_decklist_txt(pool) {
    return Object.values(
      pool.reduce((acc, entry) => {
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

  $: decklist_txt = get_decklist_txt($decklist);
</script>

<div class="mt-4 ml-4">
  <Button on:click={paste_decklist_from_clipboard}>Paste decklist from clipboard</Button>
</div>

{#key decklist_txt}
  <CodeBlock code={decklist_txt} lineNumbers class="max-w-lg ml-4 mt-4" />
{/key}
