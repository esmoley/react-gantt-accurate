import React from 'react'
import { CELL_WIDTH, LEFT_PADDING, MILLISECOND_MS } from '../util/consts'

type MillisecondsRowProps = {
  y: number
  startDate: Date
  endDate: Date
  cellMs: number
  timeLineWidth: number
}
export const MillisecondsRow = ({ y, startDate, endDate, cellMs, timeLineWidth }: MillisecondsRowProps) => {
  const millisecond = new Date(startDate)
  const res = []
  let curX = LEFT_PADDING
  while (millisecond.getTime() < endDate.getTime() && curX < timeLineWidth) {
    res.push(
      <text key={millisecond.valueOf()} y={y} x={curX} className='days-row'>
        {millisecond.getMilliseconds()}
      </text>,
    )
    curX += (MILLISECOND_MS / cellMs) * CELL_WIDTH
    millisecond.setMilliseconds(millisecond.getMilliseconds() + 1)
  }
  return <g>{res}</g>
}
