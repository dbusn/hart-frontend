<template class="temp">
  <div style="margin-left:auto;margin-right:auto; width: 100%">
      <h1 style="margin-bottom: 4px"> Step {{StepNumber}} </h1>
      <h4 style="margin-bottom: 26px"> This is the training page. Here you can train yourself to learn which patterns stands for which phonemes. You can decide for yourself if you want to train phoneme per phoneme or all in one go. If you think you know the phonemes, you can move on to the test.</h4>
      <h4 style="margin-bottom: 26px"> This training you can train {{selectedPhonemes}} and {{oldPhonemes}}</h4>
  </div>

  <Panel header="Feeling phonemes" class="p-shadow-4" style="margin-bottom: 50px">
    <p>Try out how a single phoneme feels. You can select a phoneme in the
      dropdown menu and send it to the sleeve. If you think you are able to recognize them you can go to the training.</p>

    <Dropdown v-model="dropdownPhoneme" class="p-shadow-2" :options="allPhonemes" optionLabel="name"
              placeholder="Phoneme" :filter="true"
              style="margin-right: 10px"/>
    <Button @click="sendDropdownPhoneme()" class="p-shadow-2" style="padding: 0.9rem">Send phoneme</Button>
  </Panel>

  <Panel header="Training" class="p-shadow-4">
      <p>You can select here which phonemes you want to train on.</p>
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

    <Panel header="Recognition training" class="p-shadow-2" style="margin-top: 20px; margin-bottom: 20px">
      <p>By clicking the button, a phoneme will be send to the sleeve, you have to choose which one you've felt. If you chose the wrong phoneme, it turns red and if you chose the right phoneme the button turns green. You can try other buttons until you've found the right one. On the bottom you can see an overview of your answers. </p>
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
