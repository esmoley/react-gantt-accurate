import React from 'react'
import { CELL_WIDTH, HOUR_MS, LEFT_PADDING } from '../util/consts'

type HoursRowProps = {
  y: number
  startDate: Date
  endDate: Date
  cellMs: number
}

export const HoursRow = ({ y, startDate, endDate, cellMs }: HoursRowProps) => {
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
  let curX = LEFT_PADDING

  const hoursDiff = startDate.getTime() - hour.getTime()
  if (hoursDiff > 0) {
    curX += ((HOUR_MS - hoursDiff) / cellMs) * CELL_WIDTH
    hour.setHours(hour.getHours() + 1)
  }

  while (hour.getTime() < endDate.getTime()) {
    res.push(
      <text key={hour.valueOf()} y={y} x={curX} className='days-row'>
        {hour.getHours()}
      </text>,
    )
    curX += (HOUR_MS / cellMs) * CELL_WIDTH
    hour.setHours(hour.getHours() + 1)
  }
  return <g>{res}</g>
}
