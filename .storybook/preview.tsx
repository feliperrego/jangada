import type { Preview } from '@storybook/react';
import '../src/styles/tokens.css';
import '../src/styles/base.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Tema',
      defaultValue: 'light',
      toolbar: {
        title: 'Tema',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Claro' },
          { value: 'dark', title: 'Escuro' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'light';
      document.documentElement.setAttribute('data-theme', theme);
      return (
        <div className="jg-root" style={{ padding: '1.5rem', minHeight: '100%' }}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    a11y: { test: 'error' },
    options: { storySort: { order: ['Introdução', 'Fundamentos', 'Componentes', 'Exemplos'] } },
  },
  tags: ['autodocs'],
};

export default preview;
