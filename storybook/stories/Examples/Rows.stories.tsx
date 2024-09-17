import React from 'react'
import { Gantt } from '../../../src'

export default {
  title: 'Examples/Rows',
  component: <></>,
  tags: ['autodocs'],
}

export const BackgroundColor = {
  render: () => {
    const rows = [
      {
        name: 'First Task',
        backgroundColor: '#e4ffaa',
        tasks: [
          {
            id: 'Task 1',
            start: new Date('2024-04-20 12:06:18'),
            end: new Date('2024-04-21 19:06:18'),
          },
        ],
      },
    ]
    return <Gantt rows={rows} namesPanelWidth={300} />
  },
  args: {},
  argTypes: {},
}
