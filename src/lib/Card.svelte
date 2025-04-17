<script>
  import { base } from '$app/paths';

  export let name;
  export let image_name;
  export let faction;
</script>

<div class="card-container">
  <img
    class={faction}
    src="{base}/card_images/{image_name}"
    alt={name}
    on:click
  />
</div>

<style>
  .card-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }

  img {
    width: 100%;
    max-width: 250px;
    border-radius: 16px;
    box-shadow: 5px 5px 10px -5px hsl(0deg 0% 0% / 60%);
    object-fit: contain;
    object-position: center;
    transition: transform 0.25s ease-out, box-shadow 0.75s ease-out;
    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    margin-bottom: 10px; /* Ensure bottom text is visible */
  }

  img:hover {
    box-shadow: 0px 0px 15px 5px hsl(0deg 0% 50% / 80%), 5px 5px 10px -5px hsl(0deg 0% 0% / 60%);
    transform: scale(1.05) translateY(-5px); /* Move card up slightly when hovering */
    transition: transform 0.5s ease-out, box-shadow 0.2s ease-in;
    z-index: 5;
  }

  img.earth:hover {
    box-shadow: 0px 0px 4px 3px hsl(220deg 8% 86% / 70%), 0px 0px 15px 5px hsl(28deg 69% 57% / 90%),
      5px 5px 10px -5px hsl(0deg 0% 0% / 60%);
  }
  img.wood:hover {
    box-shadow: 0px 0px 4px 3px hsl(220deg 8% 86% / 70%), 0px 0px 15px 5px hsl(121deg 55% 56% / 90%),
      5px 5px 10px -5px hsl(0deg 0% 0% / 60%);
  }
  img.fire:hover {
    box-shadow: 0px 0px 4px 3px hsl(220deg 8% 86% / 70%), 0px 0px 15px 5px hsl(1deg 86% 51% / 90%),
      5px 5px 10px -5px hsl(0deg 0% 0% / 60%);
  }
  img.water:hover {
    box-shadow: 0px 0px 4px 3px hsl(220deg 8% 86% / 70%), 0px 0px 15px 5px hsl(189deg 78% 67% / 90%),
      5px 5px 10px -5px hsl(0deg 0% 0% / 60%);
  }
  img.metal:hover {
    box-shadow: 0px 0px 10px 3px hsl(220deg 8% 86% / 100%), 0px 0px 15px 5px hsl(0deg 0% 0% / 70%),
      5px 5px 10px -5px hsl(0deg 0% 0% / 60%);
  }
</style>
