// Gerado por scripts/build-tokens.mjs a partir de tokens/tokens.json. Não edite à mão.
export const colors = {
  "light": {
    "bg": "#FAF8F5",
    "surface": "#FFFFFF",
    "surface-sunken": "#F2EEE8",
    "border": "#E4DED5",
    "border-strong": "#82796D",
    "text": "#1C1916",
    "text-muted": "#5F574D",
    "text-disabled": "#A99F92",
    "primary": "#0C6C67",
    "primary-hover": "#0B5652",
    "primary-subtle": "#E8F6F5",
    "on-primary": "#FFFFFF",
    "focus-ring": "#0C6C67",
    "danger": "#B83227",
    "danger-subtle": "#FDE4E1",
    "on-danger": "#FFFFFF",
    "success": "#17683E",
    "success-subtle": "#DFF5E5",
    "warning": "#8A5606",
    "warning-subtle": "#FFF1D6",
    "overlay": "rgba(18, 16, 14, 0.48)"
  },
  "dark": {
    "bg": "#12100E",
    "surface": "#1C1916",
    "surface-sunken": "#0B0A09",
    "border": "#2E2924",
    "border-strong": "#82796D",
    "text": "#FAF8F5",
    "text-muted": "#A99F92",
    "text-disabled": "#5F574D",
    "primary": "#5CBDB6",
    "primary-hover": "#95D6D1",
    "primary-subtle": "#0B3533",
    "on-primary": "#052020",
    "focus-ring": "#5CBDB6",
    "danger": "#F08A80",
    "danger-subtle": "#4A140F",
    "on-danger": "#4A140F",
    "success": "#5FD08F",
    "success-subtle": "#0A2E1B",
    "warning": "#F5C04E",
    "warning-subtle": "#3D2703",
    "overlay": "rgba(0, 0, 0, 0.64)"
  }
} as const;
export const space = {
  "0": "0",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem"
} as const;
export const radius = {
  "sm": "6px",
  "md": "10px",
  "lg": "14px",
  "full": "999px"
} as const;
export const fontSize = {
  "xs": "0.75rem",
  "sm": "0.875rem",
  "md": "1rem",
  "lg": "1.125rem",
  "xl": "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem"
} as const;
export const contrastPairs = {
  "$description": "Pares texto/fundo que precisam passar no WCAG AA. tests/contrast.test.ts confere todos, nos dois temas.",
  "text": [
    [
      "text",
      "bg"
    ],
    [
      "text",
      "surface"
    ],
    [
      "text",
      "surface-sunken"
    ],
    [
      "text-muted",
      "bg"
    ],
    [
      "text-muted",
      "surface"
    ],
    [
      "on-primary",
      "primary"
    ],
    [
      "on-primary",
      "primary-hover"
    ],
    [
      "on-danger",
      "danger"
    ],
    [
      "primary",
      "surface"
    ],
    [
      "primary",
      "primary-subtle"
    ],
    [
      "danger",
      "surface"
    ],
    [
      "danger",
      "danger-subtle"
    ],
    [
      "success",
      "surface"
    ],
    [
      "success",
      "success-subtle"
    ],
    [
      "warning",
      "surface"
    ],
    [
      "warning",
      "warning-subtle"
    ]
  ],
  "ui": [
    [
      "focus-ring",
      "bg"
    ],
    [
      "focus-ring",
      "surface"
    ],
    [
      "border-strong",
      "surface"
    ]
  ]
} as const;
