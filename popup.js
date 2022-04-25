let wordsLeftText = document.getElementById("wordsLeft")

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

function recieveMsg(request, sender, sendResponse) {
  console.log(`received msg from content script: ${sender.tab.url} with data: ${JSON.stringify(request.guesses)}`)
  sendResponse({ farewell: "goodbye" })
  if (request.guesses !== "hello") {
    return callApi({ guesses: request.guesses }, "targetsleft")
  }
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


// chrome.runtime.onMessage.addListener(
//   function (request, sender, sendResponse) {
//     console.log(`received msg from content script: ${sender.tab.url} with data: ${JSON.stringify(request.guesses)}`)
//     if (request.guesses !== "hello") {
//       callApi({ guesses: request.guesses }, "targetsleft")
//         .then(resp => {
//           wordsLeftText.innerText = resp.length
//         })
//       sendResponse({ farewell: "goodbye" });
//     }
//   }
// );

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  recieveMsg(request, sender, sendResponse)
    .then(resp => { wordsLeftText.innerText = resp.length })
}
);

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
