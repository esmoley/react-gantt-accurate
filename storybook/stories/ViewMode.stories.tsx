import React from 'react'
import { Gantt } from '../../src'

export default {
  title: 'ReactGanttAccurate/ViewMode',
  component: <></>,
  tags: ['autodocs'],
}

export const Days = {
  render: () => {
    const tasks = [
      {
        id: 'Task 1',
        name: 'First Task',
        start: new Date('2024-04-20 12:06:18'),
        end: new Date('2024-04-21 19:06:18'),
      },
      {
        id: 'Task 2',
        name: 'Second Task',
        start: new Date('2024-04-20 2:06:18'),
        end: new Date('2024-04-21 23:06:18'),
        dependencies: ['Task 3'],
      },
      {
        id: 'Task 3',
        name: 'Third Task',
        start: new Date('2024-04-20 1:06:18'),
        end: new Date('2024-04-22 19:06:18'),
      },
      {
        id: 'Task 4',
        name: 'Fourth Task',
        start: new Date('2024-04-20 0:06:18'),
        end: new Date('2024-04-21 19:06:18'),
      },
      {
        id: 'Task 5',
        name: 'Fifth Task',
        start: new Date('2024-04-21 19:06:18'),
        end: new Date('2024-04-22 19:06:18'),
      },
      {
        id: 'Task 6',
        name: 'Sixth Task',
        start: new Date('2024-04-20 19:06:18'),
        end: new Date('2024-04-30 00:06:18'),
      },
    ]
    return <Gantt tasks={tasks} locale='ru' theme='dark' />
  },
  args: {},
  argTypes: {},
}
export const Hours = {
  render: () => {
    const tasks = [
      {
        id: 'Task 1',
        name: 'First Task',
        start: new Date('2024-04-20 12:06:18'),
        end: new Date('2024-04-21 19:06:18'),
      },
      {
        id: 'Task 2',
        name: 'Second Task',
        start: new Date('2024-04-20 2:06:18'),
        end: new Date('2024-04-21 23:06:18'),
        dependencies: ['Task 3'],
      },
      {
        id: 'Task 3',
        name: 'Third Task',
        start: new Date('2024-04-20 1:06:18'),
        end: new Date('2024-04-22 19:06:18'),
      },
      {
        id: 'Task 4',
        name: 'Fourth Task',
        start: new Date('2024-04-20 0:06:18'),
        end: new Date('2024-04-21 19:06:18'),
      },
      {
        id: 'Task 5',
        name: 'Fifth Task',
        start: new Date('2024-04-21 19:06:18'),
        end: new Date('2024-04-22 19:06:18'),
      },
      {
        id: 'Task 6',
        name: 'Sixth Task',
        start: new Date('2024-04-20 19:06:18'),
        end: new Date('2024-04-24 19:06:18'),
      },
    ]
    return <Gantt tasks={tasks} locale='ru' theme='dark' viewMode='hours' />
  },
  args: {},
  argTypes: {},
}
export const Minutes = {
  render: () => {
    const tasks = [
      {
        id: 'Task 1',
        name: 'First Task',
        start: new Date('2024-04-20 19:06:00'),
        end: new Date('2024-04-20 19:16:00'),
      },
      {
        id: 'Task 2',
        name: 'Second Task',
        start: new Date('2024-04-20 19:00:00'),
        end: new Date('2024-04-20 19:30:18'),
        dependencies: ['Task 3'],
      },
      {
        id: 'Task 3',
        name: 'Third Task',
        start: new Date('2024-04-20 19:10:18'),
        end: new Date('2024-04-20 19:59:59'),
      },
      {
        id: 'Task 4',
        name: 'Fourth Task',
        start: new Date('2024-04-20 19:06:18'),
        end: new Date('2024-04-20 19:20:20'),
      },
      {
        id: 'Task 5',
        name: 'Fifth Task',
        start: new Date('2024-04-20 19:16:18'),
        end: new Date('2024-04-20 19:26:18'),
      },
      {
        id: 'Task 6',
        name: 'Sixth Task',
        start: new Date('2024-04-20 19:06:18'),
        end: new Date('2024-04-20 19:16:18'),
      },
    ]
    return <Gantt tasks={tasks} locale='ru' theme='dark' viewMode='minutes' />
  },
  args: {},
  argTypes: {},
}
export const Seconds = {
  render: () => {
    const tasks = [
      {
        id: 'Task 1',
        name: 'First Task',
        start: new Date('2024-04-20 19:06:10'),
        end: new Date('2024-04-20 19:06:15'),
      },
      {
        id: 'Task 2',
        name: 'Second Task',
        start: new Date('2024-04-20 19:06:0'),
        end: new Date('2024-04-20 19:06:18'),
        dependencies: ['Task 3'],
      },
      {
        id: 'Task 3',
        name: 'Third Task',
        start: new Date('2024-04-20 19:06:18'),
        end: new Date('2024-04-20 19:06:59.999'),
      },
      {
        id: 'Task 4',
        name: 'Fourth Task',
        start: new Date('2024-04-20 19:06:18'),
        end: new Date('2024-04-20 19:06:20'),
      },
      {
        id: 'Task 5',
        name: 'Fifth Task',
        start: new Date('2024-04-20 19:06:18'),
        end: new Date('2024-04-20 19:06:28'),
      },
      {
        id: 'Task 6',
        name: 'Sixth Task',
        start: new Date('2024-04-20 19:06:18'),
        end: new Date('2024-04-20 19:06:22'),
      },
    ]
    return <Gantt tasks={tasks} locale='ru' theme='dark' viewMode='seconds' />
  },
  args: {},
  argTypes: {},
}
export const Milliseconds = {
  render: () => {
    const tasks = [
      {
        id: 'Task 1',
        name: 'First Task',
        start: new Date('2024-04-20 19:06:10.100'),
        end: new Date('2024-04-20 19:06:10.102'),
      },
      {
        id: 'Task 2',
        name: 'Second Task (mcs)',
        start: 1713629170100.515,
        end: 1713629170102.5,
        dependencies: ['Task 3'],
      },
      {
        id: 'Task 3',
        name: 'Third Task (mcs)',
        start: 1713629170100.15,
        end: 1713629170102.8,
      },
      {
        id: 'Task 4',
        name: 'Fourth Task',
        start: new Date('2024-04-20 19:06:10.100'),
        end: new Date('2024-04-20 19:06:10.206'),
      },
      {
        id: 'Task 5',
        name: 'Fifth Task',
        start: new Date('2024-04-20 19:06:10.100'),
        end: new Date('2024-04-20 19:06:10.106'),
      },
      {
        id: 'Task 6',
        name: 'Sixth Task',
        start: new Date('2024-04-20 19:06:10.100'),
        end: new Date('2024-04-20 19:06:10.106'),
      },
    ]
    return <Gantt tasks={tasks} locale='ru' theme='dark' viewMode='milliseconds' />
  },
  args: {},
  argTypes: {},
}
