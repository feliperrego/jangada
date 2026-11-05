import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta = {
  title: 'Componentes/Switch',
  component: Switch,
  args: { label: 'Notificações de compras no cartão' },
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: 'Padrão' };
export const Ligado: Story = { args: { defaultChecked: true } };
export const ComAjuda: Story = {
  name: 'Com ajuda',
  args: { label: 'PIX noturno', description: 'Entre 20h e 6h, transferências PIX ficam limitadas a R$ 1.000,00.', defaultChecked: true },
};
export const Desabilitado: Story = { args: { disabled: true } };
