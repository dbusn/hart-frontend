<template class="temp">
  <div style="margin-left:auto;margin-right:auto; width: 100%">
    <h1 style="margin-bottom: 4px"> Test {{StepNumber}} </h1>
    <h4 style="margin-bottom: 26px"> This is a test to see if you know the phonemes {{testPhonemes}}</h4>
  </div>

  <div style="margin-left:auto;margin-right:auto; width: 100%">
    <h4 style="margin-bottom: 26px"> PHONEMES IN ORDER: {{randomTestPhonemes}}</h4>
  </div>

    <Panel header="Test" class="p-shadow-2" style="margin-top: 20px; margin-bottom: 20px">
      <p>Just like with the training you will send a phoneme to the sleeve and have to guess which one it is. However, now you can only try once and you see immidiatly which one was the right one after making a mistake. At the end you get a score. If this score is higher then ...%, you can move on to the next step. If this score is lower, go back to the training in which you made the most mistakes so you will do better next try. </p>
      <Button @click="sendForcedIdentification()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px">Forced identification
      </Button>
      <Button @click="repeatPreviousPhoneme()" class="p-shadow-2" style="padding: 0.9rem" :disabled='!identificationActive'>Repeat
        </Button>
      <div id="forcedIdentificationButtons"></div>
      <Fieldset legend="Answers (history)" :toggleable="true" :collapsed="true" style="margin-top: 20px">
        <table id="phoneme-table">
          <tr>
            <th>Round</th>
            <th>Correct answer</th>
            <th>Guessed answers</th>
          </tr>
        </table>
      </Fieldset>
    </Panel>

</template>


  <script lang="ts">
// import {createApp, defineComponent, ref} from "vue";
// import APIWrapper from "@/backend.api";

import {createApp, defineComponent, ref} from "vue";
import Button from "primevue/button";
import Panel from "primevue/panel";
import Fieldset from "primevue/fieldset";
import APIWrapper from "@/backend.api";

export default defineComponent({
  name: 'Test',
  props: [ "testPhonemes", "StepNumber", "randomTestPhonemes"],
  components: {Panel, Button, Fieldset},


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
    props["testPhonemes"].forEach((pho: string) => {
      phonemes.push({name: pho})
    })

    function sendForcedIdentification() {
      if (randomTestPhonemes.length == 0) {
        props['testPhonemes'].forEach((phoneme: string) => {
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

      const pTable = document.getElementById("phoneme-table");
      if (pTable === null) {
        return
      }

      // Create new row element for table
      const row = document.createElement("tr");
      row.innerHTML = "<td>" + fiRows.value + "</td><td>" + playedPhoneme.value + "</td><td id='pTableRow_" + fiRows.value + "'></td>";
      pTable.appendChild(row);

      // Add explanation div
      const textDiv = document.createElement('div');
      textDiv.innerHTML = '<p>Which phoneme was just played?</p>';
      buttonDiv.appendChild(textDiv);

      mutex = 0;

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

        const guessesCell = document.getElementById("pTableRow_" + fiRows.value);
        if (btn === null || guessesCell === null) {
          return
        }

        btn.addEventListener("click", () => {
          const bgColor = btn.style.background;
          if (mutex === 0) {
            mutex = 1;
            if (phoneme === playedPhoneme.value) {
              btn.style.background = "green";
              guessesCell.innerHTML += "<span style='margin-right: 4px; margin-bottom: 4px; padding: 5px; color: #8800FF; font-weight: bolder'>" + phoneme + "</span>";
              i++;
            } else {
              btn.style.background = "red";
              guessesCell.innerHTML += "<span style='margin-right: 4px; margin-bottom: 4px; padding: 5px'>" + phoneme + "</span>";
              i++;
              // Show the correct phoneme, and add the current phoneme to randomTestPhonemes
              randomTestPhonemes.push(playedPhoneme.value);
            }
            setTimeout(() => {
              btn.style.background = bgColor;
              if (correctBtn !== btn && correctBtn !== null) {
                correctBtn.style.background = "green";
                setTimeout(() => {
                  if (correctBtn !== null) {
                    correctBtn.style.background = bgColor;
                  }
                }, 1000);
              }
            }, 1000);
          }
        });
      })
    }

    function repeatPreviousPhoneme() {
      APIWrapper.sendPhonemeMicrocontroller({'phonemes': [playedPhoneme.value]});
    }




    return {
      phonemes,
      dropdownPhoneme,
      identificationActive,

      sendForcedIdentification,
      repeatPreviousPhoneme,
    }
  }
})

  </script>

<style scoped>

</style>
