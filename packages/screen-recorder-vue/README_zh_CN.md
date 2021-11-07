
# ScreenRecorder for Vue
一个可以录制屏幕的 vue 组件

简体中文 | [English](./README.md)

## 安装

```bash
npm install screen-recorder-vue --save
```

## 使用

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
    preview
    short-key="Alt+Shift+R"
    :video-options="videoOptions"
    @recording-end="recordingEnd"
  >
    <template v-slot:start="{ startEvent }">
      <button @click="startEvent">start</button>
    </template>

    <template v-slot:end="{ endEvent }">
      <button @click="endEvent">end</button>
    </template>
  </ScreenRecorderVue>
</template>

```

## props

| props 名称 | 是否必须 | 类型 | 默认值 | 描述 |
| - | - | - | - | - |
| `short-key` | false | string | - | 开始录屏的快捷键，如果不为空，则自动将 `ESC` 设为结束录制的快捷键 |
| `preview` | false | boolean | false | 显示预览 |
| `preview-video-element`| false | HTMLVideoElement | - | 自定义预览的 Video 元素 |
| `video-options` | false | MediaTrackConstraints | - | 视频选项设置 |

## events

| 事件名称 | 参数列表 | 描述 |
| - | - | - |
| `recording-start` | [ `mediaStream`: MediaStream ] | 开始录屏 |
| `recording-end` | [ `blobUrl`: string, `blob`: Blob ] | 结束录屏 |
| `recording-unsupport` | [] | 浏览器不支持 API |
| `recording-error` | [ `err`: unknown ] | 录屏出现错误 |

## slots

| 插槽名称 | 参数列表 | 描述 |
| - | - | - |
| `start` | { startEvent } | 触发开始录屏的事件 |
| `end` | { endEvent } | 触发结束录屏的事件 |