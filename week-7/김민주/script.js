const canvas = document.querySelector(".canvas");

if (canvas.getContext){
  const ctx = canvas.getContext('2d');
  // drawing code here

    canvas.width = document.querySelector('.canvas-div').clientWidth;
    canvas.height = document.querySelector('.canvas-div').clientHeight;
    let painting = false;
    let filling = false;
    ctx.strokeStyle = "#2c2c2c";
    ctx.lineWidth = 5.0;
    ctx.lineCap = 'round';
    ctx.lineJoin = "round";
    function setColor(color) {
          // drawing code here
        ctx.strokeStyle = color
    }
    function setSize(size) {
        // drawing code here
        switch (size) {
            case 'small':
                ctx.lineWidth = 3;
                break;
            case 'large':
                ctx.lineWidth = 10;
                break;
            default:
                ctx.lineWidth = 5;
            break;
        }
      ctx.strokeStyle = color
    }
    function startPainting() {
    painting = true;
    }

    function stopPainting() {
    painting = false;
    }

    function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    }

    if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    }
} else {
    // canvas-unsupported code here
  }