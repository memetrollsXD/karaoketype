<?php
   include('session.php');
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>KaraokeType</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="../header.css">
    <link rel="stylesheet" href="admin.css">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>

<body>
    <div class="container">
        <div class="heading">
            <a href="admin.php"><img src="../karaoketype_banner.png" class="logo" /></a>
            <a href="logout.php" class="header-link">Log Out</a>
        </div>

        <div class="quote" style="white-space: pre-line; display:grid;">
            <h3>Upload Site</h3>
            <div class="row">
                <div class="column">
                    <form action="upload_lyrics.php" method="post" enctype="multipart/form-data">Select file to upload:
                        <input type="hidden" name="MAX_FILE_SIZE" value="100000000000" />
                        <input type="radio" name="dir" value="../songs/lyrics"/> JSON
                        <input type="radio" name="dir" value="../songs/"/> MP3
                        <input type="file" name="fileToUpload" id="fileToUpload" hidden>
                        <label for="fileToUpload">Upload File</label>

                        <button type="submit" value="Upload Image" name="submit" class="play_btn">Upload</button>
                    </form>
                </div>

                <div class="column">
                    Edit variables.js
                    <button class="save_btn" style="left: 8px; top:27px;" onclick="redirect()">External Link <img src="https://image.flaticon.com/icons/png/512/74/74910.png" height="20px" style="filter: invert(70%);"/></button>
                </div>
            </div>
        </div>
    </div>
    <script>
        function redirect() {
            window.location.href = "variables.php";
        }
    </script>
</body>

</html>