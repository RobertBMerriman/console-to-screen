import { describe, expect, it } from 'vitest'

import {
  xboxWiiUSwitch,
  beyond,
  consolesByTag,
  consoleTags,
  ndsPspDcN64,
  ps2NgcSaturn,
  upToPs1NoProblem,
  type Console,
} from '@/lib/consoleData'
import { screensByTag, type Screen } from '@/lib/screenData'

/**
 * Ratios are the conventional ones rather than the reduced GCD, so a PSP's
 * 480x272 is written 16:9. This catches a transposed or mistyped ratio without
 * rejecting that convention.
 */
const maxRatioDeviation = 0.02

const records: [string, Record<string, Console | Screen>][] = [
  ['console', consolesByTag],
  ['screen', screensByTag],
]

describe.each(records)('%s data', (_kind, byTag) => {
  const entries = Object.entries(byTag)

  it('keys each entry by its own tag', () => {
    const mismatched = entries.filter(([key, entry]) => key !== entry.tag)

    expect(mismatched.map(([key]) => key)).toEqual([])
  })

  it('has a positive whole-pixel resolution', () => {
    const bad = entries.filter(
      ([, { resX, resY }]) =>
        !Number.isInteger(resX) || !Number.isInteger(resY) || resX < 1 || resY < 1,
    )

    expect(bad.map(([key]) => key)).toEqual([])
  })

  it('states a ratio that matches its resolution', () => {
    const bad = entries.filter(
      ([, { resX, resY, ratioX, ratioY }]) =>
        Math.abs(resX / resY / (ratioX / ratioY) - 1) > maxRatioDeviation,
    )

    expect(bad.map(([key, { resX, resY }]) => `${key} ${resX}x${resY}`)).toEqual([])
  })

  it('names each entry', () => {
    const bad = entries.filter(([, { name }]) => !name.trim())

    expect(bad.map(([key]) => key)).toEqual([])
  })
})

describe('console data', () => {
  it('lists every tag exactly once', () => {
    expect(consoleTags).toHaveLength(new Set(consoleTags).size)
  })

  it('matches the tag list to the record keys', () => {
    expect([...consoleTags].sort()).toEqual(Object.keys(consolesByTag).sort())
  })
})

describe('screen data', () => {
  const screens = Object.values(screensByTag)

  it('has a positive physical size', () => {
    expect(screens.filter(({ sizeInches }) => !(sizeInches > 0)).map(({ tag }) => tag)).toEqual([])
  })

  it('types each ratio consistently with its numbers', () => {
    const named: Record<string, number> = { '4:3': 4 / 3, '16:9': 16 / 9, '3:2': 3 / 2, '1:1': 1 }

    const bad = screens.filter(
      ({ ratioType, ratioX, ratioY }) =>
        ratioType in named && Math.abs(ratioX / ratioY - named[ratioType]) > 1e-9,
    )

    expect(bad.map(({ tag, ratioType }) => `${tag} typed ${ratioType}`)).toEqual([])
  })
})

describe('performance brackets', () => {
  const brackets = Object.entries({
    upToPs1NoProblem,
    ndsPspDcN64,
    ps2NgcSaturn,
    xboxWiiUSwitch,
    beyond,
  })

  it.each(brackets)('%s only lists real consoles', (_name, tags) => {
    expect(tags.filter((tag) => !(tag in consolesByTag))).toEqual([])
  })

  it.each(brackets)('%s has no duplicates', (_name, tags) => {
    expect(tags).toHaveLength(new Set(tags).size)
  })

  it('shares no console between brackets', () => {
    const overlapping = brackets.flatMap(([name, tags], index) =>
      brackets
        .slice(index + 1)
        .flatMap(([otherName, otherTags]) =>
          tags
            .filter((tag) => otherTags.includes(tag))
            .map((tag) => `${tag} in ${name} and ${otherName}`),
        ),
    )

    expect(overlapping).toEqual([])
  })

  it('places every console in a bracket', () => {
    const bracketed = new Set<string>(brackets.flatMap(([, tags]) => tags))

    expect(Object.keys(consolesByTag).filter((tag) => !bracketed.has(tag))).toEqual([])
  })
})
