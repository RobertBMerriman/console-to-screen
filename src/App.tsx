import { ModeToggle } from '@/components/mode-toggle'
import { ThemeProvider } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { H1 } from '@/components/ui/typography/H1'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="container mx-auto flex min-h-screen flex-col gap-4 p-4">
        <div className="flex flex-row justify-between">
          <H1>Console to Screen</H1>
          <ModeToggle />
        </div>
        <Button>Wow</Button>
      </div>
    </ThemeProvider>
  )
}

export default App
