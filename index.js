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

var canvasWidth = 0;
var canvas2 = document.querySelector('canvas');
fitToContainer(canvas2);

function fitToContainer(canvas2){
  // Make it visually fill the positioned parent
  canvas2.style.width ='100%';
  canvas2.style.height='100%';
  // ...then set the internal size to match
  canvas2.width  = canvas2.offsetWidth;
  canvas2.height = canvas2.offsetHeight;
  canvasWidth = canvas2.offsetWidth;
}


function histogram(inputString) {
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

  function compareNumbers(a, b) { //to ensure good sort
    return a - b;
  }

  let arrayOfKeys = Object.keys(object).sort(compareNumbers); //sorts keys just in case
  let xAxis = arrayOfKeys.length;
  let contextWidth = (canvasWidth - (xAxis * 5))/xAxis;
  console.log('arrayOfKeys', arrayOfKeys)
  console.log('maxFrequency', maxFrequency);
  var gradient = context.createLinearGradient(100, 300, 100, 0);
  gradient.addColorStop(0, "green");
  gradient.addColorStop(1, "lightgreen");
  let placement = 5;
  for (var j = 0; j < arrayOfKeys.length; j++) {

    context.fillStyle = gradient;
    context.fillRect(placement, 300, contextWidth, -(object[arrayOfKeys[j]]));
    placement += (contextWidth + 5);
  }
}
histogram(numbers);

function assignGraph() {
  var graph = document.getElementById('histogram');
  var labels = document.getElementById('x-axis');


}



// context.fillStyle = 'green';
// context.fillRect(20, 30, 40, 50);
// context.fillRect(62, 30, 40, 100);
// context.fillStyle = 'blue';
// context.fillRect(62, 30, 40, 100);
