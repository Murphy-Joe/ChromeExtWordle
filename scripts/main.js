import {HardCodedBestGuesses, hardcodedWords, HardCodedLetters} from './hardCodedResps.js';
import {createWordsLeftPage} from './dataPages/wordsLeftBoxes.js';
import {addEventListeners} from './eventListeners/listeners.js';

let refresh = document.getElementById("refresh");

let wordsLeft = document.getElementById("wordsLeft")
let wordsLeftTiles = document.querySelectorAll("#wordsLeft .tiles");

let bestLetters = document.getElementById("bestLetters")
let bestLettersTiles = document.querySelectorAll("#bestLetters .tiles");

let bestGuess = document.getElementById("bestGuess")
let bestGuessTiles = document.querySelectorAll("#bestGuess .tiles");

let landingPage = document.getElementById("landingPage")

let bestLettersPage = document.getElementById("lettersPage");

let wordsLeftPage = document.getElementById("wordsLeftPage")
let wordsContainer = document.getElementById("wordsLeft-page-container")
let numTargetsSpan = document.getElementById("numTargets");

let bestGuessPage = document.getElementById("bestGuessPage")

let backButtons = document.querySelectorAll(".back")

let lastGuessList = []

let wordsLeftApiResp;


function runContentScript() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: getGuesses,

    });
  });
}

runContentScript()
refresh.addEventListener("click", runContentScript)
// createWordsLeftPage("hi");

addEventListeners();


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (JSON.stringify(msg.guesses) !== JSON.stringify(lastGuessList)) {
    callApis(msg)
    lastGuessList = msg.guesses
  }
  else {
    console.log('no changes');
  }
  sendResponse({ farewell: "goodbye" }) // here till bug fix in chrome 102
});

// The body of this function will be execuetd as a content script inside the
// current page
function getGuesses() {
  let storage = JSON.parse(localStorage.getItem("nyt-wordle-state"))
  const guesses = storage.boardState

  chrome.runtime.sendMessage({ guesses: guesses }, (response) => {
    console.log(`sent guesses: ${JSON.stringify(guesses)}`)
    // response here till bug fixed in chrome 102
  });

  return guesses;
}
