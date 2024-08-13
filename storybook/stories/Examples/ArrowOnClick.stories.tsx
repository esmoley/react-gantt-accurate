import React from 'react'
import { Gantt } from '../../../src'

export default {
  title: 'Examples/ArrowOnClick',
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
            dependencies: [
              {
                id: 'Task 1',
                onClick: () => {
                  alert('Hello from Arrow')
                },
              },
            ],
          },
        ],
      },
    ]
    return <Gantt rows={rows} locale='en' />
  },
  args: {},
  argTypes: {},
}
export const Dark = {
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
            dependencies: [
              {
                id: 'Task 1',
                onClick: () => {
                  alert('Hello from Arrow')
                },
              },
            ],
          },
        ],
      },
    ]
    return <Gantt rows={rows} locale='en' theme='dark' />
  },
  args: {},
  argTypes: {},
}
