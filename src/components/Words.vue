<template>
  <div style="margin-left:auto;margin-right:auto; width: 70%">
    <h1 style="margin-bottom: 4px">Words</h1>

    <!-- Panel for sending a specific word -->
    <Panel header="Configure list of words, and send specific words" class="p-shadow-4" style="margin-bottom: 50px">
      <p>In this panel you can configure the list by adding (or removing) word to (from) the preprogrammed list of
        words.
        Additionally, you can send any word you want to the sleeve.</p>
      <AutoComplete v-model="selectedWord" :dropdown="true" :suggestions="filteredWords.value"
                    @complete="searchWord($event)"
                    field="name" style="margin-right: 10px"/>
      <Button @click="addWord()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px">Add word to list
      </Button>
      <Button @click="removeWord()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px">Remove word from
        list
      </Button>
      <Button @click="sendACWord()" class="p-shadow-2" style="padding: 0.9rem">Send word</Button>
    </Panel>
    <Panel header="Selection based training" class="p-shadow-4" style="margin-bottom: 50px">
      <p>Select the words that you would like to train on. Only words from the list
        (which can be configured above) can be used for training.</p>
      <div style="margin-bottom: 10px">
        <Button @click="selectAllWords()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px">Select all
          words
        </Button>
        <Button @click="deselectAllWords()" class="p-shadow-2" style="padding: 0.9rem">Deselect all words</Button>
      </div>
      <AutoComplete :multiple="true" v-model="selectedWords" :suggestions="filteredWords.value" :dropdown="true"
                    @complete="searchWord($event)" field="name"
                    style="width: 100%; margin-bottom: 10px"/>

      <Panel header="Forced identification" class="p-shadow-2" style="margin-top: 20px">
        <p>By clicking the button, a word will be send to the sleeve. You will then get to see three buttons
          representing words, and you will have to choose which one you felt.</p>
        <Button @click="sendForcedIdentification()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px">Forced identification
        </Button>
        <Button @click="repeatPreviousWord()" class="p-shadow-2" style="padding: 0.9rem" :disabled='!wordIdentificationActive'>Repeat
        </Button>
        <div id="forcedIdentificationButtons"></div>
        <Fieldset legend="Answers (history)" :toggleable="true" :collapsed="true" style="margin-top: 20px">
          <table id="fi-answer-table">
            <tr>
              <th>Round</th>
              <th>Correct answer</th>
              <th>Guessed answers</th>
            </tr>
          </table>
        </Fieldset>
      </Panel>
    </Panel>

    <Panel header="Send sentences" class="p-shadow-4">
      <p>Type a sentence you want to send to the sleeve and select a language that it is written in.</p>
      <InputText type="text" class="p-shadow-2" v-model="inputSentence" style="width: 100%; margin-bottom: 10px"/>
      <AutoComplete v-model="selectedLanguage" :dropdown="true"
                    :suggestions="filteredLanguages.value"
                    placeholder="Select language" @complete="searchLanguage($event)"
                    field="language" style="margin-right: 10px"/>
      <Button @click="sendSentence()" class="p-shadow-2" style="padding: 0.9rem; margin-right: 10px">Send sentence!
      </Button>

    </Panel>
  </div>
</template>

<script lang="ts">
import {createApp, defineComponent, ref} from "vue";
import {getRandom} from "@/helpers/array.helper";
import Button from "primevue/button";
import APIWrapper from "@/backend.api";

