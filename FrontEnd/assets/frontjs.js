const worksGet = await fetch("http://localhost:5678/api/works")
const works = await worksGet.json();

for (let i=0; i<works.length; i++) {
    const titre = works[i].title
    const image = works[i].imageUrl
    let figure = `
        <figure>
            <img src="${image}" alt="${titre}">
            <figcaption>${titre}</figcaption>
        </figure>
        `
    let gallery = document.querySelector(".gallery")
    gallery.innerHTML += figure
}

for (let i=0;i<4;i++) {
    let bouton = document.querySelector (".b"+i);
    let radio = document.querySelector (".r"+i);
    if (radio.checked == false) {
        bouton.classList.remove ("checked");
    }
    bouton.addEventListener("click", () => {
        radio.checked=true;
        bouton.classList.add ("checked");
        for (let i=0;i<4;i++) {
            let bouton = document.querySelector (".b"+i);
            let radio = document.querySelector (".r"+i);
            if (radio.checked == false) {
                bouton.classList.remove ("checked");
            }
        }
    })
}

