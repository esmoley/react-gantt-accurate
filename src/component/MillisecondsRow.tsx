import React from 'react'
import { LEFT_PADDING, MILLISECOND_MS } from '../util/consts'

type MillisecondsRowProps = {
  y: number
  startDate: Date
  endDate: Date
  cellMs: number
  timeLineWidth: number
  cellWidth: number
}
export const MillisecondsRow = ({ y, startDate, endDate, cellMs, timeLineWidth, cellWidth }: MillisecondsRowProps) => {
  const millisecond = new Date(startDate)
  const res = []
  let curX = LEFT_PADDING
  while (millisecond.getTime() < endDate.getTime() && curX < timeLineWidth) {
    res.push(
      <text key={millisecond.valueOf()} y={y} x={curX} className='days-row'>
        {millisecond.getMilliseconds()}
      </text>,
    )
    curX += (MILLISECOND_MS / cellMs) * cellWidth
    millisecond.setMilliseconds(millisecond.getMilliseconds() + 1)
  }
  return <g>{res}</g>
}
