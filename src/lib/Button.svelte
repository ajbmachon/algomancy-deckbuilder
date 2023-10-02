<div on:click>
  <slot>Untitled</slot>
</div>

<style>
  div {
    display: inline-block;
    position: relative;
    cursor: pointer;
    background-color: lightgrey;
    text-transform: capitalize;
    text-wrap: nowrap;
    border-radius: 6px;
    margin: 2px;
    padding: 4px 8px 4px 8px;
    box-shadow: 2px 2px 2px 0px hsl(0deg 0% 0% / 60%);
    transition: all 0.15s ease-in;

    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;

    &:hover {
      background-color: lightgreen;
      box-shadow: 3px 3px 2px 0px hsl(0deg 0% 0% / 60%),
        inset 0px 0px 4px 4px hsl(120deg 75% 50% / 60%);
    }

    &:active {
      box-shadow: 0px 0px 2px 0px hsl(0deg 0% 0% / 60%),
        inset 0px 0px 4px 8px hsl(120deg 75% 50% / 60%);
    }
  }
</style>
