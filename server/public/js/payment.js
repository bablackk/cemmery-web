class LocalCart {
    static key = "cartItems";
    static getLocalCartItems() {
      let cartMap = new Map();
      const cart = localStorage.getItem(LocalCart.key);
      if (cart === null || cart.length === 0) return cartMap;
  
      return new Map(Object.entries(JSON.parse(cart)));
    }
}
function updatePaymentUI() {
    const paymentContainer = document.querySelector(".payment_product-holder");
    const items = LocalCart.getLocalCartItems("cartItems");
    console.log(items);
    console.log('hello')
    if (items === null) return;
    let count = 0;
    let total = 0;   
    let shipping = 15000;
    
    for (const [key, value] of items.entries()) {
      const payment = document.createElement("div");
      payment.classList.add("product");
      let totalPrice = value.price * value.quantity;
      count += 1;
      total += totalPrice;
      payment.innerHTML =`
      <div class="img"><img class="img-product-pay" src="${value.img}" alt="hình ảnh"/></div>
      <div class="properties">
        <div class="title-properties">
          <p class="name-properties">${value.name}</p>
          <p class="size">${value.size}</p>
          <p>S&#x1ED1; l&#x1B0;&#x1EE3;ng: <span>${value.quantity}</span></p>
        </div>
        <div class="price-properties"><span>${value.price}đ</span></div>
      </div>
      `
      paymentContainer.append(payment)
    }
    if (count >= 0) {
      const ship = document.querySelector('.shipping-price')
      const subtotal = document.querySelector(".payment_final-price");
      if(total >= 500000) {
        subtotal.innerHTML = total +"đ";
        ship.innerHTML = 'Free'
      }
      else {
        subtotal.innerHTML = total + shipping+"đ";
        ship.innerHTML = shipping+"đ"
      }
      
    }
  } document.addEventListener("DOMContentLoaded", updatePaymentUI);