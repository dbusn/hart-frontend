<template class="temp">
  <div style="margin-left:auto;margin-right:auto; width: 70%">
    <h1 style="margin-bottom: 4px">Training Schedule</h1>

    <!-- Panel for choosing the steps-->
    <Panel header="Follow the steps" class="p-shadow-4" style="margin-bottom: 50px">
      <p>You are going to learn the phonemes step by step. Complete the steps and go on to the next one.</p>
      <div v-for="number in weekNumbers" v-bind:key="number">
        <Button @click="ViewStep(number)" class="p-shadow-2" style="padding: 0.9rem; margin-bottom: 10px">Step {{number}}</Button>
      </div>
<!--      <Button @click="ViewStep()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px">Step 1</Button>-->
    </Panel>

    <!--  This holds the Step-->
    <div id="stepdad">
    </div>

  </div>
</template>

<script lang="ts">
import {createApp, defineComponent, ref} from "vue";
import APIWrapper from "@/backend.api";
import Button from "primevue/button";
import Step from "@/components/Step.vue";
// import {getRandom} from "@/helpers/array.helper";

export default defineComponent({
  name: 'Schedule',
  extends: {Button, Step},

  setup: async () => {

    // Get phoneme data from the backend
    const phonemeData = (await APIWrapper.getPhonemes()).phonemes;

    // Weeknumbers
    const weekNumbers = ref([1, 2, 3, 4, 5, 6])

    // Week to Phonemes
    const weekToPhoneme: any =
        {
          1: ["AH", "AA"],
          2 : ["EE", "B"],
          3 : ["K", "L"],
          4: ["F", "AW"],
          5 : ["T", "Z"],
          6 : ["B", "Y"],
        }

    // this function needs to be deleted, its now for buttons that need to be assigned to a page
    function ViewStep(i : number){
      // Create div for button
      const stepDad = document.getElementById("stepdad");
      if(stepDad===null){
        return;
      }

      // clear the div
      stepDad.innerHTML = "";

      // get the right phonemes for this week i
      const phonemes = weekToPhoneme[i]

      // add Step to it
      const div = document.createElement('div');
      stepDad.appendChild(div);
      const app = createApp(Step, {"phonemes" : phonemes, "StepNumber" : i})
      app.mount(div);
    }


    // Format gotten phonemes from backend.
    const phonemes: { name: string }[] = [];
    phonemeData.forEach((pho: string) => {
      phonemes.push({name: pho})
    })


    // Return all variables
    return {
      phonemes,
      weekNumbers,

      ViewStep
    }
  },
  created() {
    document.title = "HART Prototype - Schedule"
  }
})
</script>

<style scoped>

</style>
