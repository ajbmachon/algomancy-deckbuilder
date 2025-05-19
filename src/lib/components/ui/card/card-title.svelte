<script>
  import { cn } from "$lib/utils";
  
  /**
   * @type {string}
   */
  export let className = undefined;
  
  /**
   * HTML element to render
   * @type {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'}
   */
  export let tag = 'h3';
</script>

{#if tag === 'h1'}
  <h1 class={cn("text-2xl font-semibold leading-none tracking-tight", className)}>
    <slot />
  </h1>
{:else if tag === 'h2'}
  <h2 class={cn("text-2xl font-semibold leading-none tracking-tight", className)}>
    <slot />
  </h2>
{:else if tag === 'h3'}
  <h3 class={cn("text-2xl font-semibold leading-none tracking-tight", className)}>
    <slot />
  </h3>
{:else if tag === 'h4'}
  <h4 class={cn("text-2xl font-semibold leading-none tracking-tight", className)}>
    <slot />
  </h4>
{:else if tag === 'h5'}
  <h5 class={cn("text-2xl font-semibold leading-none tracking-tight", className)}>
    <slot />
  </h5>
{:else if tag === 'h6'}
  <h6 class={cn("text-2xl font-semibold leading-none tracking-tight", className)}>
    <slot />
  </h6>
{:else if tag === 'div'}
  <div class={cn("text-2xl font-semibold leading-none tracking-tight", className)}>
    <slot />
  </div>
{/if}