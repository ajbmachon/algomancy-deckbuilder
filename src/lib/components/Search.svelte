<script>
  import { popup } from '@skeletonlabs/skeleton';

  export let value = '';

  const popupFocusBlur = {
    event: 'focus-blur',
    target: 'popupFocusBlur',
    placement: 'right'
  };
</script>

<div>
  <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] max-w-xl">
    <div class="input-group-shim">..</div>
    <input type="search" placeholder="Search..." bind:value use:popup={popupFocusBlur} />
  </div>
</div>

<div class="card p-4 variant-filled z-10" data-popup="popupFocusBlur">
  <slot name="tooltip">
    <p>Shows on focus, hides on blur.</p>
  </slot>
  <div class="arrow variant-filled" />
</div>

<style>
  input {
    padding-left: 0.5em;
  }
</style>
