import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
// React, React DOM e os primitivos do Radix ficam de fora do bundle: o app que usa a Jangada já os instala.
const external = [...Object.keys(pkg.peerDependencies ?? {}), ...Object.keys(pkg.dependencies ?? {}), 'react/jsx-runtime'];

export default defineConfig({
  plugins: [
    react(),
    dts({ include: ['src'], exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx'], rollupTypes: true }),
  ],
  build: {
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: () => 'index.js', cssFileName: 'jangada' },
    rollupOptions: { external: (id) => external.some((dep) => id === dep || id.startsWith(`${dep}/`)) },
    sourcemap: true,
  },
});
