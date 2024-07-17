import React from 'react'
import { Gantt } from '../../../src'

export default {
  title: 'Examples/NamesPanelTextAlign',
  component: <></>,
  tags: ['autodocs'],
}

export const Center = {
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
    ]
    return <Gantt rows={rows} namesPanelWidth={300} namesPanelTextAlign='center' />
  },
  args: {},
  argTypes: {},
}

export const Left = {
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
    ]
    return <Gantt rows={rows} namesPanelWidth={300} namesPanelTextAlign='left' />
  },
  args: {},
  argTypes: {},
}

export const Right = {
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
    ]
    return <Gantt rows={rows} namesPanelWidth={300} namesPanelTextAlign='right' />
  },
  args: {},
  argTypes: {},
}
