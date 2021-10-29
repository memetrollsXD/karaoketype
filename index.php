<?PHP
  // Old Donation Link: https://www.paypal.com/donate/?cmd=_donations&business=paris.kluwen2503@gmail.com&item_name=Donation&item_number=Thank+you+for+supporting+us!&currency_code=EUR&Z3JncnB0=
  $tips = array("You can donate to KaraokeType <a class='correct_char' href='https://ko-fi.com/karaoketype' target='_blank'>Here</a>",
  "Songs are sorted from least RWPM to most RWPM",
  "Join our <a href='discord/' style='color: white'>Discord</a>!",
  "There are rumors about a secret song existing");
  /* if($_SERVER['REMOTE_ADDR'] !== "83.128.194.156") {
    header('Location: https://karaoketype.com/maintenance.html');
    die();
  } */
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <title>KaraokeType - The best rhythm typing game</title>
  <link rel="icon" href="keyboardtrans.ico">
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="header.css">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <!-- Primary Meta Tags -->
<meta name="title" content="KaraokeType - The best rhythm typing game">
<meta name="description" content="KaraokeType is the best rhythm typing game in the world. Type the lyrics correctly fast enough while earning the most points and staying in sync... Just like karaoke!">
<meta name="keywords" content="KaraokeType, karaoke, type, songs, typing, test, race, game, rhythm, music, gaming, anime, competition">
<meta name="viewport" content="width=device-width, initial-scale=0.9">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://karaoketype.com/">
<meta property="og:title" content="KaraokeType - The best rhythm typing game">
<meta property="og:description" content="KaraokeType is the best rhythm typing game in the world. Type the lyrics correctly fast enough while earning the most points and staying in sync...  Just like karaoke!">
<meta property="og:image" content="https://karaoketype.com/karaoketype_new.png">
<meta property="og:site_name" content="KaraokeType">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://karaoketype.com/">
<meta property="twitter:title" content="KaraokeType - The best rhythm typing game">
<meta property="twitter:description" content="KaraokeType is the best rhythm typing game in the world. Type the lyrics correctly fast enough while earning the most points and staying in sync...  Just like karaoke!">
<meta property="twitter:image" content="https://karaoketype.com/karaoketype_new.png">

<!-- Discord -->
<meta name="theme-color" content="#4a4a4a">
<!-- PWA -->
<link rel="manifest" href="/manifest.json">
</head>

<body onload="fill_selection()">
  <div class="container">
      <div class="heading">
        <img src="karaoketype_banner.webp" class="logo" alt="Logo"/>
        <h1 class="invisible">KaraokeType</h1>
        <p class="invisible">KaraokeType is the best rhythm typing game in the world. Type the lyrics correctly fast enough while earning the most points and staying in sync... Just like karaoke!</p>
        <a class="skip-link" href="#main" onclick="document.getElementById('input_area').focus();">Skip to content</a>
        <!-- Header -->
        <a class="header-link loggedOutLinks" id="loginBtn" href="auth/">Log in</a>
        <a class="header-link loggedInLinks" id="AccountBtn" href="auth/">Account</a>
        <a href="credits.html" class="header-link" >Credits</a>
        <a href="discord/" class="header-link">Discord</a>
      </div>
    <div class="header">
      <div class="errors">
        <div class="header_text">Name</div>
        <div class="curr_errors">-</div>
      </div>
      <div class="timer">
        <div class="header_text">Difficulty</div>
        <div class="curr_time yellow"></div>
      </div>
      <div class="accuracy">
        <div class="header_text">Length</div>
        <div class="curr_accuracy">-</div>
      </div>
      <div class="wpm">
        <div class="header_text">Recommended WPM</div>
        <div class="curr_wpm">-</div>
      </div>
    </div>

    <div class="quote" onclick="document.getElementById('input_area').focus();"><label for="input_area">Select a song...</div>
    <br><div class="category_sel">
      <button class="category_btn btn_selected" onclick="category_btn_click(this)">All</button>
      <button class="category_btn" onclick="category_btn_click(this)">Favorites</button>
      <button class="category_btn" onclick="category_btn_click(this)">Memes</button>
      <button class="category_btn" onclick="category_btn_click(this)">Anime</button>
      <button class="category_btn" onclick="category_btn_click(this)">Japanese</button>
      <button class="category_btn" onclick="category_btn_click(this)">English</button>
      <button class="category_btn" onclick="category_btn_click(this)">Spanish</button>
    </div>
    <select class="input_area" id="input_area" id="main"></select>
    <h1 style="color:white; font-family:system-ui; display:none;" id="favLoginText">Please log in to save songs</h1>
    <button class="play_btn restart_btn" id="play_btn" onclick="song()">Play</button>
    <!-- Modal Start-->
  <div id="infoModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close" onclick="closingSpanFnct();">&times;</span>
        <h1>Info</h1>
        The goal of the game is to type "in sync" with the singer.<br>
        For example, if the singer sings <span class="correct_char">Tequila</span>, <br>you're supposed to type <span class="correct_char">Tequila</span> at the same time
        <h1>Keyboard Shortcuts</h1>
        <span class="correct_char shortcut-big">CTRL + ALT + J</span><span class="shortcut-smol"> - Return to Menu</span><br><br>
        <span class="correct_char shortcut-big">CTRL + ALT + K</span><span class="shortcut-smol"> - Retry Song</span><br><br>
        <span class="correct_char shortcut-big"><a href="#" onclick="song()" class="correct_char">ENTER</a></span><span class="shortcut-smol"> - Choose Song</span>
      </div>
  </div>
  <!-- Modal end -->
  <footer class="footer"><span style="text-align:center;"><?PHP $randkeys = array_rand($tips, 1); echo $tips[$randkeys] ?></span><span><a onclick="infoModal()" href="#" class="shortcut_btn_l">Info</a><a onclick="document.querySelector('.footer').style.display = 'none'" href="#" class="shortcut_btn">Hide</a></span></footer>
</body>
<script src="songs/lyrics/variables.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.2.7/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.2.7/firebase-firestore.js"></script>
<script src="Index_Librorum_Prohibitorum.js"></script>
<script src="service-worker.js"></script>
</html>