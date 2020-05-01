<?php

$x = intval($_REQUEST['x']);
$y = intval($_REQUEST['y']);

if ($_REQUEST['submit']) {
  // extract data from post and save it to a file
  $data = $_POST['data'];
  $key = "$x,$y";
  $filename = "tmp/" . $key . '-' . rand()%100;
  file_put_contents($filename, json_encode($data));
  print_r("$x $y $filename \n");
  // run save.py
  $result = trim(shell_exec("python3 save.py '$x' '$y' '$filename' 2>&1"));
  if ($result != 1) {
    die("Error saving. $result<HR>");
  }

  print "<script>window.location = 'index.php';</script>";
  return;
}

$time = time();
print <<<EOF

<!doctype html>
<html>

<style>
  body {
    margin: 30px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #f0f0f0;
  }

  #mycanvas {
    margin-top: 8px;
    border: 1px #000 solid;
    background-color: #fff;
  }
</style>

<body>
  <!-- import scripts -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <link rel="stylesheet" href="pickr/dist/themes/classic.min.css" />
  <script src="pickr/dist/pickr.min.js"></script>
  <script src="draw.js"></script>

  <body>
    <input onclick="window.location='index.php'" value="Back" type=button>
    <BR>
    <BR>
    <table>
      <tr>
        <td>
          <div id=picker></div>
        </td>
        <td>
          <input id="pickerButton" type=button value="Choose Color"/>
        </td>
      </tr>
    </table>
    <div>
      <canvas id=mycanvas width=500 height=500></canvas>
    </div>
    <input id=saveButton type=submit value=Save onclick="save($x, $y)">
    <div id=spinner></div>
  </body>
</body>

</html>
EOF;
