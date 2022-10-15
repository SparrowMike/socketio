import { useState } from 'react'
import './App.css'
import socket from './utilities/socketConnection'
import Widget from '../components/Widget'

function App() {
  const [count, setCount] = useState(0)
  const [performanceData, setPerformanceData] = useState({})

  socket.on('data', data => {
    console.log(data)
  })

  return (
    <div className="App">
      <Widget />
    </div>
  )
}

export default App
