<template class="temp">
  <div style="margin-left: auto; margin-right: auto; width: 100%">
    <h1 style="margin-bottom: 4px">Pattern Distinguishability</h1>
    <div
      style="margin-left: auto; margin-right: auto; width: 100%"
      id="combination"
    ></div>
    <ul style="margin-bottom: 26px">
      <Button
        @click="Start()"
        class="p-shadow-2"
        style="
          padding: 0.9rem;
          width: 400px;
          height: 50px;
          margin-bottom: 20px;
          margin-right: 40px;
          margin-left: 250px;
        "
        >Send Combination
      </Button>
    </ul>

    <div id="forcedIdentificationButtons"></div>
    <li>How different were the patterns sent?.</li>
    <li>1 - Not Different.</li>
    <li>7 - Completely Different.</li>

    <SelectButton
      @click="submitRating()"
      v-model="selectedScale"
      :options="scale"
      optionLabel="name"
      style="width: 400px; margin-left: 310px"
    >
    </SelectButton>
    <Button
      @click="Next()"
      class="p-shadow-2"
      style="
        padding: 0.8rem;
        width: 400px;
        height: 50px;
        margin-bottom: 10px;
        margin-right: 40px;
        margin-left: 250px;
        margin-top: 25px;
      "
    >
      Next
    </Button>
  </div>
</template>

<script lang="ts">
import { createApp, defineComponent, ref } from "vue";
import SelectButton from "primevue/selectbutton";
import Button from "primevue/button";
import ActivityLogger from "@/helpers/logging";
import { combination } from "@/helpers/state";
import APIWrapper from "@/backend.api";

/* LINE 11 
    <Button @click="Pattern1()" class="p-shadow-2" style="padding: 0.9rem; width: 150px; height: 150px;  margin-bottom: 20px;  margin-right: 40px; margin-left: 300px">Pattern 1</Button>
    <Button @click="Pattern2()" class="p-shadow-2" style="padding: 0.9rem; width: 150px; height: 150px;  margin-bottom: 20px;  margin-right: 40px">Pattern 2</Button>
*/

export default defineComponent({
  name: "Survey",
  props: ["user"],
  components: { SelectButton, Button },

  setup() {
    // var currentCombination: [String] = getNewCombination();
    var currentCombination: [String];
    initialize();

    async function initialize() {
      currentCombination = await getNewCombination();
    }

    const selectedScale = ref();
    const scale = [
      { name: "1", value: 1 },
      { name: "2", value: 2 },
      { name: "3", value: 3 },
      { name: "4", value: 4 },
      { name: "5", value: 5 },
      { name: "6", value: 6 },
      { name: "7", value: 7 },
    ];

    // eslint-disable-next-line no-unused-vars
    const combinationNumber = combination.updatedNumber;

    function Start() {
      const buttonDiv = document.getElementById("forcedIdentificationButtons");
      if (buttonDiv === null) {
        return;
      }

      buttonDiv.innerHTML = "";

      const patternNumber: string[] = ["1", "2"];

      patternNumber.forEach((index: string) => {
        const div = document.createElement("div");

        div.style.display = "inline-block";
        div.style.marginRight = "10px";
        // Add div for button to the button div
        buttonDiv.appendChild(div);

        // Dummy REED patterns
        // const firstPatternData = { phonemes: [currentCombination[0]] };
        // const secondPatternData = { phonemes: [currentCombination[1]] };

        createApp(Button, {
          label: "Pattern " + index,
          id: "fid_" + index,
          class: "p-shadow-2",
          // click: APIWrapper.sendPhonemeMicrocontroller(json),
          style:
            "margin-left: 200px; margin-bottom: 20px; width: 150px; height: 100px",
        }).mount(div);

        const btn1 = document.getElementById("fid_1");
        const btn2 = document.getElementById("fid_2");

        if (btn1 === null) {
          return;
        }
        if (btn2 === null) {
          return;
        }

        const bgColor = btn1.style.background;

        setTimeout(() => {
          btn1.style.background = "green";
          sendPattern(0);
        }, 500);

        setTimeout(() => {
          btn1.style.background = bgColor;
          btn2.style.background = bgColor;
        }, 2500);

        setTimeout(() => {
          btn1.style.background = bgColor;
          btn2.style.background = "green";
          sendPattern(1);
        }, 3000);

        setTimeout(() => {
          btn1.style.background = bgColor;
          btn2.style.background = bgColor;
        }, 5000);
      });
    }

    async function submitRating() {
      console.log(selectedScale.value.name);
      console.log(selectedScale.value.value);

      ActivityLogger.log_activity(selectedScale.value.value);
    }

    async function getNewCombination() {
      var combination = await APIWrapper.getCombination();
      console.log(combination.phonemes);
      var realComb: [String] = combination.phonemes;

      return realComb;
    }

    async function Next() {
      combination.updatedNumber++;
      console.log(combination.updatedNumber);
      let someDiv = document.getElementById("combination");
      if (someDiv != null) {
        someDiv.innerHTML =
          "<h2 style='margin-bottom: 4px'> Combination: " +
          combination.updatedNumber +
          " </h2>";
      }

      currentCombination = await getNewCombination();
    }

    // eslint-disable-next-line no-unused-vars
    function sendPattern(patternID: number) {
      const patternName = currentCombination[patternID]
      const json = { phonemes: [patternName] };
      APIWrapper.sendCombinationMicroncontroller(json);
      console.log("Pattern" + patternName + "sent to the microcontroller");
    }

    return {
      getNewCombination,
      selectedScale,
      scale,
      submitRating,
      sendPattern,
      Next,
      Start,
    };
  },
  created() {
    document.title = "HART Prototype - Experiment";
  },
});
</script>

<style scoped>
</style>