import { Home } from '@/Home'
import { ThemeProvider } from '@/components/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Home />
    </ThemeProvider>
  )
}

export default App
