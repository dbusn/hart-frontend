<template class="temp">
  <div id="state" style="position: absolute; top: 45%; left: 45%">
    <Button @click="sendPattern(0)">Pattern 1</Button>
    <Button @click="sendPattern(1)">Pattern 2</Button>
    <SelectButton v-model="selectedScale" :options="scale" optionLabel="name">
    </SelectButton>
    <Button @click="submitRating()">Next</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SelectButton from "primevue/selectbutton";
import Button from "primevue/button";
import APIWrapper from "@/backend.api";

export default defineComponent({
  name: "Survey",
  props: ["user"],
  components: { SelectButton, Button },

  async setup() {
    var currentCombination : [String] = getNewCombination();

    const selectedScale = ref();
    const scale = [
      { name: "Not different", value: 1 },
      { name: "Somewhat different", value: 2 },
      { name: "Moderately different", value: 3 },
      { name: "Very different", value: 4 },
    ];

    async function submitRating() {
      console.log(selectedScale.value.name);
      console.log(selectedScale.value.value);
      currentCombination = await getNewCombination();
    }

    async function getNewCombination() {
      var combination = await APIWrapper.getCombination();
      console.log(combination.phonemes);
      var realComb : [String] = combination.phonemes;
      // if (realComb == null) {
      //   var empty : String[] = [];
      //   return empty;
      // }
      return realComb;
    }

    // eslint-disable-next-line no-unused-vars
    function sendPattern(patternID: number) {
      const patternName = currentCombination[patternID];
      const json = { phonemes: [patternName] };
      APIWrapper.sendCombinationMicroncontroller(json);
      console.log("Pattern" + patternName + "sent to the microcontroller");
    }

    return {
      getNewCombination,
      currentCombination,
      selectedScale,
      scale,
      submitRating,
      sendPattern,
    };
  },
});
</script>

<style scoped>
</style>