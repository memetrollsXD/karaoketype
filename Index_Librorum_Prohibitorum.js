var selector = document.getElementById("input_area");
const sname = document.querySelector(".curr_errors");
const diff = document.querySelector(".curr_time");
const length = document.querySelector(".curr_accuracy");
const rwpm = document.querySelector(".curr_wpm")
let nil = true;
let playing = false;
let audio = undefined;
let selected_category = "All";
const rn = Math.floor(Math.random() * total_songs) + 1;
let audioname = "";
let favsongs = [], keys = Object.keys(localStorage), i = 0, key;
let user;

window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
  }
});

function load() {
  var selected_value = selector.options[selector.selectedIndex].value;
    sname.textContent = all_songs[selected_value].Name;
    diff.textContent = "☆".repeat(all_songs[selected_value].Difficulty);
    length.textContent = all_songs[selected_value].Time + "s";
    rwpm.textContent = all_songs[selected_value].RWpm + "WPM";
    nil = all_songs[selected_value].nil;
    song_id = selected_value;
}

selector.onchange = function () {
  load();
  playRef();
  audioname = all_songs[selector.options[selector.selectedIndex].value].CName;
  addToHomeScreen()
};


function song() {
  var selected_value = selector.options[selector.selectedIndex].value;
  if (!nil) {
    let song = all_songs[selected_value].CName;
    window.location.href = "play?song=" + song;
  } else {
    let song = all_songs[rn].CName;
    window.location.href = "play?song=" + song;
  }
}

function fill_selection(cat) {
  let selector = document.getElementById("input_area"); // deze heb je al globaal, dus die hoeft niet per se
  selector.style.display = 'block'
  document.getElementById('play_btn').style.display = 'block';
  document.getElementById('favLoginText').style.display = 'none'
  obliterate_orphans(selector);
  if (cat == undefined || cat == "All") {
    // Create categories
    let optgroup1 = document.createElement("optgroup"),
    optgroup2 = document.createElement("optgroup"),
    optgroup3 = document.createElement("optgroup"),
    optgroup4 = document.createElement("optgroup"),
    optgroup5 = document.createElement("optgroup");
  
    optgroup1.classList.add("optgroup");
    optgroup1.label = '☆'
    selector.appendChild(optgroup1);
  
    optgroup2.classList.add("optgroup");
    optgroup2.label = '☆☆'
    selector.appendChild(optgroup2);
  
    optgroup3.classList.add("optgroup");
    optgroup3.label = '☆☆☆'
    selector.appendChild(optgroup3);

    optgroup4.classList.add("optgroup");
    optgroup4.label = '☆☆☆☆'
    selector.appendChild(optgroup4);

    optgroup5.classList.add("optgroup");
    optgroup5.label = '☆☆☆☆☆';
    selector.appendChild(optgroup5);
    for (let i = 0; i < all_songs.length; i++) {
        var opt = all_songs[i];
        if (!opt.Categories.includes("Shownt")) {
          if (opt.Difficulty == "-") { // Random option
            var el = document.createElement("option");
            el.classList.add("option");
            el.textContent = opt.Name;
            el.value = i;
            el.setAttribute("selected", "selected");
            selector.prepend(el); // Instead of appending it, put it on the first position
          } else if (opt.Difficulty == 1) {
            // Add song to category
            var el = document.createElement("option");
            el.classList.add("option");
            el.textContent = opt.Name;
            el.value = i;
            optgroup1.appendChild(el);
          } else if (opt.Difficulty == 2) {
            var el = document.createElement("option");
            el.classList.add("option");
            el.textContent = opt.Name;
            el.value = i;
            optgroup2.appendChild(el);
          } else if (opt.Difficulty == 3) {
            var el = document.createElement("option");
            el.classList.add("option");
            el.textContent = opt.Name;
            el.value = i;
            optgroup3.appendChild(el);
          } else if (opt.Difficulty == 4) {
            var el = document.createElement("option");
            el.classList.add("option");
            el.textContent = opt.Name;
            el.value = i;
            optgroup4.appendChild(el);
          } else if (opt.Difficulty == 5) {
            var el = document.createElement("option");
            el.classList.add("option");
            el.textContent = opt.Name;
            el.value = i;
            optgroup5.appendChild(el);
          }
        }
    }
  }
  else if (cat == "Favorites") { // Aanpak: For every song get localstorage string, add it to an array and add it to the selector
    favClick();
  } else {
      for (let i = 0; i < all_songs.length; i++) {
      var opt = all_songs[i];
      if (opt.Name == "Random") {
        var el = document.createElement("option");
        el.classList.add("option");
        el.textContent = opt.Name;
        el.value = i;
        selector.prepend(el);
        el.setAttribute("selected", "selected");
      }
      if (opt.Categories.includes(selected_category)) {
        var el = document.createElement("option");
        el.classList.add("option");
        el.textContent = opt.Name;
        el.value = i;
        selector.appendChild(el);
      }
    }
  }
}

