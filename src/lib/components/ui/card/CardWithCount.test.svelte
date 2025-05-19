<!--
  Simplified test version of CardWithCount for tests
  Version with minimal styling for test environment
-->
<script>
  import { base } from '$app/paths';

  export let name;
  export let image_name;
  export let faction;
  export let count = 1;
</script>

<div class="card-container" data-testid="card-container">
  {#if count > 1}
    <div class="badge" data-testid="card-badge" data-faction={faction}>
      {count}
    </div>
  {/if}
  <img data-faction={faction} src="{base}/card_images/{image_name}" alt={name} on:click />
</div>

<style>
  .card-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .badge {
    position: absolute;
    top: -8px;
    right: -8px;
    z-index: 10;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #333;
    color: white;
    font-weight: bold;
  }
</style>
