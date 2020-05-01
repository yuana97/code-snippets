$(document).ready(function () {
  let PIXELSIZE = 2;
  let REPEATSX = 20;
  let REPEATSY = 15;
  let DIMENSION = 25;

  let canvas = id('mycanvas');
  let ctx = canvas.getContext("2d");
  let canvasWidth = DIMENSION * REPEATSX * PIXELSIZE;
  let canvasHeight = DIMENSION * REPEATSY * PIXELSIZE;
  let selectedBox = null;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDjLFcsO92KpwLiFe7Hsp4gVd51w61WIsk",
    authDomain: "canvasgamedemo.firebaseapp.com",
    databaseURL: "https://canvasgamedemo.firebaseio.com",
    projectId: "canvasgamedemo",
    storageBucket: "canvasgamedemo.appspot.com",
    messagingSenderId: "258751262925",
    appId: "1:258751262925:web:50cdf23c2265aa7ae07984"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // draw grid
  ctx.strokeStyle = '#cccccc';
  for (let i = 0; i < DIMENSION * REPEATSX; i += DIMENSION) {
    x = i * PIXELSIZE;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
    ctx.stroke();

    y = i * PIXELSIZE;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
    ctx.stroke();
  }

  canvas.addEventListener('click', selectBox);
  let SELECTED = 0;
  function selectBox(e) {
    if (SELECTED) return;
    SELECTED = 1;

    console.log('canvas click', e);

    let pixel = [Math.floor(e.offsetX / (PIXELSIZE * DIMENSION)), Math.floor(e.offsetY / (PIXELSIZE * DIMENSION))];
    window.location = `draw.php?x=${pixel[0]}&y=${pixel[1]}`
  }

  canvas.addEventListener('mousemove', highlightBox);
  function highlightBox(e) {
    console.log('mousemove', e);

    let pixel = [Math.floor(e.offsetX / (PIXELSIZE * DIMENSION)), Math.floor(e.offsetY / (PIXELSIZE * DIMENSION))];
    // boundary conditions
    if (pixel[0] < 0 || pixel[1] < 0 ||
    pixel[0] >= REPEATSX || pixel[1] >= REPEATSY) {
      return;
    }
    // create a translucent selectedBox div where the user moves their mouse
    if (!selectedBox) {
      selectedBox = $("<div id=selectedBox></div>");
      selectedBox.css({ width: DIMENSION * PIXELSIZE - 2, height: DIMENSION * PIXELSIZE - 2 });
      $("#mycanvasWrapper").prepend(selectedBox);
    }
    selectedBox.css({
      left: pixel[0] * PIXELSIZE * DIMENSION + 1,
      top: pixel[1] * PIXELSIZE * DIMENSION
    });
  }

  function id(id) {
    return document.getElementById(id);
  }
});