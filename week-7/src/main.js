const INITIAL_CANVAS_WIDTH = 500;
const INITIAL_CANVAS_HEIGHT = 500;
const INITIAL_STROKE_STYLE = 'black';
const INITIAL_LINE_WIDTH = 1;
const INITIAL_FILL_STYLE = 'white';

const $canvas = document.getElementById('canvas');
const $color = document.querySelector('.color-picker__colors');
const $lineWidth = document.querySelector('.lineWidth-picker__width');
const $eraser = document.querySelector('.eraser');

const ctx = $canvas.getContext('2d');

$canvas.width = INITIAL_CANVAS_WIDTH;
$canvas.height = INITIAL_CANVAS_HEIGHT;

ctx.strokeStyle = INITIAL_STROKE_STYLE;
ctx.lineWidth = INITIAL_LINE_WIDTH;
ctx.fillStyle = INITIAL_FILL_STYLE;

let drawingState = false;

const startDrawing = () => {
  drawingState = true;
};

const stopDrawing = () => {
  drawingState = false;
};

const draw = (e) => {
  const x = e.offsetX;
  const y = e.offsetY;

  if (!drawingState) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

const changeColor = (e) => {
  ctx.strokeStyle = e.target.value;
};

const changeLineWidth = (e) => {
  const changedLineWidth = Number(e.target.value);
  ctx.lineWidth = Number.isInteger(changedLineWidth) ? changedLineWidth : 1;
};

const changeToEraserMode = () => {
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 20;
};

$canvas.addEventListener('mousedown', startDrawing);
$canvas.addEventListener('mousemove', draw);
$canvas.addEventListener('mouseup', stopDrawing);
$canvas.addEventListener('mouseleave', stopDrawing);

$color.addEventListener('change', changeColor);
$lineWidth.addEventListener('change', changeLineWidth);
$eraser.addEventListener('click', changeToEraserMode);
