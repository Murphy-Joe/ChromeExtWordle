import {sendMsgToContentScriptFillInGuess} from '../msg/send.js';

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
  let myChart = new Chart(
    document.getElementById('letterChart'),
    config
  );
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
        const activePoints = myChart.getElementsAtEventForMode(e, 'nearest', {
          intersect: true
        }, false)
        if (activePoints.length > 0) {
          const index = activePoints[0].index;
          const dataEntries = Object.entries(dataObj);
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
          text: 'Avg Words Left After Guess'
        }
      }
    }
  };
  let myChart = new Chart(
    document.getElementById('guessChart'),
    config
  );
}

export function populateLettersChartData(apiResp) {
  // myChart.destroy();
  let chartData = Object.fromEntries(Object.entries(apiResp).slice(0, 12))
  createLetterChart(chartData);
}

export function populateBestGuessesChart(apiResp) {
  // myChart.destroy();
  let chartData = {}
  apiResp.regular_mode.slice(0, 8).forEach(guessTuple => {
    chartData[guessTuple[0]] = guessTuple[1];
  })
  createGuessChart(chartData);
}