<script setup lang="ts">
import { ScreenRecorder, IScreenRecorderOptions } from 'screen-recorder-base';
import bindkey from '@w-xuefeng/bindkey';
import { useDraggable } from '@vueuse/core';
import { ref, reactive, useSlots } from 'vue';

const props = defineProps<{
  shortKey?: string;
  preview?: boolean;
  videoOptions?: MediaTrackConstraints;
  startBtnText?: string;
  startBtnStyle?: string;
  endBtnText?: string;
  endBtnStyle?: string;
}>();

const emit = defineEmits([
  'recording-start',
  'recording-end',
  'recording-unsupport',
  'recording-error',
]);

const notSlotStart = ref(!!!useSlots().start);
const notSlotEnd = ref(!!!useSlots().end);
const notSlotPreview = ref(!!!useSlots().preview);
const previewRef = ref<HTMLVideoElement | null>(null);
const previewDefaultWidth = 300;
const { style: previewStyle } = useDraggable(previewRef, {
  initialValue: {
    x: document.documentElement.clientWidth - previewDefaultWidth - 5,
    y: 5,
  },
});

const state = reactive({
  error: false,
  unsupported: false,
  recording: false,
  screenRecorder: null as ScreenRecorder | null,
});

const initPreview = (mediaStream: MediaStream) => {
  if (!props.preview || !previewRef.value) return;
  previewRef.value.srcObject = mediaStream;
  previewRef.value.load();
};

const options: IScreenRecorderOptions = {
  onUnsupported: () => {
    state.unsupported = true;
    state.recording = false;
    state.error = false;
    emit('recording-unsupport');
  },
  onRecordStart: (mediaStream: MediaStream) => {
    state.recording = true;
    state.error = false;
    initPreview(mediaStream);
    emit('recording-start', mediaStream);
  },
  onError: (err) => {
    state.error = true;
    state.recording = false;
    emit('recording-error', err);
  },
  onRecordEnd: (blobUrl: string, fixedBlob: Blob) => {
    state.recording = false;
    state.error = false;
    emit('recording-end', blobUrl, fixedBlob);
  },
  timeSlice: 1000,
  videoOptions: props.videoOptions,
};

state.screenRecorder = ScreenRecorder.createSR(options);

const start = () => {
  state.screenRecorder?.startRecording();
};

const end = () => {
  state.screenRecorder?.stopRecording();
};

if (props.shortKey && props.shortKey.toUpperCase() !== 'ESC') {
  bindkey.add(props.shortKey, start);
  bindkey.add('ESC', end);
}

const defaultBtnStyle = `
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
  cursor: pointer;
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
</script>

<template>
  <button
    v-if="notSlotStart && !state.recording"
    @click="start"
    :style="`${defaultBtnStyle}${startBtnStyle}`"
  >{{ startBtnText || "开始录屏" }}</button>
  <slot name="start" v-else-if="!state.recording" :startEvent="start" :endEvent="end"></slot>

  <button
    v-if="notSlotEnd && state.recording"
    @click="end"
    :style="`${defaultBtnStyle}${endBtnStyle}`"
  >{{ endBtnText || "停止录屏" }}</button>
  <slot name="end" v-else-if="state.recording" :endEvent="end"></slot>

  <video
    v-if="preview && notSlotPreview"
    v-show="state.recording"
    class="previewRef"
    ref="previewRef"
    muted
    autoplay
    :width="previewDefaultWidth"
    :style="previewStyle"
    style="position: fixed; border: 1px solid #666; z-index: 9999; cursor: move"
  ></video>
  <slot
    name="preview"
    v-else-if="preview && state.recording && state.screenRecorder"
    :mediaStream="state.screenRecorder.mediaStream"
  ></slot>
</template>
