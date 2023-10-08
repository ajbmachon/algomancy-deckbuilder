<script>
  import { popup } from '@skeletonlabs/skeleton';
  import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

  import Checkbox from '$lib/components/Checkbox.svelte';
  import Search from '$lib/components/Search.svelte';
  import { card_pool } from '$lib/stores/cards_db.js';
  import { search_terms } from '$lib/search.js';

  export let filter;

  $: filter.search_terms = search_terms(filter.search_value);
  $: scopes = Object.keys($card_pool.search_scopes);
</script>

<div>
  <Search bind:value={filter.search_value}>
    <div slot="tooltip" class="max-w-lg">
      <p>
        Free form search on part of word(s) found any where on the card by default. Search term may
        be scoped to a particular part of the card by prefixing it with <code>SCOPE:</code>
        (i.e. the default <code>SCOPE</code> is <code>any</code>. Available scopes:
      </p>
      {#each scopes as scope}
        <pre>{scope}</pre>
      {/each}
      <p>
        The <code>SCOPE</code> may be abbreviated as well. Some example searches:
      </p>
      <pre>faction:fire attr:flying</pre>
      <pre>aff:rrr</pre>
      <pre>frog power:2 type:virus</pre>
    </div>
  </Search>

  <div class="factions">
    {#each $card_pool.factions as faction, tabindex}
      <div class="faction">
        <Checkbox bind:checked={filter.factions[faction]} {tabindex}>
          {faction}
        </Checkbox>
      </div>
    {/each}
    <div class="faction">
      <Checkbox bind:checked={filter.hybrids_only} hybrid tabindex={$card_pool.factions.length}>
        hybrids only
      </Checkbox>
    </div>
  </div>

  <div class="pt-4 capitalize">
    <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
      {#each scopes as scope}
        <RadioItem bind:group={filter.sort_by} name="sort_by" value={scope}>{scope}</RadioItem>
      {/each}
    </RadioGroup>
  </div>
</div>

<style>
  .factions {
    padding-top: 1em;
  }

  .faction {
    display: inline-block;
    margin-right: 1em;
  }
</style>
