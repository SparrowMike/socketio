import React from 'react'
import Cpu from './Cpu'
import Mem from './Mem'
import Info from './Info'

export default function Widget(props) {
  return (
    <div>
      <h1>widget</h1>
      <Cpu />
      <Mem />
      <Info />
    </div>
  )
}
