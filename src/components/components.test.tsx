import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Badge, Button, Checkbox, Dialog, DialogClose, Select, Switch, Tabs, TextField } from '../index';

describe('Button', () => {
  it('chama onClick e usa type="button" por padrão', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Transferir</Button>);
    const button = screen.getByRole('button', { name: 'Transferir' });
    expect(button).toHaveAttribute('type', 'button');
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('carregando: anuncia o estado, continua focável e ignora cliques', async () => {
    const onClick = vi.fn();
    render(
      <Button loading loadingLabel="Enviando" onClick={onClick}>
        Transferir
      </Button>,
    );
    const button = screen.getByRole('button', { name: /Transferir/ });
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).not.toBeDisabled();
    expect(screen.getByRole('status')).toHaveTextContent('Enviando');
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('TextField', () => {
  it('liga rótulo, prefixo, ajuda e erro ao campo', () => {
    render(<TextField label="Valor" prefix="R$" description="Limite de R$ 5.000,00" error="Valor acima do limite" />);
    const input = screen.getByLabelText('Valor');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('R$ Limite de R$ 5.000,00 Valor acima do limite');
  });

  it('marca obrigatório sem ler o asterisco', () => {
    render(<TextField label="CPF" required />);
    expect(screen.getByRole('textbox', { name: 'CPF' })).toBeRequired();
  });
});

describe('Checkbox', () => {
  it('alterna ao clicar no rótulo', async () => {
    render(<Checkbox label="Salvar como favorito" />);
    const box = screen.getByRole('checkbox', { name: 'Salvar como favorito' });
    expect(box).not.toBeChecked();
    await userEvent.click(screen.getByText('Salvar como favorito'));
    expect(box).toBeChecked();
  });

  it('expõe o estado indeterminado', () => {
    render(<Checkbox label="Todas" checked="indeterminate" />);
    expect(screen.getByRole('checkbox', { name: 'Todas' })).toHaveAttribute('aria-checked', 'mixed');
  });
});

describe('Switch', () => {
  it('liga com a barra de espaço', async () => {
    render(<Switch label="PIX noturno" />);
    const sw = screen.getByRole('switch', { name: 'PIX noturno' });
    sw.focus();
    await userEvent.keyboard(' ');
    expect(sw).toBeChecked();
  });
});

describe('Select', () => {
  it('abre, escolhe uma opção e mostra o valor', async () => {
    function Controlled() {
      const [value, setValue] = useState<string>();
      return (
        <Select
          label="Conta de origem"
          value={value}
          onValueChange={setValue}
          options={[
            { value: 'corrente', label: 'Conta corrente' },
            { value: 'poupanca', label: 'Poupança' },
          ]}
        />
      );
    }
    render(<Controlled />);
    const trigger = screen.getByRole('combobox', { name: 'Conta de origem' });
    await userEvent.click(trigger);
    await userEvent.click(await screen.findByRole('option', { name: 'Poupança' }));
    expect(trigger).toHaveTextContent('Poupança');
  });
});

describe('Tabs', () => {
  it('troca de aba com as setas do teclado', async () => {
    render(
      <Tabs
        label="Extrato"
        items={[
          { value: 'a', label: 'Entradas', content: 'Lista de entradas' },
          { value: 'b', label: 'Saídas', content: 'Lista de saídas' },
        ]}
      />,
    );
    const first = screen.getByRole('tab', { name: 'Entradas' });
    first.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Saídas' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Lista de saídas');
  });
});

describe('Dialog', () => {
  it('abre com título acessível, fecha com Esc e devolve o foco ao botão', async () => {
    render(
      <Dialog
        title="Confirmar transferência"
        description="Confira os dados."
        trigger={<Button>Revisar</Button>}
        footer={
          <DialogClose asChild>
            <Button>Enviar</Button>
          </DialogClose>
        }
      />,
    );
    const trigger = screen.getByRole('button', { name: 'Revisar' });
    await userEvent.click(trigger);
    const dialog = await screen.findByRole('dialog', { name: 'Confirmar transferência' });
    expect(dialog).toHaveAccessibleDescription('Confira os dados.');
    expect(within(dialog).getByRole('button', { name: 'Fechar' })).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});

describe('Badge', () => {
  it('mostra o status em texto, não só em cor', () => {
    render(<Badge tone="danger" dot>Atrasada</Badge>);
    expect(screen.getByText('Atrasada')).toBeInTheDocument();
  });
});
