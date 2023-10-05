<script>
  export let value = '';
</script>

<div>
  <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
    <div class="input-group-shim">..</div>
    <input type="search" placeholder="Search..." bind:value />
  </div>
</div>

<style>
  input {
    padding-left: 0.5em;
  }
</style>
