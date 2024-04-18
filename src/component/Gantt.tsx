import React from 'react'
import { getDayOfWeek } from '../util/ganttUtils'
import { Locale } from '../util/types'
import './styles.css'
type TaskDate = Date | number
type Task = {
  id: string
  name: string
  start: TaskDate
  end: TaskDate
  dependencies?: string[]
}

type GanntProps = {
  tasks: Task[]
  locale?: Locale
  theme?: 'light' | 'dark'
  scale?: 'days' | 'hours'
}
type TaskGraph = {
  index: number
  task: Task
  start: number
  end: number

  dependencies: TaskGraph[]

  x?: number
  y?: number
  width?: number
}
const cellWidth = 30
const cellHeight = 40
const leftPadding = 15
const hourMs = 60 * 60 * 1000
const dayMs = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds

export const Gantt = ({ tasks, locale = 'en', theme = 'light', scale = 'days' }: GanntProps) => {
  const cellMs = scale == 'hours' ? hourMs : dayMs

  const taskGraphMap: Map<string, TaskGraph> = tasks.reduce((acc, task, index) => {
    return acc.set(task.id, {
      index,
      task: task,
      start: task.start instanceof Date ? task.start.getTime() : task.start,
      end: task.end instanceof Date ? task.end.getTime() : task.end,
      dependencies: [],
    })
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
  const startDate = new Date(lowestTaskStartDate.getFullYear(), lowestTaskStartDate.getMonth(), 1, 0, 0, 0, 0)
  const highestTaskEndDate = new Date(highestTaskGraphEnd.end)
  const endDate = new Date(
    new Date(highestTaskEndDate.getFullYear(), highestTaskEndDate.getMonth() + 1, 1, 0, 0, 0, 0).getTime() - 0.001,
  )

  const DaysRow = ({ y }: { y: number }) => {
    const day = new Date(startDate)
    const res = []
    let curX = leftPadding
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
    const day = new Date(startDate)
    const res = []
    let curX = leftPadding
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
  const Dependencies = ({ y }: { y: number }) => {
    return taskGraphArr.map((t) => {
      if (t.dependencies.length === 0) return null
      return t.dependencies.map((tD) => {
        const taskStartX = ((t.start - startDate.getTime()) / cellMs) * cellWidth
        const taskY = y + t.index * cellHeight + cellHeight / 2

        const depEndX = ((tD.start - startDate.getTime() + tD.end - tD.start) / cellMs) * cellWidth
        const depY = y + tD.index * cellHeight + cellHeight / 2
        const isTaskHigher = t.index < tD.index
        const h2 = taskStartX - depEndX - 20
        const v1Text = `v ${isTaskHigher ? '-' : ''}${cellHeight / 2}`
        const h2Text = `h ${taskStartX - depEndX - 20}`
        return (
          <g key={t.task.id}>
            <path
              stroke='grey'
              fill='none'
              strokeWidth={1.5}
              d={`M ${depEndX} ${depY} 
							h 10
							${h2 > 0 ? h2Text + v1Text : v1Text + h2Text}
							v ${cellHeight * (t.index - tD.index) + ((isTaskHigher ? 1 : -1) * cellHeight) / 2}
							h 10 `}
            />
            <polygon
              fill='grey'
              points={`${taskStartX},${taskY}
								${taskStartX - 5},${taskY - 5}
								${taskStartX - 5},${taskY + 5}`}
            />
          </g>
        )
      })
    })
  }
  const TaskRowsTimePeriods = ({ y }: { y: number }) => {
    return (
      <g>
        {taskGraphArr.map((t, taskIndex) => {
          const x = ((t.start - startDate.getTime()) / cellMs) * cellWidth
          const width = ((t.end - t.start) / cellMs) * cellWidth
          return (
            <rect
              key={`${t.task.id}`}
              className='task-rect'
              x={x}
              y={y + taskIndex * cellHeight + 7}
              width={width}
              height={cellHeight - 14}
              ry={3}
              rx={3}
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
    let cellIndex = 0

    while (currentCellMs < endDate.getTime() + cellMs) {
      const fill =
        scale === 'days' && getDayOfWeek(new Date(currentCellMs)) === 'S'
          ? '#f5f5f5'
          : scale === 'hours' && cellIndex % 2 === 1
          ? '#f5f5f5'
          : '#fff'
      res.push(
        <rect key={currentCellMs} x={curX} y={y} width={cellWidth} height={cellHeight * tasks.length} fill={fill} />,
      )
      cellIndex++
      curX += cellWidth
      currentCellMs += cellMs
    }
    return <g>{res}</g>
  }
  const TimeGrid = () => {
    const columnsCount = (endDate.getTime() - startDate.getTime()) / cellMs
    const timeLineWidth = cellWidth * columnsCount
    const timeGridHeight = cellHeight * tasks.length + 10
    return (
      <div style={{ overflowX: 'scroll' }}>
        <svg width={timeLineWidth + leftPadding / 2} height={timeGridHeight + cellHeight}>
          <DaysRow y={cellHeight / 2} />
          <DaysOfTheWeekRow y={cellHeight} />
          <Cells y={cellHeight + 10} />
          <RowLines
            y={cellHeight + 10}
            amount={tasks.length + 1}
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
    <div id='gantt-container' className={`react-gantt-accurate ${theme}`}>
      <div className='gantt-grid-container'>
        <div className='gantt-grid-container__tasks' style={{ marginTop: `${cellHeight + 10}px` }}>
          {tasks.map((task) => (
            <div key={task.id} className='gantt-task-row' style={{ height: `${cellHeight}px` }}>
              {task.name}
            </div>
          ))}
        </div>
        <TimeGrid />
      </div>
    </div>
  )
}
