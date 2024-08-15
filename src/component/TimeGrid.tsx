import React from 'react'
import { CELL_HEIGHT, CELL_WIDTH, LEFT_PADDING } from '../util/consts'
import { LocaleType, Row, TaskGraph, ViewModeType } from '../util/types'
import { DaysRow } from './DaysRow'
import { DaysOfTheWeekRow } from './DaysOfTheWeekRow'
import { HoursRow } from './HoursRow'
import { MinutesRow } from './MinutesRow'
import { SecondsRow } from './SecondsRow'
import { MillisecondsRow } from './MillisecondsRow'
import { Cells } from './Cells'
import { RowLines } from './RowLines'
import { ColumnLines } from './ColumnLines'
import { Dependencies } from './Dependencies'
import { TaskRowsTimePeriods } from './TaskRowsTimePeriods'
import { TaskTooltipProps } from './TaskTooltip'

type TimeGridProps = {
  rows: Row[]
  startDate: Date
  endDate: Date
  cellMs: number
  viewMode: ViewModeType
  locale: LocaleType
  taskGraphArr: TaskGraph[]
  taskTooltipProps: TaskTooltipProps
  setTaskTooltipProps: React.Dispatch<React.SetStateAction<TaskTooltipProps>>
  namesPanelWidth: number
}
export const TimeGrid = ({
  rows,
  startDate,
  endDate,
  cellMs,
  viewMode,
  locale,
  taskGraphArr,
  taskTooltipProps,
  setTaskTooltipProps,
  namesPanelWidth,
}: TimeGridProps) => {
  const columnsCount = (endDate.getTime() - startDate.getTime()) / cellMs
  const timeLineWidth = CELL_WIDTH * columnsCount
  const timeGridHeight = CELL_HEIGHT * rows.length + 10
  return (
    <div style={{ overflowX: 'auto' }}>
      <svg width={timeLineWidth + LEFT_PADDING / 2} height={timeGridHeight + CELL_HEIGHT}>
        {viewMode === 'days' && (
          <>
            <DaysRow y={CELL_HEIGHT / 2} startDate={startDate} endDate={endDate} cellMs={cellMs} />
            <DaysOfTheWeekRow y={CELL_HEIGHT} startDate={startDate} endDate={endDate} cellMs={cellMs} locale={locale} />
          </>
        )}
        {viewMode === 'hours' && (
          <>
            <DaysRow y={CELL_HEIGHT / 2} startDate={startDate} endDate={endDate} cellMs={cellMs} />
            <HoursRow y={CELL_HEIGHT} startDate={startDate} endDate={endDate} cellMs={cellMs} />
          </>
        )}
        {viewMode === 'minutes' && (
          <>
            <HoursRow y={CELL_HEIGHT / 2} startDate={startDate} endDate={endDate} cellMs={cellMs} />
            <MinutesRow y={CELL_HEIGHT} startDate={startDate} endDate={endDate} cellMs={cellMs} />
          </>
        )}
        {viewMode === 'seconds' && (
          <>
            <MinutesRow y={CELL_HEIGHT / 2} startDate={startDate} endDate={endDate} cellMs={cellMs} />
            <SecondsRow y={CELL_HEIGHT} startDate={startDate} endDate={endDate} cellMs={cellMs} />
          </>
        )}
        {viewMode === 'milliseconds' && (
          <>
            <SecondsRow y={CELL_HEIGHT / 2} startDate={startDate} endDate={endDate} cellMs={cellMs} />
            <MillisecondsRow y={CELL_HEIGHT} startDate={startDate} endDate={endDate} cellMs={cellMs} />
          </>
        )}
        <Cells
          y={CELL_HEIGHT + 10}
          startDate={startDate}
          endDate={endDate}
          cellMs={cellMs}
          viewMode={viewMode}
          rows={rows}
        />
        <RowLines
          y={CELL_HEIGHT + 10}
          amount={rows.length + 1}
          spaceY={CELL_HEIGHT}
          width={timeLineWidth + LEFT_PADDING}
        />
        <ColumnLines
          x={0}
          y={CELL_HEIGHT + 10}
          amount={columnsCount + 1}
          spaceX={CELL_WIDTH}
          height={timeGridHeight + CELL_HEIGHT}
        />
        <Dependencies y={CELL_HEIGHT + 10} taskGraphArr={taskGraphArr} startDate={startDate} cellMs={cellMs} />
        <TaskRowsTimePeriods
          y={CELL_HEIGHT + 10}
          taskGraphArr={taskGraphArr}
          startDate={startDate}
          cellMs={cellMs}
          taskTooltipProps={taskTooltipProps}
          setTaskTooltipProps={setTaskTooltipProps}
          namesPanelWidth={namesPanelWidth}
        />
      </svg>
    </div>
  )
}
