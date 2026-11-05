import type { Meta, StoryObj } from '@storybook/react';
import { useState, type FormEvent } from 'react';
import { Badge, Button, Checkbox, Dialog, DialogClose, Select, TextField } from '../index';

const contas = [
  { value: 'corrente', label: 'Conta corrente', hint: 'R$ 3.240,18', saldo: 3240.18 },
  { value: 'poupanca', label: 'Poupança', hint: 'R$ 12.905,00', saldo: 12905 },
];

const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const parseValor = (s: string) => Number(s.replace(/\./g, '').replace(',', '.'));

function TransferenciaPix() {
  const [conta, setConta] = useState<string>();
  const [chave, setChave] = useState('');
  const [valor, setValor] = useState('');
  const [erros, setErros] = useState<Record<string, string>>({});
  const [confirmar, setConfirmar] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const saldo = contas.find((c) => c.value === conta)?.saldo;

  function revisar(e: FormEvent) {
    e.preventDefault();
    const novos: Record<string, string> = {};
    if (!conta) novos.conta = 'Escolha de qual conta o dinheiro vai sair.';
    if (!chave.trim()) novos.chave = 'Informe a chave PIX de quem vai receber.';
    const v = parseValor(valor);
    if (!valor || Number.isNaN(v) || v <= 0) novos.valor = 'Informe um valor maior que zero.';
    else if (saldo !== undefined && v > saldo) novos.valor = `O valor passa do saldo da conta (${brl(saldo)}).`;
    setErros(novos);
    if (Object.keys(novos).length === 0) setConfirmar(true);
  }

  function enviar() {
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      setConfirmar(false);
      setEnviado(true);
    }, 900);
  }

  return (
    <form
      onSubmit={revisar}
      noValidate
      style={{
        maxWidth: 420,
        display: 'grid',
        gap: 20,
        padding: 24,
        background: 'var(--jg-color-surface)',
        border: '1px solid var(--jg-color-border)',
        borderRadius: 'var(--jg-radius-lg)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <h2 style={{ margin: 0, fontSize: 20 }}>Transferir com PIX</h2>
        {enviado && <Badge tone="success" dot>Enviado</Badge>}
      </div>
      <Select label="Conta de origem" options={contas} value={conta} onValueChange={setConta} error={erros.conta} required />
      <TextField label="Chave PIX" placeholder="CPF, e-mail, celular ou chave aleatória" value={chave} onChange={(e) => setChave(e.target.value)} error={erros.chave} required />
      <TextField
        label="Valor"
        prefix="R$"
        placeholder="0,00"
        inputMode="decimal"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        description={saldo !== undefined ? `Saldo disponível: ${brl(saldo)}` : undefined}
        error={erros.valor}
        required
      />
      <Checkbox label="Salvar como contato favorito" />
      <Button type="submit" size="lg" fullWidth>
        Revisar transferência
      </Button>
      <Dialog
        open={confirmar}
        onOpenChange={setConfirmar}
        title="Confirmar transferência"
        description="Transferências PIX caem na hora e não podem ser canceladas."
        footer={
          <>
            <DialogClose asChild>
              <Button variant="ghost">Voltar</Button>
            </DialogClose>
            <Button onClick={enviar} loading={enviando} loadingLabel="Enviando transferência">
              Enviar {valor && !Number.isNaN(parseValor(valor)) ? brl(parseValor(valor)) : ''}
            </Button>
          </>
        }
      >
        <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px', margin: 0 }}>
          <dt style={{ color: 'var(--jg-color-text-muted)' }}>Para</dt>
          <dd style={{ margin: 0, overflowWrap: 'anywhere' }}>{chave}</dd>
          <dt style={{ color: 'var(--jg-color-text-muted)' }}>De</dt>
          <dd style={{ margin: 0 }}>{contas.find((c) => c.value === conta)?.label}</dd>
        </dl>
      </Dialog>
    </form>
  );
}

const meta = {
  title: 'Exemplos/Transferência PIX',
  component: TransferenciaPix,
  parameters: {
    docs: {
      description: {
        component:
          'Fluxo completo montado só com componentes da Jangada: validação com mensagens ligadas a cada campo, confirmação em diálogo e botão com estado de carregamento.',
      },
    },
  },
} satisfies Meta<typeof TransferenciaPix>;

export default meta;
export const Fluxo: StoryObj<typeof meta> = {};
