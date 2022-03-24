<template class="temp">
  <div style="margin-left:auto;margin-right:auto; width: 80%">
    <div id="myModal" class="modal" style="display: block; z-index:1; position: fixed; width: 100%; height:100%; background-color: rgba(0,0,0,0.4); left:0; top:0">
        <div class="modal-content" style="background-color: #fefefe; margin: auto; padding: 20px; border: 1px solid #888; width: 80%;">
            <span class="close">&times;</span>
            <p>Fill in your participant number</p>
            <span class="p-float-label">
                <InputText id="username" type="text" v-model="user" style="width: 40%; margin-bottom: 10px"/>
                <label for="username">Username</label>
            </span>
            <Button @click="sendInfo()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px; position: absolute;
                    top: 10%; left: 45%;">Submit</Button>
            <div id="errorMessage"></div>
        </div>
      </div>
    <h1 style="margin-bottom: 4px">Training Schedule</h1>


    <Panel header="Follow the steps" class="p-shadow-4" >
      <p>You are going to learn the phonemes step by step. Complete the steps and go on to the next one.</p>
      <div v-for="number in stepNumbers" v-bind:key="number" style="display: inline-block; width: 100px;">
        <Button @click="ViewStep(number)" class="p-shadow-2" style="padding: 0.9rem; width: 80px; margin-top: 30px">Step {{number}}</Button>
        <p><b> </b></p>
        <Button @click="ViewTest(number)" class="p-shadow-2" style="padding: 0.9rem; width: 80px; margin-bottom:15px;">Test {{number}}</Button>
      </div>
      <p><b> </b></p>
      <div v-for="number in wordNumbers" v-bind:key="number" style="display: inline-block; width: 100px; margin-left: 100px;">
        <Button @click="ViewWord(number)" class="p-shadow-2" style="padding: 0.9rem; width: 80px; margin-top:5px">Word {{number}}</Button>
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
import { state } from "@/helpers/state.js";
import { progress } from "@/helpers/state.js";
import ActivityLogger from "@/helpers/logging";

