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
