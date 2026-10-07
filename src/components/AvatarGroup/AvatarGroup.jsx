import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Apila varios `Avatar` solapándolos ligeramente.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children Avatares.
 * @param {string} [props.className]
 */
export const AvatarGroup = forwardRef(function AvatarGroup({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn('flex items-center -space-x-2 [&>*]:ring-2 [&>*]:ring-background', className)}
      {...props}
    />
  );
});
