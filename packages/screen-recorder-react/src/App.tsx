import React from 'react'
import { Card, Switch, Row, Col, Select, Input } from 'antd';
import ScreenRecorder, { safeCallback } from 'screen-recorder-react'
import Video from './components/Video'
import 'antd/dist/antd.css';
import './App.css'

interface IAppStates {
  shortKey?: string;
  preview?: boolean;
  videoOptions?: MediaTrackConstraints;
  startBtnText?: React.ReactNode;
  startBtnStyle?: React.CSSProperties;
  endBtnText?: React.ReactNode;
  endBtnStyle?: React.CSSProperties;
  recording?: boolean
  url?: string
}

const initState: IAppStates = {
  shortKey: 'Alt+Shift+W',
  preview: true,
  videoOptions: {
    frameRate: 60,
    width: 1920,
    height: 1080
  },
  startBtnText: '🛫 开始',
  startBtnStyle: { color: '#48bfa7' },
  endBtnText: '🛑 结束',
  endBtnStyle: { color: '#FF0000' },
  recording: false
}

interface IBlockProps {
  title?: React.ReactNode
  style?: React.CSSProperties
  bordered?: boolean
  state: IAppStates
  onPreviewChange?: (checked: boolean) => void
  onShortKeyChange?: (key: string) => void
  onStartBtnTextChange?: React.ChangeEventHandler<HTMLInputElement>
  onEndBtnTextChange?: React.ChangeEventHandler<HTMLInputElement>,
  onStartBtnStyleChange?: React.ChangeEventHandler<HTMLInputElement>,
  onEndBtnStyleChange?: React.ChangeEventHandler<HTMLInputElement>,
  onVideoOptionsFrameRateChange?: (frameRate: string) => void,
  onVideoOptionsAspectRatioChange?: (aspectRatio: string) => void,
}

const staticStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center'
}

const fromStyle: React.CSSProperties = {
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}

const Line: React.FC<{ style?: React.CSSProperties }> = ({ style }) =>
  <div style={{ width: '100%', height: '1px', background: '#eee', margin: '30px auto', ...style }}></div>

const GraySmallFont: React.FC<{ style?: React.CSSProperties }> = ({ style, children }) =>
  <span style={{ fontSize: 12, color: '#999', ...style }}>{children}</span>

