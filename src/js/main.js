import { Item } from "./models/Item";
import "/src/scss/style.scss";

const salmon = new Item(
  "Lax",
  "Kallrökt",
  "https://brobergsmat.se/wp-content/uploads/2016/11/kallröktlaxw.jpg"
);
const chocolate = new Item(
  "Chocklad",
  "2 x marabou 200g",
  "https://www.professionalsecrets.se/uploads/1/3/3/9/133935227/published/shutterchoklad-258868484.jpg?1618923947"
);
const meatballs = new Item(
  "Köttbullar",
  "1kg svenska",
  "https://shared.cdn.smp.schibsted.com/v2/images/1bbc6e72-1efb-4846-8465-46f7a29553fe?fit=crop&h=846&w=1225&s=545dd735fabb69929b29483983b5b6d86106a2b8"
);
const shrimps = new Item(
  "Räkor",
  "frysta skalade",
  "https://jhb.se/storage/4A9116E87029D56C4B0F72CC452F549AF3BE7AC5D0C2DC7298ED1EBDCD5B0266/6cfae06e69da4f2ea3ffc5516ad4cfa5/jpg/media/a7ba02476ab04fd9b8b316494f5c94a8/handskalade%20räkor.jpg"
);

const unfinishedItems = [salmon, chocolate, meatballs];
const oldItems = [shrimps];

const outerWrapper = document.createElement("div");
const innerWrapper = document.createElement("div");
const unfinishedUl = document.createElement("ul");
const finishedUl = document.createElement("ul");
const header = document.createElement("h1");
const oldItemsHeader = document.createElement("h2");

function createForm() {
  const form = document.createElement("form");
  const inputName = document.createElement("input");
  const inputNameLabel = document.createElement("label");
  const inputDescriptionLabel = document.createElement("label");
  const inputDescription = document.createElement("input");
  const addItemBtn = document.createElement("button");

  let userInputName = "";
  let userInputDescription = "";

  inputName.value = "";
  inputDescription.value = "";

  addItemBtn.innerHTML = "Lägg till vara";
  form.classList.add("input-group", "flex-nowrap", "container", "container");
  inputName.classList.add("form-control");
  inputDescription.classList.add("form-control");
  addItemBtn.classList.add("btn", "btn-primary");
  inputName.setAttribute("placeholder", "Vara");
  inputName.setAttribute("name", "name");
  inputName.id = "name";
  inputNameLabel.setAttribute("for", "name");
  inputNameLabel.innerHTML = "Vara";
  inputDescription.setAttribute("placeholder", "Beskrivning");
  inputDescription.id = "description";
  inputDescriptionLabel.setAttribute("for", "description");
  inputDescriptionLabel.innerHTML = "Beskrivning";

  innerWrapper.appendChild(form);
  form.appendChild(inputNameLabel);
  form.appendChild(inputName);
  form.appendChild(inputDescriptionLabel);
  form.appendChild(inputDescription);
  form.appendChild(addItemBtn);

  addItemBtn.addEventListener("click", (e) => {
    e.preventDefault();
    userInputName = inputName.value;
    userInputDescription = inputDescription.value;

    unfinishedItems.push(new Item(userInputName, userInputDescription));
    unfinishedUl.innerHTML = "";
    createHtmlUnfinished()
  });
}

outerWrapper.classList.add("outerwrapper");
innerWrapper.classList.add("outerwrapper");
unfinishedUl.classList.add("unfinishedlist");
finishedUl.classList.add("finishedlist");
header.innerHTML = "Inköpslista";
oldItemsHeader.innerHTML = "Tidigare varor";

document.body.appendChild(outerWrapper);
outerWrapper.appendChild(header);
outerWrapper.appendChild(innerWrapper);
innerWrapper.appendChild(unfinishedUl);
innerWrapper.appendChild(oldItemsHeader);
innerWrapper.appendChild(finishedUl);

function createHtmlUnfinished() {
  unfinishedItems.forEach((item, i) => {
    const textWrapper = document.createElement("section");
    const listItem = document.createElement("li");
    const itemName = document.createElement("h2");
    const itemDescription = document.createElement("p");
    const imageContainer = document.createElement("figure");
    const itemImage = document.createElement("img");

    listItem.classList.add("listitem");
    itemName.innerHTML = item.name;
    itemDescription.innerHTML = item.description;
    textWrapper.classList.add("listitem__textwrapper");
    imageContainer.classList.add("listitem__imagecontainer");
    itemImage.setAttribute("src", item.image);
    itemImage.setAttribute("alt", item.name + " " + "i min inköpslista");

    listItem.addEventListener("click", () => {
      unfinishedItems.splice(i, 1);
      unfinishedUl.innerHTML = "";
      createHtmlUnfinished();
      oldItems.push(item);
      finishedUl.innerHTML = "";
      createHtmlOldItems();
      console.log(unfinishedItems);
      console.log(oldItems);
    });

    unfinishedUl.appendChild(listItem);
    listItem.appendChild(imageContainer);
    imageContainer.appendChild(itemImage);
    listItem.appendChild(textWrapper);
    textWrapper.appendChild(itemName);
    textWrapper.appendChild(itemDescription);
  });
}

function createHtmlOldItems() {
  // console.log(oldItems)

  oldItems.forEach((item, i) => {
    const textWrapper = document.createElement("section");
    const listItem = document.createElement("li");
    const itemName = document.createElement("h2");
    const itemDescription = document.createElement("p");
    const imageContainer = document.createElement("figure");
    const itemImage = document.createElement("img");

    listItem.classList.add("listitem--old");
    textWrapper.classList.add("listitem__textwrapper");
    imageContainer.classList.add("listitem__imagecontainer");
    itemName.innerHTML = item.name;
    itemDescription.innerHTML = item.description;
    itemImage.setAttribute("src", item.image);
    itemImage.setAttribute("alt", item.name + " " + "i min inköpslista");

    listItem.addEventListener("click", () => {
      oldItems.splice(i, 1);
      finishedUl.innerHTML = "";
      createHtmlOldItems();
      unfinishedItems.push(item);
      unfinishedUl.innerHTML = "";
      createHtmlUnfinished();

      console.log(unfinishedItems);
      console.log(oldItems);
    });

    finishedUl.appendChild(listItem);
    listItem.appendChild(imageContainer);
    imageContainer.appendChild(itemImage);
    listItem.appendChild(textWrapper);
    textWrapper.appendChild(itemName);
    textWrapper.appendChild(itemDescription);
  });
}

createHtmlUnfinished();
createHtmlOldItems();
createForm();
console.log(unfinishedItems);
console.log(oldItems);
