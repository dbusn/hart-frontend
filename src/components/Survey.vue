<template class="temp">
  <div id="state">
      <SelectButton v-model="selectedScale" :options="scale" optionLabel="name">
        </SelectButton>
        <Button @click="submitRating()">Next</Button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import SelectButton from "primevue/selectbutton";
import Button from "primevue/button";

export default defineComponent({
    name: 'Survey',
    props: ["user"],
    components: {SelectButton, Button},
    setup() {
        const selectedScale = ref();
        const scale = [
            {name: "Not different", value: 1},
            {name: "Somewhat different", value: 2},
            {name: "Moderately different", value: 3},
            {name: "Very different", value: 4}
        ]
        
        //const user = props["user"];

        function submitRating(){
            console.log(selectedScale.value.name);
            console.log(selectedScale.value.value);
        }

        return {
            selectedScale,
            scale,

            submitRating
        }
    }
});
</script>

<style scoped>

</style>