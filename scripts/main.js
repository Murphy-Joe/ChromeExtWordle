import {HardCodedBestGuesses, hardcodedWords, HardCodedLetters} from './hardCodedResps.js';
import {populateLettersChartData, populateBestGuessesChart} from './charts/chartCreators.js';
import {createWordsLeftPage} from './dataPages/wordsLeftBoxes.js';

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


async function callApi(msg, endpoint) {
  const guessPayload = { guesses: msg.guesses }
  const response = await fetch(`https://1vv6d7.deta.dev/${endpoint}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(guessPayload)
  })
  const resp = await response.json();
  console.log(resp);
  return resp;
}

function callApis(msg) {
  wordsLeftTiles.forEach(tile => {
    tile.innerText = ""
    let iconSpan = document.createElement("span");
    iconSpan.className = "gg-loadbar";
    tile.appendChild(iconSpan);
  })
  callApi(msg, "targetsleft")
    .then(resp => {
      wordsLeftTiles.forEach(tile => { tile.innerText = "" })
      let wordsLeftTilesIdx = 4;
      let digitsInAmtWordsLeft = resp.count.toString().length;
      for (let i = digitsInAmtWordsLeft; i > 0; i--) {
        wordsLeftTiles[wordsLeftTilesIdx].innerText = resp.count.toString()[i - 1]
        wordsLeftTilesIdx--;
      }
      wordsLeftApiResp = resp;
      // createWordsLeftPage(resp);
    })

  callApi(msg, "bestletters")
    .then(resp => {
      populateLettersChartData(resp)
    })

  callApi(msg, "onecall")
    .then(resp => {
      populateBestGuessesChart(resp)
    })
    .catch(err => {
      console.log(err);
    })
}



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

wordsLeft.addEventListener("click", () => {
  document.querySelectorAll('.word-box').forEach((elem) => elem.remove());
  wordsLeftPage.classList.remove("hidden")
  landingPage.classList.add("hidden")
  createWordsLeftPage(wordsLeftApiResp);
})

bestLetters.addEventListener("click", () => {
  bestLettersPage.classList.remove("hidden")
  landingPage.classList.add("hidden")
})

bestGuess.addEventListener("click", () => {
  // populateBestGuessesChart(HardCodedBestGuesses)
  bestGuessPage.classList.remove("hidden")
  landingPage.classList.add("hidden")
})

backButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    landingPage.classList.remove("hidden")
    btn.parentElement.parentElement.classList.add("hidden")
  })
})


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
