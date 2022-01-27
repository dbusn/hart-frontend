<template class="temp">
  <div id="state">
      <Button @click="initialize()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px; position: absolute;
        top: 45%; left: 45%;">Start the survey</Button>
        <div id="myModal" class="modal" style="display: none; z-index:1; position: fixed; width: 100%; height:100%; background-color: rgba(0,0,0,0.4); left:0; top:0">
            <div class="modal-content" style="background-color: #fefefe; margin: auto; padding: 20px; border: 1px solid #888; width: 80%;">
                <span class="close">&times;</span>
                <p>Some explanation</p>
                <span class="p-float-label">
                    <InputText id="username" type="text" v-model="user" style="width: 100%; margin-bottom: 10px"/>
                    <label for="username">Username</label>
                </span>
                <Button @click="sendInfo()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px; position: absolute;
                    top: 45%; left: 45%;">Submit</Button>
                <div id="errorMessage"></div>
            </div>
        </div>
  </div>
</template>

<script lang="ts">
import {createApp, defineComponent, ref} from "vue";
import Survey from "@/components/Survey.vue";

export default defineComponent({
    name: 'Words',
    setup : async () => {
        const user = ref();
        const participants: string[] = 
            [
                "penguin"
            ];
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

        function sendInfo() {
            if (participants.includes(user.value)) {
                const modal = document.getElementById("myModal");
                if (modal !== null) {
                    modal.style.display = "none";
                }

                const app = createApp(Survey, {"user" : user.value});

                const screen = document.getElementById("state");
                if (screen !== null) {
                    screen.innerHTML = "";
                    app.mount(screen);
                }
            } else {
                const error = document.getElementById("errorMessage");
                if (error !== null) {
                    error.innerHTML = "<p>Your username was incorrect. Try again.</p>"
                }
            }
        }

        return {
            initialize,
            sendInfo
        }
    }
});
</script>

<style scoped>

</style>