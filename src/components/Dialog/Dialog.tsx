import * as RadixDialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Dialog.css';

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Elemento que abre o diálogo, normalmente um Button. */
  trigger?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** Ações no rodapé, como Cancelar e Confirmar. */
  footer?: ReactNode;
  size?: 'sm' | 'md';
  /** Texto do botão de fechar para leitores de tela. */
  closeLabel?: string;
}

/**
 * Diálogo modal: prende o foco, fecha com Esc e devolve o foco a quem abriu.
 * Use para confirmações que pedem atenção, como "Confirmar transferência".
 */
export function Dialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeLabel = 'Fechar',
}: DialogProps) {
  return (
    <RadixDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="jg-dialog__overlay" />
        <RadixDialog.Content
          className={cx('jg-dialog', `jg-dialog--${size}`)}
          // Sem descrição, o Radix avisa no console; deixamos explícito que não há.
          {...(description ? {} : { 'aria-describedby': undefined })}
        >
          <header className="jg-dialog__header">
            <RadixDialog.Title className="jg-dialog__title">{title}</RadixDialog.Title>
            <RadixDialog.Close className="jg-dialog__close jg-focusable" aria-label={closeLabel}>
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </RadixDialog.Close>
          </header>
          {description && <RadixDialog.Description className="jg-dialog__description">{description}</RadixDialog.Description>}
          {children && <div className="jg-dialog__body">{children}</div>}
          {footer && <footer className="jg-dialog__footer">{footer}</footer>}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

/** Envolve um botão para que ele feche o diálogo ao ser clicado. */
export const DialogClose = RadixDialog.Close;
