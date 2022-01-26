<template class="temp">
  <div id="state">
      <Button @click="initialize()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px; position: absolute;
        top: 45%; left: 45%;">Start the survey</Button>
  </div>
</template>

<script lang="ts">
import {/**createApp, */defineComponent} from "vue";

export default defineComponent({
    name: 'Words',
    setup : async () => {
        function initialize() {
            //const screen = document.getElementById("state");

            // ...

            //const app = createApp(Identifier, {});
            //app.mount(screen);
        }

        return {
            initialize
        }
    }
});
</script>

<style scoped>

</style>