import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const contas = [
  { value: 'corrente', label: 'Conta corrente', hint: 'R$ 3.240,18' },
  { value: 'poupanca', label: 'Poupança', hint: 'R$ 12.905,00' },
  { value: 'investimentos', label: 'Investimentos', hint: 'Resgate em D+1', disabled: true },
];

const meta = {
  title: 'Componentes/Select',
  component: Select,
  args: { label: 'Conta de origem', options: contas, placeholder: 'Escolha a conta' },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: 'Padrão' };
export const ComValor: Story = { name: 'Com valor', args: { defaultValue: 'corrente' } };
export const ComAjuda: Story = { name: 'Com ajuda', args: { description: 'O valor sai desta conta na hora da confirmação.' } };
export const ComErro: Story = { name: 'Com erro', args: { required: true, error: 'Escolha de qual conta o dinheiro vai sair.' } };
export const Desabilitado: Story = { args: { disabled: true, defaultValue: 'poupanca' } };
