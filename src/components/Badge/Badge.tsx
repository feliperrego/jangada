import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Badge.css';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** Mostra um ponto antes do texto, útil para status como "Pago" ou "Atrasado". */
  dot?: boolean;
}

/** Rótulo curto de status. A cor nunca é a única pista: o texto sempre diz o estado. */
export function Badge({ tone = 'neutral', dot, className, children, ...rest }: BadgeProps) {
  return (
    <span className={cx('jg-badge', `jg-badge--${tone}`, className)} {...rest}>
      {dot && <span className="jg-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
