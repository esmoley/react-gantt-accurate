import React from 'react'
import { Gantt } from '../../../src'

export default {
  title: 'Examples/RowHeight',
  component: <></>,
  tags: ['autodocs'],
}

export const Slider = {
  render: (args: { rowHeight: number | undefined }) => {
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
            start: new Date('2024-04-20 01:06:18'),
            end: new Date('2024-04-21 16:06:18'),
          },
        ],
      },
    ]
    return <Gantt rows={rows} namesPanelWidth={300} rowHeight={args.rowHeight} />
  },
  args: { rowHeight: 20 },
  argTypes: { rowHeight: { control: { type: 'range', min: 1, max: 150, step: 1 } } },
}
