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
