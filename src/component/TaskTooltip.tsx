import { useEffect, useRef, useState } from 'react'
import { SCREEN_PADDING } from '../util/consts'
import React from 'react'

export type TaskTooltipProps = {
  id: string
  top: number
  show: boolean
  hideTooltip?: () => void
  content: string | JSX.Element
  taskX: number
  taskWidth: number
}
export const TaskTooltip = ({ top, show, content, taskX, taskWidth, hideTooltip }: TaskTooltipProps) => {
  const tooltipChildRef = useRef<HTMLDivElement>(null)

  const taskEndX = taskX + taskWidth
  const tooltipRightToTaskX = SCREEN_PADDING + taskEndX
  const [left, setLeft] = useState<React.CSSProperties['left']>(tooltipRightToTaskX)
  const [right, setRight] = useState<React.CSSProperties['right']>(null)
  const [innerLeft, setInnerLeft] = useState<React.CSSProperties['left']>('50%')
  const [innerRight, setInnerRight] = useState<React.CSSProperties['left']>(null)
  const [topUpdated, setTopUpdated] = useState<React.CSSProperties['top']>(top)
  const [step, setStep] = useState<'Initial' | 'UpdateOrientation' | 'SetTop' | 'SetBottom' | 'Done'>('Initial')
  const windowWidthScrolled = window.scrollX + window.innerWidth

  useEffect(() => {
    if (!show || !tooltipChildRef.current) {
      setStep('Initial')
      return
    }
    if (step != 'Initial') return

    const rectChild = tooltipChildRef.current.getBoundingClientRect()
    if (!rectChild) return
    setLeft(tooltipRightToTaskX)
    setRight(null)
    setInnerLeft('50%')
    setInnerRight(null)
    setStep('UpdateOrientation')
    setTopUpdated(top)
  }, [show, tooltipRightToTaskX, top, step])

  useEffect(() => {
    if (!show || !tooltipChildRef.current || step !== 'UpdateOrientation') return
    const rectChild = tooltipChildRef.current.getBoundingClientRect()
    if (!rectChild) return
    const tooltipActualWidth = rectChild.width
    const tooltipRightX = tooltipRightToTaskX + tooltipActualWidth
    if (tooltipActualWidth + SCREEN_PADDING * 2 >= windowWidthScrolled) {
      // is wider than screen
      setLeft(0)
      setRight(0)
      setInnerLeft(0)
      setInnerRight(0)
    } else if (tooltipRightX > windowWidthScrolled) {
      // is right oriented
      setLeft('auto')
      setRight(SCREEN_PADDING)
      setInnerLeft(null)
      setInnerRight('50%')
    }
    setTopUpdated(top)
    setStep('SetTop')
  }, [step, show, tooltipRightToTaskX, top, windowWidthScrolled])

  useEffect(() => {
    if (!show || !tooltipChildRef.current || step !== 'SetTop') return
    const rectChild = tooltipChildRef.current.getBoundingClientRect()
    if (!rectChild) return
    if (rectChild.top < 0) {
      setTopUpdated(top + -rectChild.top + SCREEN_PADDING)
    }
    setStep('Done')
  }, [step, show, top])

  if (!show) return <></>

  return (
    <div
      style={{ left, right, top: topUpdated, position: 'absolute', opacity: step === 'Done' ? 1 : 0 }}
      onMouseLeave={hideTooltip}
    >
      <div
        style={{
          border: '1px solid black',
          color: 'black',
          background: '#fff',
          transform: 'translateY(-50%)',
          zIndex: 2,
          left: innerLeft,
          right: innerRight,
        }}
        ref={tooltipChildRef}
      >
        {content}
      </div>
    </div>
  )
}
