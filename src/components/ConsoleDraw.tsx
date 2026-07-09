import { H4 } from '@/components/ui/typography/H4'
import type { Console } from '@/lib/consoleData'
import type { Screen } from '@/lib/screenData'
import { cn, findDiagonal } from '@/lib/utils'
import { useConsoleStore } from '@/stores/consoleStore'
import type { CustomScreen } from '@/stores/customScreenStore'
// import { useSettingsStore } from '@/stores/settingsStore'

interface Props {
  screen: Screen | CustomScreen
  screenDiagonalPixels: number
  consol: Console
}
export default function ConsoleDraw({ screen, screenDiagonalPixels, consol }: Props) {
  // const screensMaxDisplayWidth = useSettingsStore((s) => s.screensMaxDisplayWidth)

  const integerScaling = useConsoleStore((state) => state.integerScaling)
  const cropOverscan = useConsoleStore((state) => state.cropOverscan)

  const screenXInches = screen.sizeInches * (screen.resX / screenDiagonalPixels)
  const screenYInches = screen.sizeInches * (screen.resY / screenDiagonalPixels)

  const consoleScaledX = screen.resX / consol.resX
  const consoleScaledY = screen.resY / consol.resY
  const consoleScaleRaw = Math.min(consoleScaledX, consoleScaledY)
  const consoleScaleWithOverscan = cropOverscan
    ? Math.max(consoleScaledX, consoleScaledY)
    : consoleScaleRaw
  const consoleScale = integerScaling
    ? Math.max(Math.floor(consoleScaleWithOverscan), 1)
    : consoleScaleWithOverscan
  const consoleScaledResX = consol.resX * consoleScale
  const consoleScaledResY = consol.resY * consoleScale

  const consoleXInches = screen.sizeInches * (consoleScaledResX / screenDiagonalPixels)
  const consoleYInches = screen.sizeInches * (consoleScaledResY / screenDiagonalPixels)
  const consoleSizeInches = findDiagonal(consoleXInches, consoleYInches)
  // const consoleDiagonalPixels = findDiagonal(consoleScaledResX, consoleScaledResY)

  const croppedX = Math.max((consoleScaledResX - screen.resX) / (consoleScale * 2), 0)
  const croppedY = Math.max((consoleScaledResY - screen.resY) / (consoleScale * 2), 0)

  const notWorthIt = consoleScaleRaw < 1

  return (
    <div className="flex flex-col gap-1">
      <H4>{consol.name}</H4>

      <div className="flex flex-row gap-3">
        <p>
          {consol.resX}x{consol.resY}
        </p>
        <div className="flex gap-1">
          <p
            className={cn({
              'text-green-600': consol.ratioX === screen.ratioX && consol.ratioY === screen.ratioY,
            })}
          >
            {consol.ratioX}:{consol.ratioY}
          </p>
          {consol.closestRatioX && consol.closestRatioY && (
            <p
              className={cn({
                'text-green-600':
                  consol.closestRatioX === screen.ratioX && consol.closestRatioY === screen.ratioY,
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
            {consoleSizeInches.toLocaleString(undefined, { maximumFractionDigits: 1 })}" at{' '}
            <span
              className={cn({
                'font-medium text-green-700': consoleScaleRaw === Math.floor(consoleScaleRaw),
              })}
            >
              {consoleScale.toLocaleString(undefined, { maximumFractionDigits: 1 })}x
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
