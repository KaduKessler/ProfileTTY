import {readFile, mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {render, validate, escapeXml, type Profile} from './card.ts';

const THEMES = ['dark', 'light'] as const;

async function readText(file: string, what: string, shown = file, hint = ''): Promise<string> {
  try {
    return await readFile(file, 'utf8');
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    throw new Error(`Cannot read ${what} "${shown}"${hint}${code === 'ENOENT' ? ': file not found' : `: ${code ?? error}`}`);
  }
}

async function loadProfile(file: string): Promise<{profile: Profile; ascii: string}> {
  let input: unknown;
  try {
    input = JSON.parse(await readText(file, 'profile'));
  } catch (error) {
    if (error instanceof SyntaxError) throw new Error(`"${file}" is not valid JSON: ${error.message}`);
    throw error;
  }
  try {
    validate(input);
  } catch (error) {
    throw new Error(`"${file}" has an invalid profile. ${error instanceof Error ? error.message : error}`);
  }
  const asciiPath = path.resolve(path.dirname(file), input.ascii);
  const where = ` (the "ascii" path is relative to the profile JSON; looked in ${path.dirname(asciiPath)})`;
  const ascii = await readText(asciiPath, 'ASCII file', input.ascii, where);
  return {profile: input, ascii};
}

function pictureMarkup(profile: Profile): string {
  const alt = escapeXml(`${profile.heading} profile card`);
  return `<picture>
  <source media="(prefers-color-scheme: dark)" srcset="profile-dark.svg">
  <img src="profile-light.svg" alt="${alt}" width="1000">
</picture>
`;
}

async function main(): Promise<void> {
  const [file, destination] = process.argv.slice(2);
  if (!file || !destination) {
    console.error('Usage: npm run card -- <profile.json> <output-directory>\n   or: node src/cli.ts <profile.json> <output-directory>');
    process.exit(1);
  }
  const {profile, ascii} = await loadProfile(file);
  await mkdir(destination, {recursive: true});
  for (const theme of THEMES) {
    await writeFile(path.join(destination, `profile-${theme}.svg`), render(profile, ascii, theme));
  }
  await writeFile(path.join(destination, 'README.md'), pictureMarkup(profile));
  console.log(`Generated ${THEMES.length} SVGs and README in ${destination}`);
}

try {
  await main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
