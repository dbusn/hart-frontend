<template class="temp">
  <div style="margin-left:auto;margin-right:auto; width: 100%">
    <!-- Panel for choosing the steps-->
    <Panel header="Step"  class="p-shadow-4" style="margin-bottom: 50px">
      <p>{{selectedPhonemes}} {{StepNumber}}</p>
    </Panel>

    <Panel header="Training" class="p-shadow-4">
      <p>Select which phonemes you want to train on.</p>
      <div style="margin-bottom: 10px">
        <Button @click="selectAllPhonemes()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px">Select all
        </Button>
        <Button @click="deselectAllPhonemes()" class="p-shadow-2" style="padding: 0.9rem">Deselect all</Button>
      </div>
      <div style="width: min(100%, max(60%, 600px)); margin-top: 20px">
        <div v-for="item in phonemes" v-bind:key="item.name" class="p-field-checkbox"
             style="display: inline-block; width: 70px;">
          <Checkbox :id="'checkbox_' + item.name" name="item.name" :value="item.name" v-model="selectedTrainPhonemes"/>
          <label :for="item">{{ item.name }}</label>

        </div>
      </div>
      <br>

      <!-- Subpanel for forced identification -->
      <Panel header="Forced identification" class="p-shadow-2" style="margin-top: 20px; margin-bottom: 20px">
        <p>By clicking the button, a phoneme will be send to the sleeve, and you will get to see three buttons, and
          have to choose which one you felt.</p>
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



    </Panel>
  </div>
</template>

<script lang="ts">
// import {createApp, defineComponent, ref} from "vue";
// import APIWrapper from "@/backend.api";

import {defineComponent} from "vue";
import Button from "primevue/button";
import Panel from "primevue/panel";
// import {getRandom} from "@/helpers/array.helper";

