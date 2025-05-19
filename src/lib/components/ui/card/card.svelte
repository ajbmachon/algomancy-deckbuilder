<script>
  import { cn } from "$lib/utils";
  
  /**
   * @type {string}
   */
  export let className = undefined;
  
  /**
   * Custom HTML element
   * @type {string}
   */
  export let element = undefined;
</script>

{#if element === 'div'}
  <div class={cn("rounded-card bg-card text-card-foreground shadow-card", className)}>
    <slot />
  </div>
{:else if element === 'article'}
  <article class={cn("rounded-card bg-card text-card-foreground shadow-card", className)}>
    <slot />
  </article>
{:else if element === 'section'}
  <section class={cn("rounded-card bg-card text-card-foreground shadow-card", className)}>
    <slot />
  </section>
{:else}
  <div class={cn("rounded-card bg-card text-card-foreground shadow-card", className)}>
    <slot />
  </div>
{/if}