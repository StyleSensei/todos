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

const unfinishedItems = [salmon, chocolate, meatballs];

const outerWrapper = document.createElement("div");
const innerWrapper = document.createElement("div");
const unfinishedUl = document.createElement("ul");
const finishedUl = document.createElement("ul");
const listItem = document.createElement("section");

outerWrapper.classList.add("outerwrapper");
innerWrapper.classList.add("outerwrapper");
unfinishedUl.classList.add("unfinishedlist");
finishedUl.classList.add("finishedlist");
listItem.classList.add("listitem");

document.body.appendChild(outerWrapper);
outerWrapper.appendChild(innerWrapper);
innerWrapper.appendChild(unfinishedUl);
innerWrapper.appendChild(finishedUl);

for (let i = 0; i < unfinishedItems.length; i++) {
  const itemName = document.createElement("h2");
  const itemDescription = document.createElement("p");
  const imageContainer = document.createElement("figure")
  const itemImage = document.createElement("img");

  itemName.innerHTML = unfinishedItems[i].name
  itemDescription.innerHTML = unfinishedItems[i].description
  imageContainer.classList.add("imagecontainer")
  itemImage.setAttribute("src",unfinishedItems[i].image)
  itemImage.setAttribute("alt", unfinishedItems[i].name + " " + "i min inköpslista")

  finishedUl.appendChild(listItem)
  listItem.appendChild(itemName);
  listItem.appendChild(itemDescription);
  listItem.appendChild(imageContainer);
  imageContainer.appendChild(itemImage);
}
