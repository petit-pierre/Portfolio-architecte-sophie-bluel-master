async function getWorks() {
  const worksGet = await fetch("http://localhost:5678/api/works");
  const works = await worksGet.json();
  return works;
}

async function getCategory() {
  const categoriesGet = await fetch("http://localhost:5678/api/categories");
  const categories = await categoriesGet.json();
  const all = { id: -1, name: "Tous" };
  categories.unshift(all);
  return categories;
}

async function filterWorks(categoryId) {
  const works = await getWorks();
  if (categoryId == -1) {
    return works;
  }
  const filter = works.filter(function (work) {
    return work.categoryId == categoryId;
  });
  return filter;
}

async function displayCategories() {
  const categories = await getCategory();
  let fieldset = document.querySelector(".buttonsCategories");
  for (let category of categories) {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "radio");
    inputElement.classList.add("radio");
    const labelElement = document.createElement("label");
    labelElement.setAttribute("data-id", category.id);
    labelElement.classList.add("button");
    labelElement.textContent = category.name;
    if (category.id == -1) {
      labelElement.classList.add("checked");
    }
    labelElement.addEventListener("click", async (event) => {
      console.log(event);
      let otherone = document.querySelector(".checked");
      otherone.classList.remove("checked");
      event.target.classList.add("checked");
      const worksFilter = await filterWorks(event.target.dataset.id);
      displayDom(worksFilter);
    });
    fieldset.appendChild(inputElement);
    fieldset.appendChild(labelElement);
  }
}

displayCategories();
displayDom();

async function displayDom(works = null) {
  if (works == null) {
    works = await getWorks();
  }
  let workElement = "";
  console.log(works);
  for (let work of works) {
    workElement += createWork(work);
  }
  let gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  gallery.innerHTML = workElement;
}

function createWork(work) {
  let image = work.imageUrl;
  let titre = work.title;
  let figure = `
            <figure class="figure">
                <img src="${image}" alt="${titre}">
                <figcaption>${titre}</figcaption>
            </figure>
            `;
  return figure;
}
