import * as RadixSwitch from '@radix-ui/react-switch';
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { FieldDescription, useFieldIds } from '../Field/Field';
import './Switch.css';

export interface SwitchProps extends Omit<ComponentPropsWithoutRef<typeof RadixSwitch.Root>, 'children'> {
  label: ReactNode;
  description?: ReactNode;
}

/** Liga e desliga uma opção que vale na hora, sem precisar de um botão de salvar. */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { label, description, id, className, ...rest },
  ref,
) {
  const ids = useFieldIds(id, Boolean(description), false);
  return (
    <div className={cx('jg-switch', className)}>
      <div className="jg-switch__text">
        <label className="jg-switch__label" htmlFor={ids.controlId}>
          {label}
        </label>
        <FieldDescription id={ids.descriptionId}>{description}</FieldDescription>
      </div>
      <RadixSwitch.Root
        ref={ref}
        id={ids.controlId}
        className="jg-switch__track jg-focusable"
        aria-describedby={ids.describedBy}
        {...rest}
      >
        <RadixSwitch.Thumb className="jg-switch__thumb" />
      </RadixSwitch.Root>
    </div>
  );
});
