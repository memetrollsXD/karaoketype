<?php
include('session.php');
// configuration
$url = 'https://karaoketype.com/admin/variables.php';
$file = '../songs/lyrics/variables.js';

// check if form has been submitted
if (isset($_POST['text']))
{
    // save the text contents
    file_put_contents($file, $_POST['text']);

    // redirect to form again
    header(sprintf('Location: %s', $url));
    printf('<a href="%s">Moved</a>.', htmlspecialchars($url));
    exit();
}

// read the textfile
$text = file_get_contents($file);

?>
<html>

<head>
    <title>KaraokeType</title>
    <link rel="stylesheet" href="../play/style.css">
    <link rel="stylesheet" href="../header.css">
    <link rel="stylesheet" href="admin.css">
    <link rel="icon" href="../keyboardtrans.ico">
</head>

<body>
    <div class="container">
        <div class="heading">
            <a href="admin.php"><img src="../karaoketype_banner.webp" class="logo" /></a>
            <a href="logout.php" class="header-link">Log Out</a>
        </div>
        <form action="" method="post">
            <textarea placeholder="start typing here..." class="input_area2" name="text" data-gramm="false" spellcheck="false"><?PHP echo htmlspecialchars($text) ?></textarea>
            <button type="submit" class="save_btn" onclick="backToMenu()" title="Save">Save</button>
        </form>
    </div>
</body>

</html>