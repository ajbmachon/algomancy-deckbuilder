<script>
  import { cn } from "$lib/utils";
  
  /**
   * @type {string}
   */
  export let className = undefined;
</script>

<div class={cn("text-sm text-muted-foreground", className)}>
  <slot />
</div>