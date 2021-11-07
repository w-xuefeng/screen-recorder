<script setup lang="ts">
import { ScreenRecorder, RecordRTC, IScreenRecorderOptions } from 'screen-recorder-base'
import bindkey from '@w-xuefeng/bindkey'
import { reactive, defineEmits } from 'vue'

const props = defineProps<{
  shortKey?: string,
  previewVideoElement?: HTMLVideoElement
  videoOptions?: MediaTrackConstraints
}>()

const emit = defineEmits([
  'recording-start',
  'recording-end',
  'recording-unsupport',
  'recording-error'
])

const state = reactive({
  error: false,
  unsupported: false,
  recording: false,
  screenRecorder: null as ScreenRecorder | null
})

const options: IScreenRecorderOptions = {
  onUnsupported: () => {
    state.unsupported = true
    state.recording = false
    state.error = false
    emit('recording-unsupport')
  },
  onRecordStart: (mediaStream: MediaStream) => {
    state.recording = true
    state.error = false
    if (props.previewVideoElement) {
      props.previewVideoElement.muted = true
      props.previewVideoElement.autoplay = true
      props.previewVideoElement.srcObject = mediaStream
      props.previewVideoElement.load()
    }
    emit('recording-start', mediaStream)
  },
  onError: (err) => {
    state.error = true
    state.recording = false
    console.log('[err]', err)
    emit('recording-error', err)
  },
  onRecordEnd: (blobUrl: string, fixedBlob: Blob) => {
    state.recording = false
    state.error = false
    console.log(blobUrl, fixedBlob);
    emit('recording-end', blobUrl, fixedBlob)
  },
  timeSlice: 1000,
  videoOptions: props.videoOptions
}

state.screenRecorder = ScreenRecorder.createSR(options)

const start = () => {
  state.screenRecorder?.startRecording()
}

const end = () => {
  state.screenRecorder?.stopRecording()
}

if (props.shortKey && props.shortKey.toUpperCase() !== 'ESC') {
  bindkey.add(props.shortKey, start)
  bindkey.add('ESC', end)
}
</script>

<template>
  <button :disabled="state.recording" @click="start">start</button>
  <button :disabled="!state.recording" @click="end">end</button>
  <div v-if="state.unsupported">onUnsupported</div>
  <div v-if="state.error">error</div>
</template>

<style>
</style>
