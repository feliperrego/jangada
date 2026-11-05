import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Mostra um indicador de carregamento, mantém a largura e bloqueia novos cliques. */
  loading?: boolean;
  /** Texto anunciado por leitores de tela enquanto carrega. */
  loadingLabel?: string;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    loadingLabel = 'Carregando',
    iconStart,
    iconEnd,
    fullWidth,
    disabled,
    className,
    children,
    type = 'button',
    onClick,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        'jg-button',
        'jg-focusable',
        `jg-button--${variant}`,
        `jg-button--${size}`,
        loading && 'jg-button--loading',
        fullWidth && 'jg-button--full',
        className,
      )}
      // Enquanto carrega o botão continua focável (o foco não "pula"), mas não aceita cliques.
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      onClick={(event) => {
        if (loading) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
      {...rest}
    >
      <span className="jg-button__content">
        {iconStart && (
          <span className="jg-button__icon" aria-hidden="true">
            {iconStart}
          </span>
        )}
        {children}
        {iconEnd && (
          <span className="jg-button__icon" aria-hidden="true">
            {iconEnd}
          </span>
        )}
      </span>
      {loading && (
        <span className="jg-button__spinner" role="status">
          <span className="jg-visually-hidden">{loadingLabel}</span>
        </span>
      )}
    </button>
  );
});
