// Mede o tamanho do pacote publicado (sem React e Radix, que ficam de fora do bundle).
import { readFileSync, existsSync } from 'node:fs';
import { gzipSync, brotliCompressSync } from 'node:zlib';

const files = ['dist/index.js', 'dist/jangada.css'];
let totalGz = 0;
for (const f of files) {
  if (!existsSync(f)) throw new Error(`Rode pnpm build antes: ${f} não existe.`);
  const buf = readFileSync(f);
  const gz = gzipSync(buf, { level: 9 }).length;
  const br = brotliCompressSync(buf).length;
  totalGz += gz;
  console.log(`${f.padEnd(18)} ${(buf.length / 1024).toFixed(1).padStart(6)} kB   gzip ${(gz / 1024).toFixed(2)} kB   brotli ${(br / 1024).toFixed(2)} kB`);
}
console.log(`total gzip: ${(totalGz / 1024).toFixed(2)} kB`);
