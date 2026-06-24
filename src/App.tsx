import { ConsoleField } from '@/components/field/ConsoleField'
import { ModeToggle } from '@/components/mode-toggle'
import { ThemeProvider } from '@/components/theme-provider'
import { Separator } from '@/components/ui/separator'
import { H1 } from '@/components/ui/typography/H1'
import { useConsoleStore } from '@/stores/consoleStore'

function App() {
  const console = useConsoleStore((state) => state.console)

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="container mx-auto flex min-h-screen flex-col gap-4 p-4">
        <div className="flex flex-row justify-between">
          <H1>Console to Screen</H1>
          <ModeToggle />
        </div>
        <Separator />
        <div>
          <ConsoleField />
        </div>
        <Separator />
        <div>{console}</div>
      </div>
    </ThemeProvider>
  )
}

export default App
