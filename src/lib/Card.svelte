<script>
  import { base } from '$app/paths';

  export let name;
  export let image_name;
  export let faction;
  export let height = 400;

  $: height_var = `${height}px`;
</script>

<img
  class={faction}
  style:--height={height_var}
  src="{base}/card_images/{image_name}"
  alt={name}
  on:click
/>

<style>
  img {
    height: var(--height, 400px);
    border-radius: 16px;
    box-shadow: 10px 10px 10px -5px hsl(0deg 0% 0% / 60%);
    object-position: 50% -10px;

    transition: transform 0.25s ease-out, box-shadow 0.75s ease-out, object-position 0.1s ease-in;

    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
  img:hover {
    box-shadow: 0px 0px 15px 5px hsl(0deg 0% 50% / 80%), 10px 10px 10px -5px hsl(0deg 0% 0% / 60%);
    object-position: 50% 0px;
    transform: translate(5px, -5px) perspective(5000px) rotateX(10deg) rotateY(0deg) rotateZ(-1deg);
    transition: transform 0.5s ease-out, box-shadow 0.2s ease-in, object-position 0.15s ease-out;
  }
  img.earth:hover {
    box-shadow: 0px 0px 4px 3px hsl(220deg 8% 86% / 70%), 0px 0px 15px 5px hsl(28deg 69% 57% / 90%),
      10px 10px 10px -5px hsl(0deg 0% 0% / 60%);
  }
  img.wood:hover {
    box-shadow: 0px 0px 4px 3px hsl(220deg 8% 86% / 70%), 0px 0px 15px 5px hsl(121deg 55% 56% / 90%),
      10px 10px 10px -5px hsl(0deg 0% 0% / 60%);
  }
  img.fire:hover {
    box-shadow: 0px 0px 4px 3px hsl(220deg 8% 86% / 70%), 0px 0px 15px 5px hsl(1deg 86% 51% / 90%),
      10px 10px 10px -5px hsl(0deg 0% 0% / 60%);
  }
  img.water:hover {
    box-shadow: 0px 0px 4px 3px hsl(220deg 8% 86% / 70%), 0px 0px 15px 5px hsl(189deg 78% 67% / 90%),
      10px 10px 10px -5px hsl(0deg 0% 0% / 60%);
  }
  img.metal:hover {
    box-shadow: 0px 0px 10px 3px hsl(220deg 8% 86% / 100%), 0px 0px 15px 5px hsl(0deg 0% 0% / 70%),
      10px 10px 10px -5px hsl(0deg 0% 0% / 60%);
  }
</style>
