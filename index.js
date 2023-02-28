function getData(form) {
  var formData = new FormData(form);
  console.log(Object.fromEntries(formData).name); //input from form
  let StringOfNumbers = Object.fromEntries(formData).name;
  let arrayOfStrings = StringOfNumbers.split(',');
  console.log(arrayOfStrings);
  for (var i = 0; i < arrayOfStrings.length; i++) {
    console.log(Number.parseInt(arrayOfStrings[i]));
  }
}

document.getElementById("form-input").addEventListener("submit", function (e) {e.preventDefault();
getData(e.target);
});

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.fillStyle = 'green';
context.fillRect(20, 30, 40, 50);
context.fillRect(62, 30, 40, 100);
context.fillStyle = 'blue';
context.fillRect(62, 30, 40, 100);


