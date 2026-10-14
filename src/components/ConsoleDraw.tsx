import { H4 } from '@/components/ui/typography/H4'
import type { Console } from '@/lib/consoleData'
import { diagonalInches, pixelsToInches, ratiosMatch, solveScaling } from '@/lib/scaling'
import type { Screen } from '@/lib/screenData'
import { cn } from '@/lib/utils'
import { useConsoleStore } from '@/stores/consoleStore'
import type { CustomScreen } from '@/stores/customScreenStore'
import { useSettingsStore } from '@/stores/settingsStore'

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
        className="relative flex items-center justify-center bg-gray-600"
        style={{ width: screenXInches + 'in', height: screenYInches + 'in' }}
      >
        {/* Overscan */}
        <div
          className={cn('bg-destructive/40 absolute -z-50', { hidden: notWorthIt })}
          style={{
            width: consoleXInches + 'in',
            height: consoleYInches + 'in',
            left: `calc(50% - ${consoleXInches / 2}in)`,
            top: `calc(50% - ${consoleYInches / 2}in)`,
          }}
        />
        {/* Console */}
        <div
          className={cn(
            'z-0 flex flex-col items-center justify-center bg-gray-400 text-center text-gray-900',
            { 'bg-destructive/60': notWorthIt },
          )}
          style={{
            width: consoleXInches + 'in',
            height: consoleYInches + 'in',
            maxWidth: screenXInches + 'in',
            maxHeight: screenYInches + 'in',
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
          {notWorthIt && <span>Insufficient screen resolution to render at x1</span>}
        </div>
      </div>
    </div>
  )
}
