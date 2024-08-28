import Tooltip from './Tooltip.svelte';

export interface TooltipUnit {
  message?: string;
  elem?: HTMLElement | null;
  color?: string;
  position?: Positions;
  timeout?: number;
}
export type Positions =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left'
  | 'right'
  | 'auto';

/**
 * Svelte action que faz a função de hover adicionando um mouseenter e um mouseleave
 */
export function actionOnHover(
  node: HTMLElement,
  methods: {
    enter: (node?: HTMLElement) => void;
    exit: (node?: HTMLElement) => void;
  },
) {
  function handleMouseExit() {
    methods.exit(node);
    node.removeEventListener('mouseleave', handleMouseExit);
  }
  function handleMouseEnter() {
    methods.enter(node);
    node.addEventListener('mouseleave', handleMouseExit);
  }
  node.addEventListener('mouseenter', handleMouseEnter);

  return {
    destroy() {
      node.removeEventListener('mouseenter', handleMouseEnter);
    },
  };
}

/**
 *  Função para criar uma nova tooltip
 */
export function createTooltip(
  toFollowElement: HTMLElement,
  props: TooltipUnit,
) {
  return new Tooltip({
    target: document.getElementById('main')!,
    // @ts-ignore
    props: {
      node: toFollowElement,
      ...props,
    },
  });
}

/**
 * Função para Criar um tooltip com timeout
 */
export function createTimedTooltip(
  toFollowElement: HTMLElement,
  props: TooltipUnit,
) {
  let tooltip = createTooltip(toFollowElement, props);
  setTimeout(() => tooltip.$destroy(), props.timeout);
}

/**
 * Função para adicionar um listener de mouseenter e mouse exit para mostrar um tooltip
 */
export function tooltipOnHover(node: HTMLElement, props: TooltipUnit) {
  let tooltip: Tooltip;

  return actionOnHover(node, {
    enter: () => (tooltip = createTooltip(node, props)),
    exit: () => tooltip.$destroy(),
  });
}

/**
 * Função de setup do tooltip só usado por ele
 */
export function tooltipCalcPos(node: HTMLElement, props: TooltipUnit) {
  let coordenadas: any;
  let top: string | number = '-50%';
  let left: string | number = '0';

  function calcPos() {
    if (props.elem) {
      coordenadas = props.elem.getBoundingClientRect();
      switch (props.position) {
        case 'top':
        case 'top-start':
        case 'top-end':
          left = coordenadas.left + props.elem.offsetWidth / 2;
          top = coordenadas.top + document.documentElement.scrollTop;
          break;
        case 'bottom':
        case 'bottom-start':
        case 'bottom-end':
          left = coordenadas.left + props.elem.offsetWidth / 2;
          top = coordenadas.bottom + document.documentElement.scrollTop;
          break;
        case 'right':
          left = coordenadas.right + 15;
          top =
            coordenadas.top +
            document.documentElement.scrollTop +
            props.elem.offsetHeight / 2;
          break;
        case 'left':
          left = coordenadas.left - 15;
          top =
            coordenadas.top +
            document.documentElement.scrollTop +
            props.elem.offsetHeight / 2;
          break;
        case 'auto':
          if (coordenadas.top - node.offsetHeight > 0) {
            left = coordenadas.left + props.elem.offsetWidth / 2;
            top = coordenadas.top + document.documentElement.scrollTop;
            node.classList.add('top');
            node.classList.remove('bottom');
          } else if (coordenadas.top - node.offsetHeight <= 0) {
            left = coordenadas.left + props.elem.offsetWidth / 2;
            top = coordenadas.bottom + document.documentElement.scrollTop;
            node.classList.add('bottom');
            node.classList.remove('top');
          }
          break;
      }
    } else {
      left = '-50%';
      top = '-50%';
    }
    node.style.top = top + 'px';
    node.style.left = left + 'px';
  }

  const interval = setInterval(() => calcPos(), 20);
  return {
    destroy() {
      clearInterval(interval);
    },
  };
}
