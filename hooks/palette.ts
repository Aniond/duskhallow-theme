// Duskhallow colours.
// Dark: a moonlit night in the Hollow, violet-black like the sky over the Moonwell.
// Light: the same valley at dusk, wrapped in lavender fog.
export const PALETTE = {
  label: 'Duskhallow',
  roles: {
    accent: '#3fb8a2', // the Moonwell's ghost-green glow
    danger: '#c43b4b', // Blood Moon
    success: '#74a845', // witch's herbs
    warning: '#d0912e', // lantern light
    pro: '#8e6bd1', // witchcraft violet
  },
  light: {
    gray: {
      anchors: {
        'surface-0': '#ebe6ef',
        'surface-1': '#f1edf4',
        'surface-2': '#f7f4f9',
        'text-primary': '#1d1626',
        'text-secondary': '#43384f',
        'text-muted': '#5a4e66',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#110d18',
        'surface-1': '#18131f',
        'surface-2': '#1e1827',
        'surface-3': '#251e30',
        'text-primary': '#ede6f3',
        'text-secondary': '#cbc0d8',
        'text-muted': '#a99bb9',
      },
    },
  },
} as const
