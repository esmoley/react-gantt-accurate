import { expect, test } from 'vitest'
import { getTaskGraphRowPos } from '../../src/util/taskGraphUtils'
import { TaskGraph } from '../../src/util/types'
import { CELL_WIDTH, DAY_MS, MIN_TASK_WIDTH } from '../../src/util/consts'

test('getTaskGraphRowPos day start', () => {
  const startDate = new Date(Date.parse('01 Jan 1970 00:00:00'))
  const t: TaskGraph = {
    start: startDate.getTime(),
    end: startDate.getTime(),
    rowIndex: 0,
    index: 0,
    task: {
      id: '',
      start: 0,
      end: 0,
      color: undefined,
      dependencies: undefined,
      tooltip: undefined,
      onClick: undefined,
    },
    dependencies: [],
  }
  let dayCompl = getTaskGraphRowPos(t, startDate, DAY_MS, 'start')
  expect(dayCompl).toStrictEqual({ x: 0, width: MIN_TASK_WIDTH })
  t.start = new Date(Date.parse('01 Jan 1970 12:00:00')).getTime()
  dayCompl = getTaskGraphRowPos(t, startDate, DAY_MS, 'start')
  expect(dayCompl).toStrictEqual({ x: CELL_WIDTH * 0.5, width: MIN_TASK_WIDTH })

  t.start = new Date(Date.parse('01 Jan 1970 18:00:00')).getTime()
  dayCompl = getTaskGraphRowPos(t, startDate, DAY_MS, 'start')
  expect(dayCompl).toStrictEqual({ x: CELL_WIDTH * 0.75, width: MIN_TASK_WIDTH })

  t.start = new Date(Date.parse('01 Jan 1970 19:00:00')).getTime()
  dayCompl = getTaskGraphRowPos(t, startDate, DAY_MS, 'start')
  expect(dayCompl).toStrictEqual({ x: CELL_WIDTH * 0.7916666666666666, width: MIN_TASK_WIDTH })

  t.start = new Date(Date.parse('01 Jan 1970 01:00:00')).getTime()
  dayCompl = getTaskGraphRowPos(t, startDate, DAY_MS, 'start')
  expect(dayCompl.x / CELL_WIDTH).closeTo(0.04166666666666666, 0.000000000000000007)

  t.start = new Date(Date.parse('01 Jan 1970 00:01:00')).getTime()
  dayCompl = getTaskGraphRowPos(t, startDate, DAY_MS, 'start')
  expect(dayCompl.x / CELL_WIDTH).toBe(0.0006944444444444445)

  t.start = new Date(Date.parse('01 Jan 1970 00:00:01')).getTime()
  dayCompl = getTaskGraphRowPos(t, startDate, DAY_MS, 'start')
  expect(dayCompl.x / CELL_WIDTH).toBe(0.000011574074074074073)

  t.start = new Date(Date.parse('01 Jan 1970 00:00:00.500')).getTime()
  dayCompl = getTaskGraphRowPos(t, startDate, DAY_MS, 'start')
  expect(dayCompl.x / CELL_WIDTH).toBe(0.000005787037037037037)

  t.start = new Date(Date.parse('01 Jan 1970 00:00:00.250')).getTime()
  dayCompl = getTaskGraphRowPos(t, startDate, DAY_MS, 'start')
  expect(dayCompl.x / CELL_WIDTH).toBe(0.0000028935185185185184)

  t.start = new Date(Date.parse('01 Jan 1970 00:00:00.001')).getTime()
  dayCompl = getTaskGraphRowPos(t, startDate, DAY_MS, 'start')
  expect(dayCompl.x / CELL_WIDTH).toBe(1.1574074074074074e-8)
})
