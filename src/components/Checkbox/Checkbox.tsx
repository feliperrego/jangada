import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { FieldDescription, FieldError, useFieldIds } from '../Field/Field';
import './Checkbox.css';

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<typeof RadixCheckbox.Root>, 'children'> {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { label, description, error, id, className, ...rest },
  ref,
) {
  const ids = useFieldIds(id, Boolean(description), Boolean(error));
  return (
    <div className={cx('jg-check', className)}>
      <RadixCheckbox.Root
        ref={ref}
        id={ids.controlId}
        className="jg-check__box jg-focusable"
        aria-describedby={ids.describedBy}
        aria-invalid={error ? true : undefined}
        {...rest}
      >
        <RadixCheckbox.Indicator className="jg-check__indicator">
          <svg className="jg-check__icon-checked" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="jg-check__icon-indeterminate" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <div className="jg-check__text">
        <label className="jg-check__label" htmlFor={ids.controlId}>
          {label}
        </label>
        <FieldDescription id={ids.descriptionId}>{description}</FieldDescription>
        <FieldError id={ids.errorId}>{error}</FieldError>
      </div>
    </div>
  );
});
