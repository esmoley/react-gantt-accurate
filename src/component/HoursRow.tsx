import React from 'react'
import { HOUR_MS, LEFT_PADDING } from '../util/consts'

type HoursRowProps = {
  y: number
  startDate: Date
  endDate: Date
  cellMs: number
  timeLineWidth: number
  cellWidth: number
}

export const HoursRow = ({ y, startDate, endDate, cellMs, timeLineWidth, cellWidth }: HoursRowProps) => {
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
    curX += ((HOUR_MS - hoursDiff) / cellMs) * cellWidth
    hour.setHours(hour.getHours() + 1)
  }

  while (hour.getTime() < endDate.getTime() && curX < timeLineWidth) {
    res.push(
      <text key={hour.valueOf()} y={y} x={curX} className='days-row'>
        {hour.getHours()}
      </text>,
    )
    curX += (HOUR_MS / cellMs) * cellWidth
    hour.setHours(hour.getHours() + 1)
  }
  return <g>{res}</g>
}
