<script>
  import { flip } from 'svelte/animate';

  export let pool;
  export let key = "key";
  export let send;
  export let receive;
  export let outroend = null;
</script>

{#each pool as item (item[key])}
  <div in:receive={{key: item[key]}} out:send={{key: item[key]}}
       animate:flip={{ duration: 500 }}
       on:outroend={() => outroend && outroend(item)}
       >
    <slot {item} />
  </div>
{:else}
  <slot name="else" />
{/each}
