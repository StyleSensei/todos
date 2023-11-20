import { Item } from "./models/Item";
import "/src/scss/style.scss";

const salmon = new Item(
  "Lax",
  "Kallrökt",
  "https://brobergsmat.se/wp-content/uploads/2016/11/kallröktlaxw.jpg",
  false
);
const chocolate = new Item(
  "Chocklad",
  "2 x marabou 200g",
  "https://www.professionalsecrets.se/uploads/1/3/3/9/133935227/published/shutterchoklad-258868484.jpg?1618923947",
  false
);
const meatballs = new Item(
  "Köttbullar",
  "1kg svenska",
  "https://shared.cdn.smp.schibsted.com/v2/images/1bbc6e72-1efb-4846-8465-46f7a29553fe?fit=crop&h=846&w=1225&s=545dd735fabb69929b29483983b5b6d86106a2b8",
  false
);
const salad = new Item(
  "Sallad",
  "ej isberg",
  "https://static.vecteezy.com/ti/gratis-foton/p1/2111164-gron-sallad-blad-pa-en-mork-gra-bakgrund-gratis-fotona.jpg",
  false
);
const bread = new Item(
  "Bröd",
  "vitt, mjukt",
  "https://www.hemmanytt.se/wp-content/uploads/2022/02/langjast-brod.png",
  false
);

const shrimps = new Item(
  "Räkor",
  "frysta skalade",
  "https://jhb.se/storage/4A9116E87029D56C4B0F72CC452F549AF3BE7AC5D0C2DC7298ED1EBDCD5B0266/6cfae06e69da4f2ea3ffc5516ad4cfa5/jpg/media/a7ba02476ab04fd9b8b316494f5c94a8/handskalade%20räkor.jpg",
  true
);

let unfinishedItems = [salmon, chocolate, meatballs, salad, bread];
let oldItems = [shrimps];

if (
  localStorage.getItem("unfinishedItems") &&
  localStorage.getItem("oldItems")
) {
  unfinishedItems = JSON.parse(localStorage.getItem("unfinishedItems"));
  oldItems = JSON.parse(localStorage.getItem("oldItems"));
}

const outerWrapper = document.createElement("div");
const innerWrapper = document.createElement("div");
const unfinishedUl = document.createElement("ul");
const finishedUl = document.createElement("ul");
const heading = document.createElement("h1");
const header = document.createElement("header");
const main = document.createElement("main");
const footer = document.createElement("footer");
const oldItemsHeader = document.createElement("h2");
const sortBtn = document.createElement("button");
const sortBtnImg = document.createElement("img");
const overlay = document.createElement("div");

