import { useState } from 'react'
import './App.css'
import socket from './utilities/socketConnection'
import Widget from '../components/Widget'

function App() {
  const [performanceData, setPerformanceData] = useState({})

  socket.on('data', data => {
    setPerformanceData({
      [data.macA]: data
    })
  })

  // console.log(performanceData)
  let widgets = [];
  const data = performanceData;
  Object.entries(data).forEach(([key, value]) => {
    // console.log("key", key)
    // console.log("value", value)
    widgets.push(<Widget key={key} data={value} />)
  })
  return (
    <div className="App">
      {widgets}
    </div>
  )
}

export default App
