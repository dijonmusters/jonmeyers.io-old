const common = {
  transition: 'all ease-in-out 0.2s',
  maxWidth: '800px',
  nightOwlBackground: '#011627',
  nightOwlText: '#d6deeb',
  nightOwlOffBackground: '#2f2f2f',
}

// old gradient - linear-gradient(to bottom, #5b86e5, #36d1dc)
// old dark highlight - #e66ec1

const lightTheme = {
  ...common,
  background: '#5590e3',
  offBackground: '#5b86e5',
  offBackground2: '#fafafa',
  offBackground3: '#efefef',
  color: 'white',
  colorOpposite: '#444',
  offColor3: '#333',
  muted: '#939393',
  muted2: '#efefef',
  muted3: '#cfcfcf',
  highlight: '#c1e66e',
  offHighlight: '#00000033',
  isLightMode: true,
  separator: '#efefef',
  hover: 'rgba(255, 255, 255, 0.1)',
}

const darkTheme = {
  ...common,
  background: '#111111',
  offBackground: '#000',
  offBackground2: '#2f2f2f',
  offBackground3: '#1a1a1a',
  color: '#e1e1e1',
  colorOpposite: 'white',
  offColor3: '#cfcfcf',
  muted: '#939393',
  muted2: '#939393',
  muted3: '#737373',
  highlight: '#36d1dc',
  offHighlight: '#2f2f2f',
  isDarkMode: true,
  separator: '#afafaf',
  hover: 'rgba(255, 255, 255, 0.1)',
}

export { lightTheme, darkTheme }
