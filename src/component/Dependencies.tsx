import React from 'react'
import { CELL_HEIGHT } from '../util/consts'
import { TaskGraph, TaskMinWidthAlignType } from '../util/types'
import { getTaskGraphRowPos } from '../util/taskGraphUtils'

type DependenciesProps = {
  y: number
  taskGraphArr: TaskGraph[]
  startDate: Date
  cellMs: number
  taskMinWidthAlign: TaskMinWidthAlignType
}
export const Dependencies = ({ y, taskGraphArr, startDate, cellMs, taskMinWidthAlign }: DependenciesProps) => {
  return taskGraphArr.map((t) => {
    if (t.dependencies.length === 0) return null
    return t.dependencies.map((dependencyTask) => {
      const value = dependencyTask
      const { x: taskStartX, width: taskWidth } = getTaskGraphRowPos(t, startDate, cellMs, taskMinWidthAlign)
      const taskEndX = taskStartX + taskWidth
      const taskY = y + t.rowIndex * CELL_HEIGHT + CELL_HEIGHT / 2

      const { x: depStartX, width: depWidth } = getTaskGraphRowPos(value, startDate, cellMs, taskMinWidthAlign)
      const depEndX = depStartX + depWidth
      const depY = y + value.rowIndex * CELL_HEIGHT + CELL_HEIGHT / 2
      const isTaskHigher = t.rowIndex < value.rowIndex
      const isSameRow = t.rowIndex === value.rowIndex
      const onClick = dependencyTask.dependencyObj?.onClick
      return (
        <g key={t.task.id} className={`arrow${onClick ? ' onclick' : ''}`} onClick={onClick}>
          <path
            fill='none'
            strokeWidth={1.5}
            d={
              isSameRow
                ? taskStartX > depEndX
                  ? `M ${depEndX} ${depY} h ${taskStartX - depEndX}`
                  : `M ${taskEndX} ${depY} h ${depStartX - taskEndX}`
                : `M ${depEndX} ${depY} 
              h 10
              ${
                taskStartX - depEndX - 20 > 0
                  ? `h ${taskStartX - depEndX - 20} v ${isTaskHigher ? '-' : ''}${CELL_HEIGHT / 2}`
                  : `v ${isTaskHigher ? '-' : ''}${CELL_HEIGHT / 2} h ${taskStartX - depEndX - 20}`
              }
              v ${CELL_HEIGHT * (t.rowIndex - value.rowIndex) + ((isTaskHigher ? 1 : -1) * CELL_HEIGHT) / 2}
              h 10 `
            }
          />
          <polygon
            points={
              isSameRow && taskStartX <= depEndX
                ? `${taskEndX},${taskY}
              ${taskEndX + 5},${taskY - 5}
              ${taskEndX + 5},${taskY + 5}`
                : `${taskStartX},${taskY}
              ${taskStartX - 5},${taskY - 5}
              ${taskStartX - 5},${taskY + 5}`
            }
          />
        </g>
      )
    })
  })
}
