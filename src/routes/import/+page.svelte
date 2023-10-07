<script>
  import Button from '$lib/components/Button.svelte';
  import { decklist } from '$lib/stores/decklist.js';
  import { pool_entry } from '$lib/search.js';
  import { cards_by_name } from '$lib/stores/cards_db.js';

  let copy_msg;

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
      copy_msg = 'Pasted decklist from clipboard!';
    });
  }
</script>

<div class="mt-4 ml-4">
  <Button on:click={paste_decklist_from_clipboard}>Paste decklist from clipboard</Button>
</div>
{#if copy_msg}
  <div>
    {copy_msg}
  </div>
{/if}
