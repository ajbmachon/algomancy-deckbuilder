<script>
	import CardPoolFilter from '$lib/CardPoolFilter.svelte';

	export let partition;

	$: pool = partition.pool;
	$: pool_size = partition.pool.length;
</script>

<div class="root">
	<h2>
		{partition.id}
		<small>[{pool_size} card{pool_size !== 1 ? 's' : ''}]</small>
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
