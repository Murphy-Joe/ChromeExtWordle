import {populateLettersChartData, populateBestGuessesChart} from '../charts/chartCreators.js';
import {fillInWordsLeftTiles, loadingWordsLeftTiles} from '../landingTiles/wordsLeft.js';

export let wordsLeftApiResp;

export async function callApi(boardState, endpoint) {
  const guessPayload = { guesses: boardState.guesses }
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

export function callApis(boardState) {
  loadingWordsLeftTiles();
  callApi(boardState, "targetsleft")
    .then(resp => {
      fillInWordsLeftTiles(resp);
      wordsLeftApiResp = resp;
    })

  callApi(boardState, "bestletters")
    .then(resp => {
      populateLettersChartData(resp)
    })

  callApi(boardState, "algo")
    .then(resp => {
      populateBestGuessesChart(resp)
    })
    .catch(err => {
      console.log(err);
    })
}