import React from 'react'
import { Gantt } from '../../src'

export default {
  title: 'Example/Gantt',
  component: <></>,
  tags: ['autodocs'],
}

export const Days = {
  render: () => {
    const tasks = [
      {
        id: 'Task 555',
        name: 'Do the crazy thing',
        start: new Date('2024-04-20 12:06:18'),
        end: new Date('2024-04-21 19:06:18'),
      },
      {
        id: 'Task 66',
        name: 'Do the crazy thing again',
        start: new Date('2024-04-20 2:06:18'),
        end: new Date('2024-04-21 23:06:18'),
        dependencies: ['Task 67'],
      },
      {
        id: 'Task 67',
        name: '67',
        start: new Date('2024-04-20 1:06:18'),
        end: new Date('2024-04-22 19:06:18'),
      },
      {
        id: 'Task 68',
        name: 'Task 68',
        start: new Date('2024-04-20 0:06:18'),
        end: new Date('2024-04-21 19:06:18'),
      },
      {
        id: 'Task 69',
        name: 'Task 69',
        start: new Date('2024-04-21 19:06:18'),
        end: new Date('2024-04-22 19:06:18'),
      },
      {
        id: 'Task 70',
        name: 'Task 70',
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
        id: 'Task 555',
        name: 'Do the crazy thing',
        start: new Date('2024-04-20 12:06:18'),
        end: new Date('2024-04-21 19:06:18'),
      },
      {
        id: 'Task 66',
        name: 'Do the crazy thing again',
        start: new Date('2024-04-20 2:06:18'),
        end: new Date('2024-04-21 23:06:18'),
        dependencies: ['Task 67'],
      },
      {
        id: 'Task 67',
        name: '67',
        start: new Date('2024-04-20 1:06:18'),
        end: new Date('2024-04-22 19:06:18'),
      },
      {
        id: 'Task 68',
        name: 'Task 68',
        start: new Date('2024-04-20 0:06:18'),
        end: new Date('2024-04-21 19:06:18'),
      },
      {
        id: 'Task 69',
        name: 'Task 69',
        start: new Date('2024-04-21 19:06:18'),
        end: new Date('2024-04-22 19:06:18'),
      },
      {
        id: 'Task 70',
        name: 'Task 70',
        start: new Date('2024-04-20 19:06:18'),
        end: new Date('2024-04-24 19:06:18'),
      },
    ]
    return <Gantt tasks={tasks} locale='ru' theme='dark' scale='hours' />
  },
  args: {},
  argTypes: {},
}
export const Minutes = {
  render: () => {
    const tasks = [
      {
        id: 'Task 555',
        name: 'Do the crazy thing',
        start: new Date('2024-04-20 19:06:00'),
        end: new Date('2024-04-20 19:16:00'),
      },
      {
        id: 'Task 66',
        name: 'Do the crazy thing again',
        start: new Date('2024-04-20 19:06:18'),
        end: new Date('2024-04-20 19:30:18'),
        dependencies: ['Task 67'],
      },
      {
        id: 'Task 67',
        name: '67',
        start: new Date('2024-04-20 19:10:18'),
        end: new Date('2024-04-20 19:20:18'),
      },
      {
        id: 'Task 68',
        name: 'Task 68',
        start: new Date('2024-04-20 19:06:18'),
        end: new Date('2024-04-20 19:20:20'),
      },
      {
        id: 'Task 69',
        name: 'Task 69',
        start: new Date('2024-04-20 19:16:18'),
        end: new Date('2024-04-20 19:26:18'),
      },
      {
        id: 'Task 70',
        name: 'Task 70',
        start: new Date('2024-04-20 19:06:18'),
        end: new Date('2024-04-20 19:16:18'),
      },
    ]
    return <Gantt tasks={tasks} locale='ru' theme='dark' scale='minutes' />
  },
  args: {},
  argTypes: {},
}
