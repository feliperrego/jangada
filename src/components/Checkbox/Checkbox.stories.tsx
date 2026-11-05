import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Componentes/Checkbox',
  component: Checkbox,
  args: { label: 'Salvar como contato favorito' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: 'Padrão' };
export const Marcado: Story = { args: { defaultChecked: true } };
export const Indeterminado: Story = { args: { label: 'Selecionar todas as faturas', checked: 'indeterminate' } };
export const ComAjuda: Story = {
  name: 'Com ajuda',
  args: { label: 'Agendar para todo mês', description: 'A transferência se repete no mesmo dia, até você cancelar.' },
};
export const ComErro: Story = {
  name: 'Com erro',
  args: { label: 'Li e aceito os termos da conta', required: true, error: 'Aceite os termos para abrir a conta.' },
};
export const Desabilitado: Story = { args: { disabled: true, defaultChecked: true } };