function playRef() {
  let selected_value = selector.options[selector.selectedIndex].value;
  if (selected_value != '0') {
    if (!playing) {
      let ref_time = all_songs[selected_value].Ref;
      audio = new Audio("songs/" + all_songs[selected_value].CName + ".mp3");
      audio.currentTime = ref_time;
      audio.play();
      playing = true;
      setTimeout(function() {
        audio.currentTime = 0;
        audio.pause();
        playing = false;
      }, 15000);
    } else {
      audio.currentTime = 0;
      audio.pause();
      playing = false;
      playRef();
    }
  }
}

function shortcutCheck(e) {

  if (e.keyCode == 13 && !document.activeElement === document.querySelector('skip-link')) {
      song();
  }
}

document.addEventListener('keyup', shortcutCheck, false);


let info_Modal = document.getElementById("infoModal");
let closingspan = document.getElementsByClassName("close")[0];

function infoModal() {
  info_Modal.style.display = "block";
}

closingspan.onclick = function() {
  closingSpanFnct();
}

function closingSpanFnct() {
  info_Modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == info_Modal) {
    closingSpanFnct();
  }
}

function category_btn_click(btn) {
  selected_category = btn.textContent;
  for(let i = 0; i < document.querySelectorAll('.btn_selected').length; i++) {
    document.querySelectorAll('.btn_selected')[i].classList.remove('btn_selected');
  }
  btn.classList.add('btn_selected');
  fill_selection(selected_category);
}

function obliterate_orphans(orphanhouse) {
  while (orphanhouse.firstChild) {
    orphanhouse.removeChild(orphanhouse.firstChild);
  }
}

function favClick() { // When favorite category is clicked
  for (let i = 0; i < all_songs.length; i++) {
    var opt = all_songs[i];
    if (opt.Name == "Random") {
      var el = document.createElement("option");
      el.classList.add("option");
      el.textContent = opt.Name;
      el.value = i;
      selector.appendChild(el);
    }
  }
  let db;
  try {
  db = firebase.firestore().collection("favsongs").doc(user.uid) } catch(err) {
    console.log(err)
  };
  if (db == undefined) {
    selector.style.display = 'none';
    document.getElementById('favLoginText').style.display = 'block'
    document.getElementById('play_btn').style.display = 'none'
  }
  db.get().then((doc) => {
    if (doc.exists) {
      let s = doc.data()
      for (let i = 0; i < Object.keys(s).length; i++) {
        loadFavorites(Object.keys(s)[i])
      }
    } else {
      console.log("Datan't")
    }
  }).catch((err) => {
    console.log(err)
  })
}

function loadFavorites(cname) { // This code should run 28 times, why does it only run 1 time? Apparently because the return false; was in the for loop
  for (let i = 0; i < all_songs.length; i++) {
    let opt = all_songs[i];
    if (opt.CName == cname) {
      var el = document.createElement("option");
      el.classList.add("option");
      el.textContent = opt.Name;
      el.value = i;
      selector.appendChild(el);
      return true;
    }
  }
  return false;
}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', function (e) {
  deferredPrompt = e;
  addToHomeScreen()
});

let a2HS = 0
function addToHomeScreen() {
  a2HS++
  if (a2HS != 3 && a2HS != 1) {
    try {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function(){
        deferredPrompt = null;
      });
    } catch{}
  }
}
/// Firebase ///

var firebaseConfig = {
  apiKey: "AIzaSyBlUYsIM1z937P2GpzHxbP3V9ozZ5hQtuU",
  authDomain: "karaoketype.com",
  projectId: "karaoketype",
  storageBucket: "karaoketype.com",
  messagingSenderId: "102539409791",
  appId: "1:102539409791:web:f0f03e0e9fe9af0790424a",
  measurementId: "G-FRQ2EPN9BN"
};
firebase.initializeApp(firebaseConfig);

const loggedOutLinks = document.querySelectorAll('.loggedOutLinks');
const loggedInLinks = document.querySelectorAll('.loggedInLinks');

// Add auth listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) { 
      loggedInLinks.forEach(item => item.style.display = 'block');
      loggedOutLinks.forEach(item => item.style.display = 'none');
      user = firebaseUser;
  } else {
      loggedInLinks.forEach(item => item.style.display = 'none');
      loggedOutLinks.forEach(item => item.style.display = 'block');
      user = undefined;
  }
});