import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta = {
  title: 'Componentes/Button',
  component: Button,
  args: { children: 'Transferir', onClick: fn() },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primario: Story = { name: 'Primário' };

export const Variantes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button {...args} variant="primary">Transferir</Button>
      <Button {...args} variant="secondary">Ver extrato</Button>
      <Button {...args} variant="ghost">Cancelar</Button>
      <Button {...args} variant="danger">Excluir chave PIX</Button>
    </div>
  ),
};

export const Tamanhos: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button {...args} size="sm">Pequeno</Button>
      <Button {...args} size="md">Médio</Button>
      <Button {...args} size="lg">Grande</Button>
    </div>
  ),
};

export const ComIcone: Story = { name: 'Com ícone', args: { children: 'Continuar', iconEnd: <ArrowIcon /> } };

export const Carregando: Story = {
  args: { loading: true, loadingLabel: 'Enviando transferência' },
  parameters: { docs: { description: { story: 'Mantém a largura, continua focável e ignora cliques. O leitor de tela anuncia o `loadingLabel`.' } } },
};

export const Desabilitado: Story = { args: { disabled: true } };
