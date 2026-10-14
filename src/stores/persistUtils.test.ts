import { describe, expect, it } from 'vitest'

import {
  carryForward,
  sanitiseByDefaults,
  sanitiseOneOf,
  sanitiseTags,
} from '@/stores/persistUtils'

const known = { gba: {}, psx: {}, snes: {} }

describe('sanitiseTags', () => {
  it('drops tags that no longer exist in the data', () => {
    expect(sanitiseTags(['gba', 'genesis', 'psx'], known)).toEqual(['gba', 'psx'])
  })

  it('keeps the selected order', () => {
    expect(sanitiseTags(['psx', 'gba'], known)).toEqual(['psx', 'gba'])
  })

  it('dedupes', () => {
    expect(sanitiseTags(['gba', 'gba', 'psx'], known)).toEqual(['gba', 'psx'])
  })

  it('ignores entries that are not strings', () => {
    expect(sanitiseTags(['gba', 7, null, { tag: 'psx' }], known)).toEqual(['gba'])
  })

  it('ignores inherited object properties', () => {
    expect(sanitiseTags(['toString', 'constructor', 'gba'], known)).toEqual(['gba'])
  })

  it('returns undefined when the stored value is not an array', () => {
    expect(sanitiseTags(undefined, known)).toBeUndefined()
    expect(sanitiseTags('gba', known)).toBeUndefined()
  })
})

describe('sanitiseOneOf', () => {
  const options = ['Type', 'Manufacturer'] as const

  it('keeps a value that is still an option', () => {
    expect(sanitiseOneOf('Manufacturer', options)).toBe('Manufacturer')
  })

  it('rejects a value that no longer is', () => {
    expect(sanitiseOneOf('Generation', options)).toBeUndefined()
    expect(sanitiseOneOf(3, options)).toBeUndefined()
  })
})

describe('sanitiseByDefaults', () => {
  const defaults = { compactMode: false, minimumComfortableScreenSize: 2.8 }

  it('keeps keys that still exist with the right type', () => {
    expect(
      sanitiseByDefaults({ compactMode: true, minimumComfortableScreenSize: 4 }, defaults),
    ).toEqual({ compactMode: true, minimumComfortableScreenSize: 4 })
  })

  it('drops keys that no longer exist', () => {
    expect(
      sanitiseByDefaults({ compactMode: true, screensMaxDisplayWidth: true }, defaults),
    ).toEqual({ compactMode: true })
  })

  it('drops a key whose type changed', () => {
    expect(sanitiseByDefaults({ minimumComfortableScreenSize: 'big' }, defaults)).toEqual({})
  })

  it('drops a number that is not finite', () => {
    expect(sanitiseByDefaults({ minimumComfortableScreenSize: NaN }, defaults)).toEqual({})
  })

  it('returns nothing for a non-object', () => {
    expect(sanitiseByDefaults(undefined, defaults)).toEqual({})
    expect(sanitiseByDefaults('nonsense', defaults)).toEqual({})
  })
})

describe('carryForward', () => {
  it('hands pre-versioning state through instead of discarding it', () => {
    const state = { tags: ['gba'] }

    expect(carryForward(state)).toBe(state)
  })
})
