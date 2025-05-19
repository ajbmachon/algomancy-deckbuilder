<script>
  import { cn } from "$lib/utils";
  
  /**
   * @type {string}
   */
  export let className = undefined;
</script>

<div class={cn("flex flex-col space-y-1.5 p-6", className)}>
  <slot />
</div>