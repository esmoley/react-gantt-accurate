import React from 'react'
import { Gantt } from '../../src'

export default {
  title: 'ReactGanttAccurate/Theme',
  component: <></>,
  tags: ['autodocs'],
}

export const Light = {
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
    return <Gantt tasks={tasks} locale='ru' theme='light' />
  },
  args: {},
  argTypes: {},
}
export const Dark = {
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
