import React from 'react'
import { CELL_WIDTH, LEFT_PADDING, MINUTE_MS } from '../util/consts'

type MinutesRowProps = {
  y: number
  startDate: Date
  endDate: Date
  cellMs: number
}
export const MinutesRow = ({ y, startDate, endDate, cellMs }: MinutesRowProps) => {
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
    curX += ((MINUTE_MS - minutesDiff) / cellMs) * CELL_WIDTH
    minute.setMinutes(minute.getMinutes() + 1)
  }
  while (minute.getTime() < endDate.getTime()) {
    res.push(
      <text key={minute.valueOf()} y={y} x={curX} className='days-row'>
        {minute.getMinutes()}
      </text>,
    )
    curX += (MINUTE_MS / cellMs) * CELL_WIDTH
    minute.setMinutes(minute.getMinutes() + 1)
  }
  return <g>{res}</g>
}
