import { ErrorBoundary } from 'react-error-boundary'

import { Home } from '@/Home'
import { ErrorFallback } from '@/components/ErrorFallback'
import { ThemeProvider } from '@/components/ThemeProvider'
// import { TanStackDevtools } from '@tanstack/react-devtools'
// import { formDevtoolsPlugin } from '@tanstack/react-form-devtools'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Home />
      </ErrorBoundary>

      {/* <TanStackDevtools plugins={[formDevtoolsPlugin()]} /> */}
    </ThemeProvider>
  )
}

export default App
