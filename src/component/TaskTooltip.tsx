import { useEffect, useRef, useState } from 'react'
import { SCREEN_PADDING } from '../util/consts'
import React from 'react'

export type TaskTooltipProps = {
  top: number
  show: boolean
  content: string | JSX.Element
  taskX: number
  taskWidth: number
  mouseOver: boolean
  setMouseOver: React.Dispatch<React.SetStateAction<boolean>>
  setTaskTooltipId: React.Dispatch<React.SetStateAction<string>>
  setTaskTooltipTop: React.Dispatch<React.SetStateAction<number>>
  setTaskTooltipShow: React.Dispatch<React.SetStateAction<boolean>>
  setTaskTooltipContent: React.Dispatch<React.SetStateAction<string | JSX.Element>>
  setTaskTooltipTaskX: React.Dispatch<React.SetStateAction<number>>
  setTaskTooltipTaskWidth: React.Dispatch<React.SetStateAction<number>>
  rowHeight: number
  timeGridRef: React.MutableRefObject<HTMLDivElement>
}
export const TaskTooltip = ({
  top,
  show,
  content,
  taskX,
  taskWidth,
  mouseOver,
  setMouseOver,
  setTaskTooltipId,
  setTaskTooltipTop,
  setTaskTooltipShow,
  setTaskTooltipContent,
  setTaskTooltipTaskX,
  setTaskTooltipTaskWidth,
  rowHeight,
  timeGridRef,
}: TaskTooltipProps) => {
  const tooltipChildRef = useRef<HTMLDivElement>(null)

  const windowWidthScrolled = window.scrollX + window.innerWidth
  const timeGridScrollX = timeGridRef.current?.scrollLeft ?? 0

  const taskEndX = taskX + taskWidth - timeGridScrollX
  const tooltipRightToTaskX = SCREEN_PADDING + taskEndX
  const [left, setLeft] = useState<React.CSSProperties['left']>(tooltipRightToTaskX)
  const [right, setRight] = useState<React.CSSProperties['right']>(null)
  const [innerLeft, setInnerLeft] = useState<React.CSSProperties['left']>('50%')
  const [innerRight, setInnerRight] = useState<React.CSSProperties['left']>(null)
  const [topUpdated, setTopUpdated] = useState<React.CSSProperties['top']>(top)
  const [step, setStep] = useState<'Initial' | 'UpdateOrientation' | 'SetTop' | 'SetBottom' | 'Done'>('Initial')

  // reset
  useEffect(() => {
    if (!show) {
      setTaskTooltipId('')
      setTaskTooltipTop(150)
      setTaskTooltipShow(false)
      setTaskTooltipContent(null)
      setTaskTooltipTaskX(0)
      setTaskTooltipTaskWidth(0)
    }
  }, [
    show,
    setTaskTooltipId,
    setTaskTooltipTop,
    setTaskTooltipShow,
    setTaskTooltipContent,
    setTaskTooltipTaskX,
    setTaskTooltipTaskWidth,
  ])
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
    setTopUpdated(top + rowHeight / 2)
  }, [show, tooltipRightToTaskX, top, step, rowHeight])

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
      setTopUpdated(top)
    } else if (tooltipRightX > windowWidthScrolled) {
      // is right oriented
      setLeft('auto')
      setRight(SCREEN_PADDING)
      setInnerLeft(null)
      setInnerRight('50%')
      setTopUpdated(top + rowHeight / 2)
    }
    setStep('SetTop')
  }, [step, show, tooltipRightToTaskX, top, windowWidthScrolled, rowHeight])

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
      onPointerEnter={() => !mouseOver && setMouseOver(true)}
      onPointerLeave={() => mouseOver && setMouseOver(false)}
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
