class cartItem {
  constructor(name, img, price, quantity, size) {
    this.name = name;
    this.img = img;
    this.price = price;
    this.quantity = quantity;
    this.size = size;
  }
}
class LocalCart {
  static key = "cartItems";
  static getLocalCartItems() {
    let cartMap = new Map();
    const cart = localStorage.getItem(LocalCart.key);
    if (cart === null || cart.length === 0) return cartMap;

    return new Map(Object.entries(JSON.parse(cart)));
  }
  static addItemToLocalCart(id, item) {
    let cart = LocalCart.getLocalCartItems();
    if (cart.has(id)) {
      let mapItem = cart.get(id);
      mapItem.quantity =
        mapItem.quantity +
        Number(document.getElementsByClassName("print-quantity")[0].value);
      cart.set(id, mapItem);
    } else cart.set(id, item);
    localStorage.setItem(
      LocalCart.key,
      JSON.stringify(Object.fromEntries(cart))
    );
    updateCartUI();
  }
  static deleteItemFromCart(id) {
    let cart = LocalCart.getLocalCartItems();
      cart.delete(id);
      if (cart.length === 0) localStorage.clear();
      else
        localStorage.setItem(
          LocalCart.key,
          JSON.stringify(Object.fromEntries(cart))
        );
      updateCartUI();
  
  }
  static addItemFromCart(id) {
    let cart = LocalCart.getLocalCartItems();
    if (cart.has(id)) {
      let mapItem = cart.get(id);
      if (mapItem.quantity > 1) {
        mapItem.quantity += 1;
        cart.set(id, mapItem);
      } 
    }
    if (cart.length === 0) localStorage.clear();
    else
      localStorage.setItem(
        LocalCart.key,
        JSON.stringify(Object.fromEntries(cart))
      );
    updateCartUI();
  } 
  static removeItemFromCart(id) {
    let cart = LocalCart.getLocalCartItems();
    if (cart.has(id)) {
      let mapItem = cart.get(id);
      if (mapItem.quantity > 1) {
        mapItem.quantity -= 1;
        cart.set(id, mapItem);
      } else cart.delete(id);
    }
    if (cart.length === 0) localStorage.clear();
    else
      localStorage.setItem(
        LocalCart.key,
        JSON.stringify(Object.fromEntries(cart))
      );
    updateCartUI();
  }
}

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  var removeCartBtn = document.getElementsByClassName("delete-btn");
  for (var i = 0; i < removeCartBtn.length; i++) {
    var btn = removeCartBtn[i];
    btn.addEventListener("click", removeCartItem);
  }

  var quantityInput = document.getElementsByClassName("print-quantity");
  for (var i = 0; i < quantityInput.length; i++) {
    var input = quantityInput[i];
    input.addEventListener("change", quantityChange);
  }
  var addtoCartButtons = document.getElementsByClassName("add-cart-btn");
  for (var i = 0; i < addtoCartButtons.length; i++) {
    var button = addtoCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  updateCartUI();

}

let temp;
function quantityChange(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function changeImg(newSrc) {
  var newSrcNow = newSrc.src;
  var imageZome = document.getElementById("I-gallaryZome");
  imageZome.src = newSrcNow;
}
function removeCartItem(event) {
  var btnClicked = event.target;
  btnClicked.parentElement.parentElement.parentElement.remove();
  updateCartTotal();
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-container")[0];
  var cartContents = cartItemContainer.getElementsByClassName("sum-product");
  var total = 0;
  for (var i = 0; i < cartContents.length; i++) {
    var cartContent = cartContents[i];
    var priceEl = cartContent.getElementsByClassName("price-properties")[0];
    var quantityEl = cartContent.getElementsByClassName("print-quantity")[0];
    console.log(priceEl, quantityEl);
    var price = priceEl.innerText.replace("đ", "");
    console.log(price);
    var quantity = quantityEl.value;
    console.log(quantity);
    total = total + price * quantity;
    console.log(total);
  }
  document.getElementsByClassName("price-final")[0].innerText = total + "đ";
}
let radioBtns = document.querySelectorAll("input[name='size']");
let findSelected = () => {
  let selected = document.querySelector("input[name='size']:checked");
  size = selected.value;
};
radioBtns.forEach((radioBtns) => {
  radioBtns.addEventListener("change", findSelected);
});

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement.parentElement;
  var title =
    shopItem.getElementsByClassName("title-product-name")[0].innerText;
  const id =
    event.target.parentElement.parentElement.parentElement.getAttribute(
      "data-id"
    );
  const finalId = id + size;
  var priceEl = shopItem.getElementsByClassName("price-product")[0].innerText;
  let price = priceEl.substring(0, priceEl.length - 1);
  var sL = Number(shopItem.getElementsByClassName("print-quantity")[0].value);
  let tempp = sL;
  console.log(typeof sL);
  var img = shopItem.getElementsByClassName("img-thumbnail")[0].src;

  console.log(title, img, price, sL, size);

  const item = new cartItem(title, img, price, sL, size);
  LocalCart.addItemToLocalCart(finalId, item);
}

function updateCartUI() {
  const cartContainer = document.querySelector(".cart-container");
  cartContainer.innerHTML = "";


  const items = LocalCart.getLocalCartItems("cartItems");
  console.log(items);
  if (items === null) return;
  let count = 0;
  let total = 0;
  for (const [key, value] of items.entries()) {
    const holder = document.createElement("div");
    holder.classList.add("sum-product");
    let totalPrice = value.price * value.quantity;
    count += 1;
    total += totalPrice;
    holder.innerHTML = `
            <div class="image-product">
                <img class="img-product" src="${value.img}" alt="hình ảnh" />
            </div>
            <div class="title-product">
                <div class="properties-product">
                    <p class="name-properties">${value.name}</p>
                    <p class="price-properties">${value.price}</p>
                    <p class="size-properties">${value.size}</p>
                    <div class="detail-quantity">
                    <button type="button" class="subtract-btn" >-</button>
                    <input type="number" class="print-quantity" value="${value.quantity}" readonly>             
                    <button  type="button" class="add-btn" >+</button>           
                    
                        </div>
                </div>
                
                    <button class="delete-btn" href="#"
                        > 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
                    </button>
                
                
            </div>`;

    holder.lastElementChild.firstElementChild.lastElementChild.firstElementChild.addEventListener("click", () => {
      LocalCart.removeItemFromCart(key);
    });
    holder.lastElementChild.lastElementChild.addEventListener("click" ,() => {
      LocalCart.deleteItemFromCart(key);
    })
    holder.lastElementChild.firstElementChild.lastElementChild.lastElementChild.addEventListener("click", () => {
      LocalCart.addItemFromCart(key);
    });


    cartContainer.append(holder);
    
  }

  if (count >= 0) {
    const subtotal = document.querySelector(".price-final");
    subtotal.innerHTML = total;
    let input = document.getElementsByClassName("print-quantity");
    input.addEventListener("change", () => {
      const subtotal = document.querySelector(".price-final");
      subtotal.innerHTML = total;
    });
  }
 
}

