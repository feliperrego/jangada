# Jangada

Design system em React para produtos financeiros. Os tokens trazem tema claro e escuro, os componentes são acessíveis, e os testes medem a acessibilidade em vez de supor.

*React design system for fintech products: light/dark tokens, accessible components, and tests that measure accessibility instead of assuming it.*

**Storybook:** STORYBOOK_URL

| | |
|---|---|
| Stories testadas com axe | **34, com 0 violações** |
| Pares de cor texto/fundo checados (WCAG AA) | **19 pares × 2 temas = 38, todos passando** |
| Testes no total | **84** (axe, contraste e comportamento) |
| Tamanho publicado (JS + CSS, gzip) | **6,9 kB** (React e Radix ficam de fora) |

## O que tem

- **Tokens.** `tokens/tokens.json` é a fonte única. Ele tem as paletas (mar, areia, sol, coral, folha) e 21 cores semânticas com valor claro e escuro, além de tipografia, espaços, raios, sombras, durações e alturas de controle. O script `scripts/build-tokens.mjs` gera as variáveis CSS e as constantes TypeScript.
- **Componentes.** Button, TextField, Select, Checkbox, Switch, Tabs, Dialog e Badge.
- **Exemplo de produto.** Uma transferência PIX completa, montada só com os componentes. Ela valida os campos, mostra os erros ligados a cada um, pede confirmação num diálogo e usa um botão com estado de carregamento.

## Decisões

**Comportamento do Radix, visual e API próprios.** Diálogo, abas, seleção, checkbox e switch dependem de foco, teclado e ARIA, e isso é fácil de errar. Para esses cinco, a Jangada usa os primitivos do Radix e cuida do visual e da forma de usar. Button, TextField e Badge são feitos do zero, porque o HTML nativo já resolve o comportamento deles.

**Campos ligados por padrão.** TextField, Select, Checkbox e Switch passam pelo mesmo `useFieldIds`. Rótulo, ajuda e erro sempre entram em `aria-labelledby` e `aria-describedby`, e o erro marca `aria-invalid`. Quem usa o componente não precisa lembrar disso.

**Carregamento sem perder o foco.** O Button com `loading` continua focável. Ele marca `aria-busy`, anuncia `loadingLabel` por uma região `role="status"` e só ignora os cliques. Com `disabled`, o foco sumiria no meio do envio e o leitor de tela ficaria sem saber o que aconteceu.

**CSS puro com variáveis.** Os estilos usam o prefixo `jg-` e só consomem `var(--jg-*)`. O tema escuro troca as variáveis por `data-theme="dark"` ou segue `prefers-color-scheme`. Não há runtime de CSS-in-JS, e o pacote funciona com qualquer framework React.

**Contraste testado nos tokens.** O jsdom não calcula estilos, então a regra de contraste do axe não funciona nos testes. Em vez de desligar o assunto, `tokens.json` declara os pares que precisam passar: 4,5:1 para texto e 3:1 para bordas e anel de foco. `tests/contrast.test.ts` confere todos nos dois temas. Foi esse teste que pegou a cor `border-strong` abaixo de 3:1 na primeira versão.

## Testes

```bash
pnpm test        # axe em todas as stories, contraste dos tokens e comportamento
pnpm typecheck
pnpm build && pnpm size
```

- `tests/a11y.test.tsx` carrega todas as stories com `composeStories` e roda o axe em cada uma. Story nova entra no teste sozinha.
- `src/components/components.test.tsx` cobre o comportamento: teclado, ligação de rótulo e erro, carregamento, diálogo que devolve o foco.
- No Storybook, o addon de acessibilidade está configurado para falhar (`a11y.test: 'error'`).

## Usar

```bash
pnpm add @feliperrego/jangada
```

```tsx
import '@feliperrego/jangada/styles.css';
import { Button, TextField } from '@feliperrego/jangada';

export function Exemplo() {
  return (
    <div className="jg-root">
      <TextField label="Valor" prefix="R$" inputMode="decimal" />
      <Button>Transferir</Button>
    </div>
  );
}
```

## Rodar localmente

```bash
pnpm install
pnpm dev               # Storybook em localhost:6006
pnpm build-storybook   # site estático em storybook-static/
```

## Próximos passos

- Combobox com busca, Toast e Tooltip.
- Teste visual de regressão nas stories.
- Atualizar para Storybook 10, Vite 8 e TypeScript 7.

## Stack

React 19, Radix UI, TypeScript, Vite (modo biblioteca), Storybook 8, Vitest, Testing Library e axe-core.

---

Feito por [Felipe Rêgo](https://feliperrego.com). Licença MIT.
