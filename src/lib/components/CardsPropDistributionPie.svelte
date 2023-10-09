<script>
  import { ConicGradient } from '@skeletonlabs/skeleton';
  import { partition, analyse_scope } from '$lib/stores/filter.js';

  export let cards;
  export let attr;
  export let color_map = {};

  $: pies = partition(cards, attr).toSorted((a, b) =>
    Math.min(1, Math.max(-1, b[1].length - a[1].length))
  );
  $: conicStops = pies.reduce(
    ({ stops, prev }, [label, part]) => {
      const share = part.length / cards.length;
      const stop = {
        label,
        color: color_map[label] || `hsl(${275 + (300 * prev.end) / 100}deg, 60%, 40%)`,
        start: prev.end,
        end: prev.end + 100 * share
      };
      stops.push(stop);
      return { stops, prev: stop };
    },
    { stops: [], prev: { end: 0 } }
  ).stops;

  function scope(e) {
    analyse_scope.update((scopes) => {
      scopes.push({ attr, value: e.target.innerText });
      return scopes;
    });
  }
</script>

<div>
  <ConicGradient stops={conicStops} legend on:click={scope}>
    <slot>
      <span class="capitalize">{attr}</span>
    </slot>
  </ConicGradient>
</div>
