import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta = {
  title: 'Componentes/TextField',
  component: TextField,
  args: { label: 'Nome completo', placeholder: 'Como está no documento' },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: 'Padrão' };

export const ComAjuda: Story = {
  name: 'Com ajuda',
  args: { label: 'CPF', placeholder: '000.000.000-00', inputMode: 'numeric', description: 'Só números. Usamos para confirmar a titularidade.' },
};

export const Valor: Story = {
  args: { label: 'Valor da transferência', prefix: 'R$', placeholder: '0,00', inputMode: 'decimal', description: 'Limite disponível hoje: R$ 5.000,00' },
};

export const ComErro: Story = {
  name: 'Com erro',
  args: { label: 'Valor da transferência', prefix: 'R$', defaultValue: '7.500,00', error: 'O valor passa do limite disponível hoje (R$ 5.000,00).', required: true },
};

export const ComSufixo: Story = { name: 'Com sufixo', args: { label: 'Taxa de juros', suffix: '% a.m.', defaultValue: '1,89', inputMode: 'decimal' } };

export const Desabilitado: Story = { args: { label: 'Banco', defaultValue: 'Banco Jangada S.A.', disabled: true } };