const Block: React.FC<IBlockProps> = (props) => {
  const {
    title,
    style,
    bordered,
    state,
    onPreviewChange,
    onShortKeyChange,
    onStartBtnTextChange,
    onEndBtnTextChange,
    onStartBtnStyleChange,
    onEndBtnStyleChange,
    onVideoOptionsFrameRateChange,
    onVideoOptionsAspectRatioChange
  } = props

  return (
    <Card title={title} bordered={bordered} style={{ width: '90%', margin: '20px auto', ...style }}>
      <div style={staticStyle}>
        <div style={fromStyle}>
          <Row gutter={{ md: 24 }} style={{ marginBottom: '20px' }}>
            <Col md={12}>预览<GraySmallFont>（preview）</GraySmallFont></Col>
            <Col md={12}><Switch checked={state.preview} onChange={onPreviewChange} /></Col>
          </Row>
          <Row gutter={{ md: 24 }} style={{ marginBottom: '20px' }}>
            <Col md={12}>快捷键<GraySmallFont>（shortKey）</GraySmallFont></Col>
            <Col md={12}>
              <Select value={state.shortKey} style={{ width: '100%' }} onChange={onShortKeyChange}>
                <Select.Option value="Alt+Shift+W">Alt+Shift+W</Select.Option>
                <Select.Option value="Alt+Shift+Q">Alt+Shift+Q</Select.Option>
                <Select.Option value="Alt+1">Alt+1</Select.Option>
                <Select.Option value="Alt+2">Alt+2</Select.Option>
                <Select.Option value="Alt+3">Alt+3</Select.Option>
                <Select.Option value="Alt+4">Alt+4</Select.Option>
                <Select.Option value="A">A</Select.Option>
                <Select.Option value="B">B</Select.Option>
                <Select.Option value="C">C</Select.Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={{ md: 24 }} style={{ marginBottom: '20px' }}>
            <Col md={12}>开始按钮文本<GraySmallFont>（startBtnText）</GraySmallFont></Col>
            <Col md={12}><Input value={state.startBtnText as string} onChange={onStartBtnTextChange} /></Col>
          </Row>
          {
            state.startBtnStyle && (
              <Row gutter={{ md: 24 }} style={{ marginBottom: '20px' }}>
                <Col md={12}>开始按钮文本颜色<GraySmallFont>（startBtnStyle.color）</GraySmallFont></Col>
                <Col md={12}><input type="color" value={state.startBtnStyle?.color} onChange={onStartBtnStyleChange} /></Col>
              </Row>
            )
          }
          <Row gutter={{ md: 24 }} style={{ marginBottom: '20px' }}>
            <Col md={12}>结束按钮文本<GraySmallFont>（endBtnText）</GraySmallFont></Col>
            <Col md={12}><Input value={state.endBtnText as string} onChange={onEndBtnTextChange} /></Col>
          </Row>
          {
            state.endBtnStyle && (
              <Row gutter={{ md: 24 }} style={{ marginBottom: '20px' }}>
                <Col md={12}>结束按钮文本颜色<GraySmallFont>（startBtnStyle.color）</GraySmallFont></Col>
                <Col md={12}><input type="color" value={state.endBtnStyle?.color} onChange={onEndBtnStyleChange} /></Col>
              </Row>
            )
          }
          <Row gutter={{ md: 24 }} style={{ marginBottom: '20px' }}>
            <Col md={12}>视频FPS设置<GraySmallFont>（videoOptions.frameRate）</GraySmallFont></Col>
            <Col md={12}>
              <Select
                disabled={state.recording}
                value={
                  typeof state.videoOptions?.frameRate === 'number' && !isNaN(state.videoOptions?.frameRate)
                    ? String(state.videoOptions?.frameRate)
                    : '60'
                }
                style={{ width: '100%' }} onChange={onVideoOptionsFrameRateChange}>
                <Select.Option value={60}>60</Select.Option>
                <Select.Option value={30}>30</Select.Option>
                <Select.Option value={24}>24</Select.Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={{ md: 24 }} style={{ marginBottom: '20px' }}>
            <Col md={12}>视频分辨率设置<GraySmallFont>（videoOptions.width/height)</GraySmallFont></Col>
            <Col md={12}>
              <Select
                disabled={state.recording}
                value={`${state.videoOptions?.width}×${state.videoOptions?.height}`}
                style={{ width: '100%' }} onChange={onVideoOptionsAspectRatioChange}>
                <Select.Option value={'1920×1080'}>1920×1080</Select.Option>
                <Select.Option value={'1280×720'}>1280×720</Select.Option>
                <Select.Option value={'720×480'}>720×480</Select.Option>
              </Select>
            </Col>
          </Row>
        </div>
        {props.children}
      </div>
    </Card>
  )
}


const handleAction = {
  setState: (state: IAppStates, payload?: Partial<IAppStates>) => {
    return {
      ...state,
      ...payload
    }
  },
  setStartBtnStyle: (state: IAppStates, payload?: React.CSSProperties) => {
    return {
      ...state,
      startBtnStyle: {
        ...state.startBtnStyle,
        ...payload,
      }
    }
  },
  setEndBtnStyle: (state: IAppStates, payload?: React.CSSProperties) => {
    return {
      ...state,
      endBtnStyle: {
        ...state.endBtnStyle,
        ...payload,
      }
    }
  },
  setVideoOptions: (state: IAppStates, payload?: MediaTrackConstraints) => {
    return {
      ...state,
      videoOptions: {
        ...state.videoOptions,
        ...payload,
      }
    }
  },
}

type TActionType = keyof typeof handleAction
type TAction = TActionType | { type: TActionType, payload: Partial<IAppStates> | React.CSSProperties | MediaTrackConstraints }

const reducer = (state: IAppStates, action: TAction): IAppStates => {
  const actionType = typeof action === 'string' ? action : action.type
  const payload = typeof action === 'string' ? undefined : action.payload
  const res: IAppStates | undefined = safeCallback<any, IAppStates>(handleAction[actionType], state, payload)
  return res ?? state
}

