import React from "react";
import { ScreenRecorder, IScreenRecorderOptions, safeCallback } from 'screen-recorder-base';
import bindkey from '@w-xuefeng/bindkey';

export interface IScreenRecorderComponentProps {
  shortKey?: string;
  preview?: boolean;
  videoOptions?: MediaTrackConstraints;
  startBtnText?: React.ReactNode;
  startBtnStyle?: React.CSSProperties;
  endBtnText?: React.ReactNode;
  endBtnStyle?: React.CSSProperties;
  startContent?: (startEvent: Function, endEvent: Function) => React.ReactNode,
  endContent?: (endEvent: Function, startEvent: Function) => React.ReactNode,
  previewContent?: (mediaStream: MediaStream) => React.ReactNode,
  onRecordingStart?: (mediaStream: MediaStream) => void
  onRecordingEnd?: (blobUrl: string, fixedBlob: Blob) => void
  onRecordingUnsupport?: () => void
  onRecordingError?: (err: unknown) => void
};

export interface IScreenRecorderComponentStates {
  error: boolean
  unsupported: boolean
  recording: boolean
  screenRecorder: ScreenRecorder | null
}

const defaultBtnStyle: React.CSSProperties = {
  margin: '0 16px',
  cursor: 'pointer',
  boxShadow: 'none',
  fontSize: '14px',
  lineHeight: '20px',
  fontFamily: 'Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif',
  height: '32px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  border: '0 solid transparent',
  borderRadius: '2px',
  padding: '6px 12px',
  fontWeight: 600,
  outline: 'none',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  color: 'rgb(80, 86, 94)',
}

const defaultPreviewStyle: React.CSSProperties = {
  position: 'fixed',
  border: '1px solid #666',
  zIndex: 9999,
  cursor: 'move'
}

const rShow = (c: boolean, styles?: React.CSSProperties): React.CSSProperties => (
  {
    ...styles,
    ...(c ? {} : { display: 'none' })
  }
)

const AorB = (c: boolean, A: React.ReactNode, B: React.ReactNode = null) => c ? A : B

const initState: IScreenRecorderComponentStates = {
  error: false,
  unsupported: false,
  recording: false,
  screenRecorder: null,
}

const handleAction = {
  setState: (state: IScreenRecorderComponentStates, payload?: Partial<IScreenRecorderComponentStates>) => {
    return {
      ...state,
      ...payload
    }
  }
}

type TActionType = keyof typeof handleAction
type TAction = TActionType | { type: TActionType, payload: Partial<IScreenRecorderComponentStates> }

const reducer = (state: IScreenRecorderComponentStates, action: TAction): IScreenRecorderComponentStates => {
  const actionType = typeof action === 'string' ? action : action.type
  const payload = typeof action === 'string' ? undefined : action.payload
  const res: IScreenRecorderComponentStates | undefined = safeCallback<any, IScreenRecorderComponentStates>(handleAction[actionType], state, payload)
  return res ?? state
}

const ScreenRecorderComponent: React.FC<IScreenRecorderComponentProps> = (props) => {
  const {
    shortKey,
    preview = false,
    videoOptions,
    startBtnText = '开始录屏',
    startBtnStyle,
    endBtnText = '结束录屏',
    endBtnStyle,
    startContent,
    endContent,
    previewContent,
    onRecordingStart,
    onRecordingEnd,
    onRecordingUnsupport,
    onRecordingError,
  } = props

  const [state, dispatch] = React.useReducer(reducer, initState)
  const previewRef = React.useRef<HTMLVideoElement | null>(null)
  const previewDefaultWidth = 300;
  const setState = (payload: Partial<IScreenRecorderComponentStates>) => dispatch({
    type: 'setState',
    payload
  })

  const initPreview = (mediaStream: MediaStream) => {
    if (!preview || !previewRef.current) return;
    previewRef.current.srcObject = mediaStream;
    previewRef.current.load();
  };

  const options: IScreenRecorderOptions = {
    onUnsupported: () => {
      setState({
        unsupported: true,
        recording: false,
        error: false
      })
      safeCallback(onRecordingUnsupport);
    },
    onRecordStart: (mediaStream: MediaStream) => {
      setState({
        recording: true,
        error: false
      })
      initPreview(mediaStream);
      safeCallback(onRecordingStart, mediaStream);
    },
    onError: (err) => {
      setState({
        error: true,
        recording: false
      })
      safeCallback(onRecordingError, err);
    },
    onRecordEnd: (blobUrl: string, fixedBlob: Blob) => {
      setState({
        recording: false,
        error: false
      })
      safeCallback(onRecordingEnd, blobUrl, fixedBlob);
    },
    timeSlice: 1000,
    videoOptions,
  };

  React.useEffect(() => {
    setState({ screenRecorder: ScreenRecorder.createSR(options) })
    if (shortKey && shortKey.toUpperCase() !== 'ESC') {
      bindkey.add(shortKey, start);
      bindkey.add('ESC', end);
    }
    return () => {
      shortKey && (bindkey.remove(shortKey), bindkey.remove('ESC'))
    }
  }, [])

  const start = () => {
    state.screenRecorder?.startRecording();
  };

  const end = () => {
    state.screenRecorder?.stopRecording();
  };

  return (
    <div>
      {
        AorB(
          !startContent && !state.recording,
          <button
            onClick={start}
            style={{ ...defaultBtnStyle, ...startBtnStyle }}
          >
            {startBtnText}
          </button>,
          AorB(
            !state.recording,
            safeCallback(startContent, start, end)
          )
        )
      }
      {
        AorB(
          !endContent && state.recording,
          <button
            onClick={end}
            style={{ ...defaultBtnStyle, ...endBtnStyle }}
          >
            {endBtnText}
          </button>,
          AorB(
            state.recording,
            safeCallback(endContent, end, start)
          )
        )
      }
      {
        AorB(
          preview && !previewContent,
          <video
            ref={previewRef}
            muted
            autoPlay
            width={previewDefaultWidth}
            style={rShow(state.recording, { ...defaultPreviewStyle })}
          ></video>,
          AorB(
            !!(preview && state.recording && state.screenRecorder),
            state.screenRecorder
              ? safeCallback<[MediaStream], React.ReactNode>(previewContent, state.screenRecorder!.mediaStream!)
              : null
          )
        )
      }
    </div >
  );
}

export default ScreenRecorderComponent;
