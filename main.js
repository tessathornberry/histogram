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

document.getElementById("form-input").addEventListener("re", function () {
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
  console.log(takeTwo.scrollWidth);
  // takeTwo.innerHTML = '<h1>feelings</p><div class="block" style="width:50px;height:50px"></div>';


  if (!allNumbers) {
    alert('Please use only numbers, spaces, decimals, or commas in your entry. Please check for spaces after decimals.')
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

  let takeTwoWidth = takeTwo.scrollWidth/xAxis; //this is the width of the bars
  console.log('takeTwoWidth', takeTwoWidth);



  let contextWidth = (canvasWidth - (xAxis * 5))/xAxis;
  console.log('arrayOfKeys', arrayOfKeys)
  console.log('maxFrequency', maxFrequency);
  var gradient = context.createLinearGradient(100, 300, 100, 0);
  gradient.addColorStop(0, "green");
  gradient.addColorStop(1, "lightgreen");
  let placement = 0;

  // takeTwo.innerHtml += '<h1>feelings</h1><div class="block" style="width:'+ contextWidth + ';height:' + object[arrayOfKeys[j]] + '"></div>';
  for (var j = 0; j < arrayOfKeys.length; j++) {
    // console.log(object[arrayOfKeys[j]]);
    takeTwo.innerHTML += '<div class="block" style="width:'+ takeTwoWidth + 'px;height:' + (object[arrayOfKeys[j]] * 20) + 'px;background-color: blue;"><span class="divtext"><p>Value: ' + arrayOfKeys[j] + '</p>Frequency:' + object[arrayOfKeys[j]] + '</span></div>'
    context.fillStyle = gradient;
    context.fillRect(placement, 305, contextWidth, -(object[arrayOfKeys[j]]));
    placement += (contextWidth + 5);
  }
}
histogram(numbers);


// context.fillStyle = 'green';
// context.fillRect(20, 30, 40, 50);
// context.fillRect(62, 30, 40, 100);
// context.fillStyle = 'blue';
// context.fillRect(62, 30, 40, 100);

// document.getElementById("taketwo").innerHTML = '<h1 class="block">freebies</h1>';
