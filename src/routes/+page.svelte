<script>
  let fetching = fetch("http://127.0.0.1:8080/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: "{ cards { id, name, imageUrl } }" }),
  })
      .then(r => r.json());
</script>

<h1>Algomancy Deck Builder</h1>

{#await fetching}
  <pre>Loading cards...</pre>

{:then rsp}
  <div>
    {#each rsp.data.cards as card}
      <h3>{card.name}</h3>
      <img src="{card.imageUrl}" width=300 style="border-radius: 16px" />
    {/each}

  </div>
  
{:catch error}
  <pre>Failed to fetch cards! {error}</pre>

{/await}
