import { calcTooltipPos, TooltipPosition } from './calcTooltipPos';

//
//

export type TooltipSubscriptions = {
  container: HTMLElement;
  position: TooltipPosition;
  tooltipNode: HTMLElement;
};

//
//

export type TooltipManager = {
  subscribe: (sub: TooltipSubscriptions) => () => void;
};

//
//

export function tooltipManager(): TooltipManager {
  let interval: any;

  const subs = new Set<TooltipSubscriptions>();

  //
  //

  function intervalFunc() {
    const documentScrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    //
    //

    subs.forEach((sub) => {
      calcTooltipPos(
        sub.container,
        sub.position,
        documentScrollTop,
        sub.tooltipNode,
      );
    });
  }

  //
  //

  return {
    subscribe(sub: TooltipSubscriptions) {
      subs.add(sub);
      if (subs.size === 1) {
        interval = setInterval(intervalFunc, 20);
      }

      return () => {
        subs.delete(sub);
        if (subs.size === 0) {
          clearInterval(interval);
        }
      };
    },
  };
}
