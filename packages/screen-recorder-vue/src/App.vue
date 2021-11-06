<script setup lang="ts">
import { ScreenRecorder, RecordRTC, IScreenRecorderOptions } from 'screen-recorder-base'
import { reactive } from 'vue';

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
  },
  onRecordStart: () => {
    state.recording = true
    state.error = false
  },
  onError: (err) => {
    state.error = true
    state.recording = false
    console.log('[err]', err)
  },
  onRecordEnd: (blobUrl: string, recorder: RecordRTC) => {
    state.recording = false
    state.error = false
    console.log(blobUrl)
  },
}

state.screenRecorder = ScreenRecorder.createSR(options)

const start = () => {
  state.screenRecorder?.startRecording()
}

const end = () => {
  state.screenRecorder?.stopRecording()
}
</script>

<template>
  <button :disabled="state.recording" @click="start">start</button>
  <button :disabled="!state.recording" @click="end">end</button>
  <div v-if="state.unsupported">onUnsupported</div>
  <div v-if="state.error">error</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
