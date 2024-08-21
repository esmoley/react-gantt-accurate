import React, { useEffect, useState } from 'react'
import { CELL_HEIGHT, CELL_WIDTH, TIME_PERIOD_HEIGHT } from '../util/consts'
import { TaskGraph } from '../util/types'

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
        const x = ((t.start - startDate.getTime()) / cellMs) * CELL_WIDTH
        const width = ((t.end - t.start) / cellMs) * CELL_WIDTH
        const curY = y + t.rowIndex * CELL_HEIGHT + 7
        return (
          <rect
            key={`${t.task.id}`}
            fill={t?.task.color ?? '#91bbfe'}
            x={x}
            y={curY}
            width={width}
            height={TIME_PERIOD_HEIGHT}
            ry={3}
            rx={3}
            style={{
              cursor: t.task.tooltip || t.task.onClick ? 'pointer' : 'default',
            }}
            className={`task-rect${t.task.onClick ? ' onclick' : ''}`}
            onPointerEnter={() => {
              if (!t.task.tooltip || (taskTooltipShow && taskTooltipId === t.task.id)) return
              setTaskTooltipId(t.task.id)
              setTaskTooltipTop(curY + TIME_PERIOD_HEIGHT / 2)
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
