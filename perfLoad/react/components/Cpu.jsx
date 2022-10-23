import React from 'react'
import drawCircle from '../src/utilities/canvasLoadAnimation'

export default function Cpu(props) {
  const cpu = props.cpuData.cpuLoad
  const canvas = document.querySelector(`.${props.cpuData.cpuWidgetId}`)
  drawCircle(canvas, cpu)

  return (
    <div className="col-sm-3 cpu">
      <h3>CPU load</h3>
      <div className="canvas-wrapper">
        <canvas className={props.cpuData.cpuWidgetId} width="200" height="200"></canvas>
          <div className="cpu-text">{cpu} %</div>
      </div>
    </div>
  )
}
