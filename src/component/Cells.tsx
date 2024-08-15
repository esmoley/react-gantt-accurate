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
      <rect
        key={currentCellMs}
        x={curX}
        y={y}
        width={CELL_WIDTH}
        height={CELL_HEIGHT * rows.length}
        className={
          (viewMode === 'days' && getDayOfWeek(currentDate) === 'S') ||
          (viewMode === 'hours' && currentDate.getHours() >= 12)
            ? 'cell-rect-secondary'
            : 'cell-rect-primary'
        }
      />,
    )
    curX += CELL_WIDTH
    currentCellMs += cellMs
  }
  return <g>{res}</g>
}
