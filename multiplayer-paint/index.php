<?php

print <<<EOF

<!doctype html>
<html>
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-firestore.js"></script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="index.js"></script>

<style>
  body {
    background-color: #f0f0f0;
    margin: 16px;
    font-family: Arial, Helvetica, sans-serif;
  }

  #mycanvas {
    border: 1px #000 solid;
    background-color: #fff;
    cursor: pointer;
  }

  #mycanvasWrapper {
    position: relative;
  }

  #selectedBox {
    border: 1px rgba(0, 50, 100, 0.5) solid;
    background-color: rgba(0, 50, 100, 0.25);
    position: absolute;
    pointer-events: none;
  }
</style>
<script>
  let DIMENSION = 25;
</script>

<body>
  <h2>Canvas Demo Game</h2>
  <div style='padding:8px;color:#222'>
    YouTube video walkthrough: <a href=https://youtu.be/t1aXuJkmTg8>https://youtu.be/t1aXuJkmTg8</a><BR>
    Source code: <a href=https://github.com/techleadhd/bigcanvasdemo>https://github.com/techleadhd/bigcanvasdemo/</a><BR>
    <BR>
  </div>
  <div id=mycanvasWrapper>
    <canvas id=mycanvas></canvas>
  </div>
</body>

</html>

EOF;
