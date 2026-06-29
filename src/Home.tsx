import { ScreenDraw } from '@/components/ScreenDraw'
import { ConsoleField } from '@/components/field/ConsoleField'
import { ScreenField } from '@/components/field/ScreenField'
import { ModeToggle } from '@/components/mode-toggle'
import { Separator } from '@/components/ui/separator'
import { H1 } from '@/components/ui/typography/H1'
import { useScreens } from '@/stores/screenStore'

export function Home() {
  const screens = useScreens()

  return (
    <div className="container mx-auto flex min-h-screen flex-col gap-4 p-4">
      <div className="flex flex-row justify-between">
        <H1>Console to Screen</H1>
        <ModeToggle />
      </div>

      <Separator />

      <div className="flex flex-row gap-8 max-lg:flex-wrap">
        <ConsoleField />
        <ScreenField />
      </div>

      <Separator />

      {screens.toReversed().map((screen) => (
        <ScreenDraw key={screen.tag} screen={screen} />
      ))}
    </div>
  )
}
