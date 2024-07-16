import React from 'react'
import { Gantt } from '../../../src'

export default {
  title: 'Use Cases',
  component: <></>,
  tags: ['autodocs'],
}

export const LongName = {
  render: () => {
    const rows = [
      {
        name: 'ExternalModule.dl_LoadingTests.Module : 213 : LongText.Write(); / UserLong / 11420',
        tasks: [
          {
            id: 'victim_16294',
            start: new Date('2024-06-27T19:32:15.373Z'),
            end: new Date('2024-06-27T19:32:20.389Z'),
            color: '#edbd00',
            tooltip: '\r\nModule.dl_LoadingTests.Module : 213 : LongText.Write();',
          },
        ],
      },
    ]
    return <Gantt rows={rows} theme='light' viewMode='seconds' />
  },
  args: {},
  argTypes: {},
}
