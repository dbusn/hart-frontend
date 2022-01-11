<template class="temp">
  <div style="margin-left:auto;margin-right:auto; width: 100%">
    <h1 style="margin-bottom: 4px"> Test {{TestNumber}} </h1>
    <h4 style="margin-bottom: 26px"> {{testPhonemes}}</h4>
  </div>

  <div style="margin-left:auto;margin-right:auto; width: 100%">
    <h4 style="margin-bottom: 26px"> {{randomTestPhonemes}}</h4>
  </div>

  <Panel header="Training" class="p-shadow-4">
    <Panel header="Forced identification" class="p-shadow-2" style="margin-top: 20px; margin-bottom: 20px">
      <p>By clicking the button, a phoneme will be send to the sleeve, and you will get to see three buttons, and
        have to choose which one you felt.</p>
      <Button @click="sendForcedIdentification()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px">Forced identification
      </Button>
      <!--      <Button @click="repeatPreviousPhoneme()" class="p-shadow-2" style="padding: 0.9rem" :disabled='!identificationActive'>Repeat-->
      <!--      </Button>-->
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
    props["testPhonemes"].forEach((pho: string) => {
      phonemes.push({name: pho})
    })

    function sendForcedIdentification() {
      const buttonDiv = document.getElementById("forcedIdentificationButtons")
      if (buttonDiv === null) {
        return;
      }

      buttonDiv.innerHTML = '';

      playedPhoneme.value = props['randomTestPhonemes'][i];
      i++
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

        const guessesCell = document.getElementById("pTableRow_" + fiRows.value);
        if (btn === null || guessesCell === null) {
          return
        }

        btn.addEventListener("click", () => {
          const bgColor = btn.style.background;
          if (phoneme === playedPhoneme.value) {
            btn.style.background = "green";
            guessesCell.innerHTML += "<span style='margin-right: 4px; margin-bottom: 4px; padding: 5px; color: #8800FF; font-weight: bolder'>" + phoneme + "</span>";
          } else {
            btn.style.background = "red";
            guessesCell.innerHTML += "<span style='margin-right: 4px; margin-bottom: 4px; padding: 5px'>" + phoneme + "</span>";
          }
          setTimeout(() => {
            btn.style.background = bgColor
          }, 1000);
        });
      })
    }






    return {
      phonemes,
      dropdownPhoneme,

      sendForcedIdentification,
    }
  }
})

  </script>

<style scoped>

</style>
