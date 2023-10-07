<script>
  import { page } from '$app/stores';
  import { decklist } from '$lib/stores/decklist.js';

  $: paths = [
    { name: 'Import decklist', path: '/import' },
    { name: `Build deck [${$decklist.length}]`, path: '/' },
    { name: 'Export decklist', path: '/export' }
  ];
</script>

<nav class="list-nav pl-2 pr-4">
  {#each paths as item (item.path)}
    <ul>
      <li>
        <a href={item.path} class:!bg-primary-50-900-token={item.path == $page.url.pathname}>
          <!--<span class="badge bg-primary-500">[x]</span>-->
          <span class="flex-auto">{item.name}</span>
        </a>
      </li>
    </ul>
  {/each}
</nav>
