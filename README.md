<div align="center">

# ProfileTTY

**Your identity, set in characters.**

Terminal-style GitHub profile cards, generated from an ASCII file and a small JSON config.

[![CI](https://github.com/KaduKessler/profiletty/actions/workflows/ci.yml/badge.svg)](https://github.com/KaduKessler/profiletty/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Node.js 24.12+](https://img.shields.io/badge/node-24.12%2B-339933.svg)
![Dependencies: 0](https://img.shields.io/badge/dependencies-0-brightgreen.svg)

[Quickstart](#quickstart) · [Configuration](#configuration) · [Themes](#themes) · [Use on GitHub](#use-on-github)

[English](README.md) · [Português](README.pt.md) · [Español](README.es.md)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/profile-dark.svg">
  <img src="docs/profile-light.svg" alt="ProfileTTY example: an ASCII prompt mark alongside work, stack and development environment" width="900">
</picture>

</div>

## Features

- **Static SVG.** No server, API key, analytics or hosted generator. Your card lives in your repository.
- **20 color themes.** Dracula, Nord, Tokyo Night, Catppuccin and more, plus your own color overrides.
- **Light and dark.** One card per mode, picked automatically by GitHub.
- **Your ASCII art.** Any text file, spaces preserved.
- **Safe and accessible.** Values are escaped for XML, long text wraps, and each SVG has a title and description.
- **Zero dependencies.** Native TypeScript on Node.js, with a Fira Code subset embedded in every SVG.

## Quickstart

Requires **Node.js 24.12 or newer** (26 LTS recommended). No `npm install` is needed.

```sh
git clone https://github.com/KaduKessler/profiletty.git
cd profiletty
npm run build
```

This renders the example card to `dist/`:

```text
dist/
├── README.md
├── profile-dark.svg
└── profile-light.svg
```

To make it yours, copy `examples/profile.json`, replace the information, and point `ascii` to your own text file (relative to the JSON file):

```sh
npm run card -- path/to/profile.json dist
```

## Configuration

```json
{
  "heading": "yourname@github",
  "ascii": "logo.txt",
  "groups": [
    {
      "name": "Work",
      "fields": [
        { "label": "Build", "value": "What you make" }
      ]
    },
    {
      "name": "Environment",
      "fields": [
        { "label": "Editor", "value": "Your editor" }
      ]
    }
  ]
}
```

| Setting | Accepted value |
| --- | --- |
| `heading` | Nonempty text, up to 40 characters |
| `ascii` | Local text-file path |
| `groups` | 1–8 groups |
| `groups[].name` | Nonempty text, up to 30 characters |
| `groups[].fields` | 1–12 label/value pairs |
| Field `label` | Nonempty, single-line text, up to 14 characters |
| Field `value` | Nonempty, single-line text, up to 240 characters |
| `palette` | Optional `true` (default) or `false` to hide the color blocks |
| `prompt` | Optional `true` (default) or `false` to hide the top prompt line |
| `leaders` | Optional `true` to draw dotted lines between labels and right-aligned values (default `false`) |
| `command` | Optional prompt command, up to 30 characters (default `profiletty`) |
| `theme` | Optional color preset for each mode, for example `{ "dark": "dracula", "light": "github-light" }`. See [Themes](#themes) |
| `colors` | Optional hex overrides for each mode, for example `{ "dark": { "accent": "#ff8800" } }`. See [Themes](#themes) |

### ASCII artwork

Bring a `.txt` file from any converter, such as [ASCII Art Archive's Image to ASCII tool](https://www.asciiart.eu/image-to-ascii), or draw it yourself. ProfileTTY renders existing text; it does not convert images. Use printable ASCII, at most 180 columns and 100 rows, with spaces instead of tabs. Emoji and Unicode block drawings are not supported.

## Themes

Pick a preset for each mode with `theme`. The default is `github-dark` and `github-light`.

<table>
  <tr>
    <td align="center"><b>dracula</b><br><img src="docs/themes/dracula.svg" alt="dracula preset" width="310"></td>
    <td align="center"><b>tokyo-night</b><br><img src="docs/themes/tokyo-night.svg" alt="tokyo-night preset" width="310"></td>
    <td align="center"><b>catppuccin-latte</b><br><img src="docs/themes/catppuccin-latte.svg" alt="catppuccin-latte preset" width="310"></td>
  </tr>
</table>

All 20 presets are in the **[theme gallery](docs/THEMES.md)**.

```json
{
  "theme": { "dark": "tokyo-night", "light": "tokyo-night-day" }
}
```

Any preset works in either mode. Override single colors with `colors`: allowed keys are `bg`, `fg`, `dim`, `accent` and `border`, as `#rrggbb` values (or `""` for `border` to remove the outline). The 16 palette blocks come from the preset.

```json
{
  "theme": { "dark": "dracula" },
  "colors": { "dark": { "accent": "#ff79c6" }, "light": { "border": "" } }
}
```

Preset colors come from the projects listed in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). They are not official themes of those projects, and ProfileTTY is not affiliated with them. In Solarized, two palette blocks match the card background; that is how the original palette is defined.

## Use on GitHub

### No install: template and GitHub Action

1. Create a repository named exactly like your username (`USERNAME/USERNAME`) and copy the files from [`template/`](template/) into it, keeping the `.github/workflows` folder. You can do this in the GitHub web editor.
2. Edit `profile.json` and replace `logo.txt` with your own ASCII art.
3. Commit. The workflow generates `profile-light.svg` and `profile-dark.svg` and commits them. Run it again from the **Actions** tab whenever needed.

The workflow uses this repository's action (`KaduKessler/profiletty@main`), which only writes the two SVGs. It never touches your `README.md`. Pin a commit SHA instead of `main` if you want fixed behavior.

Already have a profile `README.md`? The Action does not edit it. Paste the `<picture>` block from [`template/README.md`](template/README.md) where you want the card.

### Manual copy

Copy the contents of `dist/` into your `USERNAME/USERNAME` profile repository (or a test repository first), keeping the README and SVGs in the same directory. Back up your existing README before replacing it, and add your own links below the image.

The generated README selects the light or dark SVG with GitHub's `<picture>` support. No JavaScript or hosted service is involved:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="profile-dark.svg">
  <img src="profile-light.svg" alt="Developer profile" width="1000">
</picture>
```

Do not combine `prefers-color-scheme` with other conditions such as `max-width` in one `media` attribute: GitHub rewrites theme sources for signed-in viewers and drops the extra condition. Links drawn inside an SVG are not a replacement for normal Markdown links. Verify the result on GitHub in both themes. See [GitHub's announcement of theme-aware images](https://github.blog/changelog/2022-05-19-specify-theme-context-for-images-in-markdown-beta/).

Clone to generate locally and copy only the output into your profile. Fork if you want to keep your own version and pull upstream changes. ProfileTTY is not an npm package or a hosted service.

## Development

```sh
npm test
npm run build
npm run docs   # regenerates docs/ (CI fails if they are stale)
```

Tests cover input validation (including error messages), XML escaping, wrapping, content-dependent height, themes and the CLI. Node's TypeScript support removes types at runtime; passing tests is not a static type-check. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Author and license

Created by [Carlos Kessler](https://github.com/KaduKessler). Source code and documentation are under the [MIT License](LICENSE). Third-party notices (Fira Code, GitHub Primer colors, color themes) are in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
