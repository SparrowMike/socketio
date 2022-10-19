import React from 'react'
import drawCircle from '../src/utilities/canvasLoadAnimation'

export default function Cpu(props) {
  const cpu = props.cpuData.cpuLoad
  const canvas = document.querySelector('canvas')
  drawCircle(canvas, cpu)

  return (
    <div className="col-sm-3 cpu">
      <h3>CPU load</h3>
      <div className="canvas-wrapper">
        <canvas className="canvas" width="200" height="200"></canvas>
          <div className="cpu-text">{cpu} %</div>
      </div>
    </div>
  )
}
