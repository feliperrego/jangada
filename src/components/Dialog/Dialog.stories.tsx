import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Dialog, DialogClose } from './Dialog';

const meta = {
  title: 'Componentes/Dialog',
  component: Dialog,
  args: {
    title: 'Confirmar transferência',
    description: 'Confira os dados antes de enviar. Transferências PIX não podem ser canceladas.',
    trigger: <Button>Revisar e enviar</Button>,
    children: (
      <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px', margin: 0 }}>
        <dt style={{ color: 'var(--jg-color-text-muted)' }}>Para</dt>
        <dd style={{ margin: 0 }}>Ana Souza · Banco Jangada</dd>
        <dt style={{ color: 'var(--jg-color-text-muted)' }}>Valor</dt>
        <dd style={{ margin: 0, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>R$ 150,00</dd>
      </dl>
    ),
    footer: (
      <>
        <DialogClose asChild>
          <Button variant="ghost">Voltar</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button>Enviar R$ 150,00</Button>
        </DialogClose>
      </>
    ),
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Confirmacao: Story = { name: 'Confirmação' };

export const Aberto: Story = {
  args: { defaultOpen: true },
  parameters: { docs: { story: { inline: false, height: '360px' } } },
};

export const Destrutivo: Story = {
  args: {
    title: 'Excluir chave PIX?',
    description: 'A chave ana@exemplo.com deixa de receber transferências. Você pode cadastrá-la de novo depois.',
    trigger: <Button variant="danger">Excluir chave</Button>,
    children: undefined,
    size: 'sm',
    footer: (
      <>
        <DialogClose asChild>
          <Button variant="ghost">Manter chave</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button variant="danger">Excluir</Button>
        </DialogClose>
      </>
    ),
  },
};
