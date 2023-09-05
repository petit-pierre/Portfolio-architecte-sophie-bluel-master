let email;
let password;
let response = "test";

async function post() {
  let formData = new FormData();
  formData.append("email", email.value);
  formData.append("password", password.value);
  console.log(formData);
  const post = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(formData),
  });

  let result = await response.json();
  alert(result.message);
  console.log(result.message);
}

submit();

function emailListen() {
  email = document.getElementById("email");
  return email.value;
}

function passwordListen() {
  password = document.getElementById("name");
  return password.value;
}

async function submit() {
  let form = document.getElementById("submit");
  form.addEventListener(/*"submit"*/ "click", (event) => {
    event.preventDefault();
    emailListen();
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    if (emailRegExp.test(email.value)) {
      console.log("mail ok");
    } else {
      console.log("ceci n'est pas un mail");
    }
    passwordListen();
    if (password.value === "") {
      console.log("le mot de passe est vide");
    }
    post();
  });
}
