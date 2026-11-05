import { useId, type ReactNode } from 'react';

export interface FieldIds {
  controlId: string;
  descriptionId?: string;
  errorId?: string;
  /** Valor pronto para aria-describedby: ajuda e erro, nessa ordem. */
  describedBy?: string;
}

/**
 * Gera ids estáveis para ligar rótulo, ajuda e erro ao controle.
 * Usado por todos os campos para que leitores de tela anunciem as três partes.
 */
export function useFieldIds(id: string | undefined, hasDescription: boolean, hasError: boolean): FieldIds {
  const auto = useId();
  const controlId = id ?? `jg-${auto}`;
  const descriptionId = hasDescription ? `${controlId}-description` : undefined;
  const errorId = hasError ? `${controlId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
  return { controlId, descriptionId, errorId, describedBy };
}

export function FieldLabel({ htmlFor, required, children, id }: { htmlFor?: string; required?: boolean; children: ReactNode; id?: string }) {
  return (
    <label className="jg-field__label" htmlFor={htmlFor} id={id}>
      {children}
      {required && (
        <span className="jg-field__required" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

export function FieldDescription({ id, children }: { id?: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p className="jg-field__description" id={id}>
      {children}
    </p>
  );
}

export function FieldError({ id, children }: { id?: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p className="jg-field__error" id={id}>
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flex: 'none', marginTop: 2 }}>
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 4.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11.25" r="0.9" fill="currentColor" />
      </svg>
      <span>{children}</span>
    </p>
  );
}
