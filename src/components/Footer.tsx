import { Github } from '@/components/icons/Github'
import { Separator } from '@/components/ui/separator'
import { Muted } from '@/components/ui/typography/Muted'

export function Footer() {
  return (
    <div className="mt-48 flex flex-col gap-2">
      <Separator />

      <div className="flex flex-col gap-1 sm:grid sm:grid-cols-[1fr_min-content_1fr] sm:gap-6">
        <Muted size="xs" className="text-center max-sm:order-1 sm:text-left">
          Handcrafted by{' '}
          <a href="https://robertbmerriman.co.uk" target="_blank">
            Robert Merriman
          </a>{' '}
          for the love of the game(s)
        </Muted>

        <div className="flex items-center justify-center gap-2 max-sm:mb-2">
          <a href="https://github.com/RobertBMerriman/console-to-screen" target="_blank">
            <Github className="text-muted-foreground" width={18} height={18} />
          </a>
        </div>

        <div className="flex flex-col gap-2 max-sm:order-2 sm:gap-1">
          <Muted size="xs" className="text-center sm:text-right">
            Heavily inspired by{' '}
            <a href="https://shauninman.com/utils/screens/" target="_blank">
              Shaun Inman's original
            </a>
          </Muted>

          <Muted size="xs" className="text-center sm:text-right">
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
