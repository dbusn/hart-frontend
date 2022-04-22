<template class="temp">
  <div style="margin-left:auto;margin-right:auto; width: 100%">
    <h1 style="margin-bottom: 4px"> Test {{TestNumber}} </h1>
    <ul style="margin-bottom: 26px">
      <li> • Guess which phoneme is send to you. </li>
      <li> • Unlike the training, you can only choose once. </li>
      <li> • If you make a mistake you must go back to the training. </li>
      <li> • You pass the test if there are no errors and your grade is 10. </li>
      
      <li> • The test is completed once the "View your grade!" button becomes available. </li>
    </ul>
  </div>

<!--  <div style="margin-left:auto;margin-right:auto; width: 100%">-->
<!--    <h4 style="margin-bottom: 26px"> PHONEMES IN ORDER: {{randomTestPhonemes}}</h4>-->
<!--  </div>-->

    <Panel header="Test" class="p-shadow-2" style="margin-top: 20px; margin-bottom: 20px">
      <Button @click="sendForcedIdentification()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px">Send phoneme
      </Button>
      <Button @click="repeatPreviousPhoneme()" class="p-shadow-2" style="padding: 0.9rem" :disabled='!identificationActive'>Repeat phoneme
        </Button>
      <div id="forcedIdentificationButtons"></div>
      <Button @click="viewGrade()" class="p-shadow-2" style="padding: 0.9rem; margin-top: 20px" :disabled='!gradeActive'>View your grade!
        </Button>
    </Panel>
    <div style="margin-left:auto;margin-right:auto; width: 100%" id="finalGrade">
    </div>
</template>


  <script lang="ts">
// import {createApp, defineComponent, ref} from "vue";
// import APIWrapper from "@/backend.api";

import {createApp, defineComponent, ref} from "vue";
import Button from "primevue/button";
import Panel from "primevue/panel";
//import Fieldset from "primevue/fieldset";
import APIWrapper from "@/backend.api";
import ActivityLogger from "@/helpers/logging"
import { progress } from "@/helpers/state.js"

export default defineComponent({
  name: 'Test',
  props: [ "testPhonemes", "TestNumber", "randomTestPhonemes"],
  components: {Panel, Button/*, Fieldset*/},


  setup(props) {
    var i = 0;
    const playedPhoneme = ref();
    const identificationActive = ref(false);
    const fiRows = ref(0);
    const dropdownPhoneme = ref();
    const phonemes: { name: string }[] = [];
    let randomTestPhonemes: string[] = [];
    let mutex = 0;
    let correctGuesses = 0;
    let guesses = 0;
    let grade = ref(0);
    let gradeActive = ref(false);
    let passed = ref(false);
    props["testPhonemes"].forEach((pho: string) => {
      phonemes.push({name: pho})
    })

    function sendForcedIdentification() {
      if (mutex === 1) {
        setTimeout(() => {
          mutex = 0;
        }, 300);
      }
      if (randomTestPhonemes.length == 0) {
        props['randomTestPhonemes'].forEach((phoneme: string) => {
          randomTestPhonemes.push(phoneme);
        });
      }
      const buttonDiv = document.getElementById("forcedIdentificationButtons")
      if (buttonDiv === null) {
        return;
      }

      buttonDiv.innerHTML = '';

      playedPhoneme.value = randomTestPhonemes[i];    
      identificationActive.value = true;

      APIWrapper.sendPhonemeMicrocontroller({'phonemes': [playedPhoneme.value]});

      fiRows.value++;

      //const pTable = document.getElementById("phoneme-table");
      //if (pTable === null) {
      //  return
      //}

      // Create new row element for table
      //const row = document.createElement("tr");
      //row.innerHTML = "<td>" + fiRows.value + "</td><td>" + playedPhoneme.value + "</td><td id='pTableRow_" + fiRows.value + "'></td>";
      //pTable.appendChild(row);

      // Add explanation div
      const textDiv = document.createElement('div');
      textDiv.innerHTML = '<p>Which phoneme was just played?</p>';
      buttonDiv.appendChild(textDiv);

      // For each of the phonemes, create buttons and assign listeners to it.
      props['testPhonemes'].forEach((phoneme: string) => {
        // Create div for button
        const div = document.createElement('div');
        div.style.display = "inline-block";
        div.style.marginRight = "10px";

        // Add div for button to the button div
        buttonDiv.appendChild(div);
        createApp(Button, {
          label: phoneme,
          id: "fid_" + phoneme,
          class: "p-shadow-2",
          style: "margin-bottom: 4px"
        }).mount(div);

        const btn = document.getElementById("fid_" + phoneme);

        //const guessesCell = document.getElementById("pTableRow_" + fiRows.value);
        //if (btn === null || guessesCell === null) {
        //  return
        //}

        if (btn === null) {
          return;
        }
        console.log(playedPhoneme.value);
        btn.addEventListener("click", () => {
          const bgColor = btn.style.background;
          if (mutex === 0) {
            mutex = 1;
            if (phoneme === playedPhoneme.value) {
              btn.style.background = "green";
              //guessesCell.innerHTML += "<span style='margin-right: 4px; margin-bottom: 4px; padding: 5px; color: #8800FF; font-weight: bolder'>" + phoneme + "</span>";
              correctGuesses++;
              guesses++;
              i++;
              ActivityLogger.log_activity("Test", playedPhoneme.value, phoneme);
              ActivityLogger.log_progress("Test");
            } else {
              btn.style.background = "red";
              //guessesCell.innerHTML += "<span style='margin-right: 4px; margin-bottom: 4px; padding: 5px'>" + phoneme + "</span>";
              guesses++;
              i++;
              // Show the correct phoneme, and add the current phoneme to randomTestPhonemes
              randomTestPhonemes.push(playedPhoneme.value);
              ActivityLogger.log_activity("Test", playedPhoneme.value, phoneme);
              ActivityLogger.log_progress("Test");
            }
            grade.value = (correctGuesses / guesses) * 100;
            grade.value = Math.round(grade.value) / 10;
            console.log(correctGuesses);
            console.log(guesses);
            console.log(grade);

            setTimeout(() => {
              btn.style.background = bgColor;
              if (i >= randomTestPhonemes.length) {
                gradeActive.value = true;
              }
            }, 500);

          }
          if (progress.userProgress <= 5 && grade.value >= 10) {
            passed.value = true;
          }
          if (progress.userProgress > 5 && grade.value >= 8) {
            passed.value = true;
          }

        });
      })
    }



    function repeatPreviousPhoneme() {
      APIWrapper.sendPhonemeMicrocontroller({'phonemes': [playedPhoneme.value]});
    }

    function viewGrade() {
      if (gradeActive.value) {
        if (document.getElementById("finalGrade") != null && document != null) {
          let someDiv = document.getElementById("finalGrade");
          if (someDiv != null) {
            someDiv.innerHTML = "<h1 style='margin-bottom: 4px'> Grade: " + grade.value + " </h1>";
          }
        //   if (passed.value) {
        //     someDiv.innerHTML = "<h1 style='margin-bottom: 4px'> You passed this test! Move on to the next step. + " </h1>";
        //   }
        //   if (passed.value === false{
        //     someDiv.innerHTML = "<h1 style='margin-bottom: 4px'> You have failed the text, train a bit more and try again. + " < /h1>";
        // }
      }
        }
    }



    return {
      phonemes,
      dropdownPhoneme,
      identificationActive,
      grade,
      gradeActive,
      passed,

      sendForcedIdentification,
      repeatPreviousPhoneme,
      viewGrade,
    }
  }
})

  </script>

<style scoped>

</style>
