import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ScrollTop } from './ScrollTop.jsx';

describe('ScrollTop', () => {
  afterEach(() => {
    window.scrollY = 0;
    vi.restoreAllMocks();
  });

  it('aparece al superar el umbral y sube al pulsarlo', async () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(<ScrollTop threshold={100} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    act(() => {
      window.scrollY = 500;
      fireEvent.scroll(window);
    });
    await userEvent.click(screen.getByRole('button', { name: 'Volver arriba' }));
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('con target="parent" vigila el contenedor padre', () => {
    const { container } = render(
      <div data-testid="scroller">
        <ScrollTop target="parent" threshold={50} />
      </div>,
    );
    const scroller = container.firstChild;
    act(() => {
      scroller.scrollTop = 80;
      fireEvent.scroll(scroller);
    });
    expect(screen.getByRole('button', { name: 'Volver arriba' })).toBeInTheDocument();
  });
});
