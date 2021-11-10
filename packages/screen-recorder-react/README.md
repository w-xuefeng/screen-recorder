# ScreenRecorder for React
A React component that can record the screen

[简体中文](./README_zh_CN.md) | English


## Install

```bash
npm install screen-recorder-react --save
```

## Usage

- 1 . Simple use

```tsx
import React from 'react'
import ScreenRecorder from 'screen-recorder-react'

interface IAppProps {
  // ...
}

const App: React.FC<IAppProps> = (props) => {
  // Your other logic code...
  return (
    <div>
      { /** Your other components... **/ }
      <ScreenRecorder />
    </div>
  )
}

export default App
```

- 2 . Enable privew and customize some information

```tsx
import React from 'react'
import ScreenRecorder from 'screen-recorder-react'

interface IAppProps {
  // ...
}

const videoOptions: MediaTrackConstraints = {
  width: 1920,
  height: 1080,
  frameRate: 60,
};

const App: React.FC<IAppProps> = (props) => {
  // Your other logic code...
  return (
    <div>
      { /** your other components... **/ }
      <ScreenRecorder
        preview
        shortKey="Alt+Shift+R"
        startBtnText="🛫 start"
        startBtnStyle={{ color: '#48bfa7' }}
        endBtnText="🛑 end"
        endBtnStyle={{ color: 'red' }}
        videoOptions={videoOptions}
      />
    </div>
  )
}

export default App
```

- 3 . Listening event callback

```tsx
import React from 'react'
import ScreenRecorder from 'screen-recorder-react'

interface IAppProps {
  // ...
}

const App: React.FC<IAppProps> = (props) => {
  
  const onStart = (mediaStream: MediaStream) => {
    /** Your logic code **/
  }
  const onError = (err: unknown) => {
    /** Your logic code **/
  }
  const onUnsupport = () => {
    /** Your logic code **/
  }
  const onEnd = (blobUrl: string, blob: Blob) => {
    /** Your logic code **/
  }

  return (
    <div>
      { /** your other components... **/ }
      <ScreenRecorder
        preview
        onRecordingStart={onStart}
        onRecordingEnd={onEnd}
        onRecordingUnsupport={onUnsupport}
        onRecordingError={onError}
      />
    </div>
  )
}

export default App
```

- 4 . Custom view

```tsx
import React from 'react'
import ScreenRecorder, { Video } from 'screen-recorder-react'

interface IAppProps {
  // ...
}

const startContent = (startEvent: Function) => {
  /** Your other logic code... **/
  return <button onClick={() => start(startEvent)}>start</button>
}

const endContent = (endEvent: Function) => {
  /** Your other logic code... **/
  return <button onClick={() => endEvent()}>end</button>
}

const previewContent = (mediaStream: MediaStream) => {
  /** Your other logic code... **/
  return (
  <Video
    muted
    autoPlay
    style={{ display: 'block' }}
    width={500}
    srcObject={mediaStream}
  />
  )
}

const App: React.FC<IAppProps> = (props) => {
  /** Your logic code... **/
  return (
    <div>
      { /** your other components... **/ }
      <ScreenRecorder
        preview
        startContent={startContent}
        endContent={endContent}
        previewContent={previewContent}
      />
    </div>
  )
}

export default App
```


## props

| propsName       | required | type                  | default    | desc                                                                                                   |
| --------------- | -------- | --------------------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| `shortKey`      | false    | string                | -          | shortcut key for starting, if you set shortcut, `ESC` will be set as the shortcut key to end recording |
| `preview`       | false    | boolean               | false      | show preview                                                                                           |
| `videoOptions`  | false    | MediaTrackConstraints | -          | video options                                                                                          |
| `startBtnText`  | false    | string                | `开始录屏` | the text for start-button                                                                              |
| `startBtnStyle` | false    | string                | -          | the style for start-button                                                                             |
| `endBtnText`    | false    | string                | `结束录屏` | the text for end-button                                                                                |
| `endBtnStyle`   | false    | string                | -          | the style for end-button                                                                               |

## events

| eventsName             | paramList                           | desc                     |
| ---------------------- | ----------------------------------- | ------------------------ |
| `onRecordingStart`     | [ `mediaStream`: MediaStream ]      | recorder start           |
| `onRecordingEnd`       | [ `blobUrl`: string, `blob`: Blob ] | recorder end             |
| `onRecordingUnsupport` | []                                  | recorder API unsupported |
| `onRecordingError`     | [ `err`: unknown ]                  | recorder error           |

## slot-props

| slotPropsName    | type                                                          | desc                                                                                                                                                    |
| ---------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `startContent`   | (startEvent: Function, endEvent: Function) => React.ReactNode | Customize the view that triggers the start screen recording event；<br/>`startEvent `: start screen recording,<br/> ` endEvent `: end screen recording  |
| `endContent`     | (endEvent: Function, startEvent: Function) => React.ReactNode | Customize the view that triggers the end screen recording event;<br/> ` endEvent `: end screen recording, <br/>`startEvent `: start screen recording    |
| `previewContent` | (mediaStream: MediaStream) => React.ReactNode                 | Customize video preview,<br/>`mediaStream`: it is the captured screen media stream, which can be assigned to the scrobject of video to preview and play |
