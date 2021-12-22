<template class="temp">
  <div style="margin-left:auto;margin-right:auto; width: 100%">
    <!-- Panel for choosing the steps-->
    <Panel header="Step"  class="p-shadow-4" style="margin-bottom: 50px">
      <p>{{phonemes}} {{StepNumber}}</p>
    </Panel>
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
