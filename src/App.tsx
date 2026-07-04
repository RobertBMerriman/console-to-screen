import { Home } from '@/Home'
import { ThemeProvider } from '@/components/theme-provider'
// import { TanStackDevtools } from '@tanstack/react-devtools'
// import { formDevtoolsPlugin } from '@tanstack/react-form-devtools'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Home />

      {/* <TanStackDevtools plugins={[formDevtoolsPlugin()]} /> */}
    </ThemeProvider>
  )
}

export default App
