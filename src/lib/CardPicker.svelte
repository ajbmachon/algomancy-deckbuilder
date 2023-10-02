<script>
	import Button from '$lib/Button.svelte';
	import Card from '$lib/Card.svelte';
	import CardPickerPartition from '$lib/CardPickerPartition.svelte';
	import Pool from '$lib/Pool.svelte';
	import { create_crossfade } from '$lib/crossfade';

	const [send, receive] = create_crossfade();

	export let cards;
	export let selected;
	export let stacked = 40;

	$: cardpool =
		cardpool ||
		cards.map((card, idx) => ({
			key: idx,
			selected: false,
			inflight: false,
			extras: 0,
			card
		}));

	$: partitions = {
		['Card Pool']: (p) => p.filter((c) => !c.selected),
		['Selected Cards']: (p) => p.filter((c) => c.selected)
	};

	function update_selected() {
		selected = cardpool
			.filter((item) => item.selected)
			.map((item) => ({
				card: item.card,
				count: 1 + item.extras
			}));
	}

	function toggle_selected(item) {
		return () => {
			if (item.inflight) {
				return;
			}

			if (item.extras > 0) {
				item.extras -= 1;
			} else {
				item.inflight = true;
				item.selected = !item.selected;
			}
			update_selected();
			// trigger re-render
			cardpool = cardpool;
		};
	}

	function arrived(item) {
		item.inflight = false;
	}

	function add_extra(item) {
		item.extras += 1;
		update_selected();
		// trigger re-render
		cardpool = cardpool;
	}
</script>

<Pool
	pool={cardpool}
	outroend={arrived}
	{send}
	{receive}
	{partitions}
	PartitionComponent={CardPickerPartition}
	let:item
	let:partition_id
>
	<div class="card-frame">
		<Card
			name={item.card.name}
			faction={item.card.factions[0]}
			{stacked}
			on:click={toggle_selected(item)}
		>
			{#if partition_id === 'Selected Cards'}
				<div class="dupes" style:display={item.extras ? 'inline-block' : 'none'}>
					+{item.extras}
				</div>
				<div class="extras">
					Extra copies: {item.extras} [{item.card.name}]
					<div>
						<Button on:click={add_extra(item)}>Add exra copy</Button>
					</div>
					<div>
						<Button on:click={toggle_selected(item)}>Remove one</Button>
					</div>
				</div>
			{/if}
		</Card>
	</div>
</Pool>

<style>
	.card-frame {
		display: inline-block;
		position: relative;
	}
	.dupes {
		position: relative;
		top: -8px;
		left: -320px;
	}
	.extras {
		position: absolute;
		z-index: 1;
		transition: all 0.25s ease-in;
		transition-delay: 0.5s;
		left: 8px;
		top: 8px;
		text-wrap: nowrap;
	}
	.card-frame:hover .extras {
		left: 300px;
	}
</style>
