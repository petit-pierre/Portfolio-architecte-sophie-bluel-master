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

function createWorkForModal(work, i) {
  let image = work.imageUrl;
  let titre = work.title;
  let count = work.id;

  let figure = `
            <figure class="figureModal">
                <img class="gal" src="${image}" alt="${titre}">
                <img class="galLogo trash" id="${count}" src="./assets/icons/trash-can-solid.png">
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
      window.localStorage.setItem("token", "");
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
  let modalContainer = document.querySelector(".modal");
  modalContainer.classList.remove("hiddene");
  let modal = document.querySelector(".modal-wrapper");
  modal.classList.remove("hidden");

  //affichage de la gallerie
  displayGalleryModal();
  //fermeture de la modal (bug avec la section de code ci dessous)

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
  let buttonPostPicture = document.querySelector(".modalButton");
  buttonPostPicture.addEventListener("click", () => {
    modalPicture();
  });
  variable = 0;
  trash();
}

async function displayGalleryModal(works = null) {
  let modal = document.querySelector(".modal-wrapper");
  modal.innerHTML =
    '<div class="logos"><img class="logo cross" src="./assets/icons/Cross.png"></div><p class= "titre">Galerie photo</p><div class="modalGallery"></div><div class="line"></div><button class="modalButton">Ajouter une photo</button><p class ="bottom"></p>';
  if (works == null) {
    works = await getWorks();
  }
  let workElement = "";
  let i = 0;
  for (let work of works) {
    i++;
    workElement += createWorkForModal(work, i);
  }
  let gallery = document.querySelector(".modalGallery");
  gallery.innerHTML = workElement;
  let fig = document.querySelector(".fig");
  fig.innerHTML =
    '<figcaption class = "fig fig1">éditer</figcaption><img class="galLogo crossedArrow"src="./assets/icons/arrows-up-down-left-right.png"> ';
}

async function trash(works = null) {
  if (works == null) {
    works = await getWorks();
  }
  let trashbin = document.querySelectorAll(".trash");
  for (let i = 0; i < trashbin.length; i++) {
    trashbin[i].addEventListener("click", function (i) {
      console.log(i.target.id);
      let index = i.target.id;
      delette(index);
    });
  }
}

async function delette(index) {
  console.log("delette");
  const token = window.localStorage.getItem("token");
  const post = await fetch("http://localhost:5678/api/works/" + index, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  modal();
  displayDom();
}

async function modalPicture(categories) {
  let logoDiv = document.querySelector(".logos");
  const arrowLeft = document.createElement("img");
  arrowLeft.setAttribute("src", "./assets/icons/ArrowLeft.png");
  arrowLeft.classList.add("arrowLeft");
  logoDiv.appendChild(arrowLeft);
  arrowLeft.addEventListener("click", () => {
    modal();
  });
  const photos = document.querySelector(".modalGallery");
  photos.remove();
  let titre = document.querySelector(".titre");
  titre.textContent = "Ajout photo";
  const bluePicture = document.createElement("div");
  bluePicture.classList.add("bluePicture");
  titre.appendChild(bluePicture);
  const logoPicture = document.createElement("img");
  logoPicture.setAttribute("src", "./assets/icons/Picture.png");
  logoPicture.classList.add("logoPicture");
  const pictureDiv = document.querySelector(".bluePicture");
  pictureDiv.appendChild(logoPicture);
  const buttonPictureAdd = document.createElement("input");
  const divForInput = document.createElement("div");
  divForInput.classList.add("divForInput");
  buttonPictureAdd.setAttribute("type", "file");
  buttonPictureAdd.setAttribute("accept", "image/png, image/jpeg");
  buttonPictureAdd.setAttribute("size", 4194304);
  buttonPictureAdd.setAttribute("id", "file");
  buttonPictureAdd.classList.add("buttonPictureAddHidden");
  const labelForButton = document.createElement("label");
  labelForButton.setAttribute("for", "file");
  labelForButton.classList.add("buttonPictureAdd");
  labelForButton.textContent = "+ Ajouter photo";
  pictureDiv.appendChild(divForInput);
  divForInput.appendChild(labelForButton);
  divForInput.appendChild(buttonPictureAdd);
  const pictureText = document.createElement("p");
  pictureText.classList.add("pictureText");
  pictureText.textContent = "jpg, png : 4mo max";
  pictureDiv.appendChild(pictureText);
  const pictureDiv2 = document.createElement("div");
  titre.appendChild(pictureDiv2);
  const pictureTitle = document.createElement("p");
  pictureTitle.textContent = "Titre";
  pictureTitle.classList.add("pictureTextBottom");
  pictureDiv2.appendChild(pictureTitle);
  const inputText = document.createElement("input");
  inputText.setAttribute("type", "text");
  inputText.classList.add("inputText");
  pictureDiv2.appendChild(inputText);
  const pictureTitle2 = document.createElement("p");
  pictureTitle2.textContent = "Catégorie";
  pictureTitle2.classList.add("pictureTextBottom");
  pictureDiv2.appendChild(pictureTitle2);
  const inputCategorie = document.createElement("select");
  inputCategorie.classList.add("inputText");
  inputCategorie.classList.add("inputCategories");
  pictureDiv2.appendChild(inputCategorie);
  const categories2 = await getCategory();
  for (cat of categories2) {
    if (cat.id > 0) {
      let option = document.createElement("option");
      option.setAttribute("value", cat.name);
      option.classList.add("option");
      let inputCategoriePlace = document.querySelector(".inputCategories");
      inputCategoriePlace.appendChild(option);
      option.textContent = cat.name;
    }
  }
  const modalButton = document.querySelector(".modalButton");
  const bottom = document.querySelector(".bottom");
  modalButton.remove();
  const pictureButton = document.createElement("button");
  pictureButton.textContent = "Valider";
  pictureButton.classList.add("pictureButton");
  pictureButton.classList.add("inactive");
  const line = document.querySelector(".line");
  bottom.append(pictureButton);

  validate(bluePicture, buttonPictureAdd, labelForButton);
}

function validate(bluePicture, buttonPictureAdd, labelForButton) {
  let title = document.querySelector(".inputText");
  let category = document.querySelector(".inputCategories");
  let button = document.querySelector(".pictureButton");

  let imageDownload = document.getElementById("file");
  imageDownload.addEventListener("change", (event) => {
    const imagePath = event.target.value;
    const fileList = event.target.files;
    const userPicture = document.createElement("img");
    userPicture.file = file;
    objectURL = URL.createObjectURL(fileList[0]);
    userPicture.setAttribute("src", objectURL);
    userPicture.classList.add("userPicture");
    bluePicture.appendChild(userPicture);
    buttonPictureAdd.classList.add("hidden");
    labelForButton.remove();
    let image = document.querySelector(".userPicture");
    if (title.value != "" && image.src != "") {
      console.log("j'ai uploadé");
      button.classList.remove("inactive");

      send(title, image, category);
    }
  });

  title.addEventListener("change", () => {
    let image = document.querySelector(".userPicture");
    if (image.src != "") {
      send(title, image, category);
    }
  });
}

async function send(title, image, category, works = null) {
  if (works == null) {
    works = await getWorks();
  }
  let ident = 0;
  for (i = 0; i < works.length; i++) {
    if (works[i].id == ident) {
      ident++;
    }
  }
  let button = document.querySelector(".pictureButton");
  const userId = window.localStorage.getItem("userId");
  if (title.value == "") {
    button.classList.add("inactive");
  }
  if (title.value != "" && image.src != "") {
    button.classList.remove("inactive");
    button.addEventListener("click", () => {
      formData = new FormData();
      //formData.append("id", ident);
      formData.append("title", title.value);
      formData.append("imageUrl", image.src);
      formData.append("categoryId", category.value);
      //formData.append("userId", userId);
      console.log(formData);

      submitWork(formData);
    });
  }
}

async function submitWork(formData) {
  const token = window.localStorage.getItem("token");
  const post = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  let result = await post.json();
  console.log(result);
}
