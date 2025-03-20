import { Router } from './router'
import './App.css'
import { ThemeProvider } from '@emotion/react'
import { baseTheme } from './theme/baseTheme'

function App() {

  return (
    <ThemeProvider theme={baseTheme}>
      <Router />
    </ThemeProvider>
    
  )
}

export default App
