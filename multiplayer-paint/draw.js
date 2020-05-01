$(document).ready(function() {
  const canvas = id("mycanvas");
  console.log(canvas);
  let ctx = canvas.getContext("2d");
  // get context to draw on canvas
  let DIMENSION = 25;
  let WIDTH = canvas.width;
  let HEIGHT = canvas.height;
  let PIXELSIZE = WIDTH / DIMENSION;
  let selectedColor = '#222244';
  let enabled = true;
  // records the drawing on this square
  let filledPixels = {};

  ctx.strokeStyle = 'rgba(0,0,0,0.1)';
  for (let i = 0; i < DIMENSION; ++i) {
    x = Math.floor(i * WIDTH / DIMENSION);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, HEIGHT);
    ctx.stroke();

    y = Math.floor(i * HEIGHT / DIMENSION);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(WIDTH, y);
    ctx.stroke();
  }
  const events = ['mousedown', 'mousemove', 'touchmove', 'touchstart'];
  for (let i = 0; i < events.length; i++) {
    canvas.addEventListener(events[i], mouseFill);
  }
  function mouseFill(e) {
    e.preventDefault(); // disabled touch scrolling

    const rect = id('mycanvas');
    let offsetX = e.offsetX;
    let offsetY = e.offsetY;

    // don't paint if user isn't holding mouse down or picker is open
    if (!enabled) return;
    if (e.which != 1) return;
    console.log('mouse event', e);
    console.log('filledpixels', filledPixels);

    pixel = [Math.floor(offsetX / PIXELSIZE), Math.floor(offsetY / PIXELSIZE)];
    fillPixel(pixel);
  }

  function fillPixel(pixel) {
    let key = `${pixel[0]},${pixel[1]}`;
    filledPixels[key] = selectedColor;

    ctx.fillStyle = selectedColor;
    ctx.fillRect(pixel[0] * PIXELSIZE, pixel[1] * PIXELSIZE, PIXELSIZE - 1, PIXELSIZE - 1);
  }

  // configure pickr lib and attach it to #Picker
  const PICKR = Pickr.create({
    el: '#picker',
    comparison: false,
    components: {
      opacity: false,
      hue: true,
      palette: true,
      interaction: {
        input: true,
      }
    }
  });

  // console.log('pickr test', PICKR);

  // on open set default color to selected
  PICKR.on('init', function () {
    PICKR.setColor(selectedColor);
  });
  // disable coloring
  PICKR.on('show', function () {
    enabled = false;
  });
  // after choosing color reenable coloring
  PICKR.on('hide', function () {
    setTimeout(function () {
      enabled = true;
    }, 300);
  });
  // change selected color
  PICKR.on('change', function () {
    selectedColor = PICKR.getColor().toHEXA().toString();
  });

  id('pickerButton').addEventListener('click', () => PICKR.show());

  window.save = function(x, y) {
    var data = {};
    data['x'] = x;
    data['y'] = y;
    data['data'] = filledPixels;
    $.post('draw.php?submit=1', data, function(rsp) {
      $('body').append(rsp);
    });
  }

  function id(id) {
    return document.getElementById(id);
  }
});