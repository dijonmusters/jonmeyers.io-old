const purple = 'hsl(243, 84%, 62%)'
const teal = 'hsl(174, 78%, 51%)'

const common = {
  transition: 'all ease-in-out 0.2s',
  maxWidth: '800px',
  nightOwlBackground: 'hsl(207, 95%, 8%)',
  nightOwlText: 'hsl(217, 34%, 88%)',
  nightOwlOffBackground: 'hsl(0, 0%, 18%)',
  gradient: `linear-gradient(90deg, ${purple}, ${teal})`,
  highlightMidway: 'hsl(206, 72%, 55%)',
  borderRadius: '5px',
}

const lightTheme = {
  ...common,
  isLightMode: true,
  background: 'hsl(0, 0%, 94%)',
  offBackground: 'hsl(0, 0%, 87%)',
  backgroundGray: 'hsl(0, 0%, 81%)',
  color: 'hsl(0, 0%, 27%)',
  textOnGray: 'hsl(0, 0%, 27%)',
  mutedTextOnGray: 'hsl(0, 0%, 40%)',
  textOnHighlight: 'hsl(0, 0%, 100%)',
  muted: 'hsl(0, 0%, 33%)',
  highlight: purple,
  highlight2: teal,
  separator: 'hsl(0, 0%, 87%)',
  hover: 'hsl(0, 0%, 90%)',
}

const darkTheme = {
  ...common,
  isDarkMode: true,
  background: 'hsl(0, 0%, 7%)',
  offBackground: 'hsl(0, 0%, 10%)',
  backgroundGray: 'hsl(0, 0%, 20%)',
  color: 'hsl(0, 0%, 88%)',
  textOnGray: 'hsl(0, 0%, 100%)',
  mutedTextOnGray: 'hsl(0, 0%, 81%)',
  textOnHighlight: 'hsl(0, 0%, 100%)',
  muted: 'hsl(0, 0%, 58%)',
  highlight: teal,
  highlight2: purple,
  separator: 'hsl(0, 0%, 69%)',
  hover: 'hsl(0, 0%, 16%)',
}

export { lightTheme, darkTheme }
