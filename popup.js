let wordsLeft = document.getElementById("wordsLeft")
let bestLetters = document.getElementById("bestLetters")
let bestGuess = document.getElementById("bestGuess")

async function callApi(guessPayload, endpoint) {
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

function recieveMsg(request, sender, sendResponse, endpointToCall) {
  console.log(`received from: ${sender.tab.url}: ${JSON.stringify(request.guesses)}`)
  sendResponse({ farewell: "goodbye" })
  return callApi({ guesses: request.guesses }, endpointToCall)
}

function runContentScript() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: getGuesses,

    });
  });
}
let refresh = document.getElementById("refresh");
refresh.addEventListener("click", runContentScript)

runContentScript()

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  recieveMsg(request, sender, sendResponse, "targetsleft")
    .then(resp => { wordsLeft.innerText = `${resp.count} ${wordsLeft.innerText}` })
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  recieveMsg(request, sender, sendResponse, "bestletters")
    .then(resp => { 
      let letters = Object.keys(resp)
      bestLetters.innerText = `Best ${letters.length} Letters` 
    })
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  recieveMsg(request, sender, sendResponse, "onecall")
    .then(resp => { 
      bestGuess.innerText = `${bestGuess.innerText}: ${resp[0][0]}` 
    })
});

// The body of this function will be execuetd as a content script inside the
// current page
function getGuesses() {
  let storage = JSON.parse(localStorage.getItem("nyt-wordle-state"))
  const guesses = storage.boardState

  chrome.runtime.sendMessage({ guesses: guesses }, function (response) {
    console.log(`sent guesses: ${JSON.stringify(guesses)}`)
    console.log(`got response: ${response.farewell}`);
  });

  return guesses;
}
