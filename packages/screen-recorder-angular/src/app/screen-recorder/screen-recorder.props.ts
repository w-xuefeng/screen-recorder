import {
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from "@angular/core";
import { ScreenRecorder } from 'screen-recorder-base';

@Directive({
  selector: '[startContent]'
})
export class StartContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) { }
}

@Directive({
  selector: '[endContent]'
})
export class EndContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) { }
}

@Directive({
  selector: '[previewContent]'
})
export class PreviewContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) { }
}

@Directive()
export default class ScreenRecorderProps {

  @Input() shortKey?: string;
  @Input() preview?: boolean;
  @Input() videoOptions?: MediaTrackConstraints;
  @Input() startBtnText?: string = '开始录屏';
  @Input() startBtnStyle?: string;
  @Input() endBtnText?: string = '结束录屏';
  @Input() endBtnStyle?: string;

  @Output() onRecordingStart = new EventEmitter<{ mediaStream: MediaStream }>();
  @Output() onRecordingEnd = new EventEmitter<{ url: string, blob: Blob }>();
  @Output() onRecordingUnsupport = new EventEmitter<void>();
  @Output() onRecordingError = new EventEmitter<{ err: unknown }>();

  @ContentChild(StartContentDirective) startContent!: StartContentDirective;
  @ContentChild(EndContentDirective) endContent!: EndContentDirective;
  @ContentChild(PreviewContentDirective) previewContent!: PreviewContentDirective;

  state = {
    error: false,
    unsupported: false,
    recording: false,
    screenRecorder: null as ScreenRecorder | null,
  }

  previewDefaultWidth = 300;
  previewMediaStream?: MediaStream

  initPreview = (mediaStream: MediaStream) => {
    this.previewMediaStream = mediaStream
    this.previewContext = { mediaStream }
  }

  start = () => {
    this.state.screenRecorder?.startRecording();
  };

  end = () => {
    this.state.screenRecorder?.stopRecording();
  };

  startContext = {
    startEvent: this.start,
    endEvent: this.end
  }

  endContext = {
    startEvent: this.start,
    endEvent: this.end
  }

  previewContext = {
    mediaStream: this.state.screenRecorder?.mediaStream
  }

  defaultBtnStyle = `
    margin: 0 16px;
    cursor: pointer;
    box-shadow: none;
    font-size: 14px;
    line-height: 20px;
    font-family: Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    border: 0 solid transparent;
    border-radius: 2px;
    padding: 6px 12px;
    font-weight: 600;
    outline: none;
    vertical-align: middle;
    white-space: nowrap;
    color: rgb(80, 86, 94);
`;

}
