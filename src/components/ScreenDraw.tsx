import { H3 } from '@/components/ui/typography/H3'
import { H4 } from '@/components/ui/typography/H4'
import type { Screen } from '@/lib/screenData'
import { cn } from '@/lib/utils'
import { useConsole, useConsoleStore } from '@/stores/consoleStore'

function findDiagonal(x: number, y: number) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}

function ppi(diagonalPixels: number, inches: number) {
  return Math.round(diagonalPixels / inches)
}

interface Props {
  screen: Screen
}
export function ScreenDraw({ screen }: Props) {
  const consol = useConsole()
  const integerScaling = useConsoleStore((state) => state.integerScaling)
  const cropOverscan = useConsoleStore((state) => state.cropOverscan)

  const screenDiagonalPixels = findDiagonal(screen.resX, screen.resY)
  const screenPpi = ppi(screenDiagonalPixels, screen.sizeInches)
  const screenXInches = screen.sizeInches * (screen.resX / screenDiagonalPixels)
  const screenYInches = screen.sizeInches * (screen.resY / screenDiagonalPixels)

  const consoleScaledX = screen.resX / consol.resX
  const consoleScaledY = screen.resY / consol.resY
  const consoleScaleRaw = cropOverscan
    ? Math.max(consoleScaledX, consoleScaledY)
    : Math.min(consoleScaledX, consoleScaledY)
  const consoleScale = integerScaling ? Math.max(Math.floor(consoleScaleRaw), 1) : consoleScaleRaw
  const consoleScaledResX = consol.resX * consoleScale
  const consoleScaledResY = consol.resY * consoleScale
  // const consoleDiagonalPixels = findDiagonal(consoleScaledResX, consoleScaledResY)
  const consoleXInches = screen.sizeInches * (consoleScaledResX / screenDiagonalPixels)
  const consoleYInches = screen.sizeInches * (consoleScaledResY / screenDiagonalPixels)
  const consoleSizeInches = findDiagonal(consoleXInches, consoleYInches)
  // const consolePpi = Math.round(consoleDiagonalPixels / consoleSizeInches)

  const croppedX = Math.max((consoleScaledResX - screen.resX) / (consoleScale * 2), 0)
  const croppedY = Math.max((consoleScaledResY - screen.resY) / (consoleScale * 2), 0)

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
      <div className="flex flex-row flex-wrap">
        <div className="flex flex-col gap-1">
          <H4>{consol.name}</H4>
          <div className="flex flex-row gap-3">
            <p>
              {consol.resX}x{consol.resY}
            </p>
            <p
              className={cn({
                'text-green-600':
                  consol.ratioX === screen.ratioX && consol.ratioY === screen.ratioY,
              })}
            >
              {consol.ratioX}:{consol.ratioY}
            </p>
            {consol.closestRatioX && consol.closestRatioY && (
              <p
                className={cn({
                  'text-green-600':
                    consol.closestRatioX === screen.ratioX &&
                    consol.closestRatioY === screen.ratioY,
                })}
              >
                (closest: {consol.closestRatioX}:{consol.closestRatioY})
              </p>
            )}
          </div>
          <div
            className="relative flex items-center justify-center bg-gray-600"
            style={{ width: screenXInches + 'in', height: screenYInches + 'in' }}
          >
            <div
              className="absolute flex flex-col items-center justify-center bg-gray-200/50 text-gray-900"
              style={{
                width: consoleXInches + 'in',
                height: consoleYInches + 'in',
                left: `calc(50% - ${consoleXInches / 2}in)`,
                top: `calc(50% - ${consoleYInches / 2}in)`,
              }}
            >
              <span>{consol.name}</span>
              <span>
                {consoleSizeInches.toLocaleString(undefined, { maximumFractionDigits: 1 })}" at{' '}
                {consoleScale.toLocaleString(undefined, { maximumFractionDigits: 1 })}x
              </span>
              {(croppedX > 0 || croppedY > 0) && ( // There is an issue with these elements overlapping with transparency, one solution would be to change to a solid color or another would be to clamp the inner console size to the screen bounds and draw behind it
                <>
                  <span>
                    (cropped: {Math.ceil(croppedX)},{Math.ceil(croppedY)})
                  </span>
                  {croppedX > 0 && (
                    <>
                      <div
                        className="bg-destructive/40 absolute top-0 left-0"
                        style={{
                          width: consoleXInches * (croppedX / consol.resX) + 'in',
                          height: consoleYInches + 'in',
                        }}
                      />
                      <div
                        className="bg-destructive/40 absolute top-0 right-0"
                        style={{
                          width: consoleXInches * (croppedX / consol.resX) + 'in',
                          height: consoleYInches + 'in',
                        }}
                      />
                    </>
                  )}
                  {croppedY > 0 && (
                    <>
                      <div
                        className="bg-destructive/40 absolute top-0 left-0"
                        style={{
                          width: consoleXInches + 'in',
                          height: consoleYInches * (croppedY / consol.resY) + 'in',
                        }}
                      />
                      <div
                        className="bg-destructive/40 absolute bottom-0 left-0"
                        style={{
                          width: consoleXInches + 'in',
                          height: consoleYInches * (croppedY / consol.resY) + 'in',
                        }}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
