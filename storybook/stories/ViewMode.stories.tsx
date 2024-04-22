import React from 'react'
import { Gantt } from '../../src'

export default {
  title: 'ReactGanttAccurate/ViewMode',
  component: <></>,
  tags: ['autodocs'],
}

export const Days = {
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
    return <Gantt rows={rows} />
  },
  args: {},
  argTypes: {},
}
export const Hours = {
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
    return <Gantt rows={rows} viewMode='hours' />
  },
  args: {},
  argTypes: {},
}
export const Minutes = {
  render: () => {
    const rows = [
      {
        name: 'First Task',
        tasks: [
          {
            id: 'Task 1',
            start: new Date('2024-04-20 19:06:00'),
            end: new Date('2024-04-20 19:16:00'),
          },
        ],
      },
      {
        name: 'Second Task',
        tasks: [
          {
            id: 'Task 2',
            start: new Date('2024-04-20 19:00:00'),
            end: new Date('2024-04-20 19:30:18'),
            dependencies: ['Task 3'],
          },
        ],
      },
      {
        name: 'Third Task',
        tasks: [
          {
            id: 'Task 3',
            start: new Date('2024-04-20 19:10:18'),
            end: new Date('2024-04-20 19:59:59'),
          },
        ],
      },
      {
        name: 'Fourth Task',
        tasks: [
          {
            id: 'Task 4',
            start: new Date('2024-04-20 19:06:18'),
            end: new Date('2024-04-20 19:20:20'),
          },
        ],
      },
      {
        name: 'Fifth Task',
        tasks: [
          {
            id: 'Task 5',
            start: new Date('2024-04-20 19:16:18'),
            end: new Date('2024-04-20 19:26:18'),
          },
        ],
      },
      {
        name: 'Sixth Task',
        tasks: [
          {
            id: 'Task 6',
            start: new Date('2024-04-20 19:06:18'),
            end: new Date('2024-04-20 19:16:18'),
          },
        ],
      },
    ]
    return <Gantt rows={rows} viewMode='minutes' />
  },
  args: {},
  argTypes: {},
}
export const Seconds = {
  render: () => {
    const rows = [
      {
        name: 'First Task',
        tasks: [
          {
            id: 'Task 1',
            start: new Date('2024-04-20 19:06:10'),
            end: new Date('2024-04-20 19:06:15'),
          },
        ],
      },
      {
        name: 'Second Task',
        tasks: [
          {
            id: 'Task 2',
            start: new Date('2024-04-20 19:06:0'),
            end: new Date('2024-04-20 19:06:18'),
            dependencies: ['Task 3'],
          },
        ],
      },
      {
        name: 'Third Task',
        tasks: [
          {
            id: 'Task 3',
            start: new Date('2024-04-20 19:06:18'),
            end: new Date('2024-04-20 19:06:59.999'),
          },
        ],
      },
      {
        name: 'Fourth Task',
        tasks: [
          {
            id: 'Task 4',
            start: new Date('2024-04-20 19:06:18'),
            end: new Date('2024-04-20 19:06:20'),
          },
        ],
      },
      {
        name: 'Fifth Task',
        tasks: [
          {
            id: 'Task 5',
            start: new Date('2024-04-20 19:06:18'),
            end: new Date('2024-04-20 19:06:28'),
          },
        ],
      },
      {
        name: 'Sixth Task',
        tasks: [
          {
            id: 'Task 6',
            start: new Date('2024-04-20 19:06:18'),
            end: new Date('2024-04-20 19:06:22'),
          },
        ],
      },
    ]
    return <Gantt rows={rows} viewMode='seconds' />
  },
  args: {},
  argTypes: {},
}
export const Milliseconds = {
  render: () => {
    const rows = [
      {
        name: 'First Task',
        tasks: [
          {
            id: 'Task 1',
            start: new Date('2024-04-20 19:06:10.100'),
            end: new Date('2024-04-20 19:06:10.102'),
          },
        ],
      },
      {
        name: 'Second Task (mcs)',
        tasks: [
          {
            id: 'Task 2',
            start: 1713629170100.515,
            end: 1713629170102.5,
            dependencies: ['Task 3'],
          },
        ],
      },
      {
        name: 'Third Task (mcs)',
        tasks: [
          {
            id: 'Task 3',
            start: 1713629170100.15,
            end: 1713629170102.8,
          },
        ],
      },
      {
        name: 'Fourth Task',
        tasks: [
          {
            id: 'Task 4',
            start: new Date('2024-04-20 19:06:10.100'),
            end: new Date('2024-04-20 19:06:10.206'),
          },
        ],
      },
      {
        name: 'Fifth Task',
        tasks: [
          {
            id: 'Task 5',
            start: new Date('2024-04-20 19:06:10.100'),
            end: new Date('2024-04-20 19:06:10.106'),
          },
        ],
      },
      {
        name: 'Sixth Task',
        tasks: [
          {
            id: 'Task 6',
            start: new Date('2024-04-20 19:06:10.100'),
            end: new Date('2024-04-20 19:06:10.106'),
          },
        ],
      },
    ]
    return <Gantt rows={rows} viewMode='milliseconds' />
  },
  args: {},
  argTypes: {},
}
