import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn.js';
import { ArrowUpIcon } from '../../utils/icons.jsx';

/**
 * Botón flotante que aparece al hacer scroll y lleva de vuelta arriba.
 *
 * @param {object} props
 * @param {'window' | 'parent'} [props.target='window'] Qué elemento se vigila: la ventana o el contenedor padre.
 * @param {number} [props.threshold=400] Píxeles de scroll a partir de los que aparece.
 * @param {'smooth' | 'auto'} [props.behavior='smooth']
 * @param {string} [props.label='Volver arriba'] Etiqueta accesible.
 * @param {React.ReactNode} [props.icon] Icono propio.
 * @param {string} [props.className]
 */
export function ScrollTop({
  target = 'window',
  threshold = 400,
  behavior = 'smooth',
  label = 'Volver arriba',
  icon,
  className,
}) {
  const [visible, setVisible] = useState(false);
  const anchorRef = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    const scroller = target === 'parent' ? anchorRef.current?.parentElement : window;
    if (!scroller) return undefined;
    scrollerRef.current = scroller;
    const getTop = () => (scroller === window ? window.scrollY : scroller.scrollTop);
    const onScroll = () => setVisible(getTop() > threshold);
    onScroll();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', onScroll);
  }, [target, threshold]);

  return (
    <span ref={anchorRef} className={target === 'parent' ? 'sticky bottom-4 float-right' : undefined}>
      {visible && (
        <button
          type="button"
          aria-label={label}
          onClick={() => scrollerRef.current?.scrollTo({ top: 0, behavior })}
          className={cn(
            'flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg',
            'hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
            target === 'window' && 'fixed right-6 bottom-6 z-40',
            className,
          )}
        >
          {icon ?? <ArrowUpIcon />}
        </button>
      )}
    </span>
  );
}
