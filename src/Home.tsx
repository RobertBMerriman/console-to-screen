import { Fragment } from 'react/jsx-runtime'

import { Footer } from '@/components/Footer'
import { ScreenDraw } from '@/components/ScreenDraw'
import { SettingsDialog } from '@/components/SettingsDialog'
import { ThemeModeToggle } from '@/components/ThemeModeToggle'
import { ConsoleField } from '@/components/console/ConsoleField'
import { ScreenField } from '@/components/screen/ScreenField'
import { Separator } from '@/components/ui/separator'
import { H1 } from '@/components/ui/typography/H1'
import { H3 } from '@/components/ui/typography/H3'
import { H4 } from '@/components/ui/typography/H4'
import { useSelectedCustomScreens } from '@/stores/customScreenStore'
import { useScreens } from '@/stores/screenStore'

export function Home() {
  const screens = useScreens()
  const selectedCustomScreens = useSelectedCustomScreens()

  return (
    <div className="container mx-auto flex min-h-screen flex-col gap-4 p-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row flex-wrap items-baseline gap-2 gap-y-1">
          <H1>Console to Screen</H1>
          <H4 className="text-gray-600">(V2 beta)</H4>
        </div>
        <div className="flex h-10 flex-row items-center gap-2">
          <SettingsDialog />
          <ThemeModeToggle />
        </div>
      </div>

      <Separator />

      <div className="flex flex-row gap-8 max-lg:flex-wrap">
        <ConsoleField />
        <ScreenField />
      </div>

      <Separator />

      <div className="flex flex-1 flex-col gap-6">
        {screens.length === 0 && selectedCustomScreens.length === 0 && (
          <H3 className="text-center opacity-80">Please select a screen</H3>
        )}

        {selectedCustomScreens.toReversed().map((screen, index) => (
          <Fragment key={screen.tag}>
            <ScreenDraw screen={screen} />
            {index < screens.length - 1 && <Separator />}
          </Fragment>
        ))}
        {screens.length !== 0 && selectedCustomScreens.length !== 0 && <Separator />}

        {screens.toReversed().map((screen, index) => (
          <Fragment key={screen.tag}>
            <ScreenDraw screen={screen} />
            {index < screens.length - 1 && <Separator />}
          </Fragment>
        ))}
      </div>

      <Footer />
    </div>
  )
}
