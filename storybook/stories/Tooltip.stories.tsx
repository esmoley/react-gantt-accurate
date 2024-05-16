import React from 'react'
import { Gantt } from '../../src'

export default {
  title: 'ReactGanttAccurate/Tooltip',
  component: <></>,
  tags: ['autodocs'],
}

export const Text = {
  render: () => {
    const rows = [
      {
        name: 'First Task',
        tasks: [
          {
            id: 'Task 1',
            start: new Date('2024-04-20 12:06:18'),
            end: new Date('2024-04-21 19:06:18'),
            tooltip: 'Hello! I am text tooltip',
          },
        ],
      },
    ]
    return <Gantt rows={rows} locale='en' />
  },
  args: {},
  argTypes: {},
}

export const JSX = {
  render: () => {
    const rows = [
      {
        name: 'First Task',
        tasks: [
          {
            id: 'Task 1',
            start: new Date('2024-04-20 12:06:18'),
            end: new Date('2024-04-21 19:06:18'),
            tooltip: (
              <div
                style={{
                  fontSize: '14px',
                  fontFamily:
                    'Arial, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;;',
                }}
              >
                <b>Example: 20-4-2023 - 22-4-2023</b>
                <p>Duration: 2 day(s)</p>
                <p>Progress: 78 %</p>
              </div>
            ),
          },
        ],
      },
    ]
    return <Gantt rows={rows} locale='en' />
  },
  args: {},
  argTypes: {},
}
