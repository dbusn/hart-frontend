<template>
  <div style="width: min(800px, 100%)">
    <h1>How to get started</h1>
    <p>In the tab for phonemes, you can do everything related to phonemes! This includes viewing all the phonemes that
      are used, just training single phonemes, but also taking a test. In the tab 'Words', you can do similar stuff as
      in the phonemes tab, but then with words. In the 'Audio' tab, you can upload an audio file for processing.</p>
    <p>Before getting started, put on the sleeve and check whether all the motors work correctly!</p>
    <Button @click="check_motors()">Check all motors in order!</Button><br>

    <Dropdown v-model="selectedMotor" :options="motors" optionLabel="coord" placeholder="Select a motor"  :filter="true"
              style="margin-right: 10px"/>
    <Button @click="check_specific_motor()">Check specific motor</Button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import APIWrapper from "@/backend.api";

export default defineComponent({
  name: 'Documentation',
  setup: async () => {
    const selectedMotor = ref();
    const motors = [
      {coord: "11"},
      {coord: "12"},
      {coord: "13"},
      {coord: "14"},
      {coord: "15"},
      {coord: "16"},
      {coord: "21"},
      {coord: "22"},
      {coord: "23"},
      {coord: "24"},
      {coord: "25"},
      {coord: "26"},
      {coord: "31"},
      {coord: "32"},
      {coord: "33"},
      {coord: "34"},
      {coord: "35"},
      {coord: "36"},
      {coord: "41"},
      {coord: "42"},
      {coord: "43"},
      {coord: "44"},
      {coord: "45"},
      {coord: "46"},
    ]

    function check_motors() {
      APIWrapper.checkMotors();
    }

    function check_specific_motor() {
      // console.log(selectedMotor.value.coord);
      APIWrapper.checkSpecificMotor({'coord': selectedMotor.value.coord});
    }

    return {
      check_motors,

      selectedMotor,
      motors,
      check_specific_motor,
    }
  },
  created() {
    document.title = "HART Prototype - Documentation"
  }
})
</script>

<style scoped>

</style>
