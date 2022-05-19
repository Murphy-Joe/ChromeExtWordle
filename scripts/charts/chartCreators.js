import {sendMsgToContentScriptFillInGuess} from '../msg/send.js';
import {guessesApiResp} from '../api/apiCalls.js'

const guessCanvas = document.getElementById('guessChart');
let guessChart;

const normalModeOpt = document.getElementById("normal-mode");
const hardModeOpt = document.getElementById("hard-mode");
const targetsOnlyOpt = document.getElementById("targets-only");
const normalModeLink = document.getElementById("normal-mode-link");
normalModeLink.focus();

normalModeOpt.addEventListener("click", () => {
    updateGuessChart(guessesApiResp.regular_mode);
})

hardModeOpt.addEventListener("click", () => {
    updateGuessChart(guessesApiResp.hard_mode);
})

targetsOnlyOpt.addEventListener("click", () => {
    updateGuessChart(guessesApiResp.target_scores);
})

export function populateLettersChartData(apiResp) {
  // myChart.destroy();
  let chartData = Object.fromEntries(Object.entries(apiResp).slice(0, 12))
  createLetterChart(chartData);
}

export function populateBestGuessesChart(apiResp) {
  // myChart.destroy();
  let chartData = {}
  apiResp.regular_mode.forEach(guessTuple => {
    chartData[guessTuple[0]] = guessTuple[1];
  })
  createGuessChart(chartData);
}

function createGuessChart(dataObj) {
  
  const newData = {
    datasets: [{
      data: dataObj,
      backgroundColor: '#c9b458',
      borderColor: 'rgba(0, 0, 0, 0.1)',
    }]
  }
  let config = {
    type: 'bar',
    data: newData,
    options: {
      onClick: (e) => {
        const activePoints = guessChart.getElementsAtEventForMode(e, 'nearest', {
          intersect: true
        }, false)
        if (activePoints.length > 0) {
          const index = activePoints[0].index;
          const dataEntries = Object.entries(guessChart.data.datasets[0].data);
          const guess = dataEntries[index][0];
          sendMsgToContentScriptFillInGuess(guess);
        }     
      },
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Avg Words Left After Guess',
          padding: {
            top: 0,
            bottom: 30
          },
          color: "#999999c2"
        }
      }
    }
  };
  guessChart= new Chart(guessCanvas,config);
}

function updateGuessChart(guessData) {
  let chartData = {}
  guessData.forEach(guessTuple => {
    chartData[guessTuple[0]] = guessTuple[1];
  })
  guessChart.data.datasets[0].data = chartData;
  guessChart.update();
}

function createLetterChart(dataObj) {
  const newData = {
    datasets: [{
      data: dataObj,
      backgroundColor: '#3a3a3c',
      borderColor: 'rgba(0, 0, 0, 0.1)',
    }]
  }
  let config = {
    type: 'bar',
    data: newData,
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Letter Frequency in Remaining Words'
        }
      }
    }
  };
  let myChart = new Chart(document.getElementById('letterChart'), config);
}