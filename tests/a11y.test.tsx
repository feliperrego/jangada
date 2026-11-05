import { composeStories, setProjectAnnotations } from '@storybook/react';
import { render, waitFor } from '@testing-library/react';
import axe from 'axe-core';
import type { ComponentType } from 'react';
import * as previewAnnotations from '../.storybook/preview';

setProjectAnnotations(previewAnnotations);

// Todas as stories passam pelo axe. color-contrast fica de fora porque o jsdom não calcula estilos;
// o contraste é coberto por tests/contrast.test.ts direto nos tokens.
const modules = import.meta.glob('../src/**/*.stories.tsx', { eager: true }) as Record<string, Parameters<typeof composeStories>[0]>;

const cases: Array<{ id: string; Story: ComponentType }> = Object.entries(modules).flatMap(([file, mod]) =>
  Object.entries(composeStories(mod)).map(([name, Story]) => ({
    id: `${file.split('/').at(-2)} › ${name}`,
    Story: Story as unknown as ComponentType,
  })),
);

export const storyCount = cases.length;

describe('axe em todas as stories', () => {
  it('encontra stories', () => {
    expect(cases.length).toBeGreaterThan(20);
  });

  it.each(cases)('$id: 0 violações', async ({ Story }) => {
    const { container } = render(<Story />);
    await waitFor(() => expect(container.firstChild).toBeTruthy());
    const results = await axe.run(document.body, {
      rules: { 'color-contrast': { enabled: false }, region: { enabled: false } },
    });
    const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
    expect(summary).toEqual([]);
  });
});
