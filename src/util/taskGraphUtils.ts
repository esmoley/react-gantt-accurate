import { CELL_WIDTH, MIN_TASK_WIDTH } from './consts'
import { TaskGraph, TaskGraphRowPos, TaskMinWidthAlignType } from './types'

export const getTaskGraphRowPos = (
  t: TaskGraph,
  startDate: Date,
  cellMs: number,
  taskMinWidthAlign: TaskMinWidthAlignType,
): TaskGraphRowPos => {
  let x = ((t.start - startDate.getTime()) / cellMs) * CELL_WIDTH
  let width = ((t.end - t.start) / cellMs) * CELL_WIDTH
  if (width < MIN_TASK_WIDTH) {
    if (taskMinWidthAlign === 'end') x -= MIN_TASK_WIDTH - width
    width = MIN_TASK_WIDTH
  }
  return { x, width }
}
