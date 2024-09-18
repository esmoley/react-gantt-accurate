import React, { useEffect, useState } from 'react'
import { TaskGraph, TaskMinWidthAlignType } from '../util/types'
import { getTaskGraphRowPos } from '../util/taskGraphUtils'

type TaskRowsTimePeriodsProps = {
  y: number
  taskGraphArr: TaskGraph[]
  startDate: Date
  cellMs: number
  namesPanelWidth: number
  taskTooltipId: string
  setTaskTooltipId: React.Dispatch<React.SetStateAction<string>>
  setTaskTooltipTop: React.Dispatch<React.SetStateAction<number>>
  taskTooltipShow: boolean
  setTaskTooltipShow: React.Dispatch<React.SetStateAction<boolean>>
  taskTooltipMouseOver: boolean
  setTaskTooltipContent: React.Dispatch<React.SetStateAction<string | JSX.Element>>
  setTaskTooltipTaskX: React.Dispatch<React.SetStateAction<number>>
  setTaskTooltipTaskWidth: React.Dispatch<React.SetStateAction<number>>
  taskMinWidthAlign: TaskMinWidthAlignType
  rowHeight: number
  timePeriodHeight: number
}

export const TaskRowsTimePeriods = ({
  y,
  taskGraphArr,
  startDate,
  cellMs,
  namesPanelWidth,
  taskTooltipId,
  setTaskTooltipId,
  setTaskTooltipTop,
  taskTooltipShow,
  setTaskTooltipShow,
  taskTooltipMouseOver,
  setTaskTooltipContent,
  setTaskTooltipTaskX,
  setTaskTooltipTaskWidth,
  taskMinWidthAlign,
  rowHeight,
  timePeriodHeight,
}: TaskRowsTimePeriodsProps) => {
  const [mouseOverTask, setMouseOverTask] = useState<TaskGraph>(null)
  useEffect(() => {
    if (taskTooltipShow && !mouseOverTask && !taskTooltipMouseOver) {
      setTaskTooltipShow(false)
    }
  }, [taskTooltipMouseOver, mouseOverTask, taskTooltipShow, setTaskTooltipShow])
  return (
    <g>
      {taskGraphArr.map((t) => {
        const { x, width } = getTaskGraphRowPos(t, startDate, cellMs, taskMinWidthAlign)
        const curY = y + t.rowIndex * rowHeight + 7
        return (
          <rect
            key={`${t.task.id}`}
            fill={t?.task.color ?? '#91bbfe'}
            x={x}
            y={curY}
            width={width}
            height={timePeriodHeight}
            ry={3}
            rx={3}
            style={{
              cursor: t.task.tooltip || t.task.onClick ? 'pointer' : 'default',
            }}
            className={`task-rect${t.task.onClick ? ' onclick' : ''}`}
            onPointerEnter={() => {
              if (!t.task.tooltip || (taskTooltipShow && taskTooltipId === t.task.id)) return
              setTaskTooltipId(t.task.id)
              setTaskTooltipTop(curY + timePeriodHeight / 2)
              setTaskTooltipShow(true)
              setTaskTooltipContent(t.task.tooltip)
              setTaskTooltipTaskX(namesPanelWidth + x)
              setTaskTooltipTaskWidth(width)
              setMouseOverTask(t)
            }}
            onPointerLeave={() => {
              setMouseOverTask(null)
            }}
            onClick={t.task.onClick}
          />
        )
      })}
    </g>
  )
}
