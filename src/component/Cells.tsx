import React from 'react'
import { COLUMNS_MAX } from '../util/consts'
import { Row, ViewModeType } from '../util/types'
import { getDayOfWeek } from '../util/ganttUtils'

type CellsProps = {
  rows: Row[]
  y: number
  startDate: Date
  endDate: Date
  cellMs: number
  viewMode: ViewModeType
  rowHeight: number
  cellWidth: number
}
export const Cells = ({ rows, y, startDate, endDate, cellMs, viewMode, rowHeight, cellWidth }: CellsProps) => {
  const res = []
  let currentCellMs = startDate.getTime()
  let curX = 0
  let columnsCount = 0
  while (currentCellMs < endDate.getTime() + cellMs && columnsCount++ < COLUMNS_MAX) {
    const currentDate = new Date(currentCellMs)
    res.push(
      rows.map((row, i) => (
        <rect
          key={currentCellMs + '_' + i}
          x={curX}
          y={y + rowHeight * i}
          width={cellWidth}
          height={rowHeight}
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
    curX += cellWidth
    currentCellMs += cellMs
  }
  return <g>{res}</g>
}
