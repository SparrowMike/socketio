import React from 'react'
import drawCircle from "../src/utilities/canvasLoadAnimation";

export default function Mem(props) {
  const { totalMem, usedMem, memUseage, freeMem } = props.memData;
  const canvas = document.querySelector('.memCanvas')
  drawCircle(canvas, memUseage * 100)
  const totalMemInGB = Math.floor(totalMem/1073741824*100) / 100;
  const freeMemInGB = Math.floor(freeMem/1073741824*100) / 100;

  return (
    <div className="col-sm-3 mem">
      <h3>Memory Useage</h3>
      <div className="canvas-wrapper">
        <canvas className="memCanvas" width="200" height="200"></canvas>
        <div className="mem-text">
          {(memUseage * 100).toFixed()} %
        </div>
      </div>

      <div>
        Total Memory: {totalMemInGB}gb
      </div>
      <div>
        Total Memory: {freeMemInGB}gb
      </div>
    </div>
  )
}
