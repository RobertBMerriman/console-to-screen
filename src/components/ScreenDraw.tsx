import ConsoleDraw from '@/components/ConsoleDraw'
import { H3 } from '@/components/ui/typography/H3'
import { H4 } from '@/components/ui/typography/H4'
import type { Screen } from '@/lib/screenData'
import { findDiagonal, ppi } from '@/lib/utils'
import { useConsoles } from '@/stores/consoleStore'
import type { CustomScreen } from '@/stores/customScreenStore'

interface Props {
  screen: Screen | (CustomScreen & { manufacturer?: string })
}
export function ScreenDraw({ screen }: Props) {
  const consoles = useConsoles()

  const screenDiagonalPixels = findDiagonal(screen.resX, screen.resY)
  const screenPpi = ppi(screenDiagonalPixels, screen.sizeInches)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2">
        <H3>
          {screen.manufacturer} {screen.name}
        </H3>
        <div className="flex flex-row gap-4">
          <p>
            {screen.resX}x{screen.resY}
          </p>
          <p>
            {screen.ratioX}:{screen.ratioY}
          </p>
          <p>{screen.sizeInches}"</p>
          <p>{screenPpi}ppi</p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-x-16 gap-y-8">
        {consoles.length === 0 && <H4 className="opacity-60">Please select a console</H4>}
        {consoles.toReversed().map((consol) => (
          <ConsoleDraw
            key={consol.tag}
            screen={screen}
            screenDiagonalPixels={screenDiagonalPixels}
            consol={consol}
          />
        ))}
      </div>
    </div>
  )
}
