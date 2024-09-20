import React from 'react'
import { CELL_WIDTH, COLUMNS_MAX, LEFT_PADDING } from '../util/consts'
import { LocaleType, Row, TaskGraph, TaskMinWidthAlignType, ViewModeType } from '../util/types'
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

type TimeGridProps = {
  rows: Row[]
  startDate: Date
  endDate: Date
  cellMs: number
  viewMode: ViewModeType
  locale: LocaleType
  taskGraphArr: TaskGraph[]
  namesPanelWidth: number
  taskTooltipId: string
  setTaskTooltipId: React.Dispatch<React.SetStateAction<string>>
  setTaskTooltipTop: React.Dispatch<React.SetStateAction<number>>
  taskTooltipShow: boolean
  setTaskTooltipShow: React.Dispatch<React.SetStateAction<boolean>>
  taskTooltipMouseOver: boolean
  setTaskTooltipContent: React.Dispatch<React.SetStateAction<string | JSX.Element>>
  setTaskTooltipTaskX: React.Dispatch<React.SetStateAction<number>>
  setTaskTooltipTaskWidth: React.Dispatch<React.SetStateAction<number>>
  taskMinWidthAlign: TaskMinWidthAlignType
  rowHeight: number
  timePeriodHeight: number
}
export const TimeGrid = ({
  rows,
  startDate,
  endDate,
  cellMs,
  viewMode,
  locale,
  taskGraphArr,
  namesPanelWidth,
  taskTooltipId,
  setTaskTooltipId,
  setTaskTooltipTop,
  taskTooltipShow,
  setTaskTooltipShow,
  taskTooltipMouseOver,
  setTaskTooltipContent,
  setTaskTooltipTaskX,
  setTaskTooltipTaskWidth,
  taskMinWidthAlign,
  rowHeight,
  timePeriodHeight,
}: TimeGridProps) => {
  const columnsCount = Math.min(COLUMNS_MAX, (endDate.getTime() - startDate.getTime()) / cellMs)
  const timeLineWidth = CELL_WIDTH * columnsCount
  const timeGridHeight = rowHeight * rows.length + 10
  return (
    <div style={{ overflowX: 'auto' }}>
      <svg width={timeLineWidth + LEFT_PADDING / 2} height={timeGridHeight + rowHeight}>
        {viewMode === 'days' && (
          <>
            <DaysRow
              y={rowHeight / 2}
              startDate={startDate}
              endDate={endDate}
              cellMs={cellMs}
              timeLineWidth={timeLineWidth}
            />
            <DaysOfTheWeekRow
              y={rowHeight}
              startDate={startDate}
              endDate={endDate}
              cellMs={cellMs}
              locale={locale}
              timeLineWidth={timeLineWidth}
            />
          </>
        )}
        {viewMode === 'hours' && (
          <>
            <DaysRow
              y={rowHeight / 2}
              startDate={startDate}
              endDate={endDate}
              cellMs={cellMs}
              timeLineWidth={timeLineWidth}
            />
            <HoursRow
              y={rowHeight}
              startDate={startDate}
              endDate={endDate}
              cellMs={cellMs}
              timeLineWidth={timeLineWidth}
            />
          </>
        )}
        {viewMode === 'minutes' && (
          <>
            <HoursRow
              y={rowHeight / 2}
              startDate={startDate}
              endDate={endDate}
              cellMs={cellMs}
              timeLineWidth={timeLineWidth}
            />
            <MinutesRow
              y={rowHeight}
              startDate={startDate}
              endDate={endDate}
              cellMs={cellMs}
              timeLineWidth={timeLineWidth}
            />
          </>
        )}
        {viewMode === 'seconds' && (
          <>
            <MinutesRow
              y={rowHeight / 2}
              startDate={startDate}
              endDate={endDate}
              cellMs={cellMs}
              timeLineWidth={timeLineWidth}
            />
            <SecondsRow
              y={rowHeight}
              startDate={startDate}
              endDate={endDate}
              cellMs={cellMs}
              timeLineWidth={timeLineWidth}
            />
          </>
        )}
        {viewMode === 'milliseconds' && (
          <>
            <SecondsRow
              y={rowHeight / 2}
              startDate={startDate}
              endDate={endDate}
              cellMs={cellMs}
              timeLineWidth={timeLineWidth}
            />
            <MillisecondsRow
              y={rowHeight}
              startDate={startDate}
              endDate={endDate}
              cellMs={cellMs}
              timeLineWidth={timeLineWidth}
            />
          </>
        )}
        <Cells
          y={rowHeight + 10}
          startDate={startDate}
          endDate={endDate}
          cellMs={cellMs}
          viewMode={viewMode}
          rows={rows}
          rowHeight={rowHeight}
        />
        <RowLines y={rowHeight + 10} amount={rows.length + 1} spaceY={rowHeight} width={timeLineWidth + LEFT_PADDING} />
        <ColumnLines
          x={0}
          y={rowHeight + 10}
          amount={columnsCount + 1}
          spaceX={CELL_WIDTH}
          height={timeGridHeight + rowHeight}
        />
        <Dependencies
          y={rowHeight + 10}
          taskGraphArr={taskGraphArr}
          startDate={startDate}
          cellMs={cellMs}
          taskMinWidthAlign={taskMinWidthAlign}
          rowHeight={rowHeight}
        />
        <TaskRowsTimePeriods
          y={rowHeight + 10}
          taskGraphArr={taskGraphArr}
          startDate={startDate}
          cellMs={cellMs}
          namesPanelWidth={namesPanelWidth}
          taskTooltipId={taskTooltipId}
          setTaskTooltipId={setTaskTooltipId}
          setTaskTooltipTop={setTaskTooltipTop}
          taskTooltipShow={taskTooltipShow}
          setTaskTooltipShow={setTaskTooltipShow}
          taskTooltipMouseOver={taskTooltipMouseOver}
          setTaskTooltipContent={setTaskTooltipContent}
          setTaskTooltipTaskX={setTaskTooltipTaskX}
          setTaskTooltipTaskWidth={setTaskTooltipTaskWidth}
          taskMinWidthAlign={taskMinWidthAlign}
          rowHeight={rowHeight}
          timePeriodHeight={timePeriodHeight}
        />
      </svg>
    </div>
  )
}
