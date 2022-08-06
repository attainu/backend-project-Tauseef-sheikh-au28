window.onload = () => {
 var signUpButton = document.getElementById("signUpBtn");
 var loginButton = document.getElementById("loginBtn");


 var saveButton = document.getElementById("btn-save");


 if (saveButton) saveButton.addEventListener("click", saveDiary);
 if (signUpButton) signUpButton.addEventListener("click", register);
 if (loginButton) loginButton.addEventListener("click", login);

 
};


 async function saveDiary(e) {
   e.preventDefault();
   var title = document.getElementById("titleId").value;
   var description = document.getElementById("descriptionID").value;
  var userId = getUserData().id;
   postData("https://my-online-diary01.herokuapp.com/diary", {
     title: title,
     description: description,
     user_id: userId,
   }).then((data) => {
     console.log(data); // JSON data parsed by `data.json()` call
     if (data.error == false) {
              alert(data.message);

       //window.location.href = "Dashboard.html";
     } else {
       alert(data.message);
     }
   });
 }




function logOut() {
  localStorage.clear();
  window.location.href = "index.html";
}

async function login(e) {
  e.preventDefault();
  var loginEmail = document.getElementById("loginEmail").value;
  var loginPassword = document.getElementById("loginPassword").value;

  postData("https://my-online-diary01.herokuapp.com/login", {
    email: loginEmail,
    password: loginPassword,
  }).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
    if (data.error == false) {
      saveUser(data.data);
      window.location.href = "Dashboard.html";
    } else {
      alert(data.message);
    }
  });
}

async function register(e) {
  e.preventDefault();
  var name = document.getElementById("signupname").value;
  var email = document.getElementById("signupemail").value;
  var password = document.getElementById("signuppassword").value;
  var confirmPassword = document.getElementById("signupconfirmPassword").value;

  if (password == confirmPassword) {
    console.log("Correct password");
    postData("https://my-online-diary01.herokuapp.com/register", {
      name: name,
      email: email,
      password: password,
    }).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
      if (data.error == false) {
        saveUser(data.data);
        window.location.href = "Dashboard.html";
      }
    });
  } else {
    console.log();
    alert("password should be same");
  }
}


function switchView(view) {
  $.get({
    url: view,
    cache: false,
  }).then(function (data) {
    $("#container").html(data);
  });
}
  

//***********************************LOCAL STORAGE COOKIE********************************************************************** */
function saveUser(value) {
  window.localStorage.setItem("userData", JSON.stringify(value));
}

function getUserData() {
  let user = window.localStorage.getItem("userData");
  return JSON.parse(user);
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}

//************************************API METHODS**************************************************************************** */

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
