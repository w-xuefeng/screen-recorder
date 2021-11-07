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
import ScreenRecorderVue from 'screen-recorder-vue';
const videoOptions: MediaTrackConstraints = {
  width: 1920,
  height: 1080,
  frameRate: 60
}

const recordingEnd = (url: string) => { }
</script>

<template>
  <ScreenRecorderVue
    short-key="Alt+Shift+R"
    :video-options="videoOptions"
    @recording-end="recordingEnd"
  />
</template>
```

## props

| propsName | required | type | default | desc |
| - | - | - | - | - |
| `short-key` | false | string | - | shortcut key for starting, if you set shortcut, `ESC` will be set as the shortcut key to end recording |
| `preview-video-element`| false | HTMLVideoElement | - | a video element for preview |
| `video-options` | false | MediaTrackConstraints | - | video options |

## events

| eventsName | paramList | desc |
| - | - | - |
| `recording-start` | [ `mediaStream`: MediaStream ] | recorder start |
| `recording-end` | [ `blobUrl`: string, `blob`: Blob ] | recorder end |
| `recording-unsupport` | [] | recorder API unsupported |
| `recording-error` | [ `err`: unknown ] | recorder error |
