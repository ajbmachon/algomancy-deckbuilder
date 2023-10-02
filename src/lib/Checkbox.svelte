<script>
	export let checked;
</script>

<label>
	<input type="checkbox" bind:checked />
	<span>
		<slot>Untitled</slot>
	</span>
</label>

<style>
	label {
		position: relative;
		cursor: pointer;

		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;

		& input {
			position: absolute;
			opacity: 0;
			cursor: pointer;
			height: 0;
			width: 0;
		}

		& input:checked ~ span {
			background-color: lightgreen;
		}

		& span {
			text-transform: capitalize;
			background-color: lightgrey;
			border-radius: 6px;
			margin-right: 2px;
			padding: 4px 8px 4px 8px;
			box-shadow: 2px 2px 2px 0px hsl(0deg 0% 0% / 60%);
			transition: all 0.15s ease-in;

			&:hover {
				box-shadow: 3px 3px 2px 0px hsl(0deg 0% 0% / 60%),
					inset 0px 0px 4px 4px hsl(120deg 75% 50% / 60%);
			}
		}
	}
</style>
