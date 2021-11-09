import React from 'react'
import ScreenRecorder from './components/ScreenRecorder'
import './App.css'

export default () => {
  return (
    <>
      <h1>1. Simple use</h1>
      <ScreenRecorder />

      <hr style={{ margin: '50px 0' }} />

      <h1>2. Custom slots use</h1>
      <ScreenRecorder>
      </ScreenRecorder>
    </>
  )
}
