import * as RadixTabs from '@radix-ui/react-tabs';
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Tabs.css';

export interface TabItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<ComponentPropsWithoutRef<typeof RadixTabs.Root>, 'children'> {
  items: TabItem[];
  /** Nome da lista de abas para leitores de tela, como "Extrato". */
  label: string;
}

/** Abas com navegação por setas, Home e End, seguindo o padrão WAI-ARIA de tabs. */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs({ items, label, className, defaultValue, ...rest }, ref) {
  return (
    <RadixTabs.Root ref={ref} className={cx('jg-tabs', className)} defaultValue={defaultValue ?? items[0]?.value} {...rest}>
      <RadixTabs.List className="jg-tabs__list" aria-label={label}>
        {items.map((item) => (
          <RadixTabs.Trigger key={item.value} value={item.value} disabled={item.disabled} className="jg-tabs__trigger jg-focusable">
            {item.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {items.map((item) => (
        <RadixTabs.Content key={item.value} value={item.value} className="jg-tabs__panel jg-focusable">
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
});
