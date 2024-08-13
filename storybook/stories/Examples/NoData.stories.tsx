import React from 'react'
import { Gantt } from '../../../src'

export default {
  title: 'Examples/No Data',
  component: <></>,
  tags: ['autodocs'],
}

export const En = {
  render: () => {
    return <Gantt rows={[]} locale='en' />
  },
  args: {},
  argTypes: {},
}
export const Ru = {
  render: () => {
    return <Gantt rows={[]} locale='ru' />
  },
  args: {},
  argTypes: {},
}
export const Dark = {
  render: () => {
    return <Gantt rows={[]} theme='dark' />
  },
  args: {},
  argTypes: {},
}
