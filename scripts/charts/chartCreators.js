function createLetterChart(dataObj) {
  const newData = {
    datasets: [{
      data: dataObj,
      backgroundColor: '#6aaa64',
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
      backgroundColor: '#6aaa64',
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
        console.log(activePoints); 
        if (activePoints.length > 0) {
          const index = activePoints[0].index;
          console.log(index);
          const dataEntries = Object.entries(dataObj);
          console.log(dataEntries);
          const guess = dataEntries[index][0];
          console.log(guess);
        }     
      },
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Avg Words Left per Guess'
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
  let chartData = Object.fromEntries(
    Object.entries(apiResp)
      .filter(entryTuple => entryTuple[1] != 100)
      .slice(0, 12))
  createLetterChart(chartData);
}

export function populateBestGuessesChart(apiResp) {
  // myChart.destroy();
  let chartData = {}
  apiResp.slice(0, 10).forEach(guessTuple => {
    chartData[guessTuple[0]] = guessTuple[1];
  })
  createGuessChart(chartData);
}