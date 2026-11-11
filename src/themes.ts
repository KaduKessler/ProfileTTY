// Color presets. Each one holds the colors a card needs, nothing else.
// Sources and licenses are listed in THIRD_PARTY_NOTICES.md.

export interface Colors {
  bg: string;
  fg: string;
  dim: string;
  accent: string;
  /** Empty string means the card has no outline. */
  border: string;
  /** Two rows of eight ANSI colors: normal, then bright. Order: black, red, green, yellow, blue, purple, cyan, white. */
  palette: string[][];
}

export const COLOR_KEYS = ['bg', 'fg', 'dim', 'accent', 'border'] as const;

// The same ANSI palette for both Solarized variants.
const solarizedPalette = [
  ['#073642', '#dc322f', '#859900', '#b58900', '#268bd2', '#d33682', '#2aa198', '#eee8d5'],
  ['#002b36', '#cb4b16', '#586e75', '#657b83', '#839496', '#6c71c4', '#93a1a1', '#fdf6e3']
];

export const PRESETS = {
  // GitHub Primer (MIT).
  'github-dark': {
    bg: '#151b23',
    fg: '#f0f6fc',
    dim: '#6e7681',
    accent: '#4493f8',
    border: '',
    palette: [
      ['#2f3742', '#ff7b72', '#3fb950', '#d29922', '#58a6ff', '#be8fff', '#39c5cf', '#f0f6fc'],
      ['#656c76', '#ffa198', '#56d364', '#e3b341', '#79c0ff', '#d2a8ff', '#56d4dd', '#ffffff']
    ]
  },
  'github-light': {
    bg: '#ffffff',
    fg: '#1f2328',
    dim: '#8c959f',
    accent: '#0550ae',
    border: '#d1d9e0',
    palette: [
      ['#1f2328', '#cf222e', '#116329', '#4d2d00', '#0969da', '#8250df', '#1b7c83', '#59636e'],
      ['#393f46', '#a40e26', '#1a7f37', '#633c01', '#218bff', '#a475f9', '#3192aa', '#818b98']
    ]
  },
  // Dracula, from dracula/windows-terminal (MIT).
  dracula: {
    bg: '#282a36',
    fg: '#f8f8f2',
    dim: '#6272a4',
    accent: '#bd93f9',
    border: '',
    palette: [
      ['#21222c', '#ff5555', '#50fa7b', '#f1fa8c', '#bd93f9', '#ff79c6', '#8be9fd', '#f8f8f2'],
      ['#6272a4', '#ff6e6e', '#69ff94', '#ffffa5', '#d6acff', '#ff92df', '#a4ffff', '#ffffff']
    ]
  },
  // Tokyo Night, from folke/tokyonight.nvim (Apache-2.0).
  'tokyo-night': {
    bg: '#1a1b26',
    fg: '#c0caf5',
    dim: '#565f89',
    accent: '#7aa2f7',
    border: '',
    palette: [
      ['#15161e', '#f7768e', '#9ece6a', '#e0af68', '#7aa2f7', '#bb9af7', '#7dcfff', '#a9b1d6'],
      ['#414868', '#f7768e', '#9ece6a', '#e0af68', '#7aa2f7', '#9d7cd8', '#7dcfff', '#c0caf5']
    ]
  },
  'tokyo-night-day': {
    bg: '#e1e2e7',
    fg: '#3760bf',
    dim: '#6172b0',
    accent: '#2e7de9',
    border: '',
    palette: [
      ['#b4b5b9', '#f52a65', '#587539', '#8c6c3e', '#2e7de9', '#9854f1', '#007197', '#6172b0'],
      ['#a1a6c5', '#f52a65', '#587539', '#8c6c3e', '#2e7de9', '#7847bd', '#007197', '#3760bf']
    ]
  },
  // Nord, from nordtheme/nord (MIT). ANSI slots follow the Nord documentation for terminals.
  nord: {
    bg: '#2e3440',
    fg: '#d8dee9',
    dim: '#4c566a',
    accent: '#88c0d0',
    border: '',
    palette: [
      ['#3b4252', '#bf616a', '#a3be8c', '#ebcb8b', '#81a1c1', '#b48ead', '#88c0d0', '#e5e9f0'],
      ['#4c566a', '#bf616a', '#a3be8c', '#ebcb8b', '#81a1c1', '#b48ead', '#8fbcbb', '#eceff4']
    ]
  },
  // Monokai (classic), from tanvirtin/monokai.nvim (MIT). Monokai defines no cyan, so that slot shows its orange.
  monokai: {
    bg: '#26292c',
    fg: '#f8f8f0',
    dim: '#8f908a',
    accent: '#66d9ef',
    border: '',
    palette: [
      ['#2e323c', '#f92672', '#a6e22e', '#e6db74', '#66d9ef', '#ae81ff', '#fd971f', '#e3e3e1'],
      ['#4d5154', '#e95678', '#a6e22e', '#e6db74', '#66d9ef', '#ae81ff', '#fd971f', '#f8f8f0']
    ]
  },
  // Catppuccin, from catppuccin/windows-terminal and catppuccin/palette (MIT).
  'catppuccin-mocha': {
    bg: '#1e1e2e',
    fg: '#cdd6f4',
    dim: '#6c7086',
    accent: '#89b4fa',
    border: '',
    palette: [
      ['#45475a', '#f38ba8', '#a6e3a1', '#f9e2af', '#89b4fa', '#f5c2e7', '#94e2d5', '#bac2de'],
      ['#585b70', '#f38ba8', '#a6e3a1', '#f9e2af', '#89b4fa', '#f5c2e7', '#94e2d5', '#a6adc8']
    ]
  },
  'catppuccin-latte': {
    bg: '#eff1f5',
    fg: '#4c4f69',
    dim: '#8c8fa1',
    accent: '#1e66f5',
    border: '#ccd0da',
    palette: [
      ['#5c5f77', '#d20f39', '#40a02b', '#df8e1d', '#1e66f5', '#ea76cb', '#179299', '#acb0be'],
      ['#acb0be', '#d20f39', '#40a02b', '#df8e1d', '#1e66f5', '#ea76cb', '#179299', '#bcc0cc']
    ]
  },
  // Gruvbox, from gruvbox-community/gruvbox (MIT). ANSI slots follow its terminal colors; the dark "black" uses dark1 so the block stays visible.
  'gruvbox-dark': {
    bg: '#282828',
    fg: '#ebdbb2',
    dim: '#928374',
    accent: '#fabd2f',
    border: '',
    palette: [
      ['#3c3836', '#cc241d', '#98971a', '#d79921', '#458588', '#b16286', '#689d6a', '#a89984'],
      ['#928374', '#fb4934', '#b8bb26', '#fabd2f', '#83a598', '#d3869b', '#8ec07c', '#ebdbb2']
    ]
  },
  'gruvbox-light': {
    bg: '#fbf1c7',
    fg: '#3c3836',
    dim: '#928374',
    accent: '#af3a03',
    border: '#ebdbb2',
    palette: [
      ['#3c3836', '#cc241d', '#98971a', '#d79921', '#458588', '#b16286', '#689d6a', '#7c6f64'],
      ['#928374', '#9d0006', '#79740e', '#b57614', '#076678', '#8f3f71', '#427b58', '#504945']
    ]
  },
  // Rosé Pine, from rose-pine/windows-terminal (MIT).
  'rose-pine': {
    bg: '#191724',
    fg: '#e0def4',
    dim: '#908caa',
    accent: '#c4a7e7',
    border: '',
    palette: [
      ['#26233a', '#eb6f92', '#31748f', '#f6c177', '#9ccfd8', '#c4a7e7', '#ebbcba', '#e0def4'],
      ['#908caa', '#eb6f92', '#31748f', '#f6c177', '#9ccfd8', '#c4a7e7', '#ebbcba', '#e0def4']
    ]
  },
  'rose-pine-dawn': {
    bg: '#faf4ed',
    fg: '#575279',
    dim: '#797593',
    accent: '#907aa9',
    border: '#f2e9e1',
    palette: [
      ['#f2e9e1', '#b4637a', '#286983', '#ea9d34', '#56949f', '#907aa9', '#d7827e', '#575279'],
      ['#797593', '#b4637a', '#286983', '#ea9d34', '#56949f', '#907aa9', '#d7827e', '#575279']
    ]
  },
  // One Dark, from atom/one-dark-syntax (MIT). Its colors are defined in HSL; the hex values here are those converted. The "black" slot is hsl(220, 13%, 28%).
  'one-dark': {
    bg: '#282c34',
    fg: '#abb2bf',
    dim: '#5c6370',
    accent: '#61afef',
    border: '',
    palette: [
      ['#3e4451', '#e06c75', '#98c379', '#e5c07b', '#61afef', '#c678dd', '#56b6c2', '#abb2bf'],
      ['#5c6370', '#be5046', '#98c379', '#d19a66', '#61afef', '#c678dd', '#56b6c2', '#abb2bf']
    ]
  },
  // Kanagawa (wave), from rebelot/kanagawa.nvim (MIT).
  'kanagawa': {
    bg: '#1f1f28',
    fg: '#dcd7ba',
    dim: '#727169',
    accent: '#7e9cd8',
    border: '',
    palette: [
      ['#090618', '#c34043', '#76946a', '#c0a36e', '#7e9cd8', '#957fb8', '#6a9589', '#c8c093'],
      ['#727169', '#e82424', '#98bb6c', '#e6c384', '#7fb4ca', '#938aa9', '#7aa89f', '#dcd7ba']
    ]
  },
  // Everforest, from sainnhe/everforest (MIT), medium contrast. ANSI slots are assigned by ProfileTTY.
  'everforest-dark': {
    bg: '#2d353b',
    fg: '#d3c6aa',
    dim: '#859289',
    accent: '#a7c080',
    border: '',
    palette: [
      ['#475258', '#e67e80', '#a7c080', '#dbbc7f', '#7fbbb3', '#d699b6', '#83c092', '#d3c6aa'],
      ['#859289', '#e67e80', '#a7c080', '#dbbc7f', '#7fbbb3', '#d699b6', '#83c092', '#9da9a0']
    ]
  },
  'everforest-light': {
    bg: '#fdf6e3',
    fg: '#5c6a72',
    dim: '#939f91',
    accent: '#8da101',
    border: '#e6e2cc',
    palette: [
      ['#5c6a72', '#f85552', '#8da101', '#dfa000', '#3a94c5', '#df69ba', '#35a77c', '#939f91'],
      ['#829181', '#f85552', '#8da101', '#dfa000', '#3a94c5', '#df69ba', '#35a77c', '#a6b0a0']
    ]
  },
  // Night Owl, from sdras/night-owl-vscode-theme (MIT). The palette is its terminal.ansi* colors, so the "black" block matches the background.
  'night-owl': {
    bg: '#011627',
    fg: '#d6deeb',
    dim: '#637777',
    accent: '#82aaff',
    border: '',
    palette: [
      ['#011627', '#ef5350', '#22da6e', '#c5e478', '#82aaff', '#c792ea', '#21c7a8', '#ffffff'],
      ['#575656', '#ef5350', '#22da6e', '#ffeb95', '#82aaff', '#c792ea', '#7fdbca', '#ffffff']
    ]
  },
  // Solarized, from altercation/solarized (MIT).
  'solarized-dark': {
    bg: '#002b36',
    fg: '#839496',
    dim: '#586e75',
    accent: '#268bd2',
    border: '',
    palette: solarizedPalette
  },
  'solarized-light': {
    bg: '#fdf6e3',
    fg: '#657b83',
    dim: '#93a1a1',
    accent: '#268bd2',
    border: '#eee8d5',
    palette: solarizedPalette
  }
} satisfies Record<string, Colors>;

export type PresetName = keyof typeof PRESETS;
export const PRESET_NAMES = Object.keys(PRESETS) as PresetName[];
