async function post() {
  const login = { email: email.value, password: pass.value };
  const post = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(login),
  });
  let result = await post.json();
  console.log(result);
  if (result.token == null) {
    error();
  } else {
    window.localStorage.setItem("token", result.token);
    document.location.href = "./index.html";
  }
}

submit();

function emailListen() {
  let email = document.getElementById("email");
  return email.value;
}

function passwordListen() {
  pass = document.getElementById("name");
  return pass.value;
}

async function submit() {
  let form = document.getElementById("submit");
  form.addEventListener("click", (event) => {
    event.preventDefault();
    emailListen();
    passwordListen();
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    if (emailRegExp.test(email.value) && pass.value != "") {
      post();
    } else {
      error();
    }
  });
}

function error() {
  let error = document.querySelector(".error");
  error.textContent = "e-mail ou mot de passe invalide";
}
