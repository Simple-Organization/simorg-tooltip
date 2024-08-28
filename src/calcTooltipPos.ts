//
//

export type TooltipPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'left'
  | 'auto';

//
//

export function calcTooltipPos(
  container: HTMLElement,
  position: TooltipPosition,
  documentScrollTop: number,
  tooltipNode: HTMLElement,
) {
  let top: string | number = '-50%';
  let left: string | number = '0';
  let coordenadas = container.getBoundingClientRect();

  //
  //

  switch (position) {
    case 'top':
    case 'top-start':
    case 'top-end':
      left = coordenadas.left + container.offsetWidth / 2;
      top = coordenadas.top + documentScrollTop;
      break;

    //
    case 'bottom':
    case 'bottom-start':
    case 'bottom-end':
      left = coordenadas.left + container.offsetWidth / 2;
      top = coordenadas.bottom + documentScrollTop;
      break;

    //
    case 'right':
      left = coordenadas.right + 15;
      top = coordenadas.top + documentScrollTop + container.offsetHeight / 2;
      break;

    //
    case 'left':
      left = coordenadas.left - 15;
      top = coordenadas.top + documentScrollTop + container.offsetHeight / 2;
      break;

    //
    case 'auto':
      if (coordenadas.top - tooltipNode.offsetHeight > 0) {
        left = coordenadas.left + container.offsetWidth / 2;
        top = coordenadas.top + documentScrollTop;
        tooltipNode.classList.add('top');
        tooltipNode.classList.remove('bottom');
      } else if (coordenadas.top - tooltipNode.offsetHeight <= 0) {
        left = coordenadas.left + container.offsetWidth / 2;
        top = coordenadas.bottom + documentScrollTop;
        tooltipNode.classList.add('bottom');
        tooltipNode.classList.remove('top');
      }
      break;
  }

  //
  //

  tooltipNode.style.top = top + 'px';
  tooltipNode.style.left = left + 'px';
}
