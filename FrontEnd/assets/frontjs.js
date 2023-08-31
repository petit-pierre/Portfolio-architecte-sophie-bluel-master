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
    
    console.log (titre,image);
}