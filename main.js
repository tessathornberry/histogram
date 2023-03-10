function getData(form) {
  var formData = new FormData(form);
  let stringOfNumbers = Object.fromEntries(formData).name; //input from form
  return stringOfNumbers;
}

var numbers = null;

document.getElementById("form-input").addEventListener("submit", function (e) {
  e.preventDefault();
  numbers = getData(e.target);
  renderHistogram(numbers);
});

document.getElementById("form-input").addEventListener("reset", function () {
  numbers = null;
  renderHistogram(numbers);
});

//re-renders based on window size
addEventListener("resize", (event) => {
  renderHistogram(numbers);
});


function renderHistogram(inputString) {
  inputString = inputString || '5, 14, 14, 14, 14, 50, 50, 50, 100, 100, 100, 100, 100, 100, 100, 100, 200, 200'; //default values
  let inputArray = inputString.split(',');
  let maxFrequency = 0;
  let object = {};
  let allNumbers = true;
  let frequencyValues = document.getElementById("frequencyValues");
  frequencyValues.innerHTML = '';

  for (let i = 0; i < inputArray.length; i++) {
    inputArray[i] = parseFloat(inputArray[i]);
    if (inputArray[i] >=0 || inputArray[i] <0) { //gets rid of non-number items
      if (!object[inputArray[i]]) {
        object[inputArray[i]] = 1;
      } else {
        object[inputArray[i]]++;
      }
    } else {
      allNumbers = false; //sets alert if any non-numbers are entered (could also do regex in html if permitted)
    }
    if (object[inputArray[i]] > maxFrequency) { //sets height based on max frequency
      maxFrequency = object[inputArray[i]];
    }
  }

  let histogramDivs = document.getElementById("histogram-divs");
  histogramDivs.innerHTML = ''; //eliminates default blocks when values are submitted

  if (!allNumbers) {
    alert('Please use only numbers, spaces, and decimals, with commas to separate your input. Please check for spaces after decimals.');
  }

  function compareNumbers(a, b) { //to ensure good sort
    return a - b;
  }

  let arrayOfKeys = Object.keys(object).sort(compareNumbers); //sorts keys just in case they are not in order

  let xAxis = arrayOfKeys.length;
  let histogramDivsWidth = histogramDivs.scrollWidth/xAxis; //this is the width of the bars
  var multiplier = 20;
  let histogramHeight = maxFrequency * multiplier;
 //resizes vertical axis to fit infinite frequency
  while (histogramHeight >= 440) {
    multiplier = multiplier/2;
    histogramHeight = maxFrequency * multiplier;
  }
  let valueLabel = document.getElementsByClassName("valueLabel");

  //renders the histogram columns
  for (var j = 0; j < arrayOfKeys.length; j++) {
    histogramDivs.innerHTML += '<div class="block" style="width:'+ (histogramDivsWidth - 2) + 'px;height:' + (object[arrayOfKeys[j]] * multiplier) + 'px"><span class="divtext">Frequency: ' + object[arrayOfKeys[j]] + '<br>Value: ' + arrayOfKeys[j] + '</span><div class="valueLabel" style="width:'+ histogramDivsWidth + 'px">' + arrayOfKeys[j] + '</div></div>';
  }
 //[uts the max frequency]
  frequencyValues.innerHTML = '<div class="y-values" style="height: ' + histogramHeight + 'px">' + maxFrequency + '</div>';

}
renderHistogram(numbers);