let pass;

async function post() {
  const login = { email: email.value, password: pass.value };
  const post = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(login),
  })
    .then((file) => file.json())
    .then((data) => console.log(data));
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
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    if (emailRegExp.test(email.value)) {
      post();
    } else {
      console.log("ceci n'est pas un mail");
    }
    passwordListen();
    if (pass.value === "") {
      console.log("le mot de passe est vide");
    } else {
      post();
    }
  });
}
