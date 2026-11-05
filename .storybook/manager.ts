import { addons } from 'storybook/internal/manager-api';
import { create } from 'storybook/internal/theming';
import { colors } from '../src/tokens';

const c = colors.light;

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Jangada · design system',
    brandUrl: 'https://github.com/feliperrego/jangada',
    brandTarget: '_blank',
    colorPrimary: c.primary,
    colorSecondary: c.primary,
    appBg: c['surface-sunken'],
    appContentBg: c.bg,
    appPreviewBg: c.bg,
    appBorderColor: c.border,
    appBorderRadius: 8,
    textColor: c.text,
    textMutedColor: c['text-muted'],
    barBg: c.surface,
    barTextColor: c['text-muted'],
    barSelectedColor: c.primary,
    barHoverColor: c.primary,
    inputBg: c.surface,
    inputBorder: c['border-strong'],
    inputTextColor: c.text,
    fontBase: '"Instrument Sans", system-ui, sans-serif',
    fontCode: '"JetBrains Mono", ui-monospace, monospace',
  }),
});
