const worksGet = await fetch("http://localhost:5678/api/works")
const works = await worksGet.json();
let selection = works

afficherDom ();

function afficherDom () {
    let rad0=document.querySelector(".r0")
    let rad1=document.querySelector(".r1")
    let rad2=document.querySelector(".r2")
    let rad3=document.querySelector(".r3")
    let gallery = document.querySelector(".gallery")
    let input =`
    <fieldset class="buttons">
        <input type="radio" class="radio r0" name="selected">
        <label class="button b0">Tous</label>
        <input type="radio" class="radio r1"name="selected">
        <label class="button b1">Objets</label>
        <input type="radio" class="radio r2"name="selected">
        <label class="button b2">Appartements</label>
        <input type="radio" class="radio r3"name="selected">
        <label class="button b3">Hôtels & restaurants</label>
    </fieldset>
    `
    gallery.innerHTML = input
    if (rad0.checked==true) {
        document.querySelector(".b0").classList.add("checked")
    } else if (rad1.checked==true) {
        document.querySelector(".b1").classList.add("checked")
    } else if (rad2.checked==true) {
        document.querySelector(".b2").classList.add("checked")
    } else if (rad3.checked==true) {
        document.querySelector(".b3").classList.add("checked")
    };
    for (let i=0; i<selection.length; i++) {
        const titre = selection[i].title
        const image = selection[i].imageUrl
        let figure = `
            <figure class="figure${i}">
                <img src="${image}" alt="${titre}">
                <figcaption>${titre}</figcaption>
            </figure>
            `
        gallery.innerHTML += figure
    };
    radio ();
}

function radio () {
    for (let i=0;i<4;i++) {
        let bouton = document.querySelector (".b"+i);
        let radio = document.querySelector (".r"+i);
        
        bouton.addEventListener("click", () => {
            radio.checked=true;
            if (document.querySelector(".r0").checked==true) {
                selection = works
            } else if (document.querySelector(".r1").checked==true) {
                selection = works.filter(function (works) {
                    return works.categoryId == "1";
                });
            } else if (document.querySelector(".r2").checked==true) {
                selection = works.filter(function (works) {
                    return works.categoryId == "2";
                });
            } else {
                selection = works.filter(function (works) {
                    return works.categoryId == "3";
                });
            };
            afficherDom ();
        })
    }
}