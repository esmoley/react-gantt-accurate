import React from 'react'
import { Gantt } from '../../../src'

export default {
  title: 'Examples/TaskOnClick',
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
            onClick: () => {
              alert('Hello from Task 1')
            },
          },
        ],
      },
    ]
    return <Gantt rows={rows} locale='en' />
  },
  args: {},
  argTypes: {},
}
