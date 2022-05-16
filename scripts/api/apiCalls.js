import {populateLettersChartData, populateBestGuessesChart} from '../charts/chartCreators.js';
import {fillInWordsLeftTiles, loadingWordsLeftTiles, loadingbestGuessTiles, fillInBestGuessTiles} from '../landingTiles/wordsLeft.js';

export let wordsLeftApiResp;

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
  loadingWordsLeftTiles();
  loadingbestGuessTiles();
  
  callApi(msg, "targetsleft")
    .then(resp => {
      fillInWordsLeftTiles(resp);
      wordsLeftApiResp = resp;
    })

  callApi(msg, "bestletters")
    .then(resp => {
      populateLettersChartData(resp)
    })

  callApi(msg, "algo")
    .then(resp => {
      fillInBestGuessTiles();
      populateBestGuessesChart(resp)
    })
    .catch(err => {
      console.log(err);
    })
}