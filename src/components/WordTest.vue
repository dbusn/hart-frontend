<template class="temp">
  <div style="margin-left:auto;margin-right:auto; width: 100%">
    <h1 style="margin-bottom: 4px"> Test {{WordNumber}} WORDS </h1>
    <h4 style="margin-bottom: 26px"> This is a test to see if you know the words {{testWords}}</h4>
  </div>

  <Panel header="Feeling words" class="p-shadow-2" style="margin-top: 20px; margin-bottom: 20px">
      <p>By clicking the button, a random word will be send to the sleeve. You will see the word on the screen, and how it's split up into phonemes.</p>
      <Button @click="sendRandomWord(0)" class="p-shadow-2" style="padding: 0.9rem; margin: 10px">Send word
      </Button>
      <Button @click="repeatPreviousWord()" class="p-shadow-2" style="padding: 0.9rem; margin: 10px" :disabled='!identificationActive'>Repeat
      </Button>
      <div id="word0"></div>
      <Button @click="sendRandomWord(1)" class="p-shadow-2" style="padding: 0.9rem; margin: 10px">Send word
      </Button>
      <Button @click="repeatPreviousWord()" class="p-shadow-2" style="padding: 0.9rem; margin: 10px" :disabled='!identificationActive'>Repeat
      </Button>
      <div id="word1"></div>
    </Panel>

    <Panel header="Find the phonemes" class="p-shadow-2" style="margin-top: 20px; margin-bottom: 20px">
      <p>Click on the button, a random word will be send to the sleeve again. Now you have to guess which phonemes you feel. After you are certain about your imput you can see the right answer.</p>
      <Button @click="findSplitupWord(0)" class="p-shadow-2" style="padding: 0.9rem; margin: 10px">Send word
      </Button>
      <Button @click="repeatPreviousWord()" class="p-shadow-2" style="padding: 0.9rem; margin: 10px" :disabled='!identificationActive'>Repeat
      </Button>
      <div id="buttonDiv0"></div>
      <div id="ctrlBtn0"></div>
      <div id="splitup0"></div>
      <Button @click="findSplitupWord(1)" class="p-shadow-2" style="padding: 0.9rem; margin: 10px">Send word
      </Button>
      <Button @click="repeatPreviousWord()" class="p-shadow-2" style="padding: 0.9rem; margin: 10px" :disabled='!identificationActive'>Repeat
      </Button>
      <div id="buttonDiv1"></div>
      <div id="ctrlBtn1"></div>
      <div id="splitup1"></div>
    </Panel>


    <Panel header="Guess the word" class="p-shadow-2" style="margin-top: 20px; margin-bottom: 20px">
      <p>Click on the button, a random word will be send to the sleeve. You need to guess which word you feel. After submitting your input you see the right answer.</p>
      <Button @click="guessWord(0)" class="p-shadow-2" style="padding: 0.9rem; margin: 10px">Send word
      </Button>
      <Button @click="repeatPreviousWord()" class="p-shadow-2" style="padding: 0.9rem; margin: 10px" :disabled='!identificationActive'>Repeat
      </Button>
      <div id="inputText0"><InputText id=input0 type="text" v-model="writtenWord0" style="width: 40%; margin: 10px"/></div>
      <div id="sub0"></div>
      <div id="resultWord0"></div>
      <Button @click="guessWord(1)" class="p-shadow-2" style="padding: 0.9rem; margin: 10px">Send word
      </Button>
      <Button @click="repeatPreviousWord()" class="p-shadow-2" style="padding: 0.9rem; margin: 10px" :disabled='!identificationActive'>Repeat
      </Button>
      <div id="inputText1"><InputText id=input0 type="text" v-model="writtenWord1" style="width: 40%; margin: 10px"/></div>
      <div id="sub1"></div>
      <div id="resultWord1"></div>
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

import {createApp, defineComponent, ref} from "vue";
import Button from "primevue/button";
import Panel from "primevue/panel";
//import Fieldset from "primevue/fieldset";
import APIWrapper from "@/backend.api";
import InputText from "primevue/inputtext";

