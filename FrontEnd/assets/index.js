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
login();

async function displayDom(works = null) {
  if (works == null) {
    works = await getWorks();
  }
  let workElement = "";
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

function createWorkForModal(work) {
  let image = work.imageUrl;
  let titre = work.title;
  let count = work.id;
  let figure = `
            <figure class="figureModal">
                <img class="gal" src="${image}" alt="${titre}">
                <img class="galLogo trash${count}" src="./assets/icons/trash-can-solid.png">
                <figcaption class = "fig">éditer</figcaption>
            </figure>
            `;
  return figure;
}

function login() {
  const token = window.localStorage.getItem("token");
  if (token != "") {
    let blackFlag = document.querySelector(".loged");
    blackFlag.classList.remove("hidden");
    let log = document.querySelector(".log");
    log.classList.add("hidden");
    let logout = document.querySelector(".logout");
    logout.classList.remove("hidden");
    let modif = document.querySelector(".modif");
    modif.classList.remove("hidden");
    let modif2 = document.querySelector(".modif2");
    modif2.classList.remove("hidden");
    let modifier = document.querySelector(".modifier");
    modifier.classList.remove("hidden");
    let modifier2 = document.querySelector(".modifier2");
    modifier2.classList.remove("hidden");
    let buttonsCategories = document.querySelector(".buttonsCategories");
    buttonsCategories.classList.add("hidden");
    let logedout = document.querySelector(".logedout");
    startModal();
    logedout.addEventListener("click", () => {
      window.localStorage.removeItem("token");
      let blackFlag = document.querySelector(".loged");
      blackFlag.classList.add("hidden");
      let log = document.querySelector(".log");
      log.classList.remove("hidden");
      let logout = document.querySelector(".logout");
      logout.classList.add("hidden");
      let modif = document.querySelector(".modif");
      modif.classList.add("hidden");
      let modif2 = document.querySelector(".modif2");
      modif2.classList.add("hidden");
      let modifier = document.querySelector(".modifier");
      modifier.classList.add("hidden");
      let modifier2 = document.querySelector(".modifier2");
      modifier2.classList.add("hidden");
      let buttonsCategories = document.querySelector(".buttonsCategories");
      buttonsCategories.classList.remove("hidden");
    });
  }
}

function startModal() {
  modif2 = document.querySelector(".modif2");
  modif2.addEventListener("click", () => {
    modal();
  });
  modifier2 = document.querySelector(".modifier2");
  modifier2.addEventListener("click", () => {
    modal();
  });
}

function modal() {
  //affichage de la modal
  let modal = document.querySelector(".modal-wrapper");
  modal.classList.remove("hidden");
  let modalContainer = document.querySelector(".modal");
  modalContainer.classList.remove("hiddene");
  //affichage de la gallerie
  displayGalleryModal();
  //fermeture de la modal
  modalContainer.addEventListener("click", (event) => {
    if (!modal.contains(event.target)) {
      modal.classList.add("hidden");
      modalContainer.classList.add("hiddene");
    }
  });
  let cross = document.querySelector(".cross");
  cross.addEventListener("click", () => {
    modal.classList.add("hidden");
    modalContainer.classList.add("hiddene");
  });
}

async function displayGalleryModal(works = null) {
  let modal = document.querySelector(".modal-wrapper");
  modal.innerHTML =
    '<div class="logos"><img class="logo cross" src="./assets/icons/Cross.png"></div><p>Galerie photo</p><div class="modalGallery"></div><div class="line"></div><button class="modalButton">Ajouter une photo</button>';
  if (works == null) {
    works = await getWorks();
  }
  let workElement = "";
  for (let work of works) {
    workElement += createWorkForModal(work);
  }
  let gallery = document.querySelector(".modalGallery");
  gallery.innerHTML = workElement;
  let fig = document.querySelector(".fig");
  fig.innerHTML =
    '<figcaption class = "fig fig1">éditer</figcaption><img class="galLogo crossedArrow"src="./assets/icons/arrows-up-down-left-right.png"> ';
}
