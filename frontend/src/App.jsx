import { useState } from 'react'
import './App.css'
import CreateAccount from './pages/Worker/CreateAccount'
import WorkerLogin from './pages/Worker/WorkerLogin'
function App() {
  return (
    <div className="App w-full h-screen">
      <CreateAccount/>
      {/* <WorkerLogin/> */}
    </div>
  )
}

export default App
