import { CELL_WIDTH, MIN_TASK_WIDTH } from './consts'
import { TaskGraph, TaskGraphRowPos, TaskMinWidthAlignType } from './types'

const MAX_SAFE_X = 1000000
export const getTaskGraphRowPos = (
  t: TaskGraph,
  startDate: Date,
  cellMs: number,
  taskMinWidthAlign: TaskMinWidthAlignType,
): TaskGraphRowPos => {
  let x = ((t.start - startDate.getTime()) / cellMs) * CELL_WIDTH
  if (x > MAX_SAFE_X) x = MAX_SAFE_X
  let width = ((t.end - t.start) / cellMs) * CELL_WIDTH
  if (width < MIN_TASK_WIDTH) {
    if (taskMinWidthAlign === 'end') x -= MIN_TASK_WIDTH - width
    width = MIN_TASK_WIDTH
  } else if (width > MAX_SAFE_X) width = MAX_SAFE_X
  return { x, width }
}
