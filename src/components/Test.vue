<template class="temp">
  <div style="margin-left:auto;margin-right:auto; width: 100%">
      <h1 style="margin-bottom: 4px"> Test </h1>
  </div>
</template>

<script lang="ts">
// import {createApp, defineComponent, ref} from "vue";
// import APIWrapper from "@/backend.api";

import {defineComponent} from "vue";
// import Button from "primevue/button";
// import Panel from "primevue/panel";
// import Checkbox from "primevue/checkbox";
// import Dropdown from "primevue/dropdown";
// import Fieldset from "primevue/fieldset";
// import APIWrapper from "@/backend.api";
// import {getRandom} from "@/helpers/array.helper";
// import {getRandom} from "@/helpers/array.helper";

export default defineComponent({
  name: 'Test',
  props: ["testPhonemes", "testNumber"],
  // components: {Panel, Button, Checkbox, Dropdown, Fieldset},
})



</script>

<style scoped>

</style>
