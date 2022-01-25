<template class="temp">
  <div style="margin-left:auto;margin-right:auto; width: 100%">
    <h1 style="margin-bottom: 4px"> Test {{WordNumber}} WORDS </h1>
    <h4 style="margin-bottom: 26px"> This is a test to see if you know the words {{testWords}}</h4>
  </div>

  <Panel header="Feeling words" class="p-shadow-2" style="margin-top: 20px; margin-bottom: 20px">
      <p>By clicking the button, a random word will be send to the sleeve. You will see the word on the screen, and how it's split up into phonemes.</p>
      <Button @click="sendRandomWord()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px">Send word
      </Button>
      <Button @click="repeatPreviousWord()" class="p-shadow-2" style="padding: 0.9rem" :disabled='!identificationActive'>Repeat
      </Button>
      <div id="phonemeSplitup"></div>
      <div id="word"></div>
    </Panel>

    <!-- <Panel header="Test" class="p-shadow-2" style="margin-top: 20px; margin-bottom: 20px">
      <p>Just like with the training you will send a phoneme to the sleeve and have to guess which one it is. However, now you can only try once and you see immidiatly which one was the right one after making a mistake. At the end you get a score. If this score is higher then ...%, you can move on to the next step. If this score is lower, go back to the training in which you made the most mistakes so you will do better next try. </p>
      <Button @click="sendForcedIdentification()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px">Forced identification
      </Button>
      <Button @click="repeatPreviousPhoneme()" class="p-shadow-2" style="padding: 0.9rem" :disabled='!identificationActive'>Repeat
        </Button>
      <div id="forcedIdentificationButtons"></div>
       <Fieldset legend="Answers (history)" :toggleable="true" :collapsed="true" style="margin-top: 20px">
        <table id="phoneme-table">
          <tr>
            <th>Round</th>
            <th>Correct answer</th>
            <th>Guessed answers</th>
          </tr>
        </table>
      </Fieldset> 
      <Button @click="viewGrade()" class="p-shadow-2" style="padding: 0.9rem; margin-top: 20px" :disabled='!gradeActive'>View your grade!
        </Button>
    </Panel> -->
    <div style="margin-left:auto;margin-right:auto; width: 100%" id="finalGrade">
    </div>
</template>


  <script lang="ts">
// import {createApp, defineComponent, ref} from "vue";
// import APIWrapper from "@/backend.api";

import {defineComponent, ref} from "vue";
import Button from "primevue/button";
import Panel from "primevue/panel";
//import Fieldset from "primevue/fieldset";
import APIWrapper from "@/backend.api";

export default defineComponent({
  name: 'WordTest',
  props: ["testWords", "WordNumber"],
  components: {Panel, Button/*, Fieldset*/},
  setup(props) {
    const identificationActive = ref(false);

    let selectedWord = "";
      
    async function sendRandomWord() {
      const len = props["testWords"].length;
      selectedWord = props["testWords"][Math.floor(Math.random() * len)];

      const wrapper = await APIWrapper.sendWordsMicrocontroller({'words': [selectedWord]});

      const phon = wrapper.decomposition[0].phonemes;
      const phonemeSplitup = document.getElementById("phonemeSplitup");
      if (phonemeSplitup != null) {
        phonemeSplitup.innerHTML = "<p>" + prettyPrint(phon) + "</p>";
      }

      const word = document.getElementById("word");
      if (word != null) {
        word.innerHTML = "<p>" + selectedWord + "</p>";
      }

      identificationActive.value = true;

      // In case we ever need this
      // if (typeof selectedWord.value !== "string") {
      //   APIWrapper.sendWordsMicrocontroller({'words': [selectedWord.value.name]})
      // } else {
      //   APIWrapper.sendWordsMicrocontroller({'words': [selectedWord.value]})
      // }
    }

    function repeatPreviousWord() {
      if (selectedWord !== "") {
        APIWrapper.sendWordsMicrocontroller({'words': [selectedWord]});
      }
    }

    function prettyPrint(array : string[]) {
      let dummy = "";
      array.forEach((str : string) => {
        dummy += "'" + str + "' - ";
      });
      return dummy.substring(0, dummy.length - 3);
    }

    return {
      identificationActive,

      sendRandomWord,
      repeatPreviousWord
    }
  }

})
  </script>