const SimpUse: React.FC<{}> = (props) => {

  const [state, dispatch] = React.useReducer(reducer, initState)
  const setState = (payload: Partial<IAppStates>) => dispatch({
    type: 'setState',
    payload
  })


  const recordingEnd = (url: string) => {
    setState({ recording: false, url });
  }

  return (
    <Block
      title="1.简单使用"
      bordered
      state={state}
      onPreviewChange={(preview) => setState({ preview })}
      onShortKeyChange={(shortKey) => setState({ shortKey })}
      onStartBtnTextChange={({ target: { value: startBtnText } }) => setState({ startBtnText })}
      onEndBtnTextChange={({ target: { value: endBtnText } }) => setState({ endBtnText })}
      onStartBtnStyleChange={({ target: { value: color } }) => dispatch({ type: 'setStartBtnStyle', payload: { color } })}
      onEndBtnStyleChange={({ target: { value: color } }) => dispatch({ type: 'setEndBtnStyle', payload: { color } })}
      onVideoOptionsFrameRateChange={(frameRate) => dispatch({
        type: 'setVideoOptions',
        payload: { frameRate: Number(frameRate) }
      })}
      onVideoOptionsAspectRatioChange={(aspectRatio) => {
        const [width = 1920, height = 1080] = aspectRatio.split('×').map(Number)
        dispatch({
          type: 'setVideoOptions',
          payload: { width, height }
        })
      }}
    >

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ScreenRecorder
          preview={state.preview}
          shortKey={state.shortKey}
          onRecordingEnd={recordingEnd}
          startBtnText={state.startBtnText}
          startBtnStyle={state.startBtnStyle}
          endBtnText={state.endBtnText}
          endBtnStyle={state.endBtnStyle}
          videoOptions={state.videoOptions}
          onRecordingStart={() => setState({ recording: true })}
        />
        {
          state.url &&
          !state.recording &&
          <video
            width="500"
            muted
            autoPlay
            controls
            src={state.url}
            style={{ marginTop: '30px', border: '1px solid #000' }}
          ></video>
        }
      </div>

    </Block>
  )
}


const CustomContent: React.FC<{}> = (props) => {

  const [recording, setRecording] = React.useState(false);
  const [url, setUrl] = React.useState<string | undefined>();

  const start = (startEvent: Function) => {
    startEvent();
    setRecording(true);
  };

  const customRecordingEnd = (url: string) => {
    setRecording(false);
    setUrl(url)
  }

  const startContent = (startEvent: Function) => !recording &&
    (
      <div
        title="开始录屏"
        onClick={() => start(startEvent)}
        className="icon"
      >
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="887"
          width="50"
          height="50"
        ><path d="M325.43 185.5c-127.62 0-177.25 49.63-177.25 177.25v298.52c0 85.82 46.64 177.24 177.25 177.24h223.89c127.62 0 177.24-49.63 177.24-177.24V362.74c0-127.62-49.63-177.25-177.24-177.25H325.43z" fill="#A4D4FF" p-id="888"></path><path d="M493.31 488.87c-38.74 0-70.15-31.41-70.15-70.15s31.41-70.15 70.15-70.15 70.15 31.41 70.15 70.15-31.41 70.15-70.15 70.15z" fill="#2B8CF7" p-id="889"></path><path d="M781.06 308.27l-55.23 38.81c0.37 5.22 0.75 10.07 0.75 15.67v298.52c0 5.6-0.75 10.45-0.75 15.67l55.23 38.81c23.14 16.42 43.29 21.64 59.33 21.64 13.81 0 24.63-3.73 31.72-7.46 15.3-7.84 41.05-29.11 41.05-82.47V376.92c0-53.36-25.75-74.63-41.05-82.47-15.3-7.83-47.39-16.78-91.05 13.82z" fill="#2B8CF7" p-id="890"></path>
        </svg>
      </div>
    )

  const endContent = (endEvent: Function) => recording && (
    <div
      title="结束录屏"
      onClick={() => endEvent()}
      className="icon"
    >
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1050"
        width="50"
        height="50"
      >
        <path d="M510.91 885.15c-206.08 0-373.15-167.06-373.15-373.15s167.06-373.15 373.15-373.15S884.05 305.92 884.05 512 716.99 885.15 510.91 885.15z" fill="#A4D4FF" p-id="1051"></path><path d="M557.88 669.84c61.94 0 111.94-50 111.94-111.94v-91.8c0-61.94-50-111.94-111.94-111.94h-91.79c-61.94 0-111.94 50-111.94 111.94v91.79c0 61.94 50 111.94 111.94 111.94h91.79z" fill="#2B8CF7" p-id="1052"></path>
      </svg>
    </div>
  )

  const previewContent = (mediaStream: MediaStream) =>
    <Video
      muted
      autoPlay
      style={{ display: 'block' }}
      width={500}
      srcObject={mediaStream}
    />

  return (
    <Card
      title="2.自定义视图"
      bordered
      style={{
        width: '90%',
        margin: '20px auto',
        minHeight: '500px'
      }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ScreenRecorder
          preview
          onRecordingEnd={customRecordingEnd}
          startContent={startContent}
          endContent={endContent}
          previewContent={previewContent}
        />
        {
          url && !recording &&
          <video
            width="500"
            muted
            autoPlay
            controls
            src={url}
            style={{ marginTop: '30px', border: '1px solid #000' }}
          ></video>
        }
      </div>
    </Card>
  )
}

export default () => {
  return (
    <>
      <SimpUse />
      <Line style={{ width: '90%' }} />
      <CustomContent />
    </>
  )
}
