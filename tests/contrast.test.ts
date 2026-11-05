import { colors, contrastPairs } from '../src/tokens';
import { contrastRatio } from './contrast';

// O axe não mede contraste no jsdom, então o contraste é garantido aqui, direto nos tokens:
// todo par texto/fundo listado em tokens.json passa no WCAG AA (4,5:1),
// e todo par de elemento de interface (anel de foco, borda de campo) passa em 3:1.
type Theme = keyof typeof colors;
type ColorName = keyof (typeof colors)['light'];

const themes: Theme[] = ['light', 'dark'];

describe.each(themes)('contraste no tema %s', (theme) => {
  const palette = colors[theme] as Record<ColorName, string>;

  it.each(contrastPairs.text.map(([fg, bg]) => [fg, bg] as [ColorName, ColorName]))('texto %s sobre %s ≥ 4,5:1', (fg, bg) => {
    expect(contrastRatio(palette[fg], palette[bg])).toBeGreaterThanOrEqual(4.5);
  });

  it.each(contrastPairs.ui.map(([fg, bg]) => [fg, bg] as [ColorName, ColorName]))('interface %s sobre %s ≥ 3:1', (fg, bg) => {
    expect(contrastRatio(palette[fg], palette[bg])).toBeGreaterThanOrEqual(3);
  });
});
