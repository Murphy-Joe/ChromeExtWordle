let wordsLeftText = document.getElementById("wordsLeft")

async function oneCall(bodyData) {
  const response = await fetch(`https://1vv6d7.deta.dev/onecall`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData)
  })
  const resp = await response.json();
  console.log(resp);
  return resp;
}

function runContentScript() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: getGuesses,
  
    });
  });
}
let changeColor = document.getElementById("changeColor");
changeColor.addEventListener("click", runContentScript)

runContentScript()


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(`received msg from content script: ${sender.tab.url} with data: ${JSON.stringify(request.guesses)}`)
    if (request.guesses !== "hello"){
      oneCall({guesses: request.guesses}).then(resp => {
        wordsLeftText.innerText = resp.targets_left_len
      })
      sendResponse({farewell: "goodbye"});
    }
      
  }
);

// The body of this function will be execuetd as a content script inside the
// current page
function getGuesses() {
  let storage = JSON.parse(localStorage.getItem("nyt-wordle-state"))
  const guesses = storage.boardState

  chrome.runtime.sendMessage({guesses: guesses }, function(response) {
    console.log(`sent guesses: ${JSON.stringify(guesses)}`)
    console.log(`got response: ${response.farewell}`);
  });

  return guesses;
}
