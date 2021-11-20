<template>
  <div style="display:flex;justify-content:center;align-items:center;width:100%;height:100%;">
    <div style="width:600px;height:600px;">
      <img src="./../assets/HART-logo.png" height="600" style="margin-top: 100px">
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'Home',
  setup() {
    const home_message = "Home Message!"

    return {
      home_message,
    }
  },
  created() {
    document.title = "HART Prototype"
  }
})
</script>

<style scoped>

</style>
