<script setup lang="ts">
import ScreenRecorderVue from './components/ScreenRecorder.vue';
const videoOptions: MediaTrackConstraints = {
  width: 1920,
  height: 1080,
  frameRate: 60
}

const recordingEnd = (url: string) => {
  alert('end ' + url)
}
</script>

<template>
  <ScreenRecorderVue
    short-key="Alt+Shift+R"
    :video-options="videoOptions"
    @recording-end="recordingEnd"
  />
</template>
