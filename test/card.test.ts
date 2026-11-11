import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtempSync, readFileSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {render, wrap, validate, type Profile} from '../src/card.ts';

const profile: Profile = {
  heading: 'Kadu<&',
  ascii: 'logo.txt',
  groups: [{name: 'Work', fields: [{label: 'At', value: 'A & B <script>'}]}]
};

const dark = (overrides: Partial<Profile> = {}, ascii = '##') => render({...profile, ...overrides}, ascii, 'dark');
const light = (overrides: Partial<Profile> = {}, ascii = '##') => render({...profile, ...overrides}, ascii, 'light');
const svgHeight = (svg: string) => Number(svg.match(/height="(\d+)"/)![1]);

test('escapes XML from profile and ASCII', () => {
  const svg = dark({}, '# <&');
  assert.ok(svg.includes('Kadu&lt;&amp;'));
  assert.ok(svg.includes('A &amp; B &lt;script&gt;'));
  assert.ok(!svg.includes('<script>'));
});

test('wraps words and unbroken values without losing characters', () => {
  assert.deepEqual(wrap('alpha beta gamma', 10), ['alpha beta', 'gamma']);
  assert.deepEqual(wrap('abcdefghijkl', 5), ['abcde', 'fghij', 'kl']);
});

test('rejects malformed input and unsupported ASCII', () => {
  assert.throws(() => validate({}));
  assert.throws(() => dark({}, '😀'));
});

test('validation errors name the offending field', () => {
  const field = (label: string, value: string) => ({...profile, groups: [{name: 'A', fields: [{label: 'ok', value: 'ok'}, {label, value}]}]});
  assert.throws(() => validate(field('x'.repeat(15), 'v')), /groups\[0\]\.fields\[1\]\.label: must be at most 14 characters \(got 15\)/);
  assert.throws(() => validate(field('l', 'two\nlines')), /groups\[0\]\.fields\[1\]\.value: must be a single line/);
  assert.throws(() => validate({...profile, heading: ''}), /heading: must be a nonempty string/);
  assert.throws(() => validate({...profile, groups: []}), /groups: must contain 1 to 8 groups/);
});

test('height grows with wrapped content', () => {
  const longFields = Array.from({length: 12}, () => ({label: 'At', value: 'word '.repeat(45)}));
  const tall = light({groups: [{name: 'Work', fields: longFields}]});
  assert.ok(svgHeight(tall) > svgHeight(light()));
});

test('palette can be hidden and must be boolean', () => {
  const marker = '#2f3742';
  assert.ok(dark().includes(marker));
  assert.ok(!dark({palette: false}).includes(marker));
  assert.throws(() => validate({...profile, palette: 'no'}));
});

test('prompt line can be hidden and must be boolean', () => {
  assert.ok(dark().includes('profiletty'));
  assert.ok(!dark({prompt: false}).includes('profiletty'));
  assert.throws(() => validate({...profile, prompt: 1}));
});

test('dotted leaders are optional and off by default', () => {
  const dots = /\.{5}/;
  assert.ok(!dots.test(dark()));
  assert.ok(dots.test(dark({leaders: true})));
  assert.throws(() => validate({...profile, leaders: 'x'}));
});

test('prompt command is configurable and escaped', () => {
  const svg = dark({command: 'who<ami'});
  assert.ok(svg.includes('who&lt;ami'));
  assert.ok(!svg.includes('who<ami'));
  assert.throws(() => validate({...profile, command: ''}));
  assert.throws(() => validate({...profile, command: 'x'.repeat(31)}));
});

test('light card has a border and dark card does not', () => {
  assert.ok(light().includes('stroke="#d1d9e0"'));
  assert.ok(!dark().includes('stroke='));
});

test('cli writes both themes and a README that uses the heading as alt text', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'profiletty-'));
  writeFileSync(path.join(dir, 'logo.txt'), '##\n##\n');
  writeFileSync(path.join(dir, 'profile.json'), JSON.stringify({...profile, heading: 'me<3'}));
  const out = path.join(dir, 'out');
  const run = spawnSync(process.execPath, [path.resolve('src/cli.ts'), path.join(dir, 'profile.json'), out], {encoding: 'utf8'});
  assert.equal(run.status, 0, run.stderr);
  assert.ok(readFileSync(path.join(out, 'profile-dark.svg'), 'utf8').startsWith('<svg'));
  assert.ok(readFileSync(path.join(out, 'profile-light.svg'), 'utf8').startsWith('<svg'));
  assert.ok(readFileSync(path.join(out, 'README.md'), 'utf8').includes('alt="me&lt;3 profile card"'));
});

test('cli reports a missing ASCII file in plain words', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'profiletty-'));
  writeFileSync(path.join(dir, 'profile.json'), JSON.stringify({...profile, ascii: 'missing.txt'}));
  const run = spawnSync(process.execPath, [path.resolve('src/cli.ts'), path.join(dir, 'profile.json'), path.join(dir, 'out')], {encoding: 'utf8'});
  assert.equal(run.status, 1);
  assert.match(run.stderr, /Cannot read ASCII file "missing\.txt".*file not found/);
});
