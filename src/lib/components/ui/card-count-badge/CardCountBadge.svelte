<!--
  Card count badge component for showing the quantity of stacked cards
  Used in stacked card display to show the number of copies
-->
<script>
  import { cn } from '$lib/utils';

  /**
   * Number of cards in the stack
   * @type {number}
   */
  export let count = 1;

  /**
   * Card faction (earth, fire, water, wood, metal)
   * Used for faction-specific styling
   * @type {string=}
   */
  export let faction = undefined;

  // Only show badge for counts greater than 1
  $: showBadge = count > 1;

  // Apply faction-specific colors when available
  $: badgeClass = cn(
    'badge absolute -top-2 -right-2 z-10 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold border-2 border-background',
    faction ? `bg-faction-${faction} text-white` : 'bg-accent text-accent-foreground'
  );
</script>

{#if showBadge}
  <div class={badgeClass}>
    {count}
  </div>
{/if}
