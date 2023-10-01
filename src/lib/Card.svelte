<script>
  export let name;
  $: image_name = name.replaceAll(",", "").replaceAll(" ", "-");
</script>

<div class="card" on:click>
  <img src="/card_images/{image_name}.jpg" />
</div>

<style>
  .card {
    display: inline;
  }
  .card img {
    width: 300px;
    border-radius: 16px;

    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
</style>
