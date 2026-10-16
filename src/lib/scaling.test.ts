import { describe, expect, it } from 'vitest'

import {
  advertisedRatio,
  diagonalInches,
  ppi,
  ratiosMatch,
  solveScaling,
  type ScalingModes,
} from '@/lib/scaling'

const none: ScalingModes = { integerScaling: false, cropOverscan: false }
const integer: ScalingModes = { integerScaling: true, cropOverscan: false }
const crop: ScalingModes = { integerScaling: false, cropOverscan: true }
const both: ScalingModes = { integerScaling: true, cropOverscan: true }

const gba = { resX: 240, resY: 160 }

describe('solveScaling', () => {
  it('scales perfectly when the screen is a whole multiple of the console', () => {
    const result = solveScaling(gba, { resX: 960, resY: 640 }, none)

    expect(result.scale).toBe(4)
    expect(result.scalesPerfectly).toBe(true)
    expect(result.scaledResX).toBe(960)
    expect(result.scaledResY).toBe(640)
    expect(result.croppedX).toBe(0)
    expect(result.croppedY).toBe(0)
  })

  it('fits to the tighter axis when the aspect ratios differ', () => {
    const result = solveScaling(gba, { resX: 1280, resY: 720 }, none)

    expect(result.scale).toBe(4.5)
    expect(result.scalesPerfectly).toBe(false)
    expect(result.croppedX).toBe(0)
    expect(result.croppedY).toBe(0)
  })

  it('floors to a whole number under integer scaling', () => {
    const result = solveScaling(gba, { resX: 1280, resY: 720 }, integer)

    expect(result.scale).toBe(4)
    expect(result.scaledResX).toBe(960)
    expect(result.scaledResY).toBe(640)
  })

  it('fills the looser axis and crops under crop overscan', () => {
    const result = solveScaling(gba, { resX: 1280, resY: 720 }, crop)

    expect(result.scale).toBeCloseTo(16 / 3)
    expect(result.croppedX).toBe(0)
    expect(result.croppedY).toBeCloseTo(12.5)
  })

  it('crops at a whole scale when both modes are on', () => {
    const result = solveScaling(gba, { resX: 1280, resY: 720 }, both)

    expect(result.scale).toBe(5)
    expect(result.croppedY).toBe(8)
  })

  it('reports a screen that cannot show the console at 1x', () => {
    const result = solveScaling({ resX: 640, resY: 480 }, { resX: 320, resY: 240 }, none)

    expect(result.notWorthIt).toBe(true)
    expect(result.scale).toBe(0.5)
  })

  it('never drops below 1x under integer scaling', () => {
    const result = solveScaling({ resX: 640, resY: 480 }, { resX: 320, resY: 240 }, integer)

    expect(result.scale).toBe(1)
    expect(result.notWorthIt).toBe(true)
  })

  it('judges scalesPerfectly on the fullscreen fit, not the mode in use', () => {
    const screen = { resX: 1280, resY: 720 }

    expect(solveScaling(gba, screen, crop).scalesPerfectly).toBe(false)
    expect(solveScaling(gba, screen, both).scalesPerfectly).toBe(false)
    expect(solveScaling(gba, { resX: 960, resY: 640 }, crop).scalesPerfectly).toBe(true)
  })
})

describe('ratiosMatch', () => {
  it('compares both axes', () => {
    expect(ratiosMatch({ ratioX: 4, ratioY: 3 }, { ratioX: 4, ratioY: 3 })).toBe(true)
    expect(ratiosMatch({ ratioX: 4, ratioY: 3 }, { ratioX: 3, ratioY: 4 })).toBe(false)
  })

  it('does not treat equivalent ratios as a match', () => {
    expect(ratiosMatch({ ratioX: 8, ratioY: 5 }, { ratioX: 16, ratioY: 10 })).toBe(false)
  })
})

describe('advertisedRatio', () => {
  it.each([
    [1920, 1080, 16, 9],
    [640, 480, 4, 3],
    [854, 480, 427, 240],
    [480, 272, 30, 17],
  ])('reduces %ix%i to %i:%i', (resX, resY, ratioX, ratioY) => {
    expect(advertisedRatio(resX, resY)).toEqual({ ratioX, ratioY })
  })

  it('prefers 16:10 over the reduced 8:5', () => {
    expect(advertisedRatio(1280, 800)).toEqual({ ratioX: 16, ratioY: 10 })
  })

  it('has no ratio until both sides are entered', () => {
    expect(advertisedRatio(1920, 0)).toEqual({ ratioX: 0, ratioY: 0 })
    expect(advertisedRatio(0, 0)).toEqual({ ratioX: 0, ratioY: 0 })
  })
})

describe('physical size', () => {
  it('measures a console filling the screen as the screen size', () => {
    expect(diagonalInches(960, 640, 5, Math.hypot(960, 640))).toBeCloseTo(5)
  })

  it('rounds pixels per inch', () => {
    expect(ppi(Math.hypot(1280, 720), 7)).toBe(210)
  })
})
