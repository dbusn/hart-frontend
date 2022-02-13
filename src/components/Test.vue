<template class="temp">
  <div style="margin-left:auto;margin-right:auto; width: 100%">
    <h1 style="margin-bottom: 4px"> Test {{TestNumber}} </h1>
    <ul style="margin-bottom: 26px">
      <li> • Guess which phoneme is send to you. </li>
      <li> • Unlike the training, you can only choose once. </li>
      <li> • If you are done you can view your grade. </li>
      <li> • You passed the test if your grade is 8 or higher. </li>
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
    let correctBtn: HTMLElement | null;
    let mutex = 0;
    let correctGuesses = 0;
    let guesses = 0;
    let grade = ref(0);
    let gradeActive = ref(false);
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

        // Remember the button storing the correct phoneme
        if (phoneme === playedPhoneme.value) {
          correctBtn = btn;
        }

        //const guessesCell = document.getElementById("pTableRow_" + fiRows.value);
        //if (btn === null || guessesCell === null) {
        //  return
        //}

        if (btn === null) {
          return;
        }

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
            } else {
              btn.style.background = "red";
              //guessesCell.innerHTML += "<span style='margin-right: 4px; margin-bottom: 4px; padding: 5px'>" + phoneme + "</span>";
              guesses++;
              i++;
              // Show the correct phoneme, and add the current phoneme to randomTestPhonemes
              randomTestPhonemes.push(playedPhoneme.value);
            }
            grade.value = (correctGuesses / guesses) * 100;
            grade.value = Math.round(grade.value) / 10;
            console.log(correctGuesses);
            console.log(guesses);
            console.log(grade);
            setTimeout(() => {
              btn.style.background = bgColor;
              if (correctBtn !== btn && correctBtn !== null) {
                correctBtn.style.background = "green";
                setTimeout(() => {
                  if (correctBtn !== null) {
                    correctBtn.style.background = bgColor;
                  }
                }, 500);
              }
              if (i >= randomTestPhonemes.length) {
                gradeActive.value = true;
              }
            }, 500);
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
        }
      }
    }

    return {
      phonemes,
      dropdownPhoneme,
      identificationActive,
      grade,
      gradeActive,

      sendForcedIdentification,
      repeatPreviousPhoneme,
      viewGrade,
    }
  }
})

  </script>

<style scoped>

</style>