function createForm() {
  const form = document.createElement("form");
  const inputContainer = document.createElement("fieldset");
  const inputContainer2 = document.createElement("fieldset");
  const inputName = document.createElement("input");
  const inputNameLabel = document.createElement("label");
  const inputDescriptionLabel = document.createElement("label");
  const inputDescription = document.createElement("input");
  const inputFile = document.createElement("input")
  const addItemBtn = document.createElement("button");
  const collapseBtn = document.createElement("button");
  const collapseBtnIcon = document.createElement("img");

  let userInputName = "";
  let userInputDescription = "";
  let userInputImage = "";

  inputName.value = "";
  inputDescription.value = "";

  addItemBtn.innerHTML = "Lägg till vara";
  //css-classes
  form.classList.add(
    "row",
    "g-3",
    "col-12",
    "col-md-6",
    "col-lg-12",
    "col-xxl-12",
    "needs-validation"
  );
  inputContainer.classList.add("form-floating", "col-10","col-lg-4");
  inputContainer2.classList.add("form-floating", "col-10","col-lg-4");
  inputName.classList.add("col-10", "form-control");
  inputNameLabel.classList.add(
    "col-sm-10",
    "col-form-label",
    "col-form-label-lg"
  );
  inputDescription.classList.add("col-10", "form-control");
  addItemBtn.classList.add("btn", "btn-primary", "btn-primary__add", "col-10","col-lg-2");
  collapseBtn.classList.add("btn-primary__expand", "col");
  inputDescriptionLabel.classList.add(
    "col-sm-10",
    "col-form-label",
    "col-form-label-lg"
  );

  overlay.classList.add("overlay");

  inputName.setAttribute("placeholder", "Vara");
  inputName.setAttribute("name", "name");
  inputName.id = "name";
  inputName.setAttribute("required", "");
  inputNameLabel.setAttribute("for", "name");
  inputNameLabel.innerHTML = "Jag behöver ...";

  inputDescription.setAttribute("placeholder", "Beskrivning");
  inputDescription.id = "description";
  inputDescriptionLabel.setAttribute("for", "description");
  inputDescriptionLabel.innerHTML = "Beskrivning";
  inputFile.setAttribute("type","file")
  inputFile.setAttribute("capture","environment")
  inputFile.setAttribute("accept","image/*")

  addItemBtn.setAttribute("type", "submit");
  collapseBtn.setAttribute("type", "button");

  collapseBtnIcon.setAttribute(
    "src",
    "src/expand_circle_up_FILL0_wght400_GRAD0_opsz24.svg"
  );

  footer.appendChild(form);
  form.appendChild(inputContainer);
  inputContainer.appendChild(inputName);
  inputContainer.appendChild(inputNameLabel);
  form.appendChild(inputContainer2);
  inputContainer2.appendChild(inputDescription);
  inputContainer2.appendChild(inputDescriptionLabel);
  // form.appendChild(inputFile)
  form.appendChild(addItemBtn);
  form.appendChild(collapseBtn);
  collapseBtn.appendChild(collapseBtnIcon);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    userInputName = inputName.value;
    userInputDescription = inputDescription.value;
    // userInputImage = inputFile.value;

    unfinishedItems.push(new Item(userInputName, userInputDescription));
    unfinishedUl.innerHTML = "";
    inputName.value = "";
    inputDescription.value = "";
    // inputFile.value = "";
    createHtmlUnfinished();
    footer.classList.remove("toggleform");
    overlay.classList.remove("overlay--show");
    collapseBtn.classList.remove("btn-primary__expand--open");
  });
  // footer.addEventListener("mouseenter", () => {
  //   footer.classList.add("toggleform");
  //   overlay.classList.add("overlay--show");
  //   collapseBtn.classList.add("btn-primary__expand--open");
  // });

  // footer.addEventListener("mouseleave", () => {
  //   footer.classList.remove("toggleform");
  //   overlay.classList.remove("overlay--show");
  //   collapseBtn.classList.remove("btn-primary__expand--open");
  // });

  // footer.addEventListener("touchstart", () => {
  //   footer.classList.add("toggleform");
  //   overlay.classList.add("overlay--show");
  //   collapseBtn.classList.toggle("btn-primary__expand--open");
  // });

  

  collapseBtn.addEventListener("click", () => {
    footer.classList.toggle("toggleform");
    overlay.classList.toggle("overlay--show");
    collapseBtn.classList.toggle("btn-primary__expand--open");

  });
  collapseBtn.addEventListener("touchstart", () => {
    footer.classList.toggle("toggleform");
    overlay.classList.toggle("overlay--show");
    collapseBtn.classList.toggle("btn-primary__expand--open");

  });

  inputContainer.addEventListener("click", () => {
    footer.classList.add("toggleform");
    overlay.classList.add("overlay--show");
    collapseBtn.classList.add("btn-primary__expand--open");
  });

  inputContainer2.addEventListener("click", () => {
    footer.classList.add("toggleform");
    overlay.classList.add("overlay--show");
    collapseBtn.classList.add("btn-primary__expand--open");
  });
  inputContainer.addEventListener("touchstart", () => {
    footer.classList.add("toggleform");
    overlay.classList.add("overlay--show");
    collapseBtn.classList.add("btn-primary__expand--open");
  });

  inputContainer2.addEventListener("touchstart", () => {
    footer.classList.add("toggleform");
    overlay.classList.add("overlay--show");
    collapseBtn.classList.add("btn-primary__expand--open");
  });

  // footer.addEventListener("touchstart", () => {
  //   footer.classList.add("toggleform");
  //   overlay.classList.add("overlay--show");
  //   collapseBtn.classList.toggle("btn-primary__expand--open");
  // });
}

outerWrapper.classList.add("outerwrapper");
innerWrapper.classList.add("innerwrapper");
unfinishedUl.classList.add("unfinishedlist");
finishedUl.classList.add("finishedlist");
heading.innerHTML = "Inköpslista";
sortBtn.classList.add("btn", "btn-primary", "btn-primary__sort");
sortBtn.innerHTML = "Sortera";
sortBtn.appendChild(sortBtnImg);
sortBtnImg.setAttribute("src","src/sort_FILL0_wght400_GRAD0_opsz24.svg")
oldItemsHeader.innerHTML = "Tidigare varor";
oldItemsHeader.classList.add("olditemsheader");

document.body.appendChild(overlay);
document.body.appendChild(outerWrapper);
outerWrapper.appendChild(innerWrapper);
innerWrapper.appendChild(header);
innerWrapper.appendChild(main);
innerWrapper.appendChild(footer);
header.appendChild(heading);
main.appendChild(sortBtn);
main.appendChild(unfinishedUl);
main.appendChild(oldItemsHeader);
main.appendChild(finishedUl);

