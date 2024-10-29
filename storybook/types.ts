import { ReactRenderer, StoryContext } from '@storybook/react'

export type StoryContextDecorated = StoryContext<ReactRenderer> & {
  globals: {
    theme: 'light' | 'dark'
  }
}
