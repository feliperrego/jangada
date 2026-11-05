import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../Badge/Badge';
import { Tabs } from './Tabs';

const Lista = ({ itens }: { itens: Array<[string, string, string]> }) => (
  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 12 }}>
    {itens.map(([desc, valor, data]) => (
      <li key={desc + data} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, fontSize: 14 }}>
        <span>
          {desc}
          <br />
          <span style={{ color: 'var(--jg-color-text-muted)' }}>{data}</span>
        </span>
        <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{valor}</span>
      </li>
    ))}
  </ul>
);

const meta = {
  title: 'Componentes/Tabs',
  component: Tabs,
  args: {
    label: 'Extrato',
    items: [
      { value: 'tudo', label: 'Tudo', content: <Lista itens={[['PIX recebido · Ana Souza', '+ R$ 150,00', '04/11'], ['Mercado Pague Menos', '− R$ 86,40', '03/11']]} /> },
      { value: 'entradas', label: 'Entradas', content: <Lista itens={[['PIX recebido · Ana Souza', '+ R$ 150,00', '04/11']]} /> },
      { value: 'saidas', label: 'Saídas', content: <Lista itens={[['Mercado Pague Menos', '− R$ 86,40', '03/11']]} /> },
      { value: 'futuro', label: <>Futuros <Badge tone="primary">2</Badge></>, content: <Lista itens={[['Fatura do cartão', '− R$ 1.204,77', '10/11']]} /> },
    ],
  },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Extrato: Story = {};
