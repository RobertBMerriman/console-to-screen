import { H4 } from '@/components/ui/typography/H4'
import type { Console } from '@/lib/consoleData'
import { diagonalInches, pixelsToInches, ratiosMatch, solveScaling } from '@/lib/scaling'
import type { Screen } from '@/lib/screenData'
import { cn } from '@/lib/utils'
import { useConsoleStore } from '@/stores/consoleStore'
import type { CustomScreen } from '@/stores/customScreenStore'
import { useSettingsStore } from '@/stores/settingsStore'

/** Converts inches to a CSS length using the page's drawing scale. */
const drawn = (inches: number) => `calc(var(--ppi) * ${inches})`

interface Props {
  screen: Screen | CustomScreen
  screenDiagonalPixels: number
  consol: Console
}
export default function ConsoleDraw({ screen, screenDiagonalPixels, consol }: Props) {
  const minimumComfortableScreenSize = useSettingsStore((s) => s.minimumComfortableScreenSize)
  const compactMode = useSettingsStore((s) => s.compactMode)

  const integerScaling = useConsoleStore((state) => state.integerScaling)
  const cropOverscan = useConsoleStore((state) => state.cropOverscan)

  const { scale, scaledResX, scaledResY, croppedX, croppedY, scalesPerfectly, notWorthIt } =
    solveScaling(consol, screen, { integerScaling, cropOverscan })

  const screenXInches = pixelsToInches(screen.resX, screen.sizeInches, screenDiagonalPixels)
  const screenYInches = pixelsToInches(screen.resY, screen.sizeInches, screenDiagonalPixels)

  const consoleXInches = pixelsToInches(scaledResX, screen.sizeInches, screenDiagonalPixels)
  const consoleYInches = pixelsToInches(scaledResY, screen.sizeInches, screenDiagonalPixels)
  const consoleSizeInches = diagonalInches(
    scaledResX,
    scaledResY,
    screen.sizeInches,
    screenDiagonalPixels,
  )

  return (
    <div className="flex flex-col gap-1">
      <H4 className={cn({ hidden: compactMode })}>{consol.name}</H4>

      <div className={cn('flex flex-row gap-3', { hidden: compactMode })}>
        <p>
          {consol.resX}x{consol.resY}
        </p>
        <div className="flex gap-1">
          <p className={cn({ 'text-green-600': ratiosMatch(consol, screen) })}>
            {consol.ratioX}:{consol.ratioY}
          </p>
          {consol.closestRatioX && consol.closestRatioY && (
            <p
              className={cn({
                'text-green-600': ratiosMatch(
                  { ratioX: consol.closestRatioX, ratioY: consol.closestRatioY },
                  screen,
                ),
              })}
            >
              (closest: {consol.closestRatioX}:{consol.closestRatioY})
            </p>
          )}
        </div>
      </div>

      {/* Screen */}
      <div
        className="relative flex items-center justify-center bg-gray-500"
        style={{ width: drawn(screenXInches), height: drawn(screenYInches) }}
      >
        {/* Overscan */}
        <div
          className={cn('bg-destructive/40 absolute -z-50', { hidden: notWorthIt })}
          style={{
            width: drawn(consoleXInches),
            height: drawn(consoleYInches),
            left: `calc(50% - ${drawn(consoleXInches / 2)})`,
            top: `calc(50% - ${drawn(consoleYInches / 2)})`,
          }}
        />
        {/* Console */}
        <div
          className={cn(
            'z-0 flex flex-col items-center justify-center bg-gray-300 text-center text-gray-900',
            { 'bg-destructive/60': notWorthIt },
          )}
          style={{
            width: drawn(consoleXInches),
            height: drawn(consoleYInches),
            maxWidth: drawn(screenXInches),
            maxHeight: drawn(screenYInches),
          }}
        >
          <span>{consol.name}</span>
          <span>
            <span
              className={cn({
                'font-medium text-red-800': consoleSizeInches < minimumComfortableScreenSize,
              })}
            >
              {consoleSizeInches.toLocaleString(undefined, { maximumFractionDigits: 1 })}"
            </span>{' '}
            at{' '}
            <span
              className={cn({
                'font-medium text-green-700': scalesPerfectly,
              })}
            >
              {scale.toLocaleString(undefined, { maximumFractionDigits: 1 })}x
            </span>
          </span>
          {(croppedX > 0 || croppedY > 0) && (
            <span>
              (cropped: {Math.ceil(croppedX)},{Math.ceil(croppedY)})
            </span>
          )}
          {notWorthIt && <span className="italic">Resolution too low to render at x1</span>}
        </div>
      </div>
    </div>
  )
}
