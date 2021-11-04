import RecordRTC from 'recordrtc'

export interface IScreenRecorderOptions {
  onUnsupported: () => void
  onRecordEnd: (blobUrl: string, recorder: RecordRTC) => void
  previewStream?: (mediaStream: MediaStream) => void
}

export default class ScreenRecorder {

  recording = false
  recorder: RecordRTC | null = null
  mediaStream: MediaStream | null = null

  options: IScreenRecorderOptions = {
    onUnsupported: () => {
      console.error(`[ScreenRecorder Error] Your browser does NOT support the getDisplayMedia API.`)
    },
    onRecordEnd: (blobUrl, recorder) => { }
  }

  constructor(options: Partial<IScreenRecorderOptions>) {
    this.mergeOptions(options)
    this.checkAPISupport() && this.init()
  }

  mergeOptions(options: Partial<IScreenRecorderOptions>) {
    this.options = {
      ...this.options,
      ...options
    }
  }

  checkAPISupport() {
    if (
      !navigator.getDisplayMedia &&
      !navigator.mediaDevices.getDisplayMedia
    ) {
      typeof this.options.onUnsupported === 'function' &&
        this.options.onUnsupported()
      return false
    }
    return true
  }

  init() {
    const initRecorder = (mediaStream: MediaStream) => {
      const { previewStream } = this.options
      this.recorder = new RecordRTC(mediaStream, {
        type: 'video',
        mimeType: 'video/mp4',
        previewStream
      });
      this.recorder.startRecording();
      this.recording = true
      this.mediaStream = mediaStream;
    }
    this.captureScreen(initRecorder)
  }

  stopRecording() {
    this.recorder && this.recorder.stopRecording(this.stopRecordingCallback);
    this.recording = false
  }

  async getDisplayMedia(onSuccess: (mediaStream: MediaStream) => void, onError: (reason?: any) => void) {
    const displayMediaStreamConstraints = {
      atMediaDevices: {
        video: {
          displaySurface: 'monitor' as 'monitor',
          logicalSurface: true,
          cursor: 'always' as 'always'
        }
      },
      atNavigator: {
        video: true
      }
    }

    try {
      const mediaStream = navigator.mediaDevices.getDisplayMedia
        ? await navigator.mediaDevices.getDisplayMedia(displayMediaStreamConstraints.atMediaDevices)
        : navigator.getDisplayMedia
          ? await navigator.getDisplayMedia(displayMediaStreamConstraints.atNavigator)
          : null

      mediaStream
        ? onSuccess(mediaStream)
        : onError(new Error(`[ScreenRecorder Error] Unable to capture your screen.`))

    } catch (e) {
      onError(e)
    }
  }

  captureScreen(callback: (mediaStream: MediaStream) => void) {
    const onSuccess = (mediaStream: MediaStream) => {
      this.addStreamStopListener(mediaStream, () => this.stopRecording());
      callback(mediaStream)
    }
    this.getDisplayMedia(onSuccess, console.error);
  }

  addStreamStopListener(stream: MediaStream, callback: () => void) {
    stream.addEventListener('ended', () => {
      callback();
      callback = () => { }
    }, false);

    stream.addEventListener('inactive', () => {
      callback();
      callback = () => { }
    }, false);

    stream.getTracks().forEach((track) => {
      track.addEventListener('ended', () => {
        callback();
        callback = () => { }
      }, false);

      track.addEventListener('inactive', () => {
        callback();
        callback = () => { }
      }, false);
    });
  }

  stopRecordingCallback() {
    if (this.recorder) {
      typeof this.options.onRecordEnd === 'function' &&
        this.options.onRecordEnd(URL.createObjectURL(this.recorder.getBlob()), this.recorder)
      this.recorder.destroy();
    }
    this.mediaStream &&
      typeof this.mediaStream.stop === 'function' &&
      this.mediaStream.stop();
    this.recorder = null;
    this.mediaStream = null
  }

  static createSR(options: Partial<IScreenRecorderOptions>) {
    return new ScreenRecorder(options)
  }
}
