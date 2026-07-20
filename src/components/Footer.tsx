import { Github } from '@/components/icons/Github'
import Kofi from '@/components/icons/Kofi'
import { Separator } from '@/components/ui/separator'
import { Muted } from '@/components/ui/typography/Muted'

export function Footer() {
  return (
    <div className="mt-48 flex flex-col gap-2">
      <Separator />

      <div className="flex flex-col gap-2 sm:grid sm:grid-cols-[1fr_min-content_1fr] sm:gap-6">
        <div className="flex flex-col gap-1 text-center max-sm:order-1 sm:text-left">
          <Muted size="xs">
            Handcrafted by{' '}
            <a href="https://robertbmerriman.co.uk" target="_blank">
              Robert Merriman
            </a>{' '}
            for the love of the game(s)
          </Muted>
          <Muted size="xs">
            If you like what I do, consider{' '}
            <a href="https://ko-fi.com/robertbmerriman" target="_blank">
              supporting me
            </a>
          </Muted>
        </div>

        <div className="flex items-center justify-center gap-2 max-sm:mb-1">
          <a href="https://github.com/RobertBMerriman/console-to-screen" target="_blank">
            <Github className="text-muted-foreground text-lg" />
          </a>
          <a href="https://ko-fi.com/robertbmerriman" target="_blank">
            <Kofi className="text-muted-foreground text-lg" />
          </a>
        </div>

        <div className="flex flex-col gap-2 text-center max-sm:order-2 sm:gap-1 sm:text-right">
          <Muted size="xs">
            Heavily inspired by{' '}
            <a href="https://shauninman.com/utils/screens/" target="_blank">
              Shaun Inman's original
            </a>
          </Muted>

          <Muted size="xs">
            If you find an bug/problem, please raise an issue{' '}
            <a href="https://github.com/RobertBMerriman/console-to-screen/issues" target="_blank">
              here
            </a>
          </Muted>
        </div>
      </div>
    </div>
  )
}
