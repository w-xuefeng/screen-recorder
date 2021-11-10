
# ScreenRecorder for Vue
一个可以录制屏幕的 vue 组件

简体中文 | [English](./README.md)

## 安装

```bash
npm install screen-recorder-vue --save
```

## 使用

- 1 . 简单使用

```vue
<script setup lang="ts">
import ScreenRecorderVue from "screen-recorder-vue";

// 你的其他逻辑代码...
</script>

<template>
  <!-- 你的其他组件... -->
  <ScreenRecorderVue />
</template>
```

- 2 . 启用预览并且自定义一些属性信息

```vue
<script setup lang="ts">
import ScreenRecorderVue from "screen-recorder-vue";

const videoOptions: MediaTrackConstraints = {
  width: 1920,
  height: 1080,
  frameRate: 60,
};

// 你的其它逻辑代码...

</script>

<template>
  <!-- 你的其他组件... -->
  <ScreenRecorderVue
    preview
    start-btn-text="🛫 开始"
    start-btn-style="color: #48bfa7"
    end-btn-text="🛑 结束"
    end-btn-style="color: red;"
    :video-options="videoOptions"
  />
</template>
```

- 3 . 监听事件回调

```vue
<script setup lang="ts">
import ScreenRecorderVue from "screen-recorder-vue";

const onStart = (mediaStream: MediaStream) => {
  /** 你的逻辑代码 **/
}

const onError = (err: unknown) => {
  /** 你的逻辑代码 **/
}

const onUnsupport = () => {
  /** 你的逻辑代码 **/
}

const onEnd = (blobUrl: string, blob: Blob) => {
  /** 你的逻辑代码 **/
}

// 你的其他逻辑代码...

</script>

<template>
  <!-- 你的其他组件... -->
  <ScreenRecorderVue
    preview
    @recording-start="onStart"
    @recording-end="onEnd"
    @recording-unsupport="onUnsupport"
    @recording-error="onError"
  />
</template>
```

- 4 . 自定义视图插槽

```vue
<script setup lang="ts">
import { ref } from "vue";
import ScreenRecorderVue from "screen-recorder-vue";

const recording = ref(false);

const start = (startEvent: Function) => {
  startEvent();
  recording.value = true;
};

const recordingEnd = (url: string) => {
  recording.value = false;
  console.log(url);
  // to do sth for url
};

// 你的其他逻辑代码...

</script>

<template>
  <!-- 你的其他逻辑组件... -->
  <ScreenRecorderVue preview @recording-end="recordingEnd">
    <template v-slot:start="{ startEvent }">
      <!-- 你的自定义视图... -->
      <button v-if="!recording" @click="start(startEvent)">start</button>
    </template>

    <template v-slot:end="{ endEvent }">
      <!-- 你的自定义视图... -->
      <button v-if="recording" @click="endEvent">end</button>
    </template>

    <template v-slot:preview="{ mediaStream }">
      <!-- 你的自定义视图... -->
      <div>
        <video muted autoplay width="500" :srcObject="mediaStream"></video>
      </div>
    </template>
  </ScreenRecorderVue>
</template>
```


## props

| props 名称 | 是否必须 | 类型 | 默认值 | 描述 |
| - | - | - | - | - |
| `short-key` | false | string | - | 开始录屏的快捷键，如果不为空，则自动将 `ESC` 设为结束录制的快捷键 |
| `preview` | false | boolean | false | 显示预览 |
| `video-options` | false | MediaTrackConstraints | - | 视频选项设置 |
| `start-btn-text` | false | string | `开始录屏` | 开始按钮的文案 |
| `start-btn-style` | false | string | - | 开始按钮的样式 |
| `end-btn-text` | false | string | `结束录屏` | 结束按钮的文案 |
| `end-btn-style` | false | string | - | 结束按钮的样式 |

## events

| 事件名称 | 参数列表 | 描述 |
| - | - | - |
| `recording-start` | [ `mediaStream`: MediaStream ] | 开始录屏 |
| `recording-end` | [ `blobUrl`: string, `blob`: Blob ] | 结束录屏 |
| `recording-unsupport` | [] | 浏览器不支持 API |
| `recording-error` | [ `err`: unknown ] | 录屏出现错误 |

## slots

| 插槽名称 | 参数列表及类型签名 | 描述 |
| - | - | - |
| `start` | { startEvent: Function, endEvent: Function } | 自定义触发开始录屏事件的视图; <br/>`startEvent`：开始录屏，<br/>`endEvent`：结束录屏 |
| `end` | { endEvent: Function, startEvent: Function } | 自定义触发结束录屏事件的视图; <br/>`endEvent`：结束录屏，<br/>`startEvent`：开始录屏  |
| `preview` | { mediaStream：MediaStream } | 自定义 video 预览视图; <br/>`mediaStream`: 捕获的屏幕媒体流，可赋值给 video 的 scrObject 实现播放预览 |
