<script>
  import { onMount } from 'svelte';
  import { useComponent } from '$lib/utils/mcp-integration';

  export let variant = 'default';
  export let size = 'default';
  export let disabled = false;

  let component = null;
  let container;

  onMount(async () => {
    try {
      component = await useComponent('Button', {
        variant,
        size,
        disabled,
        children: container?.innerHTML || ''
      });

      if (container) {
        // Save the original content to be passed as children
        const originalContent = container.innerHTML;

        // Replace with component HTML
        container.innerHTML = component.html;

        // We should be careful with eval in production
        if (component.script) {
          eval(component.script);
        }

        // Apply any styles
        if (component.styles) {
          const styleEl = document.createElement('style');
          styleEl.textContent = component.styles;
          document.head.appendChild(styleEl);
        }
      }
    } catch (error) {
      console.error('Failed to load Button component:', error);
    }
  });
</script>

<div bind:this={container} class:disabled on:click>
  <slot />
</div>

<style>
  .disabled {
    pointer-events: none;
    opacity: 0.5;
  }
</style>
