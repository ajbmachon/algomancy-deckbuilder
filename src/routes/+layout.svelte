<script>
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  import { storePopup } from '@skeletonlabs/skeleton';

  import '../app.postcss';
  import { AppShell } from '@skeletonlabs/skeleton';
  import SideBar from '$lib/components/SideBar.svelte';

  import { filtered_pool } from '$lib/stores/cards_db.js';

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<AppShell>
  <svelte:fragment slot="header">
    <p class="text-4xl/loose ml-4">
      Algomancy Deck Builder
      <span class="text-sm opacity-10">[Card pool size: {$filtered_pool.length}]</span>
    </p>
  </svelte:fragment>
  <SideBar slot="sidebarLeft" />
  <!-- (sidebarRight) -->
  <!-- (pageHeader) -->
  <!-- Router Slot -->
  <slot />
  <!-- ---- / ---- -->
  <!--<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>-->
  <!-- (footer) -->
</AppShell>

<style>
  html,
  body {
    @apply h-full overflow-hidden;
  }
</style>
