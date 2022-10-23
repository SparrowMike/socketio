import React from 'react'
import Cpu from './Cpu'
import Mem from './Mem'
import Info from './Info'

export default function Widget(props) {
  const { freeMem, totalMem, usedMem, memUseage, osType, upTime, cpuModel, numCores, cpuSpeed, cpuLoad, macA, isActive} = props.data;
  
  const cpuWidgetId = `cpu-widget-${macA.replaceAll(':', '-')}`
  const memWidgetId = `mem-widget-${macA.replaceAll(':', '-')}`

  const cpu = { cpuLoad, cpuWidgetId };
  const mem = { totalMem, usedMem, memUseage, freeMem, memWidgetId };
  const info = { macA, osType, upTime, cpuModel, numCores, cpuSpeed };

  let notActiveDiv = '';
  if (!isActive) {
    notActiveDiv = <div className='not-active'>Offline</div>;
  }
  
  return (
    <div className='widget col-sm-12'>
      {notActiveDiv}
      <Cpu cpuData={cpu} />
      <Mem memData={mem} />
      <Info infoData={info} />
    </div>
  )
}
