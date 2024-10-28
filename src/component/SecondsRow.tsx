import React from 'react'
import { LEFT_PADDING, SECOND_MS } from '../util/consts'

type SecondsRowProps = {
  y: number
  startDate: Date
  endDate: Date
  cellMs: number
  timeLineWidth: number
  cellWidth: number
}

export const SecondsRow = ({ y, startDate, endDate, cellMs, timeLineWidth, cellWidth }: SecondsRowProps) => {
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
  let curX = LEFT_PADDING

  const secondDiff = startDate.getTime() - second.getTime()
  if (secondDiff > 0) {
    curX += ((SECOND_MS - secondDiff) / cellMs) * cellWidth
    second.setSeconds(second.getSeconds() + 1)
  }
  while (second.getTime() < endDate.getTime() && curX < timeLineWidth) {
    res.push(
      <text key={second.valueOf()} y={y} x={curX} className='days-row'>
        {second.getSeconds()}
      </text>,
    )
    curX += (SECOND_MS / cellMs) * cellWidth
    second.setSeconds(second.getSeconds() + 1)
  }
  return <g>{res}</g>
}
