// Initialize butotn with users's prefered color
chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

async function oneCall(bodyData) {
  console.log(JSON.stringify(bodyData))
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
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.guesses !== "hello"){
      oneCall({guesses: request.guesses})
      sendResponse({farewell: "goodbye"});
    }
      
  }
);

// chrome.storage.onChanged.addListener(function (changes, namespace) {
//   for (let [key, { oldGuessList, newGuessList }] of Object.entries(changes)) {
//     console.log(
//       `Storage key "${key}" in namespace "${namespace}" changed.`,
//       `Old list was "${oldGuessList}", new list is "${newGuessList}".`
//     );
//     oneCall({guesses: newGuessList})
//   }
// });


// The body of this function will be execuetd as a content script inside the
// current page
function getGuesses() {
  let storage = JSON.parse(localStorage.getItem("nyt-wordle-state"))
  const guesses = storage.boardState

  chrome.runtime.sendMessage({guesses: guesses }, function(response) {
    console.log(`sent guesses: ${JSON.stringify(guesses)}`)
    console.log(`got response: ${response.farewell}`);
  });

  // chrome.storage.sync.set({guesses: guesses }, function() {
  //   console.log('Value is set to ' + guesses);
  // });

  return guesses;
}
