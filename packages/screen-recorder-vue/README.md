# ScreenRecorder for Vue
A Vue component that can record the screen

[简体中文](./README_zh_CN.md) | English


## Install

```bash
npm install screen-recorder-vue --save
```

## Usage

```vue
<script setup lang="ts">
import { ref } from "vue";
import ScreenRecorderVue from "screen-recorder-vue";

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
  <ScreenRecorderVue
    preview
    @recording-end="recordingEnd"
    start-btn-text="🛫 开始"
    start-btn-style="color: #48bfa7"
    end-btn-text="🛑 结束"
    end-btn-style="color: red;"
  />

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

    <template v-slot:preview="{ mediaStream }">
      <div>
        <video muted autoplay width="500" :srcObject="mediaStream"></video>
      </div>
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
| `video-options` | false | MediaTrackConstraints | - | video options |
| `start-btn-text` | false | string | `开始录屏` | the text for start-button |
| `start-btn-style` | false | string | - | the style for start-button |
| `end-btn-text` | false | string | `结束录屏` | the text for end-button |
| `end-btn-style` | false | string | - | the style for end-button |

## events

| eventsName | paramList | desc |
| - | - | - |
| `recording-start` | [ `mediaStream`: MediaStream ] | recorder start |
| `recording-end` | [ `blobUrl`: string, `blob`: Blob ] | recorder end |
| `recording-unsupport` | [] | recorder API unsupported |
| `recording-error` | [ `err`: unknown ] | recorder error |

## slots

| slotsName | paramList and Type | desc |
| - | - | - |
| `start` | { startEvent: Function, endEvent: Function } | Customize the view that triggers the start screen recording event；<br/>`startEvent `: start screen recording,<br/> ` endEvent `: end screen recording |
| `end` | { endEvent: Function, startEvent: Function } | Customize the view that triggers the end screen recording event;<br/> ` endEvent `: end screen recording, <br/>`startEvent `: start screen recording |
| `preview` | { mediaStream: MediaStream } | Customize video preview,<br/>`mediaStream`: it is the captured screen media stream, which can be assigned to the scrobject of video to preview and play |
