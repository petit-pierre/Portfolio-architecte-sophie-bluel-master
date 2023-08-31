const worksGet = await fetch("http://localhost:5678/api/works")
const works = await worksGet.json();

for (let i=0; i<works.length; i++) {
    const titre = works[i].title
    const image = works[i].imageUrl
    console.log (titre,image);
}