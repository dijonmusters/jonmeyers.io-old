export const breakpoints = {
  sm: 768,
  md: 1280,
}

export const sm = (style) =>
  `@media (max-width: ${breakpoints.sm}px) { ${style} }`

export const md = (style) =>
  `@media (min-width: ${breakpoints.sm + 1}px) { ${style} }`
