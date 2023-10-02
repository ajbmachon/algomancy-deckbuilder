import { expoInOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';

export function create_crossfade() {
	return crossfade({
		duration: 400,
		easing: expoInOut,
		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;
			return {
				duration: 800,
				easing: expoInOut,
				css: (t) => `
           transform: ${transform} scale(${t});
           opacity: ${t}
        `
			};
		}
	});
}
