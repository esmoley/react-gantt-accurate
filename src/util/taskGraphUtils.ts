import { MIN_TASK_WIDTH } from './consts'
import { TaskGraph, TaskGraphRowPos, TaskMinWidthAlignType } from './types'

const MAX_SAFE_X = 1000000
export const getTaskGraphRowPos = (
  t: TaskGraph,
  startDate: Date,
  cellMs: number,
  taskMinWidthAlign: TaskMinWidthAlignType,
  cellWidth: number,
): TaskGraphRowPos => {
  let x = ((t.start - startDate.getTime()) / cellMs) * cellWidth
  if (x > MAX_SAFE_X) x = MAX_SAFE_X
  let width = ((t.end - t.start) / cellMs) * cellWidth
  if (width < MIN_TASK_WIDTH) {
    if (taskMinWidthAlign === 'end') x -= MIN_TASK_WIDTH - width
    width = MIN_TASK_WIDTH
  } else if (width > MAX_SAFE_X) width = MAX_SAFE_X
  return { x, width }
}
