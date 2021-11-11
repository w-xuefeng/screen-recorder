import { Component, OnInit } from '@angular/core';
import { ScreenRecorder, IScreenRecorderOptions, RecordRTC } from 'screen-recorder-base';
import bindkey from '@w-xuefeng/bindkey'
import ScreenRecorderProps from './screen-recorder.props';

@Component({
  selector: 'app-screen-recorder',
  templateUrl: './screen-recorder.component.html',
  styleUrls: ['./screen-recorder.component.css']
})
export class ScreenRecorderComponent extends ScreenRecorderProps implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    const options: IScreenRecorderOptions & RecordRTC.Options = {
      onUnsupported: () => {
        this.state.unsupported = true;
        this.state.recording = false;
        this.state.error = false;
        this.onRecordingUnsupport.emit()
      },
      onRecordStart: (mediaStream: MediaStream) => {
        this.state.recording = true;
        this.state.error = false;
        this.initPreview(mediaStream);
        this.onRecordingStart.emit({ mediaStream })
      },
      onError: (err: unknown) => {
        this.state.error = true;
        this.state.recording = false;
        this.onRecordingError.emit({ err })
      },
      onRecordEnd: (blobUrl: string, fixedBlob: Blob) => {
        this.state.recording = false;
        this.state.error = false;
        this.onRecordingEnd.emit({ url: blobUrl, blob: fixedBlob })
      },
      timeSlice: 1000,
      videoOptions: this.videoOptions,
    };

    this.state.screenRecorder = ScreenRecorder.createSR(options);

    if (this.shortKey && this.shortKey.toUpperCase() !== 'ESC') {
      bindkey.add(this.shortKey, this.start);
      bindkey.add('ESC', this.end);
    }
  }
}
