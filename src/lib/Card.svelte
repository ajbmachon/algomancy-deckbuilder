<script>
  export let name;
  export let faction;
  export let stacked = 0;
  export let height = 400;

  $: image_name = name.replaceAll(",", "").replaceAll(" ", "-");
  $: height_var = `${height}px`;
  $: margin_bottom_var = `${stacked - height}px`;
</script>

<div class="card" on:click>
  <img class={faction}
       class:stacked
       style:--height={height_var}
       style:--margin-bottom={margin_bottom_var}
       src="/card_images/{image_name}.jpg"
       />
</div>

<style>
  .card {
    display: inline;
  }
  .card img {
    position: relative;
    z-index: 0;
    height: var(--height, 400px);
    border-radius: 16px;
    box-shadow: 10px 10px 10px -5px hsl(0deg 0% 0% / 60%);
    margin-bottom: 0px;

    transition: transform .250s ease-out, box-shadow .5s ease-in;

    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;

    &.stacked {
      margin-bottom: var(--margin-bottom, initial);
    }
  }
  .card img:hover {
    z-index: 1;
    box-shadow: 0px 0px 15px 5px hsl(0deg 0% 50% / 80%),
		10px 10px 10px -5px hsl(0deg 0% 0% / 60%);
    transform: translate(5px, 5px)
	       perspective(5000px) rotateX(10deg) rotateY(0deg) rotateZ(-1deg);
    transition: transform .250s ease-out;
  }
  .card img.earth:hover {

    box-shadow: 0px 0px 4px 3px hsl(220deg 8% 86% / 70%),
		0px 0px 15px 5px hsl(28deg 69% 57% / 90%),
		10px 10px 10px -5px hsl(0deg 0% 0% / 60%);
  }
  .card img.wood:hover {

    box-shadow: 0px 0px 4px 3px hsl(220deg 8% 86% / 70%),
		0px 0px 15px 5px hsl(121deg 55% 56% / 90%),
		10px 10px 10px -5px hsl(0deg 0% 0% / 60%);
  }
  .card img.fire:hover {

    box-shadow: 0px 0px 4px 3px hsl(220deg 8% 86% / 70%),
		0px 0px 15px 5px hsl(1deg 86% 51% / 90%),
		10px 10px 10px -5px hsl(0deg 0% 0% / 60%);
  }
  .card img.water:hover {

    box-shadow: 0px 0px 4px 3px hsl(220deg 8% 86% / 70%),
		0px 0px 15px 5px hsl(189deg 78% 67% / 90%),
		10px 10px 10px -5px hsl(0deg 0% 0% / 60%);
  }
  .card img.metal:hover {

    box-shadow: 0px 0px 10px 3px hsl(220deg 8% 86% / 100%),
		0px 0px 15px 5px hsl(0deg 0% 0% / 70%),
		10px 10px 10px -5px hsl(0deg 0% 0% / 60%);
  }
</style>
