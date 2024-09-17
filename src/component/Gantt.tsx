import React, { useMemo, useState } from 'react'
import { getNoDataText } from '../util/ganttUtils'
import { DependencyTask, LocaleType, Row, TaskGraph, TaskMinWidthAlignType, ViewModeType } from '../util/types'
import './styles.css'
import { CELL_HEIGHT, DAY_MS, HOUR_MS, MILLISECOND_MS, MINUTE_MS, SECOND_MS } from '../util/consts'
import { TimeGrid } from './TimeGrid'
import { TaskTooltip } from './TaskTooltip'

type GanntProps = {
  rows?: Row[]
  locale?: LocaleType
  theme?: 'light' | 'dark'
  viewMode?: ViewModeType
  namesPanelWidth?: number
  namesPanelTextAlign?: React.CSSProperties['textAlign']
  taskMinWidthAlign?: TaskMinWidthAlignType
}
export const Gantt = ({
  rows = [],
  locale = 'en',
  theme = 'light',
  viewMode = 'days',
  namesPanelWidth = 150,
  namesPanelTextAlign = 'center',
  taskMinWidthAlign = 'start',
}: GanntProps) => {
  const [taskTooltipId, setTaskTooltipId] = useState('')
  const [taskTooltipTop, setTaskTooltipTop] = useState(150)
  const [taskTooltipShow, setTaskTooltipShow] = useState(false)
  const [taskTooltipContent, setTaskTooltipContent] = useState<string | JSX.Element>(null)
  const [taskTooltipTaskX, setTaskTooltipTaskX] = useState<number>(0)
  const [taskTooltipTaskWidth, setTaskTooltipTaskWidth] = useState<number>(0)
  const [taskTooltipMouseOver, setTaskTooltipMouseOver] = useState<boolean>(false)

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
  const taskGraphMap: Map<string, TaskGraph> = useMemo(
    () =>
      rows?.reduce((accRows, row, rowIndex) => {
        const res = row.tasks.reduce((acc, task, index) => {
          return acc.set(task.id, {
            rowIndex,
            index,
            task: task,
            start: task.start instanceof Date ? task.start.getTime() : task.start,
            end: task.end instanceof Date ? task.end.getTime() : task.end,
            dependencies: [],
          })
        }, accRows)
        //udpate dependencies
        res.forEach((t) => {
          t.dependencies = []
          t.task.dependencies?.forEach((dependency: string | DependencyTask) => {
            const dependencyObj: DependencyTask =
              typeof dependency === 'string'
                ? {
                    id: dependency,
                  }
                : dependency
            if (res.has(dependencyObj.id)) {
              t.dependencies.push({
                ...res.get(dependencyObj.id),
                dependencyObj,
              })
            }
          })
        })
        return res
      }, new Map<string, TaskGraph>()),
    [rows],
  )

  const taskGraphArr: TaskGraph[] = Array.from(taskGraphMap.values())
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
            />
          </>
        ) : (
          <div className='gantt-no-data'>{getNoDataText(locale)}</div>
        )}
      </div>
      <TaskTooltip
        content={taskTooltipContent}
        mouseOver={taskTooltipMouseOver}
        setMouseOver={setTaskTooltipMouseOver}
        show={taskTooltipShow}
        taskWidth={taskTooltipTaskWidth}
        taskX={taskTooltipTaskX}
        top={taskTooltipTop}
        setTaskTooltipId={setTaskTooltipId}
        setTaskTooltipTop={setTaskTooltipTop}
        setTaskTooltipShow={setTaskTooltipShow}
        setTaskTooltipContent={setTaskTooltipContent}
        setTaskTooltipTaskX={setTaskTooltipTaskX}
        setTaskTooltipTaskWidth={setTaskTooltipTaskWidth}
      />
    </div>
  )
}
