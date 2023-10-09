<script>
  import { ConicGradient } from '@skeletonlabs/skeleton';
  import { partition } from '$lib/stores/filter.js';

  export let cards;
  export let attr;
  export let color_map = {};

  $: conicStops = partition(cards, attr)
    .toSorted((a, b) => Math.min(1, Math.max(-1, b[1].length - a[1].length)))
    .reduce(
      ({ stops, prev }, [label, part]) => {
        const share = part.length / cards.length;
        const stop = {
          label,
          color: color_map[label] || `hsl(${275 + (360 * prev.end) / 100}deg, 60%, 40%)`,
          start: prev.end,
          end: prev.end + 100 * share
        };
        stops.push(stop);
        return { stops, prev: stop };
      },
      { stops: [], prev: { end: 0 } }
    ).stops;
</script>

<div>
  <ConicGradient stops={conicStops} legend>
    <slot>
      <span class="capitalize">{attr}</span>
    </slot>
  </ConicGradient>
</div>
