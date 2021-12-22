<template class="temp">
  <div style="margin-left:auto;margin-right:auto; width: 100%">
    <!-- Panel for choosing the steps-->
    <Panel header="Step"  class="p-shadow-4" style="margin-bottom: 50px">
      <p>{{phonemes}} {{StepNumber}}.</p>
    </Panel>

<!--    <Panel header="Send a chosen phoneme" class="p-shadow-4" style="margin-bottom: 50px">-->
<!--      <p>To just try out how a single phoneme feels, and play it on the sleeve, you can select a phoneme in the-->
<!--        dropdown menu and send it to the sleeve.</p>-->

<!--      <Dropdown v-model="dropdownPhoneme" class="p-shadow-2" :options="phonemes" optionLabel="name"-->
<!--                placeholder="Phoneme" :filter="true"-->
<!--                style="margin-right: 10px"/>-->
<!--      <Button @click="sendDropdownPhoneme()" class="p-shadow-2" style="padding: 0.9rem">Send phoneme</Button>-->
<!--    </Panel>-->

<!--    <Panel header="Training" class="p-shadow-4">-->
<!--      <p>Select which phonemes you want to train on.</p>-->
<!--      <div style="margin-bottom: 10px">-->
<!--        <Button @click="selectAllPhonemes()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px">Select all-->
<!--        </Button>-->
<!--        <Button @click="deselectAllPhonemes()" class="p-shadow-2" style="padding: 0.9rem">Deselect all</Button>-->
<!--      </div>-->
<!--      <div style="width: min(100%, max(60%, 600px)); margin-top: 20px">-->
<!--        <div v-for="item in phonemes" v-bind:key="item.name" class="p-field-checkbox"-->
<!--             style="display: inline-block; width: 70px;">-->
<!--          <Checkbox :id="'checkbox_' + item.name" name="item.name" :value="item.name" v-model="selectedTrainPhonemes"/>-->
<!--          <label :for="item">{{ item.name }}</label>-->

<!--        </div>-->
<!--      </div>-->
<!--      <br>-->


<!--      <Panel header="Forced identification" class="p-shadow-2" style="margin-top: 20px; margin-bottom: 20px">-->
<!--        <p>By clicking the button, a phoneme will be send to the sleeve, and you will get to see three buttons, and-->
<!--          have to choose which one you felt.</p>-->
<!--        <Button @click="sendForcedIdentification()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px">Forced identification-->
<!--        </Button>-->
<!--        <Button @click="repeatPreviousPhoneme()" class="p-shadow-2" style="padding: 0.9rem" :disabled='!identificationActive'>Repeat-->
<!--        </Button>-->
<!--        <div id="forcedIdentificationButtons"></div>-->
<!--        <Fieldset legend="Answers (history)" :toggleable="true" :collapsed="true" style="margin-top: 20px">-->
<!--          <table id="phoneme-table">-->
<!--            <tr>-->
<!--              <th>Round</th>-->
<!--              <th>Correct answer</th>-->
<!--              <th>Guessed answers</th>-->
<!--            </tr>-->
<!--          </table>-->
<!--        </Fieldset>-->
<!--      </Panel>-->


  </div>
</template>

<script lang="ts">
// import {defineComponent} from "vue";
// import APIWrapper from "@/backend.api";

import {defineComponent} from "vue";
import Panel from "primevue/panel";

export default defineComponent({
  name: 'Step',
  props: [ "phonemes", "StepNumber" ],
  components: { Panel }
})
</script>

<style scoped>

</style>