function createHtmlUnfinished() {
  localStorage.setItem("unfinishedItems", JSON.stringify(unfinishedItems));

  unfinishedItems.forEach((item, i) => {
    const textWrapper = document.createElement("section");
    const listItem = document.createElement("li");
    const itemName = document.createElement("h2");
    const itemDescription = document.createElement("p");
    const imageContainer = document.createElement("figure");
    const itemImage = document.createElement("img");

    listItem.classList.add("listitem", "container");
    itemName.innerHTML = item.name;
    itemDescription.innerHTML = item.description;
    textWrapper.classList.add("listitem__textwrapper");
    imageContainer.classList.add("listitem__imagecontainer");
    itemImage.setAttribute("src", item.image);
    itemImage.setAttribute("alt", item.name + " " + "i min inköpslista");

    listItem.addEventListener("click", () => {
      if (!overlay.classList.contains("overlay--show"));
      {
        item.done = true;
        unfinishedItems.splice(i, 1);
        unfinishedUl.innerHTML = "";
        createHtmlUnfinished();
        oldItems.push(item);
        finishedUl.innerHTML = "";
        createHtmlOldItems();
        console.log(unfinishedItems);
        console.log(oldItems);
      }
    });

    unfinishedUl.appendChild(listItem);
    listItem.appendChild(imageContainer);
    imageContainer.appendChild(itemImage);
    listItem.appendChild(textWrapper);
    textWrapper.appendChild(itemName);
    textWrapper.appendChild(itemDescription);

    if (item.image === undefined) {
      imageContainer.innerHTML = item.name[0];
      imageContainer.classList.add("listitem__imagecontainer--noimage");
    }
  });
  console.log(unfinishedItems);
}

function createHtmlOldItems() {
  localStorage.setItem("oldItems", JSON.stringify(oldItems));
  // console.log(oldItems)

  oldItems.forEach((item, i) => {
    const textWrapper = document.createElement("section");
    const listItem = document.createElement("li");
    const itemName = document.createElement("h2");
    const itemDescription = document.createElement("p");
    const imageContainer = document.createElement("figure");
    const itemImage = document.createElement("img");

    listItem.classList.add("listitem--old", "container");
    textWrapper.classList.add("listitem__textwrapper");
    imageContainer.classList.add("listitem__imagecontainer");
    itemName.innerHTML = item.name;
    itemDescription.innerHTML = item.description;
    itemImage.setAttribute("src", item.image);
    itemImage.setAttribute("alt", item.name + " " + "i min inköpslista");

    listItem.addEventListener("click", () => {
      if (!overlay.classList.contains("overlay--show")) {
        item.done = false;
        oldItems.splice(i, 1);
        finishedUl.innerHTML = "";
        createHtmlOldItems();
        unfinishedItems.push(item);
        unfinishedUl.innerHTML = "";
        createHtmlUnfinished();

        console.log(unfinishedItems);
        console.log(oldItems);
      }
    });

    finishedUl.appendChild(listItem);
    listItem.appendChild(imageContainer);
    imageContainer.appendChild(itemImage);
    listItem.appendChild(textWrapper);
    textWrapper.appendChild(itemName);
    textWrapper.appendChild(itemDescription);

    if (item.image === undefined) {
      imageContainer.innerHTML = item.name[0];
      imageContainer.classList.add("listitem__imagecontainer--noimage");
    }
  });
}
function sortAllItems() {
  //   console.log(
  //     unfinishedItems.sort(function (item1, item2) {
  //       if (item1.name < item2.name) {
  //         return -1;
  //       }
  //       if (item1.name > item2.name) {
  //         return 1;
  //       }
  //       return 0;
  //     })
  //   );
  if (!overlay.classList.contains("overlay--show")) {
    unfinishedItems.sort(function (item1, item2) {
      if (item1.name < item2.name) {
        return -1;
      }
      if (item1.name > item2.name) {
        return 1;
      }
      return 0;
    });
    oldItems.sort(function (item1, item2) {
      if (item1.name < item2.name) {
        return -1;
      }
      if (item1.name > item2.name) {
        return 1;
      }
      return 0;
    });

    unfinishedUl.innerHTML = "";
    createHtmlUnfinished();
    finishedUl.innerHTML = "";
    createHtmlOldItems();
  }
}
sortBtn.addEventListener("click", () => sortAllItems());

createHtmlUnfinished();
createHtmlOldItems();
createForm();

console.log(unfinishedItems);
console.log(oldItems);
