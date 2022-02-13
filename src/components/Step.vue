<template class="temp">
  <div style="margin-left:auto;margin-right:auto; width: 100%">
      <h1 style="margin-bottom: 4px"> Step {{StepNumber}} </h1>
       <h4 style="margin-bottom: 4px"> {{selectedPhonemes}}</h4>
        <ul style="margin-bottom: 26px">
            <li> • Train to learn which patterns represents which phoneme. </li>
            <li> • You can decide yourself if you would like to train them separately, or all in one go. </li>
            <li> • If you think you know them all, you can move on to the test. </li>
        </ul>
  </div>

  <Panel header="Feeling phonemes" class="p-shadow-4" style="margin-bottom: 50px">
    <p> • Try out how a single phoneme feels. </p>

    <Dropdown v-model="dropdownPhoneme" class="p-shadow-2" :options="allPhonemes" optionLabel="name"
              placeholder="Phoneme" :filter="true"
              style="margin-right: 10px"/>
    <Button @click="sendDropdownPhoneme()" class="p-shadow-2" style="padding: 0.9rem">Send phoneme</Button>
  </Panel>

  <Panel header="Training" class="p-shadow-4">
    <ul style="margin-bottom: 26px">
      <li> • Select which phonemes you want to train on. </li>
      <li> • You will feel a random phoneme. </li>
      <li> • Test yourself by choosing the right phoneme. </li>
      <li> • You can guess as many times as you would like. </li>
      <li> • You can view your answers by clicking below. </li>
    </ul>
      <div style="margin-bottom: 10px">
        <Button @click="selectAllPhonemes()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px">Select all
        </Button>
        <Button @click="selectNewPhonemes()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px">Select new
        </Button>
        <Button @click="deselectAllPhonemes()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px">Deselect all</Button>
      </div>
      <div style="width: min(100%, max(60%, 600px)); margin-top: 20px">
        <div v-for="item in allPhonemes" v-bind:key="item.name" class="p-field-checkbox"
             style="display: inline-block; width: 70px;">
          <Checkbox :id="'checkbox_' + item.name" name="item.name" :value="item.name" v-model="selectedTrainPhonemes"/>
          <label :for="item">{{ item.name }}</label>
        </div>
      </div>

    <Panel>
      <Button @click="sendForcedIdentification()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px">Send phoneme
      </Button>
      <Button @click="repeatPreviousPhoneme()" class="p-shadow-2" style="padding: 0.9rem" :disabled='!identificationActive'>Repeat phoneme
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
</template>

<script lang="ts">
// import {createApp, defineComponent, ref} from "vue";
// import APIWrapper from "@/backend.api";

import {createApp, defineComponent, ref} from "vue";
import Button from "primevue/button";
import Panel from "primevue/panel";
import Checkbox from "primevue/checkbox";
import Dropdown from "primevue/dropdown";
import Fieldset from "primevue/fieldset";
import APIWrapper from "@/backend.api";
import {getRandom} from "@/helpers/array.helper";
// import {getRandom} from "@/helpers/array.helper";

export default defineComponent({
  name: 'Step',
  props: [ "selectedPhonemes", "oldPhonemes", "StepNumber" ],
  components: {Panel, Button, Checkbox, Dropdown, Fieldset},


  setup(props) {
    const selectedTrainPhonemes = ref([]);
    const playedPhoneme = ref();
    const identificationActive = ref(false);
    const fiRows = ref(0);
    const dropdownPhoneme = ref();

    let newPhonemes: { name: string }[] = [];
    props["selectedPhonemes"].forEach((pho: string) => {
      newPhonemes.push({name: pho})
    })

    let allPhonemes: { name: string }[] = [];
    props["selectedPhonemes"].forEach((pho: string) => {
      allPhonemes.push({name: pho})
    })
    props["oldPhonemes"].forEach((pho: string) => {
      allPhonemes.push({name: pho})
    })

    function sendDropdownPhoneme() {
      if (dropdownPhoneme.value !== undefined) {
        const json = {'phonemes': [dropdownPhoneme.value.name]}
        APIWrapper.sendPhonemeMicrocontroller(json);
      } else {
        alert("Please select a phoneme to send");
      }
    }

    function selectAllPhonemes() {
      selectedTrainPhonemes.value = []
      props["selectedPhonemes"].forEach((pho: string) => {
        (selectedTrainPhonemes.value as string[]).push(pho);
      })
      props["oldPhonemes"].forEach((pho: string) => {
        (selectedTrainPhonemes.value as string[]).push(pho);
      })
    }

    function selectNewPhonemes() {
      selectedTrainPhonemes.value = []
      props["selectedPhonemes"].forEach((pho: string) => {
        (selectedTrainPhonemes.value as string[]).push(pho);
      })
    }

    function deselectAllPhonemes() {
      selectedTrainPhonemes.value = [];
    }

    function sendForcedIdentification() {
      const buttonDiv = document.getElementById("forcedIdentificationButtons")
      if (buttonDiv === null) {
        return;
      }

      buttonDiv.innerHTML = '';

      if (selectedTrainPhonemes.value.length === 0) {
        alert("Please select phonemes to train on");
        return;
      }

      const randomPhonemes = (selectedTrainPhonemes.value as any)
      playedPhoneme.value = getRandom(randomPhonemes, 1)[0];
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

      // For each of the phonemes selected, create buttons and assign listeners to it.
      randomPhonemes.forEach((phoneme: string) => {
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

    function repeatPreviousPhoneme() {
      APIWrapper.sendPhonemeMicrocontroller({'phonemes': [playedPhoneme.value]});
    }




    return {
      allPhonemes,
      newPhonemes,
      selectedTrainPhonemes,
      dropdownPhoneme,
      identificationActive,

      selectAllPhonemes,
      selectNewPhonemes,
      deselectAllPhonemes,
      sendForcedIdentification,
      sendDropdownPhoneme,
      repeatPreviousPhoneme,
    }
  }
})

</script>

<style scoped>

</style>
