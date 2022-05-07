import {populateLettersChartData, populateBestGuessesChart} from '../charts/chartCreators.js';

let wordsLeftTiles = document.querySelectorAll("#wordsLeft .tiles");
let wordsLeftApiResp;

export async function callApi(msg, endpoint) {
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

export function callApis(msg) {
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