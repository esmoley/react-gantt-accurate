import React from 'react'
import { DAY_MS, LEFT_PADDING } from '../util/consts'
import { getDayOfWeek } from '../util/ganttUtils'
import { LocaleType } from '../util/types'

type DaysOfTheWeekRowProps = {
  y: number
  startDate: Date
  endDate: Date
  cellMs: number
  locale: LocaleType
  timeLineWidth: number
  cellWidth: number
}
export const DaysOfTheWeekRow = ({
  y,
  startDate,
  endDate,
  cellMs,
  locale,
  timeLineWidth,
  cellWidth,
}: DaysOfTheWeekRowProps) => {
  const res = []
  const day = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0, 0)
  let curX = LEFT_PADDING

  const dayDiff = startDate.getTime() - day.getTime()
  if (dayDiff > 0) {
    curX += ((DAY_MS - dayDiff) / cellMs) * cellWidth
    day.setDate(day.getDate() + 1)
  }

  while (day.getTime() < endDate.getTime() && curX < timeLineWidth) {
    const dayOfTheWeek = getDayOfWeek(day, locale)
    res.push(
      <text key={day.valueOf()} y={y} x={curX} className='days-row'>
        {dayOfTheWeek}
      </text>,
    )
    curX += (DAY_MS / cellMs) * cellWidth
    day.setDate(day.getDate() + 1)
  }
  return <g>{res}</g>
}
