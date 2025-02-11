import React from 'react'
import { TaskGraph, TaskMinWidthAlignType } from '../util/types'
import { getTaskGraphRowPos } from '../util/taskGraphUtils'

type DependenciesProps = {
  y: number
  taskGraphArr: TaskGraph[]
  startDate: Date
  cellMs: number
  taskMinWidthAlign: TaskMinWidthAlignType
  rowHeight: number
  cellWidth: number
}
export const Dependencies = ({
  y,
  taskGraphArr,
  startDate,
  cellMs,
  taskMinWidthAlign,
  rowHeight,
  cellWidth,
}: DependenciesProps) => {
  let depsOffset = 0
  return taskGraphArr.map((t) => {
    if (t.dependencies.length === 0) return null
    return t.dependencies.map((dependencyTask) => {
      const value = dependencyTask
      const { x: taskStartX, width: taskWidth } = getTaskGraphRowPos(t, startDate, cellMs, taskMinWidthAlign, cellWidth)
      const taskEndX = taskStartX + taskWidth
      const taskY = y + t.rowIndex * rowHeight + rowHeight / 2

      const { x: depStartX, width: depWidth } = getTaskGraphRowPos(
        value,
        startDate,
        cellMs,
        taskMinWidthAlign,
        cellWidth,
      )
      const depEndX = depStartX + depWidth
      const depY = y + value.rowIndex * rowHeight + rowHeight / 2
      const isTaskHigher = t.rowIndex < value.rowIndex
      const isSameRow = t.rowIndex === value.rowIndex
      const onClick = dependencyTask.dependencyObj?.onClick
      depsOffset += 3
      if (depsOffset >= 15) depsOffset -= 14
      return (
        <g key={t.task.id} className={`arrow${onClick ? ' onclick' : ''}`} onClick={onClick}>
          <path
            fill='none'
            strokeWidth={1.5}
            d={
              isSameRow
                ? taskStartX > depEndX
                  ? `M ${depEndX} ${depY} h ${taskStartX - depEndX + depsOffset}`
                  : `M ${taskEndX} ${depY} h ${depStartX - taskEndX + depsOffset}`
                : `M ${depEndX} ${depY} 
              h ${10}
              ${
                taskStartX - depEndX - 20 > 0
                  ? `h ${taskStartX - depEndX - 20} v ${isTaskHigher ? '-' : ''}${rowHeight / 2}`
                  : `v ${isTaskHigher ? '-' : ''}${rowHeight / 2} h ${taskStartX - depEndX - 20 - depsOffset}`
              }
              v ${rowHeight * (t.rowIndex - value.rowIndex) + ((isTaskHigher ? 1 : -1) * rowHeight) / 2}
              h ${10 + depsOffset} `
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
