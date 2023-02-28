function getData(form) {
  var formData = new FormData(form);
  let stringOfNumbers = Object.fromEntries(formData).name; //input from form
  return stringOfNumbers;
}

var numbers = null;

document.getElementById("form-input").addEventListener("submit", function (e) {
  e.preventDefault();
  numbers = getData(e.target);
  looseGraph(numbers);
});

document.getElementById("form-input").addEventListener("reset", function () {
  numbers = null;
  looseGraph(numbers);
});

function looseGraph(inputString) {
  inputString = inputString || '5, 14, 14, 14, 14, 50, 50, 50, 100, 100, 100, 100, 100, 100, 100, 100, 200, 200'; //default values
  let inputArray = inputString.split(',');
  let maxFrequency = 0;
  let object = {};
  for (let i = 0; i < inputArray.length; i++) {
    inputArray[i] = parseFloat(inputArray[i]);
    if (inputArray[i] >=0 || inputArray[i] <0) { //gets rid of non-number items
      if (!object[inputArray[i]]) {
        object[inputArray[i]] = 1;
      } else {
        object[inputArray[i]]++;
      }
      } else {
          alert('Please use only numbers, spaces, decimals, or commas in your entry. Please check for spaces after decimals.')
      }
      if (object[inputArray[i]] > maxFrequency) {
        maxFrequency = object[inputArray[i]];
      }
  }

  console.log('object', object);
  let canvas = document.getElementById('canvas');;
  let context = canvas.getContext('2d');
  context.reset();

  function compareNumbers(a, b) {
    return a - b;
  }

  let arrayOfKeys = Object.keys(object).sort(compareNumbers); //sorts keys just in case
  console.log('arrayOfKeys', arrayOfKeys)
  console.log('maxFrequency', maxFrequency);

  let placement = 0;
  for (var j = 0; j < arrayOfKeys.length; j++) {
    context.fillStyle = 'green';
    context.fillRect(placement + 30, (maxFrequency * 20), 25, -(object[arrayOfKeys[j]] * 15));
    placement += 30;
  }
}
looseGraph(numbers);

/*  // let arrayOfStrings = StringOfNumbers.split(',');
  // var arrayOfNumbers = []
  // for (var i = 0; i < arrayOfStrings.length; i++) {
  //   arrayOfNumbers.push(Number.parseInt(arrayOfStrings[i]));
  //   console.log(Number.parseInt(arrayOfStrings[i]));
  // }

  // function compareNumbers(a, b) {
  //   return a - b;
  // }

  // return arrayOfNumbers.sort(compareNumbers); */
// function looseGraph(array) {
//   var array = array || [50, 100, 200, 5, 20, 5, 6, 8];
//   console.log('array', array);
//   let canvas = document.getElementById('canvas');;
//   let context = canvas.getContext('2d');
//   context.reset();
//   let placement = 0;
//   let maxValue = Math.max(...array);
//   console.log('max', maxValue);
//   for (var item in array) {
//     console.log(array[item]);
//     context.fillStyle = 'green';
//     context.fillRect(placement + 30, (maxValue + 5), 25, -(array[item]));
//     placement += 30;
//   }
// }
// looseGraph(numbers);



// context.fillStyle = 'green';
// context.fillRect(20, 30, 40, 50);
// context.fillRect(62, 30, 40, 100);
// context.fillStyle = 'blue';
// context.fillRect(62, 30, 40, 100);
