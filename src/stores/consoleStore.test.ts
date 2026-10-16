import { beforeEach, describe, expect, it } from 'vitest'

import { xboxWiiUSwitch } from '@/lib/consoleData'
import { useConsoleStore } from '@/stores/consoleStore'

const store = () => useConsoleStore.getState()

describe('performance bracket actions', () => {
  beforeEach(() => {
    store().setConsolesByTags(['gba'])
  })

  it('replaces the selection when setting', () => {
    store().setConsolesByTags(['ps4'])
    store().selectByPerformance('upToPs1NoProblem')

    expect(store().tags).toContain('nes')
    expect(store().tags).not.toContain('ps4')
  })

  it('keeps what is already selected when adding', () => {
    store().setConsolesByTags(['ps4'])
    store().addByPerformance('upToPs1NoProblem')

    expect(store().tags).toContain('ps4')
    expect(store().tags).toContain('nes')
  })

  it('does not duplicate a console already selected when adding', () => {
    store().setConsolesByTags(['nes'])
    store().addByPerformance('upToPs1NoProblem')

    expect(store().tags.filter((tag) => tag === 'nes')).toHaveLength(1)
  })

  it('keeps only what the bracket contains when filtering', () => {
    store().setConsolesByTags(['nes', 'ps2', 'ps4'])
    store().filterByPerformance('upToPs1NoProblem')

    expect(store().tags).toEqual(['nes'])
  })

  it('keeps the selected order when filtering', () => {
    store().setConsolesByTags(['snes', 'gba', 'nes'])
    store().filterByPerformance('upToPs1NoProblem')

    expect(store().tags).toEqual(['snes', 'gba', 'nes'])
  })

  it('empties the selection when nothing matches the bracket', () => {
    store().setConsolesByTags(['nes', 'snes'])
    store().filterByPerformance('beyond')

    expect(store().tags).toEqual([])
  })

  it('does not add the rest of the bracket when filtering', () => {
    store().setConsolesByTags(['ps2'])
    store().filterByPerformance('ps2NgcSaturn')

    expect(store().tags).toEqual(['ps2'])
  })

  it('copies the bracket rather than storing it by reference', () => {
    store().selectByPerformance('xboxWiiUSwitch')

    expect(store().tags).toEqual(xboxWiiUSwitch)
    expect(store().tags).not.toBe(xboxWiiUSwitch)
  })
})
