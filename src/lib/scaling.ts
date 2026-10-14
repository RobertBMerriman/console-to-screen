export interface Resolution {
  resX: number
  resY: number
}

export interface Ratio {
  ratioX: number
  ratioY: number
}

export interface ScalingModes {
  integerScaling: boolean
  cropOverscan: boolean
}

export interface Scaling {
  /** Largest scale that fits the console on the screen, before any scaling modes are applied. */
  scaleRaw: number
  /** Current scale factor used for rendering */
  scale: number
  scaledResX: number
  scaledResY: number
  /** Console pixels lost off each edge, before scaling. */
  croppedX: number
  croppedY: number
  /** Fills the screen at an integer scale with nothing cropped. */
  scalesPerfectly: boolean
  /** Screen cannot show the console at 1x. */
  notWorthIt: boolean
}

export function solveScaling(
  consol: Resolution,
  screen: Resolution,
  { integerScaling, cropOverscan }: ScalingModes,
): Scaling {
  const scaledX = screen.resX / consol.resX
  const scaledY = screen.resY / consol.resY

  const scaleRaw = Math.min(scaledX, scaledY)
  const scaleWithOverscan = cropOverscan ? Math.max(scaledX, scaledY) : scaleRaw
  const scale = integerScaling ? Math.max(Math.floor(scaleWithOverscan), 1) : scaleWithOverscan

  const scaledResX = consol.resX * scale
  const scaledResY = consol.resY * scale

  return {
    scaleRaw,
    scale,
    scaledResX,
    scaledResY,
    croppedX: Math.max((scaledResX - screen.resX) / (scale * 2), 0),
    croppedY: Math.max((scaledResY - screen.resY) / (scale * 2), 0),
    scalesPerfectly: scaleRaw === Math.floor(scaleRaw),
    notWorthIt: scaleRaw < 1,
  }
}

export function ratiosMatch(a: Ratio, b: Ratio) {
  return a.ratioX === b.ratioX && a.ratioY === b.ratioY
}

export function pixelsToInches(pixels: number, sizeInches: number, diagonalPixels: number) {
  return sizeInches * (pixels / diagonalPixels)
}

export function findDiagonal(x: number, y: number) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}

export function diagonalInches(
  resX: number,
  resY: number,
  sizeInches: number,
  diagonalPixels: number,
) {
  return findDiagonal(
    pixelsToInches(resX, sizeInches, diagonalPixels),
    pixelsToInches(resY, sizeInches, diagonalPixels),
  )
}

export function ppi(diagonalPixels: number, inches: number) {
  return Math.round(diagonalPixels / inches)
}
