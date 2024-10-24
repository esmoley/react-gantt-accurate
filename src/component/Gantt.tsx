import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  calcViewMode,
  getCellMs,
  getEndDate,
  getNoDataText,
  getStartDate,
  getViewModeSelectOptions,
} from '../util/ganttUtils'
import { DependencyTask, LocaleType, Row, TaskGraph, TaskMinWidthAlignType, ViewModeType } from '../util/types'
import './styles.css'
import { TimeGrid } from './TimeGrid'
import { TaskTooltip } from './TaskTooltip'
import { CELL_WIDTH } from '../util/consts'

type GanntProps = {
  rows?: Row[]
  locale?: LocaleType
  theme?: 'light' | 'dark'
  viewMode?: ViewModeType | 'auto'
  namesPanelWidth?: number
  namesPanelTextAlign?: React.CSSProperties['textAlign']
  taskMinWidthAlign?: TaskMinWidthAlignType
  rowHeight?: number
  hideViewModePicker?: boolean
}
export const Gantt = ({
  rows = [],
  locale = 'en',
  theme = 'light',
  viewMode = 'auto',
  namesPanelWidth = 150,
  namesPanelTextAlign = 'center',
  taskMinWidthAlign = 'start',
  rowHeight = 40,
  hideViewModePicker = false,
}: GanntProps) => {
  const [taskTooltipId, setTaskTooltipId] = useState('')
  const [taskTooltipTop, setTaskTooltipTop] = useState(150)
  const [taskTooltipShow, setTaskTooltipShow] = useState(false)
  const [taskTooltipContent, setTaskTooltipContent] = useState<string | JSX.Element>(null)
  const [taskTooltipTaskX, setTaskTooltipTaskX] = useState<number>(0)
  const [taskTooltipTaskWidth, setTaskTooltipTaskWidth] = useState<number>(0)
  const [taskTooltipMouseOver, setTaskTooltipMouseOver] = useState<boolean>(false)
  const timePeriodHeight = rowHeight - 14
  const timeGridRef = useRef<HTMLDivElement>(null)
  const taskGraphMap: Map<string, TaskGraph> = useMemo(
    () =>
      rows?.reduce((accRows, row, rowIndex) => {
        const res = row.tasks.reduce((acc, task, index) => {
          return acc.set(task.id, {
            rowIndex,
            index,
            task: task,
            start:
              typeof task.start === 'number'
                ? task.start
                : task.start instanceof Date
                ? task.start.getTime()
                : new Date(task.start).getTime(),
            end:
              typeof task.end === 'number'
                ? task.end
                : task.end instanceof Date
                ? task.end.getTime()
                : new Date(task.end).getTime(),
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
  const lowestTaskStartTs = lowestTaskGraphStart?.start ?? 0
  const highestTaskEndTs = highestTaskGraphEnd?.end ?? 0

  const lowestTaskStartDate = new Date(lowestTaskStartTs)
  const highestTaskEndDate = new Date(highestTaskEndTs)

  const [viewModeActual, setViewModeActual] = useState<ViewModeType>(
    calcViewMode(lowestTaskStartTs, highestTaskEndTs, viewMode),
  )
  const startDate = getStartDate(lowestTaskStartDate, viewModeActual)

  const endDate = getEndDate(highestTaskEndDate, viewModeActual)
  const cellMs = getCellMs(viewModeActual)
  useEffect(() => {
    if (!timeGridRef.current) return null
    const onResize = () => {
      setViewModeActual(
        calcViewMode(
          lowestTaskStartTs,
          highestTaskEndTs,
          viewMode,
          Math.floor(timeGridRef.current.getBoundingClientRect().width / CELL_WIDTH),
        ),
      )
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [timeGridRef, lowestTaskStartTs, highestTaskEndTs, viewMode])
  return (
    <div className={`react-gantt-accurate ${theme}`} style={{ position: 'relative' }}>
      <div className='gantt-grid-container' style={{ gridTemplateColumns: `${namesPanelWidth}px 1fr` }}>
        {rows.length ? (
          <>
            <div className='gantt-grid-container__tasks'>
              <div className='gantt-task-row-top' style={{ height: `${rowHeight + 9}px` }}>
                {!hideViewModePicker && (
                  <select
                    value={viewModeActual}
                    onChange={(val) => setViewModeActual(val.currentTarget.value as ViewModeType)}
                  >
                    {Object.entries(getViewModeSelectOptions(locale)).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              {rows.map((row, index) => (
                <div key={index} className='gantt-task-row' style={{ height: `${rowHeight}px` }}>
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
              viewMode={viewModeActual}
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
              rowHeight={rowHeight}
              timePeriodHeight={timePeriodHeight}
              timeGridRef={timeGridRef}
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
        rowHeight={rowHeight}
        timeGridRef={timeGridRef}
      />
    </div>
  )
}
