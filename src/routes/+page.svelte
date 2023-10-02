<script>
	import cards from '$lib/assets/cards.json';
	import CardPicker from '$lib/CardPicker.svelte';

	let selected = [];
	$: num_cards = selected.reduce((count, s) => count + s.count, 0);
</script>

<h1>Algomancy Deck Builder</h1>

<div>
	Deck: {num_cards} card{num_cards !== 1 ? 's' : ''}
</div>

<CardPicker {cards} bind:selected />
