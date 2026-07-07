import { Fragment } from 'react/jsx-runtime'

import { ScreenDraw } from '@/components/ScreenDraw'
import { ThemeModeToggle } from '@/components/ThemeModeToggle'
import { ConsoleField } from '@/components/console/ConsoleField'
import { Github } from '@/components/icons/Github'
import { ScreenField } from '@/components/screen/ScreenField'
import { Separator } from '@/components/ui/separator'
import { H1 } from '@/components/ui/typography/H1'
import { H3 } from '@/components/ui/typography/H3'
import { H4 } from '@/components/ui/typography/H4'
import { Muted } from '@/components/ui/typography/Muted'
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

      <div className="mt-6 flex flex-col gap-2">
        <Separator />
        <div className="flex flex-row justify-center gap-6">
          <div className="flex flex-col gap-1">
            <Muted className="text-center">
              Handcrafted by{' '}
              <a href="https://robertbmerriman.co.uk" target="_blank">
                Robert Merriman
              </a>{' '}
              for the love of the game(s)
            </Muted>
            <Muted className="text-center">
              Heavily inspired by{' '}
              <a href="https://shauninman.com/utils/screens/" target="_blank">
                Shaun Inman's original
              </a>{' '}
              {'<3'}
            </Muted>
          </div>
          <div className="flex items-center justify-center gap-2">
            <a href="https://github.com/RobertBMerriman/console-to-screen" target="_blank">
              <Github className="text-muted-foreground" width={18} height={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
