import React from 'react'
import { CELL_HEIGHT, CELL_WIDTH } from '../util/consts'
import { Row, ViewModeType } from '../util/types'
import { getDayOfWeek } from '../util/ganttUtils'

type CellsProps = {
  rows: Row[]
  y: number
  startDate: Date
  endDate: Date
  cellMs: number
  viewMode: ViewModeType
}
export const Cells = ({ rows, y, startDate, endDate, cellMs, viewMode }: CellsProps) => {
  const res = []
  let currentCellMs = startDate.getTime()
  let curX = 0
  while (currentCellMs < endDate.getTime() + cellMs) {
    const currentDate = new Date(currentCellMs)
    res.push(
      rows.map((row, i) => (
        <rect
          key={currentCellMs + '_' + i}
          x={curX}
          y={y + CELL_HEIGHT * i}
          width={CELL_WIDTH}
          height={CELL_HEIGHT}
          className={
            (viewMode === 'days' && getDayOfWeek(currentDate) === 'S') ||
            (viewMode === 'hours' && currentDate.getHours() >= 12)
              ? 'cell-rect-secondary'
              : 'cell-rect-primary'
          }
          style={row.style}
        />
      )),
    )
    curX += CELL_WIDTH
    currentCellMs += cellMs
  }
  return <g>{res}</g>
}
