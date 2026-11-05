import type { Preview } from '@storybook/react';
import '../src/styles/tokens.css';
import '../src/styles/base.css';

// Páginas só de MDX (como a Introdução) não passam pelo decorador. Sem isto, o tema escuro do
// sistema operacional entrava sozinho nelas, mesmo com "Claro" escolhido na barra de ferramentas.
document.documentElement.setAttribute('data-theme', 'light');

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
