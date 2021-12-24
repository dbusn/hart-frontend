<template class="temp">
  <div style="margin-left:auto;margin-right:auto; width: 70%">
    <h1 style="margin-bottom: 4px">Training Schedule</h1>


    <Panel header="Follow the steps" class="p-shadow-4" >
      <p>You are going to learn the phonemes step by step. Complete the steps and go on to the next one.</p>
      <div v-for="number in stepNumbers" v-bind:key="number" style="display: inline-block; width: 90px;">
        <Button @click="ViewStep(number)" class="p-shadow-2" style="padding: 0.9rem; margin-right: 7px; margin-bottom: 10px">Step {{number}}</Button>
        <Button @click="ViewTest(number)" class="p-shadow-2" style="padding: 0.9rem; margin-right: 7px; margin-bottom: 3px">Test {{number}}</Button>
      </div>
    </Panel>


    <div id="stepdad">
    </div>



  </div>
</template>

<script lang="ts">
import {createApp, defineComponent, ref} from "vue";
import Button from "primevue/button";
import Step from "@/components/Step.vue";
import Test from "@/components/Test.vue";


export default defineComponent({
  name: 'Schedule',
  extends: {Button, Step, Test},

  setup: async () => {

    const stepNumbers = ref([1, 2, 3, 4, 5, 6]);
    const testNumbers = ref([1, 2, 3, 4, 5, 6]);


    const stepToPhoneme: any =
        {
          1: ["T", "D", "P", "B", "TH", "DH"],
          2 : ["AH", "OO", "EE", "UU", "UH", "EH"],
          3 : ["Y", "W", "S", "Z", "F", "V"],
          4: ["OE", "I", "H", "IH", "AY"],
          5 : ["AE", "AW", "ER", "OY", "OW"],
          6 : ["J", "CH", "SH", "L", "N", "G", "K", "NG"],
        }

    const testToPhoneme: any =
        {
          1 : ["T", "D", "P", "B", "TH", "DH"],
          2 : ["AH", "OO", "EE", "UU", "UH", "EH", "T", "D", "P", "B", "TH", "DH"],
          3 : ["Y", "W", "S", "Z", "F", "V", "AH", "OO", "EE", "UU", "UH", "EH", "T", "D", "P", "B", "TH", "DH"],
          4 : ["OE", "I", "H", "IH", "AY", "Y", "W", "S", "Z", "F", "V", "AH", "OO", "EE", "UU", "UH", "EH", "T", "D", "P", "B", "TH", "DH"],
          5 : ["AE", "AW", "ER", "OY", "OW", "OE", "I", "H", "IH", "AY", "Y", "W", "S", "Z", "F", "V", "AH", "OO", "EE", "UU", "UH", "EH", "T", "D", "P", "B", "TH", "DH"],
          6 : ["J", "CH", "SH", "L", "N", "G", "K", "NG", "AE", "AW", "ER", "OY", "OW", "OE", "I", "H", "IH", "AY", "Y", "W", "S", "Z", "F", "V", "AH", "OO", "EE", "UU", "UH", "EH", "T", "D", "P", "B", "TH", "DH"],
        }


    function ViewStep(i : number){
      // Create div for button
      const stepDad = document.getElementById("stepdad");
      if(stepDad===null){
        return;
      }

      // clear the div
      stepDad.innerHTML = "";

      const selectedPhonemes = stepToPhoneme[i]


      const div = document.createElement('div');
      stepDad.appendChild(div);
      const app = createApp(Step, {"selectedPhonemes" : selectedPhonemes, "StepNumber" : i})
      app.mount(div);
    }

    function ViewTest(i : number){
      // Create div for button
      const testDad = document.getElementById("testdad");
      if(testDad===null){
        return;
      }

      // clear the div
      testDad.innerHTML = "";

      const testPhonemes = testToPhoneme[i]


      const div = document.createElement('div');
      testDad.appendChild(div);
      const app = createApp(Test, {"testPhonemes" : testPhonemes, "TestNumber" : i})
      app.mount(div);
    }

    // Return all variables
    return {
      stepNumbers,
      testNumbers,

      ViewStep,
      ViewTest
    }
  },
  created() {
    document.title = "HART Prototype - Schedule"
  }
})
</script>

<style scoped>

</style>