export default defineComponent({
  name: 'Words',

  setup: async () => {
    const selectedWord = ref();
    const selectedWords = ref([]);
    const selectedLanguage = ref();
    const inputSentence = ref();
    const fiRows = ref(0);
    const words = ref([
      {name: "human"},
      {name: "purple"},
      {name: "laptop"},
      {name: "jacket"},
      {name: "cyborg"},
      {name: "sleeve"},
      {name: "prototype"},
      {name: "keyword"},
      {name: "phone"},
      {name: "charger"},
      {name: "battery"},
      {name: "students"},
      {name: "HART"},
      {name: "research"},
      {name: "innovation"},
      {name: "augmentation"},
      {name: "hearing"},
      {name: "sense"},
      {name: "feeling"},
      {name: "showcase"},
      {name: "student team"},
    ]);
    const languages = ref([
      {language: "English", short: "en"},
      {language: "French", short: 'fr'},
      {language: "German", short: 'de'},
      {language: "French", short: 'fr'},
      {language: "Russian", short: 'ru'}
    ]);

    let filteredWords = ref(words.value)
    let filteredLanguages = ref(languages.value)
    const wordIdentificationActive = ref(false);

    const playedWord = ref();

    /**
     * Function that filters the words list for all autocomplete input fields.
     * @param event   The event emitted from the input field upon updating.
     */
    function searchWord(event: any) {
      filteredWords.value = ref(words.value.map((w) => {
        return w.name.includes(event.query) ? w : null
      }).filter(w => !!w)) as any;
    }

    /**
     * Function that filters the languages list for all autocomplete input fields.
     * @param event   The event emitted from the input field upon updating.
     */
    function searchLanguage(event: any) {
      filteredLanguages.value = ref(languages.value.map((w) => {
        return w.language.includes(event.query) ? w : null
      }).filter(w => !!w)) as any;
    }

    /**
     * Function for sending a word to the arduino.
     */
    function sendACWord() {
      if (selectedWord.value === undefined) {
        alert("Please insert a word to send");
        return
      }

      if (typeof selectedWord.value !== "string") {
        APIWrapper.sendWordsMicrocontroller({'words': [selectedWord.value.name]})
      } else {
        APIWrapper.sendWordsMicrocontroller({'words': [selectedWord.value]})
      }
    }

    /**
     * Function for executing forced identification behavior.
     */
    function sendForcedIdentification() {
      // Check if words are selected. If no words are selected, alert user and return.
      if (selectedWords.value.length === 0) {
        alert("Please select words to train on");
        return;
      }

      // Get a set of random words from the selected words.
      const randomWords = (selectedWords.value as any).map((w: { name: string }) => {
        return w.name
      });
      playedWord.value = getRandom(randomWords, 1)[0];
      wordIdentificationActive.value = true;

      // Play chosen word on the microcontroller
      APIWrapper.sendWordsMicrocontroller({'words': [playedWord.value]});

      // Increase the number of forced identification rounds
      fiRows.value++;

      // Get div from page for placing buttons
      const buttonDiv = document.getElementById("forcedIdentificationButtons")
      if (buttonDiv === null) {
        return;
      }

      // empty button div
      buttonDiv.innerHTML = '';

      // Add explanation div
      const textDiv = document.createElement('div');
      textDiv.innerHTML = '<p>Which word was just played?</p>';
      buttonDiv.appendChild(textDiv);

      // Get the answer table
      const pTable = document.getElementById("fi-answer-table");
      if (pTable === null) {
        return;
      }

      // Create new row element for table
      const row = document.createElement("tr");
      row.innerHTML = "<td>" + fiRows.value + "</td><td>" + playedWord.value
          + "</td><td id='fi-answer-table-row_" + fiRows.value + "'></td>";
      // row.innerHTML = "<td>" + fiRows.value + "</td><td>" + playedWord
      //     + "</td><td id='fi-answer-table-row_" + fiRows.value + "'></td>";
      pTable.appendChild(row);

      // For each of the words selected, create buttons and assign listeners to it.
      randomWords.forEach((word: string) => {
        // Create div for button
        const div = document.createElement('div');
        div.style.display = "inline-block";
        div.style.marginRight = "10px";

        // Add div for button to the page
        buttonDiv.appendChild(div);
        createApp(Button, {
          label: word,
          id: "fid_" + word,
          class: "p-shadow-2",
          style: "margin-bottom: 4px"
        }).mount(div);

        // Get the button from the page and the table cell for guesses.
        const btn = document.getElementById("fid_" + word);
        const guessesCell = document.getElementById("fi-answer-table-row_" + fiRows.value);
        if (btn === null || guessesCell === null) {
          return;
        }

        // Add button event listener
        btn.addEventListener("click", () => {
          const bgColor = btn.style.background;
          if (word === playedWord.value) {
            btn.style.background = "green";
            guessesCell.innerHTML += "<span style='margin-right: 4px; margin-bottom: 4px; padding: 5px; color: #8800FF; font-weight: bolder'>" + word + "</span>";
          } else {
            btn.style.background = "red";
            guessesCell.innerHTML += "<span style='margin-right: 4px; margin-bottom: 4px; padding: 5px'>" + word + "</span>";
          }
          setTimeout(() => {
            btn.style.background = bgColor
          }, 1000);
        })
      })
    }

    /**
     * Function for sending written sentence to the arduino.
     */
    function sendSentence() {
      if (selectedLanguage.value === undefined) {
        alert("Please select a language in which the sentence is written.");
      }

      if (inputSentence.value === undefined) {
        alert("Please write a sentence that you would like to send.");
      }

      APIWrapper.sendSentencesMicrocontroller({
        'sentences': [inputSentence.value],
        'language': selectedLanguage.value.short
      });
    }

    /**
     * Function for adding a word to the list of words.
     */
    function addWord() {
      if (selectedWord.value === undefined) {
        // If nothing typed, alert user.
        alert("Please type a word first before inserting!");
      } else {
        // Add word to list
        alert("'" + selectedWord.value + "' was added to the list");
        words.value.push({name: selectedWord.value});
        selectedWord.value = "";
      }
    }

    /**
     * Function for removing a word from the list of words.
     */
    function removeWord() {
      if (selectedWord.value === undefined) {
        // If nothing typed, alert user
        alert("Please type a word first before removing!");
      } else {
        // Find word in list
        const index = words.value.findIndex(o => {
          return (o.name === selectedWord.value.name) || o.name === selectedWord.value
        });

        if (index === -1) {
          // If not found, alert user
          alert("Word not found in list, thus cannot be removed.");
        } else {
          // Remove word from list.
          alert("'" + words.value[index].name + "' was removed from the list");
          words.value.splice(index, 1);
          selectedWord.value = "";
        }
      }
    }

    /**
     * Function for selecting all words
     */
    function selectAllWords() {
      selectedWords.value = [];
      words.value.forEach((word: any) => {
        (selectedWords.value as any).push(word);
      })
    }

    /**
     * Function for deselecting all words
     */
    function deselectAllWords() {
      selectedWords.value = [];
    }

    function repeatPreviousWord() {
      APIWrapper.sendWordsMicrocontroller({'words': [playedWord.value]});
    }

    return {
      selectedWord,
      selectedWords,
      filteredWords,
      words,
      languages,
      filteredLanguages,
      selectedLanguage,
      inputSentence,
      wordIdentificationActive,

      searchWord,
      searchLanguage,
      sendACWord,
      sendForcedIdentification,
      sendSentence,
      addWord,
      removeWord,
      selectAllWords,
      deselectAllWords,
      repeatPreviousWord
    }
  },
  created() {
    document.title = "HART Prototype - Words"
  }
})
</script>

<style scoped>

</style>
