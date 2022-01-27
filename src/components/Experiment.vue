<template class="temp">
  <div id="state">
      <Button @click="initialize()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px; position: absolute;
        top: 45%; left: 45%;">Start the survey</Button>
        <div id="myModal" class="modal" style="display: none; z-index:1; position: fixed; width: 100%; height:100%; background-color: rgba(0,0,0,0.4); left:0; top:0">
            <div class="modal-content" style="background-color: #fefefe; margin: auto; padding: 20px; border: 1px solid #888; width: 80%;">
                <span class="close">&times;</span>
                <p>Some explanation</p>
                <span class="p-float-label">
                    <InputText type="text" class="p-shadow-2" v-model="value" style="width: 100%; margin-bottom: 10px"/>
                    <label for="username">Username</label>
                </span>
            </div>
        </div>
  </div>
</template>

<script lang="ts">
import {/**createApp, */defineComponent} from "vue";

export default defineComponent({
    name: 'Words',
    setup : async () => {
        function initialize() {
            const modal = document.getElementById("myModal");
            if (modal !== null) {
                modal.style.display = "block";
            }

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