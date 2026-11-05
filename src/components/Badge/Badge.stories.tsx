import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Componentes/Badge',
  component: Badge,
  args: { children: 'Pago', tone: 'success', dot: true },
  argTypes: { tone: { control: 'inline-radio', options: ['neutral', 'primary', 'success', 'warning', 'danger'] } },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: 'Padrão' };

export const StatusDeFatura: Story = {
  name: 'Status de fatura',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge tone="neutral" dot>Aberta</Badge>
      <Badge tone="primary" dot>Fechada</Badge>
      <Badge tone="success" dot>Paga</Badge>
      <Badge tone="warning" dot>Vence hoje</Badge>
      <Badge tone="danger" dot>Atrasada</Badge>
    </div>
  ),
};
