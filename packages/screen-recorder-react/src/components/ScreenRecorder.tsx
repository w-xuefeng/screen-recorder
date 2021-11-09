import React from "react";
import { ScreenRecorder, IScreenRecorderOptions, safeCallback } from 'screen-recorder-base';

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

const AorB = (c: boolean, A: React.ReactNode, B: React.ReactNode) => c ? A : B

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





  return (
    <div>
      {}
    </div>
  );
}

export default ScreenRecorderComponent;
