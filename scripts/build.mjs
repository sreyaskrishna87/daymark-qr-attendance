import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const root = resolve(new URL('..', import.meta.url).pathname.replace(/^\//, ''));
const out = resolve(root, 'dist');
await rm(out, { recursive: true, force: true });
await mkdir(resolve(out, 'server'), { recursive: true });
await mkdir(resolve(out, '.openai'), { recursive: true });
await Promise.all([
  readFile(resolve(root, 'worker/index.js')).then(data => writeFile(resolve(out, 'server/index.js'), data)),
  readFile(resolve(root, '.openai/hosting.json')).then(data => writeFile(resolve(out, '.openai/hosting.json'), data)),
]);
console.log(`Built ${out}`);
