<template>
  <TabMenu :model="items" class="p-shadow-2">something else</TabMenu>
</template>

<script lang="ts">

import {defineComponent} from "vue";
// import {ThemeChanger} from "@/helpers/darkmode.helper";

export default defineComponent({
  name: 'Navbar',
  setup() {
    // const themeChanger = new ThemeChanger();

    const items = [
      {label: 'Home', icon: 'pi pi-fw pi-home', to: '/'},
      {label: 'Documentation', icon: 'pi pi-fw pi-file', to: '/documentation'},
      {label: 'Phonemes', icon: 'pi pi-fw pi-comment', to: '/phonemes'},
      {label: 'Words', icon: 'pi pi-fw pi-comments', to: '/words'},
      {label: 'Audio', icon: 'pi pi-fw pi-play', to: '/audio'},
      {label: 'Experiment', icon: 'pi pi-fw pi-pencil', to: '/experiment'},
      // {label: 'Theme', icon: 'pi pi-fw pi-palette', command:() => {themeChanger.darkThemeSwitch()}}
    ];

    return {
      items,
    }
  },
})
</script>

<style scoped>

</style>
