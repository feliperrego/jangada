import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { FieldDescription, FieldError, FieldLabel, useFieldIds } from '../Field/Field';
import './TextField.css';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label: string;
  /** Texto de ajuda abaixo do campo, ligado por aria-describedby. */
  description?: ReactNode;
  /** Mensagem de erro. Quando presente, o campo fica com aria-invalid. */
  error?: ReactNode;
  /** Conteúdo fixo antes do valor, como "R$". */
  prefix?: ReactNode;
  /** Conteúdo fixo depois do valor, como "%". */
  suffix?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, description, error, prefix, suffix, size = 'md', id, required, className, disabled, ...rest },
  ref,
) {
  const ids = useFieldIds(id, Boolean(description), Boolean(error));
  // Prefixo e sufixo ("R$", "%") também entram na descrição, para o leitor de tela anunciar a unidade.
  const prefixId = prefix ? `${ids.controlId}-prefix` : undefined;
  const suffixId = suffix ? `${ids.controlId}-suffix` : undefined;
  const describedBy = [prefixId, suffixId, ids.describedBy].filter(Boolean).join(' ') || undefined;
  return (
    <div className={cx('jg-field', className)}>
      <FieldLabel htmlFor={ids.controlId} required={required}>
        {label}
      </FieldLabel>
      <div
        className={cx(
          'jg-textfield',
          'jg-focus-within',
          `jg-textfield--${size}`,
          Boolean(error) && 'jg-textfield--invalid',
          disabled && 'jg-textfield--disabled',
        )}
      >
        {prefix && (
          <span className="jg-textfield__affix" id={prefixId}>
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          id={ids.controlId}
          className="jg-textfield__input"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          required={required}
          disabled={disabled}
          {...rest}
        />
        {suffix && (
          <span className="jg-textfield__affix" id={suffixId}>
            {suffix}
          </span>
        )}
      </div>
      <FieldDescription id={ids.descriptionId}>{description}</FieldDescription>
      <FieldError id={ids.errorId}>{error}</FieldError>
    </div>
  );
});
