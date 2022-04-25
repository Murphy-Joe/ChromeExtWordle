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

function callApis(){

}

function recieveMsg(request, sender, endpointToCall) {
  // console.log(`received from: ${sender.tab.url}: ${JSON.stringify(request.guesses)}`)
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

chrome.runtime.onMessage.addListener((request, sender) => {
  wordsLeft.innerText = "Loading..."
  recieveMsg(request, sender, "targetsleft")
    .then(resp => { 
      loadingWordsLeft = false;
      wordsLeft.innerText = `${resp.count} Words Left` 
    })  
  bestLetters.innerText = "Loading..."
  recieveMsg(request, sender, "bestletters")
    .then(resp => { 
      let letters = Object.keys(resp)
      bestLetters.innerText = `Best ${letters.length} Letters` 
    })
  bestGuess.innerText = "Loading..."
  recieveMsg(request, sender, "onecall")
    .then(resp => { 
      bestGuess.innerText = `${bestGuess.innerText}: ${resp[0][0]}` 
    })
});

// The body of this function will be execuetd as a content script inside the
// current page
function getGuesses() {
  let storage = JSON.parse(localStorage.getItem("nyt-wordle-state"))
  const guesses = storage.boardState

  chrome.runtime.sendMessage({ guesses: guesses }, () => {
    console.log(`sent guesses: ${JSON.stringify(guesses)}`)
    console.log(`got response: ${response.farewell}`);
  });

  return guesses;
}
