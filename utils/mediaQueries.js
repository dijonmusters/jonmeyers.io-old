export const breakpoints = {
  sm: 374,
  md: 768,
  lg: 1280,
}

export const sm = (style) =>
  `@media (max-width: ${breakpoints.sm}px) { ${style} }`

export const md = (style) =>
  `@media (min-width: ${breakpoints.sm + 1}px) { ${style} }`

export const lg = (style) =>
  `@media (min-width: ${breakpoints.md + 1}px) { ${style} }`
