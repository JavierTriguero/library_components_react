import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../test/axe.js';
import { ThemeToggle } from '../components/ThemeToggle/ThemeToggle.jsx';
import { getThemeScript, useTheme } from './useTheme.js';

afterEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

describe('theme.css', () => {
  it('las variables del modo oscuro por sistema y forzado son idénticas', () => {
    const css = readFileSync(resolve(process.cwd(), 'theme.css'), 'utf8');
    const block = (selector) => {
      const start = css.indexOf(selector);
      const body = css.slice(css.indexOf('{', start) + 1, css.indexOf('}', start));
      return body
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.startsWith('--'));
    };
    const system = block(":root:not([data-theme='light'])");
    expect(system.length).toBeGreaterThan(10);
    expect(block(":root[data-theme='dark']")).toEqual(system);
  });
});

describe('useTheme', () => {
  it('por defecto sigue al sistema y no pone data-theme', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('system');
    expect(document.documentElement).not.toHaveAttribute('data-theme');
  });

  it('setTheme guarda la elección, aplica data-theme y sincroniza otros hooks', () => {
    const first = renderHook(() => useTheme());
    const second = renderHook(() => useTheme());
    act(() => first.result.current.setTheme('dark'));
    expect(localStorage.getItem('trigreact-theme')).toBe('dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(second.result.current.theme).toBe('dark');
    expect(second.result.current.resolvedTheme).toBe('dark');

    act(() => first.result.current.setTheme('system'));
    expect(localStorage.getItem('trigreact-theme')).toBeNull();
    expect(document.documentElement).not.toHaveAttribute('data-theme');
  });

  it('al montar sin elección guardada respeta un data-theme puesto por la app', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    renderHook(() => useTheme());
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('aplica al montar el tema guardado previamente', () => {
    localStorage.setItem('trigreact-theme', 'light');
    renderHook(() => useTheme());
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  it('getThemeScript aplica el tema guardado antes de React', () => {
    localStorage.setItem('mi-clave', 'dark');
    new Function(getThemeScript('mi-clave'))();
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });
});

describe('ThemeToggle', () => {
  it('es un grupo de opciones que cambia el tema', async () => {
    const onChange = vi.fn();
    render(<ThemeToggle onChange={onChange} />);
    expect(screen.getByRole('radiogroup', { name: 'Tema' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Sistema' })).toBeChecked();

    await userEvent.click(screen.getByRole('radio', { name: 'Oscuro' }));
    expect(onChange).toHaveBeenCalledWith('dark');
    expect(screen.getByRole('radio', { name: 'Oscuro' })).toBeChecked();
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<ThemeToggle />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
