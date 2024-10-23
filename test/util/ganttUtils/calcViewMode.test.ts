import { expect, test } from 'vitest'
import { calcViewMode } from '../../../src/util/ganttUtils'

test('calcViewMode minutes', () => {
  const start = new Date(Date.parse('01 Jan 1970 12:00:00')).getTime()
  const end = new Date(Date.parse('01 Jan 1970 12:00:20')).getTime()
  const res = calcViewMode(start, end, 'auto')
  expect(res).toStrictEqual('minutes')
})

test('calcViewMode minutes', () => {
  const start = new Date(Date.parse('01 Jan 1970 12:00:00')).getTime()
  const end = new Date(Date.parse('01 Jan 1970 12:00:20')).getTime()
  const res = calcViewMode(start, end, 'auto', 21)
  expect(res).toStrictEqual('seconds')
})
test('calcViewMode days', () => {
  const start = new Date(Date.parse('01 Jan 1970 12:00:00')).getTime()
  const end = new Date(Date.parse('02 Jan 1970 12:00:00')).getTime()
  const res = calcViewMode(start, end, 'auto', 24)
  expect(res).toStrictEqual('days')
})
test('calcViewMode days adaptive hours', () => {
  const start = new Date(Date.parse('01 Jan 1970 12:00:00')).getTime()
  const end = new Date(Date.parse('02 Jan 1970 12:00:00')).getTime()
  const res = calcViewMode(start, end, 'auto', 25)
  expect(res).toStrictEqual('hours')
})
