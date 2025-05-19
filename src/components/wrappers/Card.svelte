<script>
  import { onMount } from 'svelte';
  import { useComponent } from '$lib/utils/mcp-integration';
  import { base } from '$app/paths';

  export let name = '';
  export let image_name = '';
  export let faction = '';
  export let count = 1;

  let component = null;
  let container;

  const getCardProps = () => {
    return {
      name,
      image: `${base}/card_images/${image_name}`,
      faction,
      count,
      withBadge: count > 1
    };
  };

  onMount(async () => {
    try {
      component = await useComponent('Card', getCardProps());
      if (container) {
        container.innerHTML = component.html;
        // We should be careful with eval in production
        if (component.script) {
          eval(component.script);
        }
        if (component.styles) {
          const styleEl = document.createElement('style');
          styleEl.textContent = component.styles;
          document.head.appendChild(styleEl);
        }
      }
    } catch (error) {
      console.error('Failed to load Card component:', error);
    }
  });
</script>

<div bind:this={container} class="card-container" on:click>
  <!-- Component will be rendered here by MCP -->
  <slot />
</div>

<style>
  .card-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }
</style>
