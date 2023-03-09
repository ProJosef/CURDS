let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let content = document.getElementById("content");
let mood = "create";
let j;

function totalOfPrice() {
  if (price.value != "") {
    total.innerHTML =
      +price.value + +taxes.value + +ads.value - +discount.value;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "#f19";
  }
}

let mainArr;
if (localStorage.getItem("product")) {
  mainArr = JSON.parse(localStorage.getItem("product"));
} else {
  mainArr = [];
}
create.onclick = function () {
  let obj = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (mood == "create") {
    if (obj.count > 1) {
      for (let i = 0; i < obj.count; i++) {
        mainArr.push(obj);
      }
    } else {
      mainArr.push(obj);
    }
  } else {
    mainArr[j] = obj;
    mood = "create";
    count.style.display = "block";
    create.innerHTML = "create";
  }

  localStorage.setItem("product", JSON.stringify(mainArr));
  addProduct();
  clearInput();
};
addProduct();
function addProduct() {
  content.innerHTML = "";
  for (let i = 0; i < mainArr.length; i++) {
    content.innerHTML += `
    <div>
<div>${i}</div>
<div>${mainArr[i].title}</div>
<div>${mainArr[i].price}</div>
<div>${mainArr[i].taxes}</div>
<div>${mainArr[i].ads}</div>
<div>${mainArr[i].discount}</div>
<div>${mainArr[i].total}</div>
<div>${mainArr[i].category}</div>
<div><button onclick="update(${i})">update</button></div>
<div><button onclick="remove(${i})">delete</button></div>
</div>`;
  }
  let rm = document.getElementById("rm");

  if (mainArr.length > 0) {
    rm.innerHTML = `<button onclick="removeAll()">remove all pruducts(${mainArr.length})</button>`;
  } else {
    rm.innerHTML = "";
  }
}
function clearInput() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}

function remove(i) {
  mainArr.splice(i, 1);
  addProduct();
  localStorage.product = JSON.stringify(mainArr);
}
function removeAll() {
  mainArr = [];
  localStorage.product.remove;
  addProduct();
}

function update(i) {
  title.value = mainArr[i].title;
  price.value = mainArr[i].price;
  taxes.value = mainArr[i].taxes;
  ads.value = mainArr[i].ads;
  discount.value = mainArr[i].discount;
  category.value = mainArr[i].category;
  total.innerHTML = mainArr[i].total;
  count.style.display = "none";
  create.innerHTML = "Update";
  mood = "Update";
  j = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

function searchtitle() {
  content.innerHTML = "";
  for (let i = 0; i < mainArr.length; i++) {
    if (mainArr[i].title.includes(search.value)) {
      content.innerHTML += `
    <div>
<div>${i}</div>
<div>${mainArr[i].title}</div>
<div>${mainArr[i].price}</div>
<div>${mainArr[i].taxes}</div>
<div>${mainArr[i].ads}</div>
<div>${mainArr[i].discount}</div>
<div>${mainArr[i].total}</div>
<div>${mainArr[i].category}</div>
<div><button onclick="update(${i})">update</button></div>
<div><button onclick="remove(${i})">delete</button></div>
</div>`;
    }
  }
}
function searchcategory() {
  content.innerHTML = "";
  for (let i = 0; i < mainArr.length; i++) {
    if (mainArr[i].category.includes(search.value)) {
      content.innerHTML += `
    <div>
<div>${i}</div>
<div>${mainArr[i].title}</div>
<div>${mainArr[i].price}</div>
<div>${mainArr[i].taxes}</div>
<div>${mainArr[i].ads}</div>
<div>${mainArr[i].discount}</div>
<div>${mainArr[i].total}</div>
<div>${mainArr[i].category}</div>
<div><button onclick="update(${i})">update</button></div>
<div><button onclick="remove(${i})">delete</button></div>
</div>`;
    }
  }
}
