// Regenerates docs/themes/*.svg and docs/THEMES.md from examples/. Run with `npm run docs`.
import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {render, type Profile} from '../src/card.ts';
import {PRESET_NAMES} from '../src/themes.ts';

const profile: Profile = JSON.parse(readFileSync('examples/profile.json', 'utf8'));
const ascii = readFileSync('examples/logo.txt', 'utf8');

mkdirSync('docs/themes', {recursive: true});
let markdown = `# Themes

Every preset, rendered with the example profile. Pick one per mode with \`theme\`; see the [README](../README.md#themes) for the full options.

Regenerate this page with \`npm run docs\`.
`;

for (const name of PRESET_NAMES) {
  // The preset is drawn in the "dark" slot; the slot only decides which preset is used.
  writeFileSync(`docs/themes/${name}.svg`, render({...profile, theme: {dark: name}}, ascii, 'dark'));
  markdown += `
## ${name}

\`\`\`json
{ "theme": { "dark": "${name}" } }
\`\`\`

<img src="themes/${name}.svg" alt="Example card in the ${name} preset" width="1000">
`;
}
writeFileSync('docs/THEMES.md', markdown);
console.log(`Wrote ${PRESET_NAMES.length} theme previews and docs/THEMES.md`);
