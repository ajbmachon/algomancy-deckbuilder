<script>
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  import { storePopup } from '@skeletonlabs/skeleton';

  import '../app.postcss';
  import { AppShell } from '@skeletonlabs/skeleton';
  import SideBar from '$lib/components/SideBar.svelte';

  import { filtered_pool } from '$lib/stores/cards_db.js';

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<AppShell slotSidebarLeft="w-auto" regionPage="overflow-hidden">
  <svelte:fragment slot="header">
    <div class="header-container">
      <p class="app-title">
        Algomancy Deck Builder
        <span class="pool-size">[Card pool size: {$filtered_pool.length}]</span>
      </p>
    </div>
  </svelte:fragment>
  <SideBar slot="sidebarLeft" />
  <!-- Router Slot -->
  <div class="content-container">
    <slot />
  </div>
</AppShell>

<style>
  :global(html),
  :global(body) {
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  .header-container {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .app-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
  }

  .pool-size {
    font-size: 0.85rem;
    opacity: 0.6;
    margin-left: 10px;
    font-weight: normal;
  }

  .content-container {
    height: 100%;
    overflow: hidden;
    padding: 0;
  }
</style>
