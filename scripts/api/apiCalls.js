import {populateLettersChartData, populateBestGuessesChart} from '../charts/chartCreators.js';
import {fillInWordsLeftTiles, loadingWordsLeftTiles} from '../landingTiles/wordsLeft.js';

export let wordsLeftApiResp;

export async function callApi(storage, endpoint) {
  const payload = { guesses: storage.boardState,
  target: storage.solution }
  const response = await fetch(`https://1vv6d7.deta.dev/${endpoint}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  })
  const resp = await response.json();
  console.log(resp);
  return resp;
}

export function callApis(storage) {
  loadingWordsLeftTiles();
  callApi(storage, "targetsleft")
    .then(resp => {
      fillInWordsLeftTiles(resp);
      wordsLeftApiResp = resp;
    })

  callApi(storage, "bestletters")
    .then(resp => {
      populateLettersChartData(resp)
    })

  callApi(storage, "algo")
    .then(resp => {
      populateBestGuessesChart(resp)
    })
    .catch(err => {
      console.log(err);
    })
}