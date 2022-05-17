import {populateLettersChartData, populateBestGuessesChart} from '../charts/chartCreators.js';
import {wordsLeftTiles, bestGuessTiles, bestLettersTiles, addLoadingBarsToAllTiles, removeLoadingBars, fillInWordsLeftTiles} from '../landingTiles/landingTile.js';

export let wordsLeftApiResp; // hack

export async function callApi(msg, endpoint) {
  const payload = { guesses: msg.storage.boardState,
  target: msg.storage.solution }
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

export function callApis(msg) {
  addLoadingBarsToAllTiles();
  
  callApi(msg, "targetsleft")
    .then(resp => {
      removeLoadingBars(wordsLeftTiles);
      fillInWordsLeftTiles(resp);
      wordsLeftApiResp = resp;
    })

  callApi(msg, "bestletters")
    .then(resp => {
      removeLoadingBars(bestLettersTiles);
      populateLettersChartData(resp)
    })

  callApi(msg, "algo")
    .then(resp => {
      removeLoadingBars(bestGuessTiles);
      populateBestGuessesChart(resp)
    })
    .catch(err => {
      console.log(err);
    })
}