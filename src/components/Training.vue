<template>
  <div style="margin-left:auto;margin-right:auto; width: 70%">
    <h1>How to get started</h1>
    <Panel class="p-shadow-4">
      <p>Here you can train.</p>
      <Button @click="check_motors()" class="p-shadow-2" style="padding: 0.9rem; margin-bottom: 20px">Check all motors in order!</Button>
      <br>

      <Dropdown v-model="selectedMotor" :options="motors" class="p-shadow-2" optionLabel="coord" placeholder="Select a motor"
                :filter="true"
                style="margin-right: 10px"/>
      <Button @click="check_specific_motor()" class="p-shadow-2" style="padding: 0.9rem">Check specific motor</Button>
    </Panel>

    <Panel class="p-shadow-4" header="Week 1">
      <p>Here you can train.</p>
    </Panel>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import APIWrapper from "@/backend.api";

export default defineComponent({
  name: 'Training',
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
    document.title = "HART Prototype - Training"
  }
})
</script>

<style scoped>

</style>
