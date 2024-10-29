import React from 'react'
import { Gantt } from '../../../src'
import { StoryContextDecorated } from '../../types'

export default {
  title: 'Examples/ZoomVariant',
  component: <></>,
  tags: ['autodocs'],
}

export const Buttons = {
  render: (_, context: StoryContextDecorated) => {
    const rows = [
      {
        name: 'First Task',
        style: { fill: '#7C93C3' },
        tasks: [
          {
            id: 'Task 1',
            start: new Date('2024-04-20 12:06:18'),
            end: new Date('2024-04-21 19:06:18'),
          },
        ],
      },
    ]
    return <Gantt rows={rows} namesPanelWidth={300} zoomVariant='buttons' theme={context.globals.theme} />
  },
  args: {},
  argTypes: {},
  globals: {
    // 👇 Override background value for this story
    backgrounds: { value: 'dark' },
  },
}
export const Slider = {
  render: (_, context: StoryContextDecorated) => {
    const rows = [
      {
        name: 'First Task',
        style: { fill: '#7C93C3' },
        tasks: [
          {
            id: 'Task 1',
            start: new Date('2024-04-20 12:06:18'),
            end: new Date('2024-04-21 19:06:18'),
          },
        ],
      },
    ]
    return <Gantt rows={rows} namesPanelWidth={300} zoomVariant='slider' theme={context.globals.theme} />
  },
  args: {},
  argTypes: {},
}
export const None = {
  render: (_, context: StoryContextDecorated) => {
    const rows = [
      {
        name: 'First Task',
        style: { fill: '#7C93C3' },
        tasks: [
          {
            id: 'Task 1',
            start: new Date('2024-04-20 12:06:18'),
            end: new Date('2024-04-21 19:06:18'),
          },
        ],
      },
    ]
    return <Gantt rows={rows} namesPanelWidth={300} zoomVariant='none' theme={context.globals.theme} />
  },
  args: {},
  argTypes: {},
}
