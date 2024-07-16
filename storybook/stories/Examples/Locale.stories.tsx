import React from 'react'
import { Gantt } from '../../../src'

export default {
  title: 'Examples/Locale',
  component: <></>,
  tags: ['autodocs'],
}

export const En = {
  render: () => {
    const rows = [
      {
        name: 'First Task',
        tasks: [
          {
            id: 'Task 1',
            start: new Date('2024-04-20 12:06:18'),
            end: new Date('2024-04-21 19:06:18'),
          },
        ],
      },
      {
        name: 'Second Task',
        tasks: [
          {
            id: 'Task 2',
            start: new Date('2024-04-20 2:06:18'),
            end: new Date('2024-04-21 23:06:18'),
            dependencies: ['Task 3'],
          },
        ],
      },
      {
        name: 'Third Task',
        tasks: [
          {
            id: 'Task 3',
            start: new Date('2024-04-20 1:06:18'),
            end: new Date('2024-04-22 19:06:18'),
          },
        ],
      },
      {
        name: 'Fourth Task',
        tasks: [
          {
            id: 'Task 4',
            start: new Date('2024-04-20 0:06:18'),
            end: new Date('2024-04-21 19:06:18'),
          },
          {
            id: 'Task 4.1',
            start: new Date('2024-04-23 0:06:18'),
            end: new Date('2024-04-24 19:06:18'),
            dependencies: ['Task 4'],
          },
        ],
      },
      {
        name: 'Fifth Task',
        tasks: [
          {
            id: 'Task 5',
            start: new Date('2024-04-21 19:06:18'),
            end: new Date('2024-04-22 19:06:18'),
            dependencies: ['Task 5.1'],
          },
          {
            id: 'Task 5.1',
            start: new Date('2024-04-23 19:06:18'),
            end: new Date('2024-04-24 19:06:18'),
          },
        ],
      },
      {
        name: 'Sixth Task',
        tasks: [
          {
            id: 'Task 6',
            start: new Date('2024-04-21 19:06:18'),
            end: new Date('2024-04-22 19:06:18'),
          },
        ],
      },
    ]
    return <Gantt rows={rows} locale='en' />
  },
  args: {},
  argTypes: {},
}
export const Ru = {
  render: () => {
    const rows = [
      {
        name: 'First Task',
        tasks: [
          {
            id: 'Task 1',
            start: new Date('2024-04-20 12:06:18'),
            end: new Date('2024-04-21 19:06:18'),
          },
        ],
      },
      {
        name: 'Second Task',
        tasks: [
          {
            id: 'Task 2',
            start: new Date('2024-04-20 2:06:18'),
            end: new Date('2024-04-21 23:06:18'),
            dependencies: ['Task 3'],
          },
        ],
      },
      {
        name: 'Third Task',
        tasks: [
          {
            id: 'Task 3',
            start: new Date('2024-04-20 1:06:18'),
            end: new Date('2024-04-22 19:06:18'),
          },
        ],
      },
      {
        name: 'Fourth Task',
        tasks: [
          {
            id: 'Task 4',
            start: new Date('2024-04-20 0:06:18'),
            end: new Date('2024-04-21 19:06:18'),
          },
          {
            id: 'Task 4.1',
            start: new Date('2024-04-23 0:06:18'),
            end: new Date('2024-04-24 19:06:18'),
            dependencies: ['Task 4'],
          },
        ],
      },
      {
        name: 'Fifth Task',
        tasks: [
          {
            id: 'Task 5',
            start: new Date('2024-04-21 19:06:18'),
            end: new Date('2024-04-22 19:06:18'),
            dependencies: ['Task 5.1'],
          },
          {
            id: 'Task 5.1',
            start: new Date('2024-04-23 19:06:18'),
            end: new Date('2024-04-24 19:06:18'),
          },
        ],
      },
      {
        name: 'Sixth Task',
        tasks: [
          {
            id: 'Task 6',
            start: new Date('2024-04-21 19:06:18'),
            end: new Date('2024-04-22 19:06:18'),
          },
        ],
      },
    ]
    return <Gantt rows={rows} locale='ru' />
  },
  args: {},
  argTypes: {},
}
