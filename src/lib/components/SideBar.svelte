<script>
  import { ConicGradient } from '@skeletonlabs/skeleton';

  import { base } from '$app/paths';
  import { page } from '$app/stores';
  import { decklist } from '$lib/stores/decklist.js';
  import { working } from '$lib/stores/cards_db.js';

  $: paths = [
    { name: 'Import/Export', path: `${base}/port` },
    { name: `Build [${$decklist.length}]`, path: base || '/' }
  ];

  const conicStops = [
    { color: 'transparent', start: 0, end: 25 },
    { color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
  ];
</script>

<nav class="list-nav pl-2 pr-4">
  {#each paths as item (item.path)}
    <ul>
      <li>
        <a href={item.path} class:active={item.path == $page.url.pathname}>
          <!--<span class="badge bg-primary-500">[x]</span>-->
          <span class="flex-auto">{item.name}</span>
        </a>
      </li>
    </ul>
  {/each}
</nav>

{#if $working}
  <div>
    <ConicGradient stops={conicStops} spin width="w-8"
      ><p class="text-xs font-thin">Sorting cards...</p></ConicGradient
    >
  </div>
{/if}

<style>
  .active {
    background-color: rgb(var(--color-primary-500) / 0.5);
  }
  .active:hover {
    background-color: rgb(var(--color-primary-500) / 0.6) !important;
  }
</style>
