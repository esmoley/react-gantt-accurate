export type LocaleType = 'en' | 'ru'

export type TaskDateType = Date | number

export type DependencyTask = {
  id: string
  onClick?: () => void
}

export type Task = {
  id: string
  start: TaskDateType
  end: TaskDateType
  color?: string
  dependencies?: string[] | DependencyTask[]
  tooltip?: string | JSX.Element
  onClick?: () => void
}
export type Row = {
  name: string
  style?: React.CSSProperties
  tasks: Task[]
}

export type TaskGraph = {
  rowIndex: number
  index: number
  task: Task
  start: number
  end: number
  dependencies: TaskGraphDependency[]
}

export type TaskGraphRowPos = {
  x: number
  width: number
}

export type TaskGraphDependency = TaskGraph & {
  dependencyObj: DependencyTask
}

export type ViewModeType = 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'

export type TaskMinWidthAlignType = 'start' | 'end'
