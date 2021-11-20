const common = {
  transition: 'all ease-in-out 0.2s',
  maxWidth: '800px',
  nightOwlBackground: '#011627',
  nightOwlText: '#d6deeb',
  nightOwlOffBackground: '#2f2f2f',
  gradient: 'linear-gradient(90deg, #554def, #21e4cf)',
  highlightMidway: '#3B99DF',
}

const lightTheme = {
  ...common,
  isLightMode: true,
  background: '#efefef',
  offBackground: '#dfdfdf',
  backgroundGray: '#cfcfcf',
  color: '#444',
  textOnGray: '#444',
  mutedTextOnGray: '#666',
  textOnHighlight: 'white',
  muted: '#555',
  highlight: '#554def',
  highlight2: '#21e4cf',
  separator: '#dfdfdf',
  hover: '#e5e5e5',
}

const darkTheme = {
  ...common,
  isDarkMode: true,
  background: '#111111',
  offBackground: '#1a1a1a',
  backgroundGray: '#333',
  color: '#e1e1e1',
  textOnGray: 'white',
  mutedTextOnGray: '#cfcfcf',
  textOnHighlight: 'white',
  muted: '#939393',
  highlight: '#21e4cf',
  highlight2: '#554def',
  separator: '#afafaf',
  hover: '#2a2a2a',
}

export { lightTheme, darkTheme }
