import RecordRTC from 'recordrtc'
import fixWebmMetaInfo from 'fix-webm-metainfo'

export interface IScreenRecorderOptions extends RecordRTC.Options {
  onUnsupported: () => void
  onRecordStart: (mediaStream: MediaStream, recorder: RecordRTC) => void
  onRecordEnd: (blobUrl: string, fixedBlob: Blob, recorder: RecordRTC) => void
  onError: (err: unknown) => void,
  videoOptions?: MediaTrackConstraints
}

export function safeCallback<
  ArgsType extends any[] = any[],
  ReturnType = void
>(callback: ((...args: ArgsType) => ReturnType) | undefined | null | false, ...args: ArgsType) {
  return typeof callback === 'function' ? callback(...args) : undefined
}

export default class ScreenRecorder {

  recording = false
  recorder: RecordRTC | null = null
  mediaStream: MediaStream | null = null
  apiSupportState = false

  options: IScreenRecorderOptions = {
    onRecordStart: () => { },
    onUnsupported: () => console.error(`[ScreenRecorder Error] Your browser does NOT support the getDisplayMedia API.`),
    onRecordEnd: (blobUrl, recorder) => { },
    onError: console.error
  }

  constructor(options: Partial<IScreenRecorderOptions>) {
    this.mergeOptions(options)
    this.apiSupportState = this.checkAPISupport()
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
      safeCallback(this.options.onUnsupported)
      return false
    }
    return true
  }

  initRecorder(mediaStream: MediaStream) {
    const {
      onRecordStart,
      onUnsupported,
      onRecordEnd,
      onError,
      videoOptions,
      ...otherOptions
    } = this.options
    this.mediaStream = mediaStream;
    this.recorder = new RecordRTC(mediaStream, {
      type: 'video',
      mimeType: 'video/webm;codecs=h264',
      disableLogs: true,
      ...otherOptions
    });
    this.recorder.startRecording();
    this.recording = true
    safeCallback(onRecordStart, mediaStream, this.recorder)
  }

  async init() {
    const { onError } = this.options
    try {
      const mediaStream = await this.captureScreen()
      this.initRecorder(mediaStream)
    } catch (error) {
      safeCallback(onError, error)
    }
  }

  startRecording() {
    this.apiSupportState && this.init()
  }

  stopRecording() {
    this.recorder?.stopRecording(this.stopRecordingCallback);
    this.recording = false
  }

  stopMediaStream() {
    this.mediaStream?.getTracks().forEach(tracks => tracks.stop())
  }

  async getDisplayMedia(onSuccess: (mediaStream: MediaStream) => void, onError: (reason?: any) => void) {
    const displayMediaStreamConstraints: DisplayMediaStreamConstraints = {
      video: {
        displaySurface: 'monitor' as 'monitor',
        logicalSurface: true,
        cursor: 'always' as 'always',
        ...this.options.videoOptions
      }
    }
    try {
      const mediaStream = navigator.mediaDevices.getDisplayMedia
        ? await navigator.mediaDevices.getDisplayMedia(displayMediaStreamConstraints)
        : navigator.getDisplayMedia
          ? await navigator.getDisplayMedia(displayMediaStreamConstraints)
          : null

      mediaStream
        ? onSuccess(mediaStream)
        : onError(new Error(`[ScreenRecorder Error] Unable to capture your screen.`))

    } catch (e) {
      onError(e)
    }
  }

  captureScreen() {
    return new Promise<MediaStream>((resolve, reject) => {
      this.getDisplayMedia((mediaStream: MediaStream) => {
        this.addStreamStopListener(mediaStream, () => this.stopRecording());
        resolve(mediaStream)
      }, reject);
    })
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

  stopRecordingCallback = () => {
    const { onRecordEnd, onError } = this.options
    const originBlob = this.recorder?.getBlob()
    originBlob && fixWebmMetaInfo(originBlob)
      .then(fixedBlob => {
        this.stopMediaStream()
        safeCallback<any>(onRecordEnd, URL.createObjectURL(fixedBlob), fixedBlob, this.recorder)
      }).then(() => {
        this.recorder?.destroy();
        this.recorder = null;
        this.mediaStream = null
      }).catch(e => {
        safeCallback(onError, e)
      })
  }

  static createSR(options: Partial<IScreenRecorderOptions>) {
    return new ScreenRecorder(options)
  }
}
