import React, { useState } from 'react'
import { getNoDataText } from '../util/ganttUtils'
import { DependencyTask, LocaleType, Row, TaskGraph, ViewModeType } from '../util/types'
import './styles.css'
import { CELL_HEIGHT, DAY_MS, HOUR_MS, MILLISECOND_MS, MINUTE_MS, SECOND_MS } from '../util/consts'
import { TimeGrid } from './TimeGrid'
import { TaskTooltip, TaskTooltipProps } from './TaskTooltip'

type GanntProps = {
  rows?: Row[]
  locale?: LocaleType
  theme?: 'light' | 'dark'
  viewMode?: ViewModeType
  namesPanelWidth?: number
  namesPanelTextAlign?: React.CSSProperties['textAlign']
}
export const Gantt = ({
  rows = [],
  locale = 'en',
  theme = 'light',
  viewMode = 'days',
  namesPanelWidth = 150,
  namesPanelTextAlign = 'center',
}: GanntProps) => {
  const [taskTooltipProps, setTaskTooltipProps] = useState<TaskTooltipProps>({
    id: '',
    top: 150,
    show: false,
    content: null,
    taskX: 0,
    taskWidth: 0,
  })
  const cellMs =
    viewMode === 'hours'
      ? HOUR_MS
      : viewMode === 'minutes'
      ? MINUTE_MS
      : viewMode === 'seconds'
      ? SECOND_MS
      : viewMode === 'milliseconds'
      ? MILLISECOND_MS
      : DAY_MS
  const taskGraphMap: Map<string, TaskGraph> = rows?.reduce((accRows, row, rowIndex) => {
    return row.tasks.reduce((acc, task, index) => {
      return acc.set(task.id, {
        rowIndex,
        index,
        task: task,
        start: task.start instanceof Date ? task.start.getTime() : task.start,
        end: task.end instanceof Date ? task.end.getTime() : task.end,
        dependencies: [],
      })
    }, accRows)
  }, new Map<string, TaskGraph>())

  const taskGraphArr: TaskGraph[] = Array.from(taskGraphMap.values())
  //udpate deps
  taskGraphMap.forEach((t) =>
    t.task.dependencies?.forEach((dependency: string | DependencyTask) => {
      const dependencyObj: DependencyTask =
        typeof dependency === 'string'
          ? {
              id: dependency,
            }
          : dependency
      taskGraphMap.has(dependencyObj.id) &&
        t.dependencies.push({
          ...taskGraphMap.get(dependencyObj.id),
          dependencyObj,
        })
    }),
  )
  const lowestTaskGraphStart: TaskGraph = taskGraphArr.reduce(
    (acc, task) => (task.start < acc.start ? task : acc),
    taskGraphArr.length ? taskGraphArr[0] : null,
  )
  const highestTaskGraphEnd: TaskGraph = taskGraphArr.reduce(
    (acc, task) => (task.end > acc.end ? task : acc),
    taskGraphArr.length ? taskGraphArr[0] : null,
  )
  const lowestTaskStartDate = new Date(lowestTaskGraphStart?.start ?? 0)

  //#region startDate
  const startDate =
    viewMode === 'hours'
      ? new Date(
          lowestTaskStartDate.getFullYear(),
          lowestTaskStartDate.getMonth(),
          lowestTaskStartDate.getDate(),
          lowestTaskStartDate.getHours() - 1,
          0,
          0,
          0,
        )
      : viewMode === 'minutes'
      ? new Date(
          lowestTaskStartDate.getFullYear(),
          lowestTaskStartDate.getMonth(),
          lowestTaskStartDate.getDate(),
          lowestTaskStartDate.getHours(),
          lowestTaskStartDate.getMinutes() - 1,
          0,
          0,
        )
      : viewMode === 'seconds'
      ? new Date(
          lowestTaskStartDate.getFullYear(),
          lowestTaskStartDate.getMonth(),
          lowestTaskStartDate.getDate(),
          lowestTaskStartDate.getHours(),
          lowestTaskStartDate.getMinutes(),
          lowestTaskStartDate.getSeconds() - 1,
          0,
        )
      : viewMode === 'milliseconds'
      ? new Date(
          lowestTaskStartDate.getFullYear(),
          lowestTaskStartDate.getMonth(),
          lowestTaskStartDate.getDate(),
          lowestTaskStartDate.getHours(),
          lowestTaskStartDate.getMinutes(),
          lowestTaskStartDate.getSeconds(),
          lowestTaskStartDate.getMilliseconds() - 1,
        )
      : new Date(
          lowestTaskStartDate.getFullYear(),
          lowestTaskStartDate.getMonth(),
          lowestTaskStartDate.getDate() === 1 ? 0 : 1,
          0,
          0,
          0,
          0,
        )
  //#endregion startDate
  const highestTaskEndDate = new Date(highestTaskGraphEnd?.end ?? 0)

  //#region endDate
  const endDate =
    viewMode === 'hours'
      ? new Date(
          new Date(
            highestTaskEndDate.getFullYear(),
            highestTaskEndDate.getMonth(),
            highestTaskEndDate.getDate(),
            highestTaskEndDate.getHours() + 2,
            0,
            0,
            0,
          ).getTime() - 0.001,
        )
      : viewMode === 'minutes'
      ? new Date(
          new Date(
            highestTaskEndDate.getFullYear(),
            highestTaskEndDate.getMonth(),
            highestTaskEndDate.getDate(),
            highestTaskEndDate.getHours(),
            highestTaskEndDate.getMinutes() + 2,
            0,
            0,
          ).getTime() - 0.001,
        )
      : viewMode === 'seconds'
      ? new Date(
          new Date(
            highestTaskEndDate.getFullYear(),
            highestTaskEndDate.getMonth(),
            highestTaskEndDate.getDate(),
            highestTaskEndDate.getHours(),
            highestTaskEndDate.getMinutes(),
            highestTaskEndDate.getSeconds() + 2,
            0,
          ).getTime() - 0.001,
        )
      : viewMode === 'milliseconds'
      ? new Date(
          new Date(
            highestTaskEndDate.getFullYear(),
            highestTaskEndDate.getMonth(),
            highestTaskEndDate.getDate(),
            highestTaskEndDate.getHours(),
            highestTaskEndDate.getMinutes(),
            highestTaskEndDate.getSeconds(),
            highestTaskEndDate.getMilliseconds() + 2,
          ).getTime() - 0.001,
        )
      : new Date(highestTaskEndDate.getFullYear(), highestTaskEndDate.getMonth() + 1, 1, 0, 0, 0, 0)
  //#endregion endDate

  return (
    <div className={`react-gantt-accurate ${theme}`} style={{ position: 'relative' }}>
      <div className='gantt-grid-container' style={{ gridTemplateColumns: `${namesPanelWidth}px 1fr` }}>
        {rows.length ? (
          <>
            <div className='gantt-grid-container__tasks'>
              <div className='gantt-task-row-top' style={{ marginTop: `${CELL_HEIGHT + 9}px` }}></div>
              {rows.map((row, index) => (
                <div key={index} className='gantt-task-row' style={{ height: `${CELL_HEIGHT}px` }}>
                  <div
                    style={{
                      maxWidth: `${namesPanelWidth}px`,
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflowX: 'clip',
                      padding: '0 5px',
                      width: '100%',
                      textAlign: namesPanelTextAlign,
                    }}
                    title={row.name}
                  >
                    {row.name}
                  </div>
                </div>
              ))}
            </div>
            <TimeGrid
              rows={rows}
              startDate={startDate}
              endDate={endDate}
              cellMs={cellMs}
              viewMode={viewMode}
              locale={locale}
              taskGraphArr={taskGraphArr}
              taskTooltipProps={taskTooltipProps}
              setTaskTooltipProps={setTaskTooltipProps}
              namesPanelWidth={namesPanelWidth}
            />
          </>
        ) : (
          <div className='gantt-no-data'>{getNoDataText(locale)}</div>
        )}
      </div>
      <TaskTooltip {...taskTooltipProps} />
    </div>
  )
}
