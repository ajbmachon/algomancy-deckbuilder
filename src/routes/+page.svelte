<script>
	import cards from '$lib/assets/cards.json';
	import CardPicker from '$lib/CardPicker.svelte';
	import Button from '$lib/Button.svelte';

	let selected = [];
	$: num_cards = selected.reduce((count, s) => count + s.count, 0);

	function get_deck_txt() {
		return selected.map((item) => `${item.count}x ${item.card.name}`).join('\n');
	}

	let copy_msg = undefined;
	function copy_deck_to_clipboard() {
		navigator.clipboard.writeText(get_deck_txt()).then(
			() => (copy_msg = 'Deck copied to clipboard!'),
			(e) => (copy_msg = `Sorry, copy deck to clipboard failed /: ${e}`)
		);
	}

	function paste_deck_from_clipboard() {
		navigator.clipboard.readText().then((text) => {
			selected = text
				.split('\n')
				.map((ln) => /(\d+)x\s+(.*)$/.exec(ln))
				.filter((m) => !!m)
				.map((m) => ({
					card: { name: m[2] },
					count: parseInt(m[1])
				}));
			copy_msg = 'Pasted deck from clipboard!';
		});
	}
</script>

<h1>Algomancy Deck Builder</h1>

<div>
	Deck: {num_cards} card{num_cards !== 1 ? 's' : ''}
	<div>
		<Button on:click={copy_deck_to_clipboard}>Copy deck to clipboard</Button>
	</div>
	<div>
		<Button on:click={paste_deck_from_clipboard}>Paste deck from clipboard</Button>
	</div>
	{#if copy_msg}
		<div>
			{copy_msg}
		</div>
	{/if}
</div>

<CardPicker {cards} bind:selected />
