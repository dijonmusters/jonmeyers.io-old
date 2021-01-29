const common = {
  transition: 'all ease-in-out 0.2s',
}

const lightTheme = {
  ...common,
  background: 'linear-gradient(to bottom, #36d1dc, #5b86e5)',
  color: 'white',
  muted: '#939393',
  highlight: '#c1e66e',
  isLightMode: true,
}

const darkTheme = {
  ...common,
  background: 'linear-gradient(to bottom, #0d0d0d, #0d0d0d)',
  color: '#e1e1e1',
  muted: '#939393',
  highlight: '#e66ec1',
  isDarkMode: true,
}

export { lightTheme, darkTheme }
