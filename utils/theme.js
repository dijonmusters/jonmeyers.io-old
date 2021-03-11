const common = {
  transition: 'all ease-in-out 0.2s',
  maxWidth: '800px',
}

// old gradient - linear-gradient(to bottom, #5b86e5, #36d1dc)
// old dark highlight - #e66ec1

const lightTheme = {
  ...common,
  background: '#5590e3',
  offBackground: '#5b86e5',
  offBackground2: 'rgb(250, 250, 250)',
  color: 'white',
  muted: '#939393',
  muted2: '#efefef',
  muted3: '#cfcfcf',
  highlight: '#c1e66e',
  isLightMode: true,
  separator: '#efefef',
  hover: 'rgba(255, 255, 255, 0.1)',
}

const darkTheme = {
  ...common,
  background: '#111111',
  offBackground: '#000',
  offBackground2: 'rgb(47, 47, 47)',
  color: '#e1e1e1',
  muted: '#939393',
  muted2: '#939393',
  muted3: '#737373',
  highlight: '#36d1dc',
  isDarkMode: true,
  separator: '#afafaf',
  hover: 'rgba(255, 255, 255, 0.1)',
}

export { lightTheme, darkTheme }
