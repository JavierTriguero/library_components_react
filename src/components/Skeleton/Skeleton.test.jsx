import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Skeleton } from './Skeleton.jsx';

describe('Skeleton', () => {
  it('es decorativo y aplica dimensiones', () => {
    const { container } = render(<Skeleton width="10rem" height="2rem" />);
    const el = container.firstChild;
    expect(el).toHaveAttribute('aria-hidden', 'true');
    expect(el.style.width).toBe('10rem');
    expect(el.style.height).toBe('2rem');
    expect(el).toHaveClass('animate-pulse', 'rounded-md');
  });

  it('size define ancho y alto; circle redondea', () => {
    const { container } = render(<Skeleton shape="circle" size="3rem" animation="none" />);
    const el = container.firstChild;
    expect(el.style.width).toBe('3rem');
    expect(el.style.height).toBe('3rem');
    expect(el).toHaveClass('rounded-full');
    expect(el).not.toHaveClass('animate-pulse');
  });
});
