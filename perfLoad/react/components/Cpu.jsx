import React from 'react'
import drawCircle from '../src/utilities/canvasLoadAnimation'

export default function Cpu(props) {
  const cpu = props.cpuData.cpuLoad
  const canvas = document.querySelector('canvas')
  drawCircle(canvas, cpu)

  return (
    <div className="col-sm3 cpu">
      <h3>CPU load</h3>
      <div className="canvas-wrapper">
        <canvas className="canvas"></canvas>
        <div className="cpud-text">{cpu}</div>
      </div>
    </div>
  )
}
