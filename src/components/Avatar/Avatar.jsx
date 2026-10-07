import { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn.js';
import { UserIcon } from '../../utils/icons.jsx';

const sizes = {
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-12 text-base',
  xl: 'size-16 text-xl',
};

const iconSizes = { sm: 'size-4', md: 'size-5', lg: 'size-6', xl: 'size-8' };

const shapes = { circle: 'rounded-full', square: 'rounded-md' };

/**
 * Representa a una persona o entidad con una imagen, sus iniciales o un icono.
 * Si la imagen falla al cargar, muestra `label` o el icono por defecto.
 *
 * @param {object} props
 * @param {string} [props.image] URL de la imagen.
 * @param {string} [props.label] Texto corto, normalmente iniciales.
 * @param {React.ReactNode} [props.icon] Icono propio en lugar del genérico.
 * @param {string} [props.alt] Texto alternativo; describe a quién representa.
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='md']
 * @param {'circle' | 'square'} [props.shape='circle']
 * @param {string} [props.className]
 */
export const Avatar = forwardRef(function Avatar(
  { image, label, icon, alt, size = 'md', shape = 'circle', className, ...props },
  ref,
) {
  const [failedImage, setFailedImage] = useState(null);
  const showImage = image && failedImage !== image;

  return (
    <span
      ref={ref}
      role="img"
      aria-label={alt ?? label}
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden bg-muted font-medium text-muted-foreground select-none',
        sizes[size],
        shapes[shape],
        className,
      )}
      {...props}
    >
      {showImage ? (
        <img src={image} alt="" className="size-full object-cover" onError={() => setFailedImage(image)} />
      ) : label ? (
        <span aria-hidden="true">{label}</span>
      ) : (
        (icon ?? <UserIcon className={iconSizes[size]} />)
      )}
    </span>
  );
});
