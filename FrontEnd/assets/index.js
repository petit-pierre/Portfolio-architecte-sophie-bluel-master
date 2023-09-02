async function getWorks () {
    const worksGet = await fetch("http://localhost:5678/api/works")
    const works = await worksGet.json();
    return works
}

async function getCategory () {
    const categoriesGet = await fetch("http://localhost:5678/api/categories")
    const categories = await categoriesGet.json();
    const all = {id:-1,name:"Tous"}
    categories.unshift (all)
    return categories
}

async function displayCategories () {
    const categories = await getCategory ()
    let fieldset = document.querySelector(".buttonsCategories")
    for (let category of categories) {
        console.log (category)
        const inputElement = document.createElement ("input")
        inputElement.setAttribute ("type","radio")
        inputElement.classList.add ("radio")
        const labelElement = document.createElement ("label")
        labelElement.setAttribute ("data-id",category.id)
        labelElement.classList.add ("button")
        labelElement.textContent=category.name
        labelElement.addEventListener ("click", (event) => {
            console.log (event)
        })
        fieldset.appendChild (inputElement)
        fieldset.appendChild (labelElement)
    }
} 
displayCategories ()
//displayDom ();

function displayDom () {
    let gallery = document.querySelector(".gallery")


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