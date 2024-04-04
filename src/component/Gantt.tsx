import React from 'react'
import './styles.css'
import { calcDayCompletion, dayDiff, getDayOfWeek, getDaysInMonth, monthDiff } from '../util/ganttUtils'
import { Locale } from '../util/types'
type Task = {
  id: string
  name: string
  start: Date
  end: Date
  dependencies?: string[]
}
type GanntProps = {
  tasks: Task[]
  locale?: Locale
}
const cellWidth = 30
const cellHeight = 40
const leftPadding = 15
const dayMs = new Date(0).setDate(2)

export const Gantt = ({ tasks, locale }: GanntProps) => {
  if (!locale) locale = 'en'
  const startMonth = new Date(
    new Date(
      tasks.reduce((acc, task) => {
        if (task.start.getTime() < acc.start.getTime()) return task
        return acc
      }, tasks[0]).start,
    ).setDate(1),
  )
  const endMonth = new Date(
    tasks.reduce((acc, task) => {
      if (task.end.getTime() > acc.end.getTime()) return task
      return acc
    }, tasks[0]).end,
  )
  const monthsAmount = monthDiff(startMonth, endMonth) + 1
  const DaysRow = ({ y }: { y: number }) => {
    const month = new Date(startMonth)
    const res = []
    let curX = leftPadding
    for (let i = 0; i < monthsAmount; i++) {
      // add days as children
      const numDays = getDaysInMonth(month.getFullYear(), month.getMonth() + 1)
      const days = []
      for (let j = i === 0 ? startMonth.getDate() : 1; j <= numDays; j++) {
        days.push(
          <text key={j} y={y} x={curX} className='days-row'>
            {j}
          </text>,
        )
        curX += cellWidth
      }
      res.push(days)
      month.setMonth(month.getMonth() + 1)
    }
    return <g>{res}</g>
  }
  const DaysOfTheWeekRow = ({ y }: { y: number }) => {
    const month = new Date(startMonth)
    const res = []
    let curX = leftPadding
    for (let i = 0; i < monthsAmount; i++) {
      // add days of the week as children
      const currYear = month.getFullYear()
      const currMonth = month.getMonth() + 1
      const numDays = getDaysInMonth(currYear, currMonth)
      const daysInMonthEls = []
      for (let j = i === 0 ? startMonth.getDate() : 1; j <= numDays; j++) {
        const dayOfTheWeek = getDayOfWeek(currYear, currMonth - 1, j - 1, locale)
        daysInMonthEls.push(
          <text key={j} y={y} x={curX} className='days-row'>
            {dayOfTheWeek}
          </text>,
        )
        curX += cellWidth
      }
      res.push(daysInMonthEls)
      month.setMonth(month.getMonth() + 1)
    }
    return <g>{res}</g>
  }
  const Dependencies = () => {
    return tasks.map(
      (task) =>
        task.dependencies && (
          <line
            key={task.id}
            x1='0'
            y1='0'
            x2='200'
            y2='200'
            style={{ fill: 'none', stroke: 'grey', strokeWidth: '1px' }}
          ></line>
        ),
    )
  }
  const TaskRowsTimePeriods = ({ y }: { y: number }) => {
    return (
      <g>
        {tasks.map((task, taskIndex) => {
          const taskFromGridStartMs = task.start.getTime() - startMonth.getTime()
          const days = dayDiff(task.start, task.end)
          const dayComplStart = calcDayCompletion(task.start)
          const dayComplStartWidth = cellWidth * dayComplStart
          const dayComplEnd = calcDayCompletion(task.end)
          return (
            <rect
              key={`${task.id}`}
              className='task-rect'
              x={(taskFromGridStartMs / dayMs) * cellWidth + dayComplStartWidth}
              y={y + taskIndex * cellHeight + 7}
              width={(days - 2 + (1 - dayComplStart) + dayComplEnd) * cellWidth}
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
    const month = new Date(startMonth)
    let curX = 0
    for (let i = 0; i < monthsAmount; i++) {
      const currYear = month.getFullYear()
      const currMonth = month.getMonth() + 1
      const numDays = getDaysInMonth(currYear, currMonth)
      for (let j = i === 0 ? startMonth.getDate() - 1 : 0; j < numDays; j++) {
        const dayOfTheWeek = getDayOfWeek(currYear, currMonth - 1, j)
        if (dayOfTheWeek === 'S') {
          res.push(
            <rect
              key={`${i}_${j}`}
              x={curX}
              y={y}
              width={cellWidth}
              height={cellHeight * tasks.length}
              fill='#f5f5f5'
            ></rect>,
          )
        } else {
          res.push(
            <rect
              key={`${i}_${j}`}
              x={curX}
              y={y}
              width={cellWidth}
              height={cellHeight * tasks.length}
              fill='#fff'
            ></rect>,
          )
        }
        curX += cellWidth
      }
      month.setMonth(month.getMonth() + 1)
    }
    return <g>{res}</g>
  }
  const TimeGrid = () => {
    const month = new Date(startMonth)
    let totalDays = 0
    for (let i = 0; i < monthsAmount; i++) {
      const numDays = getDaysInMonth(month.getFullYear(), month.getMonth() + 1)
      totalDays += i === 0 ? numDays - startMonth.getDate() + 1 : numDays
      month.setMonth(month.getMonth() + 1)
    }
    const timeLineWidth = cellWidth * totalDays
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
            amount={totalDays + 1}
            spaceX={cellWidth}
            height={timeGridHeight + cellHeight}
          />
          <TaskRowsTimePeriods y={cellHeight + 10} />
          <Dependencies />
        </svg>
      </div>
    )
  }
  return (
    <div id='gantt-container' className='react-gantt-accurate'>
      <div id='gantt-grid-container'>
        <div id='gantt-grid-container__tasks' style={{ marginTop: `${cellHeight + 10}px` }}>
          {tasks.map((task) => (
            <div key={task.id}>
              <div className='gantt-task-row' style={{ height: `${cellHeight}px` }}>
                {task.name}
              </div>
            </div>
          ))}
        </div>
        <TimeGrid />
      </div>
    </div>
  )
}
