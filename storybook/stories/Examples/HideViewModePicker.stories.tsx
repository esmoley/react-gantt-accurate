import React from 'react'
import { Gantt } from '../../../src'

export default {
  title: 'Examples/HideViewModePicker',
  component: <></>,
  tags: ['autodocs'],
}

export const Default = {
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
    return <Gantt rows={rows} viewMode='seconds' hideViewModePicker />
  },
  args: {},
  argTypes: {},
}
