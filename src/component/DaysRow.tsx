import React from 'react'
import { CELL_WIDTH, DAY_MS, LEFT_PADDING } from '../util/consts'

type DaysRowProps = {
  y: number
  startDate: Date
  endDate: Date
  cellMs: number
  timeLineWidth: number
}

export const DaysRow = ({ y, startDate, endDate, cellMs, timeLineWidth }: DaysRowProps) => {
  const res = []
  const day = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0, 0)
  let curX = LEFT_PADDING

  const dayDiff = startDate.getTime() - day.getTime()
  if (dayDiff > 0) {
    curX += ((DAY_MS - dayDiff) / cellMs) * CELL_WIDTH
    day.setDate(day.getDate() + 1)
  }
  while (day.getTime() < endDate.getTime() && curX < timeLineWidth) {
    res.push(
      <text key={day.valueOf()} y={y} x={curX} className='days-row'>
        {day.getDate()}
      </text>,
    )
    curX += (DAY_MS / cellMs) * CELL_WIDTH
    day.setDate(day.getDate() + 1)
  }
  return <g>{res}</g>
}
