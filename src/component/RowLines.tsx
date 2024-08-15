import React from 'react'

type RowLinesProps = {
  y: number
  width: number
  spaceY: number
  amount: number
}

export const RowLines = ({ y, width, spaceY, amount }: RowLinesProps) => {
  const res = []
  for (let i = 0; i < amount; i++) {
    res.push(<line key={i} x={0} y1={y + spaceY * i} x2={width} y2={y + spaceY * i} />)
  }
  return <g className='cell-line'>{res}</g>
}
