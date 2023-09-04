async function post() {
  const post = await fetch("http://localhost:5678/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(mail, pass),
  });
  let result = await response.json();
  alert(result.message);
  console.log(result.message);
  console.log(mail.value);
  console.log(pass.value);
}

submit();

function email() {
  let mail = document.getElementById("email");
  return mail.value;
}

function password() {
  let pass = document.getElementById("name");
  return pass.value;
}

async function submit() {
  let form = document.getElementById("submit");
  form.addEventListener(/*"submit"*/ "click", (event) => {
    event.preventDefault();
    post();
  });
}
