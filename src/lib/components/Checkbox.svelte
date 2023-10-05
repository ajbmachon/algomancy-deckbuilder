<script>
  export let checked = true;
  export let tabindex;
  export let hybrid = false;

  function toggle() {
    checked = !checked;
  }
</script>

<span
  class="chip capitalize select-none"
  role="checkbox"
  aria-checked={checked}
  {tabindex}
  class:variant-ringed-primary={!checked}
  class:variant-filled-primary={checked && !hybrid}
  class:variant-gradient-primary-tertiary={checked && hybrid}
  class:bg-gradient-to-br={checked && hybrid}
  on:click={toggle}
  on:keypress={toggle}
>
  <slot>Untitled</slot>
</span>
