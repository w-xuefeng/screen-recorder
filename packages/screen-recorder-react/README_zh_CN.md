
# ScreenRecorder for React
一个可以录制屏幕的 React 组件

简体中文 | [English](./README.md)

## 安装

```bash
npm install screen-recorder-react --save
```

## 使用

- 1 . 简单使用

```tsx
import React from 'react'
import ScreenRecorder, { Video } from 'screen-recorder-react'

interface IAppProps {
  // ...
}

const App: React.FC<IAppProps> = (props) => {
  // 你的其他逻辑代码...
  return (
    <div>
      { /** 你的其他组件... **/ }
      <ScreenRecorder />
    </div>
  )
}

export default App
```

- 2 . 启用预览并且自定义一些属性信息

```tsx
import React from 'react'
import ScreenRecorder, { Video } from 'screen-recorder-react'

interface IAppProps {
  // ...
}

const videoOptions: MediaTrackConstraints = {
  width: 1920,
  height: 1080,
  frameRate: 60,
};

const App: React.FC<IAppProps> = (props) => {
  // 你的其他逻辑代码...
  return (
    <div>
      { /** 你的其他组件... **/ }
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

- 3 . 监听事件回调

```tsx
import React from 'react'
import ScreenRecorder, { Video } from 'screen-recorder-react'

interface IAppProps {
  // ...
}

const App: React.FC<IAppProps> = (props) => {
  
  const onStart = (mediaStream: MediaStream) => {
    /** 你的逻辑代码... **/
  }
  const onError = (err: unknown) => {
    /** 你的逻辑代码... **/
  }
  const onUnsupport = () => {
    /** 你的逻辑代码... **/
  }
  const onEnd = (blobUrl: string, blob: Blob) => {
    /** 你的逻辑代码... **/
  }

  return (
    <div>
      { /** 你的其他组件... **/ }
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

- 4 . 自定义视图

```tsx
import React from 'react'
import ScreenRecorder, { Video } from 'screen-recorder-react'

interface IAppProps {
  // ...
}

const startContent = (startEvent: Function) => {
  /** 你的自定义逻辑代码... **/
  return <button onClick={() => start(startEvent)}>start</button>
}

const endContent = (endEvent: Function) => {
  /** 你的自定义逻辑代码... **/
  return <button onClick={() => endEvent()}>end</button>
}

const previewContent = (mediaStream: MediaStream) => {
  /** 你的自定义逻辑代码... **/
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
  /** 你的其他逻辑代码... **/
  return (
    <div>
      { /** 你的其他组件... **/ }
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

| props 名称 | 是否必须 | 类型 | 默认值 | 描述 |
| - | - | - | - | - |
| `shortKey` | false | string | - | 开始录屏的快捷键，如果不为空，则自动将 `ESC` 设为结束录制的快捷键 |
| `preview` | false | boolean | false | 显示预览 |
| `videoOptions` | false | MediaTrackConstraints | - | 视频选项设置 |
| `startBtnText` | false | string | `开始录屏` | 开始按钮的文案 |
| `startBtnStyle` | false | string | - | 开始按钮的样式 |
| `endBtnText` | false | string | `结束录屏` | 结束按钮的文案 |
| `endBtnStyle` | false | string | - | 结束按钮的样式 |

## events

| 事件名称 | 参数列表 | 描述 |
| - | - | - |
| `onRecordingStart` | [ `mediaStream`: MediaStream ] | 开始录屏 |
| `onRecordingEnd` | [ `blobUrl`: string, `blob`: Blob ] | 结束录屏 |
| `onRecordingUnsupport` | [] | 浏览器不支持 API |
| `onRecordingError` | [ `err`: unknown ] | 录屏出现错误 |

## slots-props

| 插槽类 props 名称 | 类型签名 | 描述 |
| - | - | - |
| `startContent` | (startEvent: Function, endEvent: Function) => React.ReactNode | 自定义触发开始录屏事件的视图; <br/>`startEvent`：开始录屏，<br/>`endEvent`：结束录屏   |
| `endContent` | (endEvent: Function, startEvent: Function) => React.ReactNode | 自定义触发结束录屏事件的视图; <br/>`endEvent`：结束录屏，<br/>`startEvent`：开始录屏 |
| `previewContent` | (mediaStream: MediaStream) => React.ReactNode | 自定义 video 预览视图; <br/>`mediaStream`: 捕获的屏幕媒体流，可赋值给 video 的 scrObject 实现播放预览 |
