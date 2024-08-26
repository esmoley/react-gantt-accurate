import React from 'react'
import { Gantt } from '../../../src'

export default {
  title: 'Examples/TaskMinWidthAlign',
  component: <></>,
  tags: ['autodocs'],
}

export const Start = {
  render: () => {
    const rows = [
      {
        name: 'First Task',
        tasks: [
          {
            id: 'Task 1',
            start: 0,
            end: 0,
          },
        ],
      },
      {
        name: 'First Task',
        tasks: [
          {
            id: 'Task 2',
            start: 0,
            end: 0,
            dependencies: ['Task 1'],
          },
        ],
      },
      {
        name: 'First Task',
        tasks: [
          {
            id: 'Task 3',
            start: 0,
            end: 0,
            dependencies: ['Task 2'],
          },
        ],
      },
    ]
    return <Gantt rows={rows} locale='en' taskMinWidthAlign='start' />
  },
  args: {},
  argTypes: {},
}

export const End = {
  render: () => {
    const rows = [
      {
        name: 'First Task',
        tasks: [
          {
            id: 'Task 1',
            start: 0,
            end: 0,
          },
        ],
      },
      {
        name: 'First Task',
        tasks: [
          {
            id: 'Task 2',
            start: 0,
            end: 0,
            dependencies: ['Task 1'],
          },
        ],
      },
      {
        name: 'First Task',
        tasks: [
          {
            id: 'Task 3',
            start: 0,
            end: 0,
            dependencies: ['Task 2'],
          },
        ],
      },
    ]
    return <Gantt rows={rows} locale='en' taskMinWidthAlign='end' />
  },
  args: {},
  argTypes: {},
}
