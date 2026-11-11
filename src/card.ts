import {readFileSync} from 'node:fs';

export interface Field { label: string; value: string }
export interface Group { name: string; fields: Field[] }
export interface Profile {
  heading: string;
  ascii: string;
  groups: Group[];
  palette?: boolean;
  prompt?: boolean;
  leaders?: boolean;
  command?: string;
}

export type Theme = 'dark' | 'light';

// Input limits (documented in the README).
const LIMITS = {
  heading: 40,
  command: 30,
  groups: 8,
  groupName: 30,
  fields: 12,
  label: 14,
  value: 240,
  asciiPath: 4096,
  asciiColumns: 180,
  asciiRows: 100
};

// Layout, in SVG pixels. `CHARS` is the width of the text column in characters.
const FONT_SIZE = 17;
const LINE_HEIGHT = 22;
const GROUP_GAP = 8;
const PALETTE_GAP = 6;
const CARD_WIDTH = 1000;
const TEXT_X = 390;
const CHARS = 56;
const PROMPT_X = 20;
const PROMPT_Y = 30;
const LOGO_X = 24;
const LOGO_WIDTH = 320;
const LOGO_TOP_WITH_PROMPT = 62;
const LOGO_TOP_NO_PROMPT = 28;
const CARD_RADIUS = 12;
const GLYPH_WIDTH = 0.6; // advance of Fira Code, as a fraction of the font size
const PALETTE_CELL_WIDTH = FONT_SIZE * GLYPH_WIDTH * 3;

// Colors follow GitHub Primer. `border` is empty when the card has no outline.
// Each palette has two rows of eight ANSI colors: normal, then bright.
const THEMES = {
  dark: {
    bg: '#151b23',
    dim: '#6e7681',
    border: '',
    fg: '#f0f6fc',
    accent: '#4493f8',
    palette: [
      ['#2f3742', '#ff7b72', '#3fb950', '#d29922', '#58a6ff', '#be8fff', '#39c5cf', '#f0f6fc'],
      ['#656c76', '#ffa198', '#56d364', '#e3b341', '#79c0ff', '#d2a8ff', '#56d4dd', '#ffffff']
    ]
  },
  light: {
    bg: '#ffffff',
    dim: '#8c959f',
    border: '#d1d9e0',
    fg: '#1f2328',
    accent: '#0550ae',
    palette: [
      ['#1f2328', '#cf222e', '#116329', '#4d2d00', '#0969da', '#8250df', '#1b7c83', '#59636e'],
      ['#393f46', '#a40e26', '#1a7f37', '#633c01', '#218bff', '#a475f9', '#3192aa', '#818b98']
    ]
  }
};

// Fira Code subsets are embedded so the card looks the same without installed fonts.
const fontFace = [400, 700]
  .map(weight => {
    const data = readFileSync(new URL(`./fonts/fira-code-${weight}.woff2`, import.meta.url)).toString('base64');
    return `@font-face{font-family:PTTY;font-weight:${weight};src:url(data:font/woff2;base64,${data}) format('woff2')}`;
  })
  .join('');

