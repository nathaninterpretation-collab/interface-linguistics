// Inlines the vendored parsers into the DropQuote template → public/dropquote.html
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const lib = f => readFileSync(join(here, 'lib', f), 'utf8');
const out = readFileSync(join(here, 'dropquote.template.html'), 'utf8')
  .replace('__PDFJS__', () => lib('pdf.min.js'))
  .replace('__PDFWORKER__', () => lib('pdf.worker.min.js'))
  .replace('__JSZIP__', () => lib('jszip.min.js'));
writeFileSync(join(here, '..', 'public', 'dropquote.html'), out);
console.log('dropquote.html built:', (out.length / 1024 / 1024).toFixed(2), 'MB');