export default defineComponent({
  name: 'Schedule',
  extends: {Button, Step, Test, WordTest},

  setup: async () => {

    const stepNumbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
    const testNumbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
    const wordNumbers = ref([2, 4, 6]);

    /*const stepToPhoneme: any =
        {
          1: ["T", "D", "P", "B", "TH", "DH"],
          2 : ["AH", "OO", "EE", "UU", "UH", "EH"],
          3 : ["Y", "W", "S", "Z", "F", "V"],
          4: ["OE", "I", "H", "IH", "AY"],
          5 : ["AE", "AW", "ER", "OY", "OW"],
          6 : ["J", "CH", "SH", "L", "N", "G", "K", "NG"],
        }
    */
    
    const stepToPhoneme: any =
        {
          1 : ["T", "D"],
          2 : ["AH", "OO"],
          3 : ["Y", "W"],
          4 : ["S", "Z"],
          5 : ["F", "V"],
          6 : ["J", "CH"],
          7 : ["EH", "UH"],
          8 : ["K", "G", "NG"],
          9 : ["P", "B"],
          10 : ["OY", "OW"],
          11 : ["ZH", "R"],
          12 : ["TH", "DH"],
          13 : ["AW", "ER", "AE"],
          14 : ["OE", "H"],
          15 : ["L", "SH"],
          16 : ["UU", "EE"],
          17 : ["M", "N"],
          18 : ["IH", "AY", "I"],
        }

    /*const testToPhoneme: any =
        {
          1 : ["T", "D", "P", "B", "TH", "DH", "R"],
          2 : ["AH", "OO", "EE", "UU", "UH", "EH", "T", "D", "P", "B", "TH", "DH", "R"],
          3 : ["Y", "W", "S", "Z", "F", "V", "AH", "OO", "EE", "UU", "UH", "EH", "T", "D", "P", "B", "TH", "DH", "R"],
          4 : ["OE", "I", "H", "IH", "AY", "Y", "W", "S", "Z", "F", "V", "AH", "OO", "EE", "UU", "UH", "EH", "T", "D", "P", "B", "TH", "DH", "R"],
          5 : ["AE", "AW", "ER", "OY", "OW", "OE", "I", "H", "IH", "AY", "Y", "W", "S", "Z", "F", "V", "AH", "OO", "EE", "UU", "UH", "EH", "T", "D", "P", "B", "TH", "DH", "R"],
          6 : ["J", "CH", "SH", "L", "N", "G", "K", "NG", "AE", "AW", "ER", "OY", "OW", "OE", "I", "H", "IH", "AY", "Y", "W", "S", "Z", "F", "V", "AH", "OO", "EE", "UU", "UH", "EH", "T", "D", "P", "B", "TH", "DH", "R"],
        }
    */
    
      const testToPhoneme: any =
        {
          1 : ["T", "D"],
          2 : ["T", "D", "AH", "OO"],
          3 : ["T", "D", "AH", "OO", "Y", "W"],
          4 : ["T", "D", "AH", "OO", "Y", "W", "S", "Z"],
          5 : ["T", "D", "AH", "OO", "Y", "W", "S", "Z", "F", "V"],
          6 : ["T", "D", "AH", "OO", "Y", "W", "S", "Z", "F", "V", "J", "CH"],
          7 : ["T", "D", "AH", "OO", "Y", "W", "S", "Z", "F", "V", "J", "CH", "EH", "UH"],
          8 : ["T", "D", "AH", "OO", "Y", "W", "S", "Z", "F", "V", "J", "CH", "EH", "UH", "K", "G", "NG"],
          9 : ["T", "D", "AH", "OO", "Y", "W", "S", "Z", "F", "V", "J", "CH", "EH", "UH", "K", "G", "NG", "P", "B"],
          10 : ["T", "D", "AH", "OO", "Y", "W", "S", "Z", "F", "V", "J", "CH", "EH", "UH", "K", "G", "NG", "P", "B", "OY", "OW"],
          11 : ["T", "D", "AH", "OO", "Y", "W", "S", "Z", "F", "V", "J", "CH", "EH", "UH", "K", "G", "NG", "P", "B", "OY", "OW", "ZH", "R"],
          12 : ["T", "D", "AH", "OO", "Y", "W", "S", "Z", "F", "V", "J", "CH", "EH", "UH", "K", "G", "NG", "P", "B", "OY", "OW", "ZH", "R", "TH", "DH"],
          13 : ["T", "D", "AH", "OO", "Y", "W", "S", "Z", "F", "V", "J", "CH", "EH", "UH", "K", "G", "NG", "P", "B", "OY", "OW", "ZH", "R", "TH", "DH", "AW", "ER", "AE"],
          14 : ["T", "D", "AH", "OO", "Y", "W", "S", "Z", "F", "V", "J", "CH", "EH", "UH", "K", "G", "NG", "P", "B", "OY", "OW", "ZH", "R", "TH", "DH", "AW", "ER", "AE", "OE", "H"],
          15 : ["T", "D", "AH", "OO", "Y", "W", "S", "Z", "F", "V", "J", "CH", "EH", "UH", "K", "G", "NG", "P", "B", "OY", "OW", "ZH", "R", "TH", "DH", "AW", "ER", "AE", "OE", "H", "L", "SH"],
          16 : ["T", "D", "AH", "OO", "Y", "W", "S", "Z", "F", "V", "J", "CH", "EH", "UH", "K", "G", "NG", "P", "B", "OY", "OW", "ZH", "R", "TH", "DH", "AW", "ER", "AE", "OE", "H", "L", "SH", "UU", "EE"],
          17 : ["T", "D", "AH", "OO", "Y", "W", "S", "Z", "F", "V", "J", "CH", "EH", "UH", "K", "G", "NG", "P", "B", "OY", "OW", "ZH", "R", "TH", "DH", "AW", "ER", "AE", "OE", "H", "L", "SH", "UU", "EE", "M", "N"],
          18 : ["T", "D", "AH", "OO", "Y", "W", "S", "Z", "F", "V", "J", "CH", "EH", "UH", "K", "G", "NG", "P", "B", "OY", "OW", "ZH", "R", "TH", "DH", "AW", "ER", "AE", "OE", "H", "L", "SH", "UU", "EE", "M", "N", "IH", "AY", "I"],
        }


    const wordsArray: any =
        {
          2 : ["Ear", "Eat", "Bee", "Tea", "Teeth", "Put"],
          4 : ["Hide", "What", "Wait", "Zoo", "Boost", "Yes"],
          6 : ["Push", "Better", "Phone", "Calling", "Phone", "Hart"],
        }

    const participants: string[] =
        [
          "1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","999",
        ]
    
    const user = ref();

      function ViewStep(i : number){
      // delete previous page
        progress.userProgress = i;
        ActivityLogger.log_progress("Step");

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

        const selectedPhonemes = stepToPhoneme[i];
        const oldPhonemes = i > 1 ? testToPhoneme[i - 1] : [];


        const div = document.createElement('div');
        stepDad.appendChild(div);
        const app = createApp(Step, {"selectedPhonemes" : selectedPhonemes, "oldPhonemes" : oldPhonemes, "StepNumber" : i})
        app.mount(div);
      }

    
      function ViewTest(i : number){
        ActivityLogger.log_progress("Test");
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
      const app = createApp(WordTest, {"testWords" : testWords, "WordNumber" : i, "phonemes" : testToPhoneme[i]})
      app.mount(div);

    }

    function sendInfo() {
      if (participants.includes(user.value)) {
          state.userVal = user.value;
        const modal = document.getElementById("myModal");
        if (modal !== null) {
          modal.style.display = "none";
        }
      } else {
        const error = document.getElementById("errorMessage");
        if (error !== null) {
          error.innerHTML = "<p>Your username was incorrect. Try again.</p>"
        }
      }
    }
    
    // Return all variables
    return {
      stepNumbers,
      testNumbers,
      wordNumbers,
      user,

      ViewStep,
      ViewTest,
      ViewWord,
      sendInfo,
    }
  },
  created() {
    document.title = "HART Prototype - Schedule"
  }
})
</script>

<style scoped>

</style>
