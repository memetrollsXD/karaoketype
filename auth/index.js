(function() {
    // Firebase config & initialization
    var firebaseConfig = {
        apiKey: "AIzaSyBlUYsIM1z937P2GpzHxbP3V9ozZ5hQtuU",
        authDomain: "karaoketype.firebaseapp.com",
        projectId: "karaoketype",
        storageBucket: "karaoketype.appspot.com",
        messagingSenderId: "102539409791",
        appId: "1:102539409791:web:f0f03e0e9fe9af0790424a",
        measurementId: "G-FRQ2EPN9BN"
      };
    firebase.initializeApp(firebaseConfig);

    // Variables
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const resetPwBtn = document.getElementById("resetPwBtn");
    const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
    const sendEmailBtn = document.getElementById("sendEmailBtn");
    const googleBtn = document.getElementById("googleBtn");
    const saveBtn = document.getElementById("saveBtn")

    // Events
    loginBtn.addEventListener("click", e => {
        // Get credentials
        const email = emailInput.value;
        const pass = passwordInput.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.then(mainMenuRedirect, console.log("Error"));
        // mainMenuRedirect();
    });
    registerBtn.addEventListener("click", e => {
        // Get credentials
        const email = emailInput.value;
        const pass = passwordInput.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.then(e => function() {
            console.log(e.message);
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
                lbColor: '#000000'
            })
        });
    });
    logoutBtn.addEventListener("click", e => {
        firebase.auth().signOut();
    });
    resetPwBtn.addEventListener("click", e => {
        firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email).then(function() {
            showSuccessMessage("E-mail sent!");
        }).catch(function(error) {alert("An error has occurred. Please contact the developer."); console.log(error)});
    });
    forgotPasswordBtn.addEventListener("click", e => {
        // Hide all other fields
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'none');
        forgotPasswordLinks.forEach(item => item.style.display = 'block');
        console.clear();
    });
    sendEmailBtn.addEventListener("click", e => {
        const email = document.getElementById("forgotEmailInput").value;
        firebase.auth().sendPasswordResetEmail(email)
        .then(function() {showSuccessMessage("E-mail sent!")})
        .catch(function(error) {
            if (error.code == "auth/invalid-email") {
                alert("That email address is incorrect")
            } else {
                alert("An error has occurred. Please contact the developer.");
                console.log(error);
            }
        });
    });
    saveBtn.addEventListener("click", e => {
        const input = document.getElementById('displayNameInput').value;
        const color = document.getElementById('colorInput').value;
        const user = firebase.auth().currentUser;
            user.updateProfile({ displayName: input });
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({ lbColor: color }).then(function() {
                showSuccessMessage("Settings saved!")
            }).catch(function(error) {
                alert('An error has occurred. Please contact the developer.')
                console.log(error)
            })
    })
    googleBtn.addEventListener("click", e => {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
        firebase.auth().useDeviceLanguage()
        firebase.auth().signInWithPopup(provider).then((result) => {
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
            console.log(credential, token, user)
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email
            var credential = error.credential
            console.log(errorCode, errorMessage, email, credential)
        })
    })

    const loggedOutLinks = document.querySelectorAll('.loggedOutLinks');
    const loggedInLinks = document.querySelectorAll('.loggedInLinks');
    const forgotPasswordLinks = document.querySelectorAll('.forgotPasswordLinks');
    const emailText = document.getElementById('email');

    // Add auth listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            // Show / hide things
            loggedInLinks.forEach(item => item.style.display = 'block');
            loggedOutLinks.forEach(item => item.style.display = 'none');
            document.getElementById('colorInput').style.display = 'flex';
            firebase.firestore().collection('users').doc(firebaseUser.uid).get()
            .then((doc) => {
                document.getElementById('colorInput').value = doc.data().lbColor
            })
            registerBtn.style.display = 'none'
            const html = `
                <h5>${firebaseUser.email}</h5>
            `
            email.innerHTML = html;
            const html2 = `
               <input type="username" placeholder="Display Name" id="displayNameInput" class="loggedInLinks" value="${firebaseUser.displayName}"/>
            `
            document.getElementById('displayNameInput').outerHTML = html2;
        } else {
            console.log("Logged in'nt");
            loggedInLinks.forEach(item => item.style.display = 'none');
            loggedOutLinks.forEach(item => item.style.display = 'block');
            email.innerHTML = 'Stop peeking around';
        }
    });
}());

// Miscellaneous Code

// Switch Register/Login
let registerForm = false;
const msg = document.querySelector(".message");
const switchBtn = document.getElementById("switchBtn"); // Create an account
const switchBtn2 = document.getElementById("switchBtn2"); // Log in
function switchButton() {
    if(registerForm) {
        msg.innerHTML = 'Not registered? ';
        switchBtn.style.display = 'block';
        switchBtn2.style.display = 'none';
        registerBtn.style.display = 'none';
        loginBtn.style.display = 'block';
        registerForm = false;
    } else {
        msg.innerHTML = 'Already have an account? ';
        switchBtn.style.display = 'none';
        switchBtn2.style.display = 'block';
        registerBtn.style.display = 'block';
        loginBtn.style.display = 'none';
        registerForm = true;
    }
}

// Redirect to main menu

function mainMenuRedirect() {
    window.setTimeout(function() {
        window.location.href = '../';
    }, 500)
}

// Shows a success message
function showSuccessMessage(message) {
    const msg = document.querySelector(".successMessage");
    msg.innerHTML = message;
    msg.style.display = 'block';
    setTimeout(function(){ msg.style.display = 'none'}, 1500);
}
