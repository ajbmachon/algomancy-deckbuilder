<script>
	import CardPoolFilter from '$lib/CardPoolFilter.svelte';

	export let partition;

	$: pool = partition.pool;
</script>

<div class="root">
	<h2>
		{partition.id}
		<small>[{partition.pool.length} cards]</small>
	</h2>

	<CardPoolFilter {pool} let:pool={filtered_pool}>
		<slot pool={filtered_pool} />
	</CardPoolFilter>
</div>

<style>
	.root {
		float: left;
		width: 50%;
		& > h2 > small {
			font-weight: lighter;
			font-size: small;
		}
	}
</style>
