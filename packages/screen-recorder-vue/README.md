# ScreenRecorder for Vue
A Vue component that can record the screen

[简体中文](./README_zh_CN.md) | English


## Install

```bash
npm install screen-recorder-vue --save
```

## Usage

```ts
<script setup lang="ts">
import { ref } from "vue";
import ScreenRecorderVue from "./components/ScreenRecorder.vue";

const recording = ref(false);

const videoOptions: MediaTrackConstraints = {
  width: 1920,
  height: 1080,
  frameRate: 60,
};

const start = (startEvent: Function) => {
  startEvent();
  recording.value = true;
};

const recordingEnd = (url: string) => {
  recording.value = false;
  console.log(url);
  // to do sth for url
};
</script>

<template>
  <h1>1. Simple use</h1>
  <ScreenRecorderVue preview @recording-end="recordingEnd" />

  <hr style="margin: 50px 0" />

  <h1>2. Custom slots use</h1>
  <ScreenRecorderVue
    preview
    short-key="Alt+Shift+R"
    :video-options="videoOptions"
    @recording-end="recordingEnd"
  >
    <template v-slot:start="{ startEvent }">
      <button v-if="!recording" @click="start(startEvent)">开始录屏</button>
    </template>

    <template v-slot:end="{ endEvent }">
      <button v-if="recording" @click="endEvent">结束录屏</button>
    </template>
  </ScreenRecorderVue>
</template>
<style scoped>
button {
  cursor: pointer;
  margin: 16px;
}
</style>

```

## props

| propsName | required | type | default | desc |
| - | - | - | - | - |
| `short-key` | false | string | - | shortcut key for starting, if you set shortcut, `ESC` will be set as the shortcut key to end recording |
| `preview` | false | boolean | false | show preview |
| `preview-video-element`| false | HTMLVideoElement | - | a video element for preview |
| `video-options` | false | MediaTrackConstraints | - | video options |

## events

| eventsName | paramList | desc |
| - | - | - |
| `recording-start` | [ `mediaStream`: MediaStream ] | recorder start |
| `recording-end` | [ `blobUrl`: string, `blob`: Blob ] | recorder end |
| `recording-unsupport` | [] | recorder API unsupported |
| `recording-error` | [ `err`: unknown ] | recorder error |

## slots

| slotsName | paramList | desc |
| - | - | - |
| `start` | { startEvent } | trigger the event of starting screen recording |
| `end` | { endEvent } | trigger the event of ending screen recording |
