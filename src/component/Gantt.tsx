import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  zoomVariant?: 'slider' | 'buttons' | 'none'
}
export const Gantt = ({
  rows = [],
  locale = 'en',
  theme = 'light',
  viewMode = 'auto',
  namesPanelWidth = 170,
  namesPanelTextAlign = 'center',
  taskMinWidthAlign = 'start',
  rowHeight = 40,
  hideViewModePicker = false,
  zoomVariant = 'buttons',
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

  const [zoom, setZoom] = useState(1)
  const cellWidth = CELL_WIDTH * zoom
  const [viewModeActual, setViewModeActual] = useState<ViewModeType>(
    calcViewMode(lowestTaskStartTs, highestTaskEndTs, viewMode),
  )
  const [loaded, setLoaded] = useState(false)

  const onResize = useCallback(() => {
    if (!timeGridRef.current) return null
    setViewModeActual(
      calcViewMode(
        lowestTaskStartTs,
        highestTaskEndTs,
        viewMode,
        Math.floor(timeGridRef.current.getBoundingClientRect().width / cellWidth),
      ),
    )
  }, [timeGridRef, lowestTaskStartTs, highestTaskEndTs, cellWidth, viewMode])

  const startDate = getStartDate(lowestTaskStartDate, viewModeActual)

  const endDate = getEndDate(highestTaskEndDate, viewModeActual)

  const cellMs = getCellMs(viewModeActual)

  useEffect(() => {
    if (!timeGridRef.current) return null
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [onResize])

  useEffect(() => {
    if (loaded) return
    if (!timeGridRef.current) return
    onResize()
    setLoaded(true)
  }, [loaded, onResize])

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
                {zoomVariant === 'buttons' && (
                  <div style={{ whiteSpace: 'nowrap' }}>
                    <button
                      type='button'
                      title='Zoom in'
                      onClick={() => zoom * 2 < 10 && setZoom(zoom * 2)}
                      className='gantt-button'
                    >
                      <svg viewBox='0 0 14 14' width='14px' height='14px'>
                        <path d='M6 3.5c.28 0 .5.22.5.5v1.5H8a.5.5 0 0 1 0 1H6.5V8a.5.5 0 0 1-1 0V6.5H4a.5.5 0 0 1 0-1h1.5V4c0-.28.22-.5.5-.5Z'></path>
                        <path
                          fillRule='evenodd'
                          d='M9.54 10.2a5.5 5.5 0 1 1 .66-.66c.06.03.11.06.15.1l3 3a.5.5 0 0 1-.7.71l-3-3a.5.5 0 0 1-.1-.14ZM10.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z'
                        ></path>
                      </svg>
                    </button>
                    <button
                      type='button'
                      title='Zoom out'
                      onClick={() => zoom * 0.5 > 0.2 && setZoom(zoom * 0.5)}
                      className='gantt-button'
                    >
                      <svg viewBox='0 0 14 14' width='14px' height='14px'>
                        <path d='M4 5.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H4Z'></path>
                        <path
                          fillRule='evenodd'
                          d='M6 11.5c1.35 0 2.59-.49 3.54-1.3.03.06.06.11.1.15l3 3a.5.5 0 0 0 .71-.7l-3-3a.5.5 0 0 0-.14-.1A5.5 5.5 0 1 0 6 11.5Zm0-1a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z'
                        ></path>
                      </svg>
                    </button>
                  </div>
                )}
                {zoomVariant === 'slider' && (
                  <div style={{ whiteSpace: 'nowrap' }} className='gantt-slidecontainer'>
                    <input
                      type='range'
                      min={1}
                      max={1000}
                      value={zoom * 500}
                      onChange={(v) => setZoom(parseInt(v.currentTarget.value) / 500)}
                      className='gantt-slider'
                    />
                  </div>
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
              cellWidth={cellWidth}
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
