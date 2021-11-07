<script setup lang="ts">
import ScreenRecorderVue from './components/ScreenRecorder.vue';
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
