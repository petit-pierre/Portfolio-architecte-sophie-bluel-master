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
        inputElement.classList.add ("radio","r"+category.id)
        const labelElement = document.createElement ("label")
        labelElement.setAttribute ("data-id",category.id)
        labelElement.classList.add ("button","b"+category.id)
        labelElement.textContent=category.name
        labelElement.addEventListener ("click", (event) => {
            console.log (event)
            for (category of categories){
                let otherone = document.querySelector (".b"+category.id)
                let radio = document.querySelector (".r"+category.id)
                otherone.classList.remove ("checked")
                radio.checked=false
            }
            labelElement.classList.add ("checked")
            inputElement.checked=true
            let gallery = document.querySelector(".gallery")
            gallery.innerHTML = ""
            displayDom ()
        })
        fieldset.appendChild (inputElement)
        fieldset.appendChild (labelElement)
    }
    
} 
displayCategories ()
displayDom ()

async function displayDom () {
    const works = await getWorks ()
    let gallery = document.querySelector(".gallery")
    const categories = await getCategory ()
    let selection=works
    for (let i=1; i<categories.length; i++){
        if (document.querySelector (".r"+i).checked == true){
            selection = works.filter(function (works) {
                return works.categoryId == i;
            })
    }
}
    for (let i=0; i<selection.length; i++) {
        let image=selection[i].imageUrl
        let titre=selection[i].title
        let figure = `
            <figure class="figure">
                <img src="${image}" alt="${titre}">
                <figcaption>${titre}</figcaption>
            </figure>
            `
        gallery.innerHTML += figure
    }
}