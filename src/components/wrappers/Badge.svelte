<script>
  import { onMount } from 'svelte';
  import { useComponent } from '$lib/utils/mcp-integration';

  export let variant = 'default';
  export let className = '';

  let component = null;
  let container;

  onMount(async () => {
    try {
      component = await useComponent('Badge', {
        variant,
        className,
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
      console.error('Failed to load Badge component:', error);
    }
  });
</script>

<div bind:this={container}>
  <slot />
</div>