export default defineComponent({
  name: 'WordTest',
  props: ["testWords", "WordNumber", "phonemes"],
  components: {Panel, Button, InputText/*, Fieldset*/},
  setup(props) {
    const identificationActive = ref(false);

    let selectedWord = "";

    let selectedPhonemes : string[] = [];
    let phon : any;

    const writtenWord0 = ref();

    const writtenWord1 = ref();
      
    async function sendRandomWord(test : number) {
      //const len = props["testWords"].length;
      selectedWord = props["testWords"][test];

      const wrapper = await APIWrapper.sendWordsMicrocontroller({'words': [selectedWord]});

      const phon = wrapper.decomposition[0].phonemes;

      const word = document.getElementById("word" + test);
      if (word === null) {
        return
      }
      word.innerHTML = "<p> " + selectedWord + " | " + prettyPrint(phon) + " </p>";

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

    async function findSplitupWord(test : number) {
      selectedPhonemes = [];
      selectedWord = props["testWords"][2 + test];
      const wrapper = await APIWrapper.sendWordsMicrocontroller({'words': [selectedWord]});
      phon = wrapper.decomposition[0].phonemes;
      identificationActive.value = true;

      const buttonDiv = document.getElementById("buttonDiv" + test);
      if (buttonDiv === null) {
        return;
      }
      buttonDiv.innerHTML = "";

      props["phonemes"].forEach((phoneme: string) => {
        // Create div for button
        const div = document.createElement('div');
        div.style.display = "inline-block";
        div.style.marginRight = "10px";

        // Add div for button to the button div
        buttonDiv.appendChild(div);
        createApp(Button, {
          label: phoneme,
          id: "fid_" + phoneme,
          class: "p-shadow-2",
          style: "margin: 4px"
        }).mount(div);

        const btn = document.getElementById("fid_" + phoneme);

        // Remember the button storing the correct phoneme
        //if (phoneme === playedPhoneme.value) {
        //  correctBtn = btn;
        //}

        //const guessesCell = document.getElementById("pTableRow_" + fiRows.value);
        //if (btn === null || guessesCell === null) {
        //  return
        //}

        if (btn === null) {
          return;
        }

        btn.addEventListener("click", () => {
          selectedPhonemes.push(phoneme);
        });
      })

      const ctrlBtn = document.getElementById("ctrlBtn" + test);
      if (ctrlBtn === null) {
        return;
      }
      ctrlBtn.innerHTML = "";

      const div1 = document.createElement('div');
      div1.style.display = "inline-block";
      div1.style.marginRight = "10px";
      ctrlBtn.appendChild(div1);
      createApp(Button, {
        label: "reset",
        id: "reset" + test,
        class: "p-shadow-2",
        style: "margin: 4px"
      }).mount(div1);

      const rst = document.getElementById("reset" + test);
      if (rst === null) {
        return;
      }

      rst.addEventListener("click", () => {
        selectedPhonemes = [];
      })

      const div2 = document.createElement('div');
      div2.style.display = "inline-block";
      div2.style.marginRight = "10px";
      ctrlBtn.appendChild(div2);
      createApp(Button, {
        label: "submit",
        id: "submit" + test,
        class: "p-shadow-2",
        style: "margin-bottom: 4px"
      }).mount(div2);
      const submit = document.getElementById("submit" + test);
      if (submit === null) {
        return;
      }
      submit.addEventListener("click", () => {
        const sol = document.getElementById("splitup" + test);
        if (sol === null) {
          return
        }
        sol.innerHTML = "<p> " + " Your input: " + prettyPrint(selectedPhonemes) + "</p><p> "+ " Correct phonemes: " + prettyPrint(phon) +"<p> "+ " Word: " + selectedWord + "</p>";
        buttonDiv.innerHTML = "";
      })
    }

    async function guessWord(test : number) {
      selectedWord = props["testWords"][4 + test];
      await APIWrapper.sendWordsMicrocontroller({'words': [selectedWord]});
      identificationActive.value = true;

      if (test === 0) {
        writtenWord0.value = "";
      } else {
        writtenWord1.value = "";
      }

      const inp = document.getElementById("sub" + test);
      if (inp == null) {
        return;
      }

      inp.innerHTML = "";
      const div = document.createElement('div');
      div.style.display = "inline-block";
      div.style.marginRight = "10px";

      inp.appendChild(div);
      createApp(Button, {
        label: "Submit",
        id: "input_" + test,
        type: "text",
        class: "p-shadow-2",
        style: "width: 80%; margin: 10px",
      }).mount(div);

      const submit = document.getElementById("input_" + test);
      if (submit == null) {
        return;
      }

      submit.addEventListener("click", () => {
        let sol;
        if (test === 0) {
          sol = writtenWord0.value;
        } else {
          sol = writtenWord1.value;
        }
        const res = document.getElementById("resultWord" + test);
        if (res === null) {
          return
        }
        res.innerHTML = "<p> " + " Your input: " + sol + "</p><p> "+ " Correct word: " + selectedWord + "</p>";
        div.innerHTML = "";
      });


      // const div = document.createElement('div');
      // div.style.display = "inline-block";
      // div.style.marginRight = "10px";

      // // Add div for button to the button div
      // inp.appendChild(div);
      // createApp(InputText, {
      //   id: "fid_" + selectedWord,
      //   type: "text",
      //   class: "p-shadow-2",
      //   style: "width: 40%; margin: 10px",
      //   vmodel: writtenWord
      // }).mount(div);
      
      // const field = document.getElementById("fid_" + selectedWord);
      // if (field == null) {
      //   return;
      // }

      // const idd = "fid_" + selectedWord;
      // <InputText id=idd type="text" v-model="writtenWord" style="width: 40%; margin: 10px"/>
    }

    return {
      identificationActive,
      writtenWord0,
      writtenWord1,

      sendRandomWord,
      repeatPreviousWord,
      findSplitupWord,
      guessWord,
    }
  }

})
  </script>