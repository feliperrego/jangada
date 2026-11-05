import * as RadixSelect from '@radix-ui/react-select';
import { forwardRef, useId, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { FieldDescription, FieldError, FieldLabel, useFieldIds } from '../Field/Field';
import './Select.css';

export interface SelectOption {
  value: string;
  label: ReactNode;
  /** Texto menor ao lado do rótulo, como o saldo de uma conta. */
  hint?: ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  label: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  { label, options, placeholder = 'Selecione', description, error, required, disabled, id, className, ...rootProps },
  ref,
) {
  const ids = useFieldIds(id, Boolean(description), Boolean(error));
  const labelId = `${useId()}-label`;
  return (
    <div className={cx('jg-field', className)}>
      <FieldLabel htmlFor={ids.controlId} id={labelId} required={required}>
        {label}
      </FieldLabel>
      <RadixSelect.Root disabled={disabled} required={required} {...rootProps}>
        <RadixSelect.Trigger
          ref={ref}
          id={ids.controlId}
          className={cx('jg-select__trigger', 'jg-focusable', Boolean(error) && 'jg-select__trigger--invalid')}
          aria-labelledby={labelId}
          aria-describedby={ids.describedBy}
          aria-invalid={error ? true : undefined}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className="jg-select__chevron">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className="jg-select__content" position="popper" sideOffset={6}>
            <RadixSelect.Viewport className="jg-select__viewport">
              {options.map((option) => (
                <RadixSelect.Item key={option.value} value={option.value} disabled={option.disabled} className="jg-select__item">
                  <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  {option.hint && <span className="jg-select__hint">{option.hint}</span>}
                  <RadixSelect.ItemIndicator className="jg-select__check">
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
      <FieldDescription id={ids.descriptionId}>{description}</FieldDescription>
      <FieldError id={ids.errorId}>{error}</FieldError>
    </div>
  );
});
