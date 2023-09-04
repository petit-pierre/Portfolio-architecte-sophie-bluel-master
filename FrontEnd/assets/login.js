async function post () {
    const post = await fetch("http://localhost:5678/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(mail,pass)
    });
    let result = await response.json();
    alert(result.message);
    console.log (result.message)
}

email ()
password ()
post ()

function email () {
    let mail = document.getElementById("email")
    console.log (mail.value)
}

function password () {
    let pass = document.getElementById("name")
    console.log (pass.value)
}

function submit () {
    let form = document.getElementById ("submit")
    form.addEventListener("submit", (event) => {
    event.preventDefault();
})}

function forgot () {
    
}

