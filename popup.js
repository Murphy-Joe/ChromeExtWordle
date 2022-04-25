let wordsLeft = document.getElementById("wordsLeft")
let bestLetters = document.getElementById("bestLetters")
let bestGuess = document.getElementById("bestGuess")
let refresh = document.getElementById("refresh");
let landingPage = document.getElementById("landingPage")
let wordsLeftPage = document.getElementById("wordsLeftPage")
let wordsContainer = document.getElementById("wordsContainer")
let backButtons = document.querySelectorAll(".back")

let lastGuessList = []

function createWordsLeftPage(resp) {
  resp.targets.forEach(word => {
    let wordBtn = document.createElement("button");
    wordBtn.className = "word-btn";
    wordBtn.innerText = word;
    wordsContainer.appendChild(wordBtn);
  });
}

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
  wordsLeft.innerText = "Loading..."
  callApi(msg, "targetsleft")
    .then(resp => {
      loadingWordsLeft = false;
      wordsLeft.innerText = `${resp.count} Words Left`
      createWordsLeftPage(resp);
    })

  bestLetters.innerText = "Loading..."
  callApi(msg, "bestletters")
    .then(resp => {
      let letters = Object.keys(resp)
      bestLetters.innerText = `Best ${letters.length} Letters`
    })

  bestGuess.innerText = "Loading..."
  callApi(msg, "onecall")
    .then(resp => {
      bestGuess.innerText = `Best Guess: ${resp[0][0].toUpperCase()}`
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

wordsLeft.addEventListener("click", () => {
  landingPage.classList.add("hidden")
  wordsLeftPage.classList.remove("hidden")
})

backButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.parentElement.classList.add("hidden")
    landingPage.classList.remove("hidden")
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
