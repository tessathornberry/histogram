const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
// console.log(context);


context.fillStyle = 'green';
context.fillRect(20, 30, 40, 50);
context.fillRect(62, 30, 40, 100);
context.fillStyle = 'blue';
context.fillRect(62, 30, 40, 100);


