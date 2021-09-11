<template>
  <div style="display:flex;justify-content:center;align-items:center;width:100%;height:100%;">
    <Button @click="test_log()">Test Firebase logger</Button><br>
    <div style="width:400px;height:400px;">
      <img src="./../assets/HART-logo.png" height="400">
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ActivityLogger from "@/logging";

export default defineComponent({
  name: 'Home',
  setup() {
    const home_message = "Home Message!"

    function test_log() {
        console.log("yuh")
        ActivityLogger.logGenericEvent("notification_received")
    }

    return {
      home_message,
      test_log,
    }
  },
  created() {
    document.title = "HART Prototype"
  }
})
</script>

<style scoped>

</style>
