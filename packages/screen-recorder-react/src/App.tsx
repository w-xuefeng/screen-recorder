import React from 'react'
import ScreenRecorder from './components/ScreenRecorder'
import Video from './components/Video'
import './App.css'

export default () => {

  const [recording, setRecording] = React.useState(false);

  const videoOptions: MediaTrackConstraints = {
    width: 1920,
    height: 1080,
    frameRate: 60,
  };

  const start = (startEvent: Function) => {
    startEvent();
    setRecording(true);
  };

  const recordingEnd = (url: string) => {
    console.log(url);
    // to do sth for url
  }

  const customRecordingEnd = (url: string) => {
    setRecording(false);
    console.log(url);
    // to do sth for url
  }

  const startContent = (startEvent: Function) => !recording && <button onClick={() => start(startEvent)}>开始录屏</button>
  const endContent = (endEvent: Function) => recording && <button onClick={() => endEvent()}>结束录屏</button>
  const previewContent = (mediaStream: MediaStream) =>
    <Video
      muted
      autoPlay
      style={{ display: 'block' }}
      width={500}
      srcObject={mediaStream}
    />
  return (
    <>
      <h1>1. Simple use</h1>
      <ScreenRecorder
        preview
        onRecordingEnd={recordingEnd}
        startBtnText="🛫 开始"
        startBtnStyle={{ color: '#48bfa7' }}
        endBtnText="🛑 结束"
        endBtnStyle={{ color: 'red' }}
      />

      <hr style={{ margin: '50px 0' }} />

      <h1>2. Custom use</h1>
      <ScreenRecorder
        preview
        shortKey="Alt+Shift+R"
        videoOptions={videoOptions}
        onRecordingEnd={customRecordingEnd}
        startContent={startContent}
        endContent={endContent}
        previewContent={previewContent}
      />
    </>
  )
}
