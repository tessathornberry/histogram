function getData(form) {
  var formData = new FormData(form);
  let stringOfNumbers = Object.fromEntries(formData).name; //input from form
  return stringOfNumbers;
}

var numbers = null;

document.getElementById("form-input").addEventListener("submit", function (e) {
  e.preventDefault();
  numbers = getData(e.target);
  histogram(numbers);
});

document.getElementById("form-input").addEventListener("reset", function () {
  numbers = null;
  histogram(numbers);
});



function histogram(inputString) {
  inputString = inputString || '5, 14, 14, 14, 14, 50, 50, 50, 100, 100, 100, 100, 100, 100, 100, 100, 200, 200'; //default values
  console.log('inputValues', inputString);
  let inputArray = inputString.split(',');
  let maxFrequency = 0;
  let object = {};
  let allNumbers = true;
  for (let i = 0; i < inputArray.length; i++) {
    inputArray[i] = parseFloat(inputArray[i]);
    if (inputArray[i] >=0 || inputArray[i] <0) { //gets rid of non-number items
      if (!object[inputArray[i]]) {
        object[inputArray[i]] = 1;
      } else {
        object[inputArray[i]]++;
      }
    } else {
      allNumbers = false;
    }
    if (object[inputArray[i]] > maxFrequency) {
      maxFrequency = object[inputArray[i]];
    }
  }
  let takeTwo = document.getElementById("taketwo");
  takeTwo.innerHTML = ''; //eliminates default blocks when values are submitted


  if (!allNumbers) {
    alert('Please use only numbers, spaces, decimals, or commas in your entry. Please check for spaces after decimals.')
  }

  function compareNumbers(a, b) { //to ensure good sort
    return a - b;
  }

  let arrayOfKeys = Object.keys(object).sort(compareNumbers); //sorts keys just in case
  let xAxis = arrayOfKeys.length;
  let takeTwoWidth = takeTwo.scrollWidth/xAxis; //this is the width of the bars

  for (var j = 0; j < arrayOfKeys.length; j++) {
    takeTwo.innerHTML += '<div class="block" style="width:'+ takeTwoWidth + 'px;height:' + (object[arrayOfKeys[j]] * 20) + 'px;background-color: blue;"><span class="divtext">Value: ' + arrayOfKeys[j] + '<br>Frequency:' + object[arrayOfKeys[j]] + '</span></div>'
  }
}
histogram(numbers);


// context.fillStyle = 'green';
// context.fillRect(20, 30, 40, 50);
// context.fillRect(62, 30, 40, 100);
// context.fillStyle = 'blue';
// context.fillRect(62, 30, 40, 100);

// document.getElementById("taketwo").innerHTML = '<h1 class="block">freebies</h1>';
