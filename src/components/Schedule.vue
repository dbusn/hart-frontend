<template class="temp">
  <div style="margin-left:auto;margin-right:auto; width: 70%">
    <h1 style="margin-bottom: 4px">Training Schedule</h1>


    <Panel header="Follow the steps" class="p-shadow-4" >
      <p>You are going to learn the phonemes step by step. Complete the steps and go on to the next one.</p>
      <div v-for="number in stepNumbers" v-bind:key="number" style="display: inline-block; width: 100px;">
        <Button @click="ViewStep(number)" class="p-shadow-2" style="padding: 0.9rem; width: 80px; margin:auto">Step {{number}}</Button>
        <p><b> </b></p>
        <Button @click="ViewTest(number)" class="p-shadow-2" style="padding: 0.9rem; width: 80px; margin:auto;">Test {{number}}</Button>
      </div>
      <p><b> </b></p>
      <div v-for="number in wordNumbers" v-bind:key="number" style="display: inline-block; width: 100px; margin-left: 100px;">
        <Button @click="ViewWord(number)" class="p-shadow-2" style="padding: 0.9rem; width: 80px; margin:auto">Word {{number}}</Button>
      </div>
    </Panel>


    <div id="stepdad">
    </div>

    <div id="testdad">
    </div>

    <div id="worddad">
    </div>





  </div>
</template>

<script lang="ts">
import {createApp, defineComponent, ref} from "vue";
import Button from "primevue/button";
import Step from "@/components/Step.vue";
import Test from "@/components/Test.vue";
import WordTest from "@/components/WordTest.vue";


export default defineComponent({
  name: 'Schedule',
  extends: {Button, Step, Test, WordTest},

  setup: async () => {

    const stepNumbers = ref([1, 2, 3, 4, 5, 6]);
    const testNumbers = ref([1, 2, 3, 4, 5, 6]);
    const wordNumbers = ref([2, 4, 6]);


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

    const wordsArray: any =
        {
          2 : ["Peop", "OeP", "Yeet"],
          4 : ["Vier", "Ik", "Hoi"],
          6 : ["test", "Zes", "ja"],
        }

      function ViewStep(i : number){
      // delete previous page

        // Create div for button
        const stepDad = document.getElementById("stepdad");
        if(stepDad===null){
          return;
        }

        const testDad = document.getElementById("testdad");
        if(testDad===null){
          return;
        }

        const wordDad = document.getElementById("worddad");
        if(wordDad===null){
          return;
        }

        // clear the div
        stepDad.innerHTML = "";
        testDad.innerHTML = "";
        wordDad.innerHTML = "";

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

        const stepDad = document.getElementById("stepdad");
        if(stepDad===null){
          return;
        }

        const wordDad = document.getElementById("worddad");
        if(wordDad===null){
          return;
        }

        // clear the div
        testDad.innerHTML = "";
        stepDad.innerHTML = "";
        wordDad.innerHTML = "";

        const testPhonemes = testToPhoneme[i]

        var randomTestPhonemes = shuffleArray(testPhonemes);
        const div = document.createElement('div');
        testDad.appendChild(div);
        const app = createApp(Test, {"testPhonemes" : testPhonemes, "TestNumber" : i, "randomTestPhonemes" : randomTestPhonemes })
        app.mount(div);
      }

    function shuffleArray(someArray : string[]) {
      let array = Array<string>();
      for (let i = 0; i < someArray.length; i++) {
        array.push(someArray[i]);
      }

      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }

    function ViewWord(i : number){
      // Create div for button
      const testDad = document.getElementById("testdad");
      if(testDad===null){
        return;
      }

      const stepDad = document.getElementById("stepdad");
      if(stepDad===null){
        return;
      }

      const wordDad = document.getElementById("worddad");
      if(wordDad===null){
        return;
      }

      // clear the div
      testDad.innerHTML = "";
      stepDad.innerHTML = "";
      wordDad.innerHTML = "";

      const testWords = wordsArray[i]

      const div = document.createElement('div');
      wordDad.appendChild(div);
      const app = createApp(WordTest, {"testWords" : testWords, "WordNumber" : i})
      app.mount(div);

    }



    // Return all variables
    return {
      stepNumbers,
      testNumbers,
      wordNumbers,

      ViewStep,
      ViewTest,
      ViewWord,
    }
  },
  created() {
    document.title = "HART Prototype - Schedule"
  }
})
</script>

<style scoped>

</style>
