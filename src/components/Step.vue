<template class="temp">
  <div style="margin-left:auto;margin-right:auto; width: 100%">
    <!-- Panel for choosing the steps-->
    <Panel header="Step"  class="p-shadow-4" style="margin-bottom: 50px">
      <p>{{selectedPhonemes}} {{StepNumber}}</p>
    </Panel>
  </div>

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
    </Panel>
</template>

<script lang="ts">
// import {createApp, defineComponent, ref} from "vue";
// import APIWrapper from "@/backend.api";

import {defineComponent, ref} from "vue";
import Button from "primevue/button";
import Panel from "primevue/panel";
import Checkbox from "primevue/checkbox";
import Dropdown from "primevue/dropdown";
import Fieldset from "primevue/fieldset";
// import {getRandom} from "@/helpers/array.helper";

export default defineComponent({
  name: 'Step',
  props: [ "selectedPhonemes", "StepNumber" ],
  components: {Panel, Button, Checkbox},
  extends: {Dropdown, Fieldset},
  setup(props) {
    const selectedTrainPhonemes = ref([]);

    const phonemes: { name: string }[] = [];
    props["selectedPhonemes"].forEach((pho: string) => {
      phonemes.push({name: pho})
    })

    function selectAllPhonemes() {
      selectedTrainPhonemes.value = []
      props["selectedPhonemes"].forEach((pho: string) => {
        (selectedTrainPhonemes.value as string[]).push(pho);
      })
    }

    function deselectAllPhonemes() {
      selectedTrainPhonemes.value = [];
    }

    return {
      phonemes,
      selectedTrainPhonemes,

      selectAllPhonemes,
      deselectAllPhonemes,
    }
  }
})

</script>

<style scoped>

</style>
