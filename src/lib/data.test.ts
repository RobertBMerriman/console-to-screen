import { describe, expect, it } from 'vitest'

import {
  aboveNgc,
  consolesByTag,
  consoleTags,
  upToDcN64Psp,
  upToNgcPs2,
  upToPs1NoProblem,
  type Console,
} from '@/lib/consoleData'
import { screensByTag, type Screen } from '@/lib/screenData'

/** Screens state their advertised ratio, which is what `ratioType` groups them by. */
const maxScreenRatioDeviation = 0.008

function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a
}

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

  it('states the exactly reduced ratio of its resolution', () => {
    const bad = Object.values(consolesByTag).filter(({ resX, resY, ratioX, ratioY }) => {
      const divisor = gcd(resX, resY)

      return resX / divisor !== ratioX || resY / divisor !== ratioY
    })

    expect(
      bad.map(
        ({ tag, resX, resY, ratioX, ratioY }) => `${tag} ${resX}x${resY} as ${ratioX}:${ratioY}`,
      ),
    ).toEqual([])
  })
})

describe('screen data', () => {
  const screens = Object.values(screensByTag)

  it('states an advertised ratio close to its resolution', () => {
    const bad = screens.filter(
      ({ resX, resY, ratioX, ratioY }) =>
        Math.abs(resX / resY / (ratioX / ratioY) - 1) > maxScreenRatioDeviation,
    )

    expect(bad.map(({ tag, resX, resY }) => `${tag} ${resX}x${resY}`)).toEqual([])
  })

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
  const brackets = Object.entries({ upToPs1NoProblem, upToDcN64Psp, upToNgcPs2, aboveNgc })

  it.each(brackets)('%s only lists real consoles', (_name, tags) => {
    expect(tags.filter((tag) => !(tag in consolesByTag))).toEqual([])
  })

  it.each(brackets)('%s has no duplicates', (_name, tags) => {
    expect(tags).toHaveLength(new Set(tags).size)
  })

  it('nests each cumulative bracket inside the next', () => {
    expect(upToDcN64Psp).toEqual(expect.arrayContaining(upToPs1NoProblem))
    expect(upToNgcPs2).toEqual(expect.arrayContaining(upToDcN64Psp))
  })

  it('keeps aboveNgc separate from the cumulative brackets', () => {
    expect(aboveNgc.filter((tag) => upToNgcPs2.includes(tag))).toEqual([])
  })
})