export function escapeXml(value: string): string {
  const entities: Record<string, string> = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'};
  return value.replace(/[&<>"']/g, char => entities[char]!);
}

function fail(path: string, rule: string): never {
  throw new Error(`${path}: ${rule}`);
}

function checkText(value: unknown, path: string, max: number, singleLine = false): void {
  if (typeof value !== 'string' || !value.trim()) fail(path, 'must be a nonempty string');
  if (value.length > max) fail(path, `must be at most ${max} characters (got ${value.length})`);
  if (singleLine && /[\r\n]/.test(value)) fail(path, 'must be a single line');
}

export function validate(input: unknown): asserts input is Profile {
  if (!input || typeof input !== 'object' || Array.isArray(input)) fail('profile', 'must be an object');
  const profile = input as Profile;

  checkText(profile.heading, 'heading', LIMITS.heading);
  checkText(profile.ascii, 'ascii', LIMITS.asciiPath);
  if (profile.command !== undefined) checkText(profile.command, 'command', LIMITS.command, true);
  for (const key of ['palette', 'prompt', 'leaders'] as const) {
    if (profile[key] !== undefined && typeof profile[key] !== 'boolean') fail(key, 'must be true or false');
  }

  const groups = profile.groups;
  if (!Array.isArray(groups) || !groups.length || groups.length > LIMITS.groups) {
    fail('groups', `must contain 1 to ${LIMITS.groups} groups`);
  }
  groups.forEach((group, g) => {
    const at = `groups[${g}]`;
    if (!group || typeof group !== 'object') fail(at, 'must be an object');
    checkText(group.name, `${at}.name`, LIMITS.groupName);
    if (!Array.isArray(group.fields) || !group.fields.length || group.fields.length > LIMITS.fields) {
      fail(`${at}.fields`, `must contain 1 to ${LIMITS.fields} fields`);
    }
    group.fields.forEach((field, f) => {
      const fieldAt = `${at}.fields[${f}]`;
      if (!field || typeof field !== 'object') fail(fieldAt, 'must be an object');
      checkText(field.label, `${fieldAt}.label`, LIMITS.label, true);
      checkText(field.value, `${fieldAt}.value`, LIMITS.value, true);
    });
  });
}

export function wrap(value: string, width: number): string[] {
  const result: string[] = [];
  let line = '';
  for (const word of value.split(/\s+/)) {
    if (line && line.length + word.length + 1 > width) {
      result.push(line);
      line = '';
    }
    let rest = word;
    while (rest.length > width) {
      if (line) {
        result.push(line);
        line = '';
      }
      result.push(rest.slice(0, width));
      rest = rest.slice(width);
    }
    line = line ? `${line} ${rest}` : rest;
  }
  if (line) result.push(line);
  return result;
}

function parseAscii(ascii: string): string[] {
  const lines = ascii.replace(/\r/g, '').replace(/\n+$/, '').split('\n');
  const columns = Math.max(...lines.map(line => line.length));
  if (!columns || columns > LIMITS.asciiColumns || lines.length > LIMITS.asciiRows || /[^\x20-\x7e\n\r]/.test(ascii)) {
    throw new Error(`ASCII must be printable, at most ${LIMITS.asciiColumns} columns and ${LIMITS.asciiRows} rows`);
  }
  return lines;
}

export function render(profile: Profile, ascii: string, theme: Theme): string {
  validate(profile);
  const lines = parseAscii(ascii);
  const colors = THEMES[theme];

  const text = (x: number, y: number, inner: string, fill = colors.fg, extra = '') =>
    `<text x="${x}" y="${y}" fill="${fill}" ${extra.includes('font-size') ? '' : `font-size="${FONT_SIZE}" `}${extra}>${inner}</text>`;
  const bold = (value: string) => `<tspan fill="${colors.accent}" font-weight="700">${escapeXml(value)}</tspan>`;

  // Logo: stretched to a fixed width, so wide art gets smaller glyphs.
  const columns = Math.max(...lines.map(line => line.length));
  const advance = LOGO_WIDTH / columns;
  const rowHeight = advance * 1.8;
  const logoHeight = (lines.length - 1) * rowHeight + advance * 1.5;
  const showPrompt = profile.prompt !== false;
  const logoTop = showPrompt ? LOGO_TOP_WITH_PROMPT : LOGO_TOP_NO_PROMPT;
  const logo = lines
    .map((line, i) =>
      text(
        LOGO_X,
        logoTop + advance * 1.5 + i * rowHeight,
        escapeXml(line),
        colors.accent,
        `font-size="${advance * 1.65}" textLength="${line.length * advance}" lengthAdjust="spacingAndGlyphs"`
      )
    )
    .join('');

  // Text column: prompt, heading, then each group of fields.
  let content = showPrompt
    ? text(PROMPT_X, PROMPT_Y, `${bold(`[${profile.heading} ~]$`)} ${escapeXml(profile.command ?? 'profiletty')}`)
    : '';
  let y = logoTop + 16;
  content += text(TEXT_X, y, bold(profile.heading));
  y += LINE_HEIGHT;
  content += text(TEXT_X, y, '-'.repeat(profile.heading.length));
  y += LINE_HEIGHT;

  for (const group of profile.groups) {
    for (const field of group.fields) {
      const dots = CHARS - field.label.length - 2 - field.value.length - 2;
      if (profile.leaders === true && dots >= 2) {
        content += text(
          TEXT_X,
          y,
          `${bold(field.label)}<tspan fill="${colors.dim}">: ${'.'.repeat(dots)} </tspan>${escapeXml(field.value)}`
        );
        y += LINE_HEIGHT;
        continue;
      }
      wrap(field.value, CHARS - field.label.length - 2).forEach((value, i) => {
        const line = i ? ' '.repeat(field.label.length + 2) + escapeXml(value) : `${bold(field.label)}: ${escapeXml(value)}`;
        content += text(TEXT_X, y, line);
        y += LINE_HEIGHT;
      });
    }
    y += GROUP_GAP;
  }

  // Palette: two rows of eight color blocks under the text.
  const showPalette = profile.palette !== false;
  if (showPalette) y += PALETTE_GAP;
  const palette = showPalette
    ? colors.palette
        .map((row, r) =>
          row
            .map(
              (color, i) =>
                `<rect x="${TEXT_X + i * PALETTE_CELL_WIDTH}" y="${y + r * LINE_HEIGHT}" width="${PALETTE_CELL_WIDTH}" height="${LINE_HEIGHT}" fill="${color}"/>`
            )
            .join('')
        )
        .join('')
    : '';
  if (showPalette) y += LINE_HEIGHT * 2;

  const height = Math.ceil(Math.max(y + 20, logoTop + logoHeight + 30));
  const description = profile.groups.flatMap(g => g.fields.map(f => `${f.label}: ${f.value}`)).join('. ');
  const stroke = colors.border ? ` stroke="${colors.border}"` : '';

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_WIDTH}" height="${height}" viewBox="0 0 ${CARD_WIDTH} ${height}" role="img" aria-labelledby="title desc">` +
    `<title id="title">${escapeXml(profile.heading)}</title><desc id="desc">${escapeXml(description)}</desc>` +
    `<style>${fontFace}text{white-space:pre;font-family:PTTY,'Fira Code',monospace}</style>` +
    `<rect x="0.5" y="0.5" width="${CARD_WIDTH - 1}" height="${height - 1}" rx="${CARD_RADIUS}" fill="${colors.bg}"${stroke}/>` +
    `${logo}${content}${palette}</svg>`
  );
}
