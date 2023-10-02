<script>
  import { flip } from 'svelte/animate';

  export let pool;
  export let key = 'key';
  export let send;
  export let receive;
  export let outroend = null;
  export let partitions = null;
  export let PartitionComponent;

  $: data = partitions
    ? Object.entries(partitions).map(([id, fn]) => ({ id, pool: fn(pool) }))
    : [{ id: 'default', pool }];
</script>

{#each data as part (part.id)}
  <PartitionComponent partition={part} let:pool={partition_pool}>
    {#each partition_pool as item (item[key])}
      <div
        in:receive={{ key: item[key] }}
        out:send={{ key: item[key] }}
        animate:flip={{ duration: 500 }}
        on:outroend={() => outroend && outroend(item)}
      >
        <slot partition_id={part.id} {item} />
      </div>
    {:else}
      <slot name="else" />
    {/each}
  </PartitionComponent>
{/each}
