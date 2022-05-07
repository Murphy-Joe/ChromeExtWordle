import {populateLettersChartData, populateBestGuessesChart} from '../charts/chartCreators.js';
import {fillInWordsLeftTiles, loadingWordsLeftTiles} from '../tiles/wordsLeft.js';

export let wordsLeftApiResp;

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
  loadingWordsLeftTiles();
  callApi(msg, "targetsleft")
    .then(resp => {
      fillInWordsLeftTiles(resp);
      wordsLeftApiResp = resp;
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