<template class="temp">
  <div id="state">
      <SelectButton v-model="selectedScale" :options="scale" optionLabel="brand">
            <div class="scale-option">
                <img :alt="slotProps.option.brand" :src="'demo/images/car/' + slotProps.option.brand + '.png'" />
                <div>{{slotProps.option.brand}}</div>
            </div>
        </SelectButton>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import Survey from "@/components/Survey.vue";

export default defineComponent({
    name: 'Words',
    props: ["user"],
    components: {},
    setup(props) {
        const selectedScale = ref();
        const scale = [
            "Not different", 
            "Somewhat different",
            "Moderately different",
            "Very different"
        ]

        return {
            selectedScale,
            scale,

        }
    }
});
</script>

<style scoped>

</style>