export default defineComponent({
  name: 'Step',
  props: [ "selectedPhonemes", "StepNumber" ],
  components: {Panel},
  extends: {Button},

  // setup: async () => {

    // // Get phoneme data from the backend
    // const phonemeData = (await APIWrapper.getPhonemes()).phonemes;
    // // const phonemeData = ["AH", "K"];
    //
    // // Initialize variables used throughout component
    // const selectedTrainPhonemes = ref([]);
    // const dropdownPhoneme = ref();
    // const fiRows = ref(0);
    // const raRows = ref(0);
    // const identificationActive = ref(false);
    //
    // const playedPhoneme = ref();
    // /**
    //  * Function for sending a phoneme from the dropdown menu.
    //  */
    // function sendDropdownPhoneme() {
    //   // Check if something was selected
    //   if (dropdownPhoneme.value !== undefined) {
    //     // Create json and send to backend
    //     const json = {'phonemes': [dropdownPhoneme.value.name]}
    //     APIWrapper.sendPhonemeMicrocontroller(json);
    //   } else {
    //     // If nothing selected, alert user
    //     alert("Please select a phoneme to send");
    //   }
    // }
    //
    // /**
    //  * Function for executing forced identification behavior.
    //  */
    // function sendForcedIdentification() {
    //   // Get div from page for placing buttons
    //   const buttonDiv = document.getElementById("forcedIdentificationButtons")
    //   if (buttonDiv === null) {
    //     return;
    //   }
    //
    //   // empty button div
    //   buttonDiv.innerHTML = '';
    //
    //   // check if some phonemes are selected
    //   if (selectedTrainPhonemes.value.length === 0) {
    //     alert("Please select phonemes to train on");
    //     return;
    //   }
    //
    //   // get a set of random phonemes from the selected phonemes
    //   const randomPhonemes = (selectedTrainPhonemes.value as any)
    //   playedPhoneme.value = getRandom(randomPhonemes, 1)[0];
    //   identificationActive.value = true;
    //
    //   // Send selected phoneme to backend
    //   APIWrapper.sendPhonemeMicrocontroller({'phonemes': [playedPhoneme.value]});
    //
    //   // Increase the number of forced identification rounds.
    //   fiRows.value++;
    //
    //   // Get the answer table
    //   const pTable = document.getElementById("phoneme-table");
    //   if (pTable === null) {
    //     return
    //   }
    //
    //   // Create new row element for table
    //   const row = document.createElement("tr");
    //   row.innerHTML = "<td>" + fiRows.value + "</td><td>" + playedPhoneme.value + "</td><td id='pTableRow_" + fiRows.value + "'></td>";
    //   pTable.appendChild(row);
    //
    //   // Add explanation div
    //   const textDiv = document.createElement('div');
    //   textDiv.innerHTML = '<p>Which phoneme was just played?</p>';
    //   buttonDiv.appendChild(textDiv);
    //
    //   // For each of the phonemes selected, create buttons and assign listeners to it.
    //   randomPhonemes.forEach((phoneme: string) => {
    //     // Create div for button
    //     const div = document.createElement('div');
    //     div.style.display = "inline-block";
    //     div.style.marginRight = "10px";
    //
    //     // Add div for button to the button div
    //     buttonDiv.appendChild(div);
    //     createApp(Button, {
    //       label: phoneme,
    //       id: "fid_" + phoneme,
    //       class: "p-shadow-2",
    //       style: "margin-bottom: 4px"
    //     }).mount(div);
    //
    //     // Get the button from the page
    //     const btn = document.getElementById("fid_" + phoneme);
    //
    //     // Get the table cell for guesses from the page
    //     const guessesCell = document.getElementById("pTableRow_" + fiRows.value);
    //     if (btn === null || guessesCell === null) {
    //       return
    //     }
    //
    //     // Add button event listener
    //     btn.addEventListener("click", () => {
    //       const bgColor = btn.style.background;
    //       if (phoneme === playedPhoneme.value) {
    //         btn.style.background = "green";
    //         guessesCell.innerHTML += "<span style='margin-right: 4px; margin-bottom: 4px; padding: 5px; color: #8800FF; font-weight: bolder'>" + phoneme + "</span>";
    //       } else {
    //         btn.style.background = "red";
    //         guessesCell.innerHTML += "<span style='margin-right: 4px; margin-bottom: 4px; padding: 5px'>" + phoneme + "</span>";
    //       }
    //       setTimeout(() => {
    //         btn.style.background = bgColor
    //       }, 1000);
    //     });
    //   })
    // }
    //
    // function repeatPreviousPhoneme() {
    //   APIWrapper.sendPhonemeMicrocontroller({'phonemes': [playedPhoneme.value]});
    // }
    //
    // // Format gotten phonemes from backend.
    // // const phonemes: { name: string }[] = [];
    // // phonemeData.forEach((pho: string) => {
    // //   phonemes.push({name: pho})
    // // })
    //
    // const phonemes: { name: string }[] = [];
    // phonemeData.forEach((pho: string) => {
    //   phonemes.push({name: pho})
    // })
    //
    // /**
    //  * Function for selecting all phonemes
    //  */
    // function selectAllPhonemes() {
    //   selectedTrainPhonemes.value = []
    //   phonemeData.forEach((pho: string) => {
    //     (selectedTrainPhonemes.value as string[]).push(pho);
    //   })
    // }
    //
    // function deselectAllPhonemes() {
    //   selectedTrainPhonemes.value = [];
    // }
    //
    // // Return all variables
    //return {
      // phonemes,
      // selectedTrainPhonemes,
      // dropdownPhoneme,
      // fiRows,
      // raRows,
      // identificationActive,
      //
      // sendDropdownPhoneme,
      // sendForcedIdentification,
      // repeatPreviousPhoneme,
      // selectAllPhonemes,
      // deselectAllPhonemes
    // }
  //},
  // created() {
  //   document.title = "HART Prototype - Phonemes"
  // }
})

</script>

<style scoped>

</style>
