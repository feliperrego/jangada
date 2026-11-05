// Gera src/styles/tokens.css e src/tokens.ts a partir de tokens/tokens.json.
// Tema claro em :root, escuro em [data-theme="dark"] e também em
// prefers-color-scheme: dark quando nenhum data-theme foi definido.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const t = JSON.parse(readFileSync(resolve(root, 'tokens/tokens.json'), 'utf8'));

export function resolveColor(ref) {
  if (ref.startsWith('#') || ref.startsWith('rgb')) return ref;
  const [group, step] = ref.split('.');
  const value = t.palette[group]?.[step];
  if (!value) throw new Error(`Token de cor desconhecido: ${ref}`);
  return value;
}

export function semanticColors(theme) {
  return Object.fromEntries(Object.entries(t.color).map(([k, v]) => [k, resolveColor(v[theme])]));
}

const scale = (prefix, obj) => Object.entries(obj).map(([k, v]) => `  --jg-${prefix}-${k}: ${v};`);
const colorVars = (theme) => Object.entries(semanticColors(theme)).map(([k, v]) => `  --jg-color-${k}: ${v};`);

const css = [
  '/* Gerado por scripts/build-tokens.mjs a partir de tokens/tokens.json. Não edite à mão. */',
  ':root {',
  '  color-scheme: light;',
  ...colorVars('light'),
  `  --jg-font-sans: ${t.font.sans};`,
  `  --jg-font-mono: ${t.font.mono};`,
  ...scale('font-size', t['font-size']),
  ...scale('font-weight', t['font-weight']),
  ...scale('line-height', t['line-height']),
  ...scale('space', t.space),
  ...scale('radius', t.radius),
  ...scale('shadow', t.shadow),
  ...scale('duration', t.duration),
  ...scale('easing', t.easing),
  ...scale('control-height', t['control-height']),
  '}',
  '',
  '@media (prefers-color-scheme: dark) {',
  '  :root:not([data-theme="light"]) {',
  '    color-scheme: dark;',
  ...colorVars('dark').map((l) => '  ' + l),
  '  }',
  '}',
  '',
  '[data-theme="dark"] {',
  '  color-scheme: dark;',
  ...colorVars('dark'),
  '}',
  '',
  '@media (prefers-reduced-motion: reduce) {',
  '  :root { --jg-duration-fast: 0ms; --jg-duration-base: 0ms; }',
  '}',
  '',
].join('\n');

const ts = [
  '// Gerado por scripts/build-tokens.mjs a partir de tokens/tokens.json. Não edite à mão.',
  `export const colors = ${JSON.stringify({ light: semanticColors('light'), dark: semanticColors('dark') }, null, 2)} as const;`,
  `export const space = ${JSON.stringify(t.space, null, 2)} as const;`,
  `export const radius = ${JSON.stringify(t.radius, null, 2)} as const;`,
  `export const fontSize = ${JSON.stringify(t['font-size'], null, 2)} as const;`,
  `export const contrastPairs = ${JSON.stringify(t.contrast, null, 2)} as const;`,
  '',
].join('\n');

mkdirSync(resolve(root, 'src/styles'), { recursive: true });
writeFileSync(resolve(root, 'src/styles/tokens.css'), css);
writeFileSync(resolve(root, 'src/tokens.ts'), ts);
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  console.log(`tokens: ${Object.keys(t.color).length} cores semânticas × 2 temas`);
}
