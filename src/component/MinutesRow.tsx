import React from 'react'
import { LEFT_PADDING, MINUTE_MS } from '../util/consts'

type MinutesRowProps = {
  y: number
  startDate: Date
  endDate: Date
  cellMs: number
  timeLineWidth: number
  cellWidth: number
}
export const MinutesRow = ({ y, startDate, endDate, cellMs, timeLineWidth, cellWidth }: MinutesRowProps) => {
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
  let curX = LEFT_PADDING

  const minutesDiff = startDate.getTime() - minute.getTime()
  if (minutesDiff > 0) {
    curX += ((MINUTE_MS - minutesDiff) / cellMs) * cellWidth
    minute.setMinutes(minute.getMinutes() + 1)
  }
  while (minute.getTime() < endDate.getTime() && curX < timeLineWidth) {
    res.push(
      <text key={minute.valueOf()} y={y} x={curX} className='days-row'>
        {minute.getMinutes()}
      </text>,
    )
    curX += (MINUTE_MS / cellMs) * cellWidth
    minute.setMinutes(minute.getMinutes() + 1)
  }
  return <g>{res}</g>
}
