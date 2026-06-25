import { useConsoleStore } from '@/stores/consoleStore'
import { useScreenStore } from '@/stores/screenStore'

function findDiagonal(x: number, y: number) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}

function ppi(diagonalPixels: number, inches: number) {
  return Math.round(diagonalPixels / inches)
}

// function sizeInches(inches: number, res: number, diagonalPixels: number) {
// }

export function ScreenDraw() {
  const screen = useScreenStore((screen) => screen.screen)
  const consol = useConsoleStore((console) => console.console)

  const screenDiagonalPixels = findDiagonal(screen.resX, screen.resY)
  const screenPpi = ppi(screenDiagonalPixels, screen.sizeInches)
  const screenXInches = screen.sizeInches * (screen.resX / screenDiagonalPixels)
  const screenYInches = screen.sizeInches * (screen.resY / screenDiagonalPixels)

  const consoleScaledX = screen.resX / consol.resX
  const consoleScaledY = screen.resY / consol.resY
  const consoleScale = Math.min(consoleScaledX, consoleScaledY) // Consider crop overscan
  const consoleScaledResX = consol.resX * consoleScale
  const consoleScaledResY = consol.resY * consoleScale
  const consoleXInches = screen.sizeInches * (consoleScaledResX / screenDiagonalPixels)
  const consoleYInches = screen.sizeInches * (consoleScaledResY / screenDiagonalPixels)
  const consoleSizeInches = findDiagonal(consoleXInches, consoleYInches)
  const consoleDiagonalPixels = findDiagonal(consoleScaledResX, consoleScaledResY)
  const consolePpi = Math.round(consoleDiagonalPixels / consoleSizeInches)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <p>{screen.name}</p>
        <p>
          {screen.resX}x{screen.resY}
        </p>
        <p>{screen.ratioType}</p>
        <p>{screen.sizeInches}"</p>
        <p>{screenPpi}ppi</p>
      </div>
      <div className="flex flex-row flex-wrap">
        <div>
          <p>{consol.name}</p>
          <p>
            {consol.resX}x{consol.resY} - X:Y
          </p>
          <div
            className="flex items-center justify-center bg-gray-600"
            style={{ width: screenXInches + 'in', height: screenYInches + 'in' }}
          >
            <div
              className="flex flex-col items-center justify-center bg-gray-300 text-gray-900"
              style={{ width: consoleXInches + 'in', height: consoleYInches + 'in' }}
            >
              <span>{consol.name}</span>
              <span>
                {consoleSizeInches.toFixed(1)}" at {consoleScale.toFixed(1)}x
              </span>
              <span>{consolePpi}ppi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
