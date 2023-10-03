<script>
  import Checkbox from '$lib/Checkbox.svelte';
  import debounce from '$lib/debounce.js';

  export let pool;

  let search_term = '';
  let searched_pool = pool;

  const apply_search_filter = debounce((cardpool, search) => {
    if (!search) {
      searched_pool = cardpool;
      return;
    }
    const terms = search
      .toLowerCase()
      .split(' ')
      .reduce(
        ({ acc, curr, scope }, s) => {
          function push(term) {
            if (term.includes(':')) {
              scope = term.slice(0, term.indexOf(':'));
              term = term.slice(scope.length + 1);
            }
            if (term) {
              acc.push({ scope, term });
              scope = 'any';
            }
          }
          if (s.includes('"')) {
            for (var w of s.split('"')) {
              if (curr === null) {
                curr = ' ';
                if (w) {
                  push(w);
                }
              } else if (w) {
                curr += w + ' ';
              } else if (curr !== ' ') {
                push(curr);
                curr = null;
                if (s === '"') {
                  break;
                }
              }
            }
          } else if (curr !== null) {
            curr += s + ' ';
          } else if (s) {
            push(s);
          }
          return { acc, curr, scope };
        },
        { acc: [], curr: null, scope: 'any' }
      ).acc;

    searched_pool = cardpool.filter((i) => {
      const search_space = {
        name: ` ${i.card.name} `.toLowerCase(),
        type: ` ${i.card.type} `.toLowerCase(),
        text: ` ${i.card.text} `.toLowerCase(),
        faction: ` ${i.card.factions.join(' ')} `.toLowerCase()
      };
      search_space.any = Object.values(search_space).join(' ');
      return terms.every(({ scope, term }) =>
        (search_space[scope] || ` ${i.card[scope]} `).includes(term)
      );
    });
  }, 250); // Due to an animation glitch, we must ensure we don't trigger another change while a previous transition is in flight.
  // XXX: TODO: This debounce/delay slows down the UI response time!!!
  $: apply_search_filter(pool, search_term);

  let hybrids = false;
  $: hybrids_pool = !hybrids
    ? searched_pool
    : searched_pool.filter((i) => i.card.factions.length > 1);

  let factions = {
    earth: true,
    wood: true,
    fire: true,
    water: true,
    metal: true,
    colorless: true
  };
  $: factions_pool = hybrids_pool.filter((i) => i.card.factions.every((f) => factions[f]));

  $: final_pool = factions_pool;
</script>

<div class="header">
  <div class="search">
    <input bind:value={search_term} placeholder="Space separated list of search terms" />
  </div>

  <div class="factions">
    {#each Object.keys(factions) as faction}
      <Checkbox bind:checked={factions[faction]}>
        {faction}
      </Checkbox>
    {/each}

    <Checkbox bind:checked={hybrids}>Hybrids only</Checkbox>
  </div>
</div>

<slot pool={final_pool} />

<style>
  .header {
    padding: 8px;
    margin-bottom: 16px;
    margin-right: 32px;
    box-shadow: inset 2px 2px 10px 4px hsl(120deg 25% 50% / 15%),
      2px 2px 5px 2px hsl(120deg 10% 50% / 85%);
    border-radius: 4px;
  }
  .search {
    padding: 8px 32px 8px 8px;

    & input {
      border: none;
      padding: 8px;
      width: 100%;
      box-shadow: 2px 2px 3px 0px hsl(0deg 0% 0% / 15%);
      transition: all 0.25s ease-in-out;

      &:hover,
      &:focus {
        outline: none;
        box-shadow: 2px 2px 6px 3px hsl(120deg 50% 50% / 50%);
      }
    }
  }
  .factions {
    padding: 8px;
  }
</style>
