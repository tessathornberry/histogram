function getData(form) {
  var formData = new FormData(form);
  // console.log(Object.fromEntries(formData).name); //input from form
  let StringOfNumbers = Object.fromEntries(formData).name;
  let arrayOfStrings = StringOfNumbers.split(',');
  // console.log('arrayofstrings', arrayOfStrings);
  var arrayOfNumbers = []
  for (var i = 0; i < arrayOfStrings.length; i++) {
    arrayOfNumbers.push(Number.parseInt(arrayOfStrings[i]));
    console.log(Number.parseInt(arrayOfStrings[i]));
  }

  function compareNumbers(a, b) {
    return a - b;
  }

  return arrayOfNumbers.sort(compareNumbers);
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

function looseGraph(array) {
  var array = array || [50, 100, 200, 5, 20, 5, 6, 8];
  console.log('array', array);
  let canvas = document.getElementById('canvas');;
  let context = canvas.getContext('2d');
  context.reset();
  let placement = 0;
  let maxValue = Math.max(...array);
  console.log('max', maxValue);
  for (var item in array) {
    console.log(array[item]);
    context.fillStyle = 'green';
    context.fillRect(placement + 30, (maxValue + 5), 25, -(array[item]));
    placement += 30;
  }
}
looseGraph(numbers);

// context.fillStyle = 'green';
// context.fillRect(20, 30, 40, 50);
// context.fillRect(62, 30, 40, 100);
// context.fillStyle = 'blue';
// context.fillRect(62, 30, 40, 100);
