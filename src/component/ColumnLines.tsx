import React from 'react'

type ColumnLinesProps = {
  x: number
  y: number
  height: number
  spaceX: number
  amount: number
}

export const ColumnLines = ({ x, y, height, spaceX, amount }: ColumnLinesProps) => {
  const res = []
  for (let i = 0; i < amount; i++) {
    res.push(<line key={i} x1={i * spaceX + x} y1={y} x2={i * spaceX + x} y2={height} />)
  }
  return <g className='cell-line'>{res}</g>
}
