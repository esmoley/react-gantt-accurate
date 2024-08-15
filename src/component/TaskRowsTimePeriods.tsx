import React from 'react'
import { CELL_HEIGHT, CELL_WIDTH, TIME_PERIOD_HEIGHT } from '../util/consts'
import { TaskGraph } from '../util/types'
import { TaskTooltipProps } from './TaskTooltip'

type TaskRowsTimePeriodsProps = {
  y: number
  taskGraphArr: TaskGraph[]
  startDate: Date
  cellMs: number
  taskTooltipProps: TaskTooltipProps
  setTaskTooltipProps: React.Dispatch<React.SetStateAction<TaskTooltipProps>>
  namesPanelWidth: number
}

export const TaskRowsTimePeriods = ({
  y,
  taskGraphArr,
  startDate,
  cellMs,
  taskTooltipProps,
  setTaskTooltipProps,
  namesPanelWidth,
}: TaskRowsTimePeriodsProps) => {
  const hideTooltip = () => {
    setTaskTooltipProps({ id: '', top: 0, show: false, content: null, taskX: 0, taskWidth: 0, hideTooltip })
  }

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
            onMouseOverCapture={() => {
              if (!t.task.tooltip || (taskTooltipProps.show && taskTooltipProps.id === t.task.id)) return
              const upd = {
                id: t.task.id,
                top: curY + TIME_PERIOD_HEIGHT / 2,
                show: true,
                content: t.task.tooltip,
                taskX: namesPanelWidth + x,
                taskWidth: width,
                hideTooltip,
              }
              setTaskTooltipProps(upd)
            }}
            onMouseOutCapture={hideTooltip}
            onClick={t.task.onClick}
          />
        )
      })}
    </g>
  )
}
