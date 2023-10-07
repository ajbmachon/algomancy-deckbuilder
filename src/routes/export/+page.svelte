<script>
  import { CodeBlock } from '@skeletonlabs/skeleton';
  import { decklist } from '$lib/stores/decklist.js';

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

<CodeBlock
  code={decklist_txt || '# Empty decklist. Start with picking some cards..'}
  lineNumbers
  class="max-w-lg ml-4 mt-4"
/>
