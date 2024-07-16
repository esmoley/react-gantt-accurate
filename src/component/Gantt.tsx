import React, { useState } from 'react'
import { getDayOfWeek } from '../util/ganttUtils'
import { Locale } from '../util/types'
import './styles.css'
type TaskDate = Date | number
type Task = {
  id: string
  start: TaskDate
  end: TaskDate
  color?: string
  dependencies?: string[]
  tooltip?: string | JSX.Element
}
type Row = {
  name: string
  tasks: Task[]
}

type GanntProps = {
  rows: Row[]
  locale?: Locale
  theme?: 'light' | 'dark'
  viewMode?: 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
  namesPanelWidth?: number
}
type TaskGraph = {
  rowIndex: number
  index: number
  task: Task
  start: number
  end: number
  dependencies: TaskGraph[]
}
const cellWidth = 30
const cellHeight = 40
const leftPadding = 15
const millisecondMs = 1
const secondMs = 1000
const minuteMs = 60 * 1000
const hourMs = 60 * 60 * 1000
const dayMs = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
const timePeriodHeight = cellHeight - 14

type TaskTooltipProps = {
  id: string
  left: number
  top: number
  show: boolean
  content: string | JSX.Element
}
const TaskTooltip = ({ left, top, show, content }: TaskTooltipProps) => {
  if (!show) return <></>
  return (
    <div style={{ left, top, position: 'absolute' }}>
      <div
        style={{
          border: '1px solid black',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'black',
          background: '#fff',
        }}
      >
        {content}
      </div>
    </div>
  )
}
export const Gantt = ({
  rows,
  locale = 'en',
  theme = 'light',
  viewMode = 'days',
  namesPanelWidth = 150,
}: GanntProps) => {
  const [taskTooltipProps, setTaskTooltipProps] = useState<TaskTooltipProps>({
    id: '',
    left: 150,
    top: 150,
    show: false,
    content: null,
  })
  const cellMs =
    viewMode === 'hours'
      ? hourMs
      : viewMode === 'minutes'
      ? minuteMs
      : viewMode === 'seconds'
      ? secondMs
      : viewMode === 'milliseconds'
      ? millisecondMs
      : dayMs
  const taskGraphMap: Map<string, TaskGraph> = rows.reduce((accRows, row, rowIndex) => {
    return row.tasks.reduce((acc, task, index) => {
      return acc.set(task.id, {
        rowIndex,
        index,
        task: task,
        start: task.start instanceof Date ? task.start.getTime() : task.start,
        end: task.end instanceof Date ? task.end.getTime() : task.end,
        dependencies: [],
      })
    }, accRows)
  }, new Map<string, TaskGraph>())

  const taskGraphArr: TaskGraph[] = Array.from(taskGraphMap.values())
  //udpate deps
  taskGraphMap.forEach((t) =>
    t.task.dependencies?.forEach((tDepId) => taskGraphMap.has(tDepId) && t.dependencies.push(taskGraphMap.get(tDepId))),
  )

  const lowestTaskGraphStart: TaskGraph = taskGraphArr.reduce(
    (acc, task) => (task.start < acc.start ? task : acc),
    taskGraphArr[0],
  )
  const highestTaskGraphEnd: TaskGraph = taskGraphArr.reduce(
    (acc, task) => (task.end > acc.end ? task : acc),
    taskGraphArr[0],
  )
  const lowestTaskStartDate = new Date(lowestTaskGraphStart.start)

  //#region startDate
  const startDate =
    viewMode === 'hours'
      ? new Date(
          lowestTaskStartDate.getFullYear(),
          lowestTaskStartDate.getMonth(),
          lowestTaskStartDate.getDate(),
          lowestTaskStartDate.getHours() - 1,
          0,
          0,
          0,
        )
      : viewMode === 'minutes'
      ? new Date(
          lowestTaskStartDate.getFullYear(),
          lowestTaskStartDate.getMonth(),
          lowestTaskStartDate.getDate(),
          lowestTaskStartDate.getHours(),
          lowestTaskStartDate.getMinutes() - 1,
          0,
          0,
        )
      : viewMode === 'seconds'
      ? new Date(
          lowestTaskStartDate.getFullYear(),
          lowestTaskStartDate.getMonth(),
          lowestTaskStartDate.getDate(),
          lowestTaskStartDate.getHours(),
          lowestTaskStartDate.getMinutes(),
          lowestTaskStartDate.getSeconds() - 1,
          0,
        )
      : viewMode === 'milliseconds'
      ? new Date(
          lowestTaskStartDate.getFullYear(),
          lowestTaskStartDate.getMonth(),
          lowestTaskStartDate.getDate(),
          lowestTaskStartDate.getHours(),
          lowestTaskStartDate.getMinutes(),
          lowestTaskStartDate.getSeconds(),
          lowestTaskStartDate.getMilliseconds() - 1,
        )
      : new Date(
          lowestTaskStartDate.getFullYear(),
          lowestTaskStartDate.getMonth(),
          lowestTaskStartDate.getDate() === 1 ? 0 : 1,
          0,
          0,
          0,
          0,
        )
  //#endregion startDate
  const highestTaskEndDate = new Date(highestTaskGraphEnd.end)

  //#region endDate
  const endDate =
    viewMode === 'hours'
      ? new Date(
          new Date(
            highestTaskEndDate.getFullYear(),
            highestTaskEndDate.getMonth(),
            highestTaskEndDate.getDate(),
            highestTaskEndDate.getHours() + 2,
            0,
            0,
            0,
          ).getTime() - 0.001,
        )
      : viewMode === 'minutes'
      ? new Date(
          new Date(
            highestTaskEndDate.getFullYear(),
            highestTaskEndDate.getMonth(),
            highestTaskEndDate.getDate(),
            highestTaskEndDate.getHours(),
            highestTaskEndDate.getMinutes() + 2,
            0,
            0,
          ).getTime() - 0.001,
        )
      : viewMode === 'seconds'
      ? new Date(
          new Date(
            highestTaskEndDate.getFullYear(),
            highestTaskEndDate.getMonth(),
            highestTaskEndDate.getDate(),
            highestTaskEndDate.getHours(),
            highestTaskEndDate.getMinutes(),
            highestTaskEndDate.getSeconds() + 2,
            0,
          ).getTime() - 0.001,
        )
      : viewMode === 'milliseconds'
      ? new Date(
          new Date(
            highestTaskEndDate.getFullYear(),
            highestTaskEndDate.getMonth(),
            highestTaskEndDate.getDate(),
            highestTaskEndDate.getHours(),
            highestTaskEndDate.getMinutes(),
            highestTaskEndDate.getSeconds(),
            highestTaskEndDate.getMilliseconds() + 2,
          ).getTime() - 0.001,
        )
      : new Date(highestTaskEndDate.getFullYear(), highestTaskEndDate.getMonth() + 1, 1, 0, 0, 0, 0)
  //#endregion endDate
  const DaysRow = ({ y }: { y: number }) => {
    const res = []
    const day = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0, 0)
    let curX = leftPadding

    const dayDiff = startDate.getTime() - day.getTime()
    if (dayDiff > 0) {
      curX += ((dayMs - dayDiff) / cellMs) * cellWidth
      day.setDate(day.getDate() + 1)
    }
    while (day.getTime() < endDate.getTime()) {
      res.push(
        <text key={day.valueOf()} y={y} x={curX} className='days-row'>
          {day.getDate()}
        </text>,
      )
      curX += (dayMs / cellMs) * cellWidth
      day.setDate(day.getDate() + 1)
    }
    return <g>{res}</g>
  }
  const DaysOfTheWeekRow = ({ y }: { y: number }) => {
    const res = []
    const day = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0, 0)
    let curX = leftPadding

    const dayDiff = startDate.getTime() - day.getTime()
    if (dayDiff > 0) {
      curX += ((dayMs - dayDiff) / cellMs) * cellWidth
      day.setDate(day.getDate() + 1)
    }
    while (day.getTime() < endDate.getTime()) {
      const dayOfTheWeek = getDayOfWeek(day, locale)
      res.push(
        <text key={day.valueOf()} y={y} x={curX} className='days-row'>
          {dayOfTheWeek}
        </text>,
      )
      curX += (dayMs / cellMs) * cellWidth
      day.setDate(day.getDate() + 1)
    }
    return <g>{res}</g>
  }
  const HoursRow = ({ y }: { y: number }) => {
    const res = []
    const hour = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      startDate.getHours(),
      0,
      0,
      0,
    )
    let curX = leftPadding

    const hoursDiff = startDate.getTime() - hour.getTime()
    if (hoursDiff > 0) {
      curX += ((hourMs - hoursDiff) / cellMs) * cellWidth
      hour.setHours(hour.getHours() + 1)
    }

    while (hour.getTime() < endDate.getTime()) {
      res.push(
        <text key={hour.valueOf()} y={y} x={curX} className='days-row'>
          {hour.getHours()}
        </text>,
      )
      curX += (hourMs / cellMs) * cellWidth
      hour.setHours(hour.getHours() + 1)
    }
    return <g>{res}</g>
  }
  const MinutesRow = ({ y }: { y: number }) => {
    const res = []
    const minute = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      startDate.getHours(),
      startDate.getMinutes(),
      0,
      0,
    )
    let curX = leftPadding

    const minutesDiff = startDate.getTime() - minute.getTime()
    if (minutesDiff > 0) {
      curX += ((minuteMs - minutesDiff) / cellMs) * cellWidth
      minute.setMinutes(minute.getMinutes() + 1)
    }
    while (minute.getTime() < endDate.getTime()) {
      res.push(
        <text key={minute.valueOf()} y={y} x={curX} className='days-row'>
          {minute.getMinutes()}
        </text>,
      )
      curX += (minuteMs / cellMs) * cellWidth
      minute.setMinutes(minute.getMinutes() + 1)
    }
    return <g>{res}</g>
  }
  const SecondsRow = ({ y }: { y: number }) => {
    const res = []
    const second = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      startDate.getHours(),
      startDate.getMinutes(),
      startDate.getSeconds(),
      0,
    )
    let curX = leftPadding

    const secondDiff = startDate.getTime() - second.getTime()
    if (secondDiff > 0) {
      curX += ((secondMs - secondDiff) / cellMs) * cellWidth
      second.setSeconds(second.getSeconds() + 1)
    }
    while (second.getTime() < endDate.getTime()) {
      res.push(
        <text key={second.valueOf()} y={y} x={curX} className='days-row'>
          {second.getSeconds()}
        </text>,
      )
      curX += (secondMs / cellMs) * cellWidth
      second.setSeconds(second.getSeconds() + 1)
    }
    return <g>{res}</g>
  }
  const MillisecondsRow = ({ y }: { y: number }) => {
    const millisecond = new Date(startDate)
    const res = []
    let curX = leftPadding
    while (millisecond.getTime() < endDate.getTime()) {
      res.push(
        <text key={millisecond.valueOf()} y={y} x={curX} className='days-row'>
          {millisecond.getMilliseconds()}
        </text>,
      )
      curX += (millisecondMs / cellMs) * cellWidth
      millisecond.setMilliseconds(millisecond.getMilliseconds() + 1)
    }
    return <g>{res}</g>
  }
  const Dependencies = ({ y }: { y: number }) => {
    return taskGraphArr.map((t) => {
      if (t.dependencies.length === 0) return null
      return t.dependencies.map((tD) => {
        const taskStartX = ((t.start - startDate.getTime()) / cellMs) * cellWidth
        const taskEndX = ((t.start - startDate.getTime() + t.end - t.start) / cellMs) * cellWidth
        const taskY = y + t.rowIndex * cellHeight + cellHeight / 2

        const depStartX = ((tD.start - startDate.getTime()) / cellMs) * cellWidth
        const depEndX = ((tD.start - startDate.getTime() + tD.end - tD.start) / cellMs) * cellWidth
        const depY = y + tD.rowIndex * cellHeight + cellHeight / 2
        const isTaskHigher = t.rowIndex < tD.rowIndex
        const isSameRow = t.rowIndex === tD.rowIndex

        return (
          <g key={t.task.id}>
            <path
              stroke='grey'
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
                    ? `h ${taskStartX - depEndX - 20} v ${isTaskHigher && '-'}${cellHeight / 2}`
                    : `v ${isTaskHigher && '-'}${cellHeight / 2} h ${taskStartX - depEndX - 20}`
                }
                v ${cellHeight * (t.rowIndex - tD.rowIndex) + ((isTaskHigher ? 1 : -1) * cellHeight) / 2}
                h 10 `
              }
            />
            <polygon
              fill='grey'
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
  const TaskRowsTimePeriods = ({ y }: { y: number }) => {
    return (
      <g>
        {taskGraphArr.map((t) => {
          const x = ((t.start - startDate.getTime()) / cellMs) * cellWidth
          const width = ((t.end - t.start) / cellMs) * cellWidth
          const curY = y + t.rowIndex * cellHeight + 7

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
              style={{ cursor: t.task.tooltip ? 'pointer' : 'default' }}
              onMouseOverCapture={() => {
                if (!t.task.tooltip || (taskTooltipProps.show && taskTooltipProps.id === t.task.id)) return
                setTaskTooltipProps({
                  id: t.task.id,
                  left: namesPanelWidth + x + 15 + width,
                  top: curY + timePeriodHeight / 2,
                  show: true,
                  content: t.task.tooltip,
                })
              }}
              onMouseOutCapture={() => setTaskTooltipProps({ id: '', left: 0, top: 0, show: false, content: null })}
            />
          )
        })}
      </g>
    )
  }
  const RowLines = ({ y, width, spaceY, amount }: { y: number; width: number; spaceY: number; amount: number }) => {
    const res = []
    for (let i = 0; i < amount; i++) {
      res.push(<line key={i} x={0} y1={y + spaceY * i} x2={width} y2={y + spaceY * i} />)
    }
    return <g className='cell-line'>{res}</g>
  }
  const ColumnLines = ({
    x,
    y,
    height,
    spaceX,
    amount,
  }: {
    x: number
    y: number
    height: number
    spaceX: number
    amount: number
  }) => {
    const res = []
    for (let i = 0; i < amount; i++) {
      res.push(<line key={i} x1={i * spaceX + x} y1={y} x2={i * spaceX + x} y2={height} />)
    }
    return <g className='cell-line'>{res}</g>
  }
  const Cells = ({ y }: { y: number }) => {
    const res = []
    let currentCellMs = startDate.getTime()
    let curX = 0
    while (currentCellMs < endDate.getTime() + cellMs) {
      const currentDate = new Date(currentCellMs)
      const fill =
        viewMode === 'days' && getDayOfWeek(currentDate) === 'S'
          ? '#f5f5f5'
          : viewMode === 'hours' && currentDate.getHours() >= 12
          ? '#f5f5f5'
          : '#fff'
      res.push(
        <rect key={currentCellMs} x={curX} y={y} width={cellWidth} height={cellHeight * rows.length} fill={fill} />,
      )
      curX += cellWidth
      currentCellMs += cellMs
    }
    return <g>{res}</g>
  }
  const TimeGrid = () => {
    const columnsCount = (endDate.getTime() - startDate.getTime()) / cellMs
    const timeLineWidth = cellWidth * columnsCount
    const timeGridHeight = cellHeight * rows.length + 10
    return (
      <div>
        <svg width={timeLineWidth + leftPadding / 2} height={timeGridHeight + cellHeight}>
          {viewMode === 'days' && (
            <>
              <DaysRow y={cellHeight / 2} />
              <DaysOfTheWeekRow y={cellHeight} />
            </>
          )}
          {viewMode === 'hours' && (
            <>
              <DaysRow y={cellHeight / 2} />
              <HoursRow y={cellHeight} />
            </>
          )}
          {viewMode === 'minutes' && (
            <>
              <HoursRow y={cellHeight / 2} />
              <MinutesRow y={cellHeight} />
            </>
          )}
          {viewMode === 'seconds' && (
            <>
              <MinutesRow y={cellHeight / 2} />
              <SecondsRow y={cellHeight} />
            </>
          )}
          {viewMode === 'milliseconds' && (
            <>
              <SecondsRow y={cellHeight / 2} />
              <MillisecondsRow y={cellHeight} />
            </>
          )}
          <Cells y={cellHeight + 10} />
          <RowLines
            y={cellHeight + 10}
            amount={rows.length + 1}
            spaceY={cellHeight}
            width={timeLineWidth + leftPadding}
          />
          <ColumnLines
            x={0}
            y={cellHeight + 10}
            amount={columnsCount + 1}
            spaceX={cellWidth}
            height={timeGridHeight + cellHeight}
          />
          <Dependencies y={cellHeight + 10} />
          <TaskRowsTimePeriods y={cellHeight + 10} />
        </svg>
      </div>
    )
  }
  return (
    <div className={`react-gantt-accurate ${theme}`} style={{ position: 'relative' }}>
      <div className='gantt-grid-container' style={{ gridTemplateColumns: `${namesPanelWidth}px 1fr` }}>
        <div className='gantt-grid-container__tasks' style={{ marginTop: `${cellHeight + 10}px` }}>
          {rows.map((row, index) => (
            <div key={index} className='gantt-task-row' style={{ height: `${cellHeight}px` }}>
              <div
                style={{
                  maxWidth: `${namesPanelWidth}px`,
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflowX: 'clip',
                }}
                title={row.name}
              >
                {row.name}
              </div>
            </div>
          ))}
        </div>
        <TimeGrid />
      </div>
      <TaskTooltip {...taskTooltipProps} />
    </div>
  )
}
