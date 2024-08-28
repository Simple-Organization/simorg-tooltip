<script lang="ts">
  import { Positions, tooltipCalcPos } from './tooltipUtils';

  export let node: HTMLElement | null = null;
  export let message: string = '';
  export let color = '';
  export let position: Positions = 'top';
</script>

<svelte:options accessors/>

<div
  use:tooltipCalcPos={{
    elem: node,
    position,
  }}
  style:--color="var(--{color})"
  style:pointer-events={$$slots.default ? 'all' : 'none'}
  class="tooltip-wrapper {position}"
>
  <slot>{message}</slot>
</div>

<style lang="scss">
  .tooltip-wrapper {
    --transform: transalate(0%, 0%);
    --clr-primary: rgb(214, 178, 178);
    --color: var(--main);


    display: grid;
    place-items: center;

    position: absolute;
    top: -10rem;
    left: -10rem;
    z-index: 10;
    transform: var(--transform);

    padding: 0.25rem;

    background: var(--primary);
    border-radius: 0.3rem;
    opacity: 0.9;
    color: var(--text-100);    
    box-shadow: var(--shadow-z3);
    font-size: .9rem;
    white-space: nowrap;

    animation: forwards enterFade .2s;
  }

  .top,
  .top-start,
  .top-end {
    --transform: translate(-50%, -140%);
    &::after {
      transform: translate(25%);
      border-color: var(--color) transparent transparent transparent;
      top: 98%;
    }
  }
  .top-start {
    --transform: translate(-85%, -120%);
    &::after {
      left: 85%;
    }
  }
  .top-end {
    --transform: translate(-15%, -120%);
    &::after {
      left: 15%;
    }
  }
  
  .bottom,
  .bottom-start,
  .bottom-end {
    --transform: translate(-50%, 40%);
    &::after {
      border-color: transparent transparent var(--color) transparent;
      top: -13px;
      left: 51.8%;
    }
  }
  .bottom-start {
    --transform: translate(-85%, 40%);
    &::after {
      left: 85%;
    }
  }
  .bottom-end {
    --transform:: translate(-15%, 40%) ;
    &::after {
      left: 15%;
    }
  }
  
  .right {
    --transform: translate(0%, -50%);
    &::after {
      border-color:  transparent var(--color) transparent transparent;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 3px;
    }
  }
  .left {
    --transform: translate(-100%, -50%);
    &::after {
      transform: translate(100%, -50%);
      border-color: transparent transparent  transparent var(--color);
      top: 50%;
      right: 1px;
    }
  }

  @keyframes enterFade {
    0% {
      opacity: 0;
      transform: scale(1) var(--transform);
    } 
    50% {
      transform: scale(1.05) var(--transform);
    }
    100% {
      opacity: 1;
      transform: scale(1) var(--transform);
    }
  }

  // Theme Corrections
  :global(.yellow-theme), 
  :global(.grey-theme) {
    .tooltip-wrapper {
      color: var(--dark-text);
    }
  }
</style>
