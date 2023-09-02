async function getWorks () {
    const worksGet = await fetch("http://localhost:5678/api/works")
    const works = await worksGet.json()
    return works
}

async function getCategory () {
    const categoriesGet = await fetch("http://localhost:5678/api/categories")
    const categories = await categoriesGet.json()
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
        labelElement.classList.add ("button","b"+category.id)
        labelElement.textContent=category.name
        labelElement.addEventListener ("click", (event) => {
            console.log (event)
            for (category of categories){
                let otherone = document.querySelector (".b"+category.id)
                otherone.classList.remove ("checked")
            }
            labelElement.classList.add ("checked")
        })
        fieldset.appendChild (inputElement)
        fieldset.appendChild (labelElement)
    }
} 
displayCategories ()
//displayDom ();

async function displayDom () {
    const works = await getWorks ()
    let gallery = document.querySelector(".gallery")
    for (let work of works) {}

    
        let figure = `
            <figure class="figure${i}">
                <img src="${image}" alt="${titre}">
                <figcaption>${titre}</figcaption>
            </figure>
            `
        gallery.innerHTML += figure
    radio ();
}