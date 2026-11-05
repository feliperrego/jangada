import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  docs: { autodocs: 'tag' },
  staticDirs: ['./public'],
  core: { disableTelemetry: true },
  // O vite.config.ts é do build da biblioteca; aqui não precisa gerar .d.ts nem empacotar como lib.
  viteFinal: async (cfg) => {
    cfg.plugins = (cfg.plugins ?? []).flat().filter((p) => !(p && typeof p === 'object' && 'name' in p && p.name === 'vite:dts'));
    if (cfg.build) delete cfg.build.lib;
    return cfg;
  },
};

export default config;
