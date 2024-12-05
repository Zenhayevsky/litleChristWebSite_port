let cart = [];
const TAX_RATE = 0.15; // quebec
const shipping = 5;
const modal = document.getElementById("payment-modal");
const openModalButton = document.getElementById("open-modal");
let timeOnProductPage = 0;
let timeOnFormPage = 0;
let productPageStartTime = Date.now();
let formPageStartTime = 0;
let totalItem = 0;
const inputs = document.querySelectorAll('input[type="number"]');

function calculateItems() {
  totalItem = 0;
  if (cart.length > 0) {
    cart.forEach((element) => {
      totalItem += element.quantity;
    });
  }
}

//actualize the time on the products page
setInterval(() => {
  timeOnProductPage = Math.floor((Date.now() - productPageStartTime) / 1000);
  document.getElementById("time-spent-products").textContent =
    timeOnProductPage;
}, 1000);

//Open the formularie and start the time
openModalButton.addEventListener("click", () => {
  if (cart.length > 0) {
    updateCartSummary(); // actualize the buy
    formPageStartTime = Date.now(); // initial time
    modal.style.display = "block";
  } else {
    alert(`Your cart is emty. Please, chose a product to add to your cart `);
  }
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// adding a product to the cart
function addToCart(product, price, quantityInputId) {
  let quantityToAdd = document.getElementById(quantityInputId).value;

  if (quantityToAdd > 0) {
    const quantity = parseInt(quantityToAdd, 10) || 1;
    const existingItem = cart.find((item) => item.product === product);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ product, price, quantity });
    }

    calculateItems();

    alert(
      `${quantity} ${product}(s) added to cart!. Now, you have ${totalItem} items i your cart`
    );
    localStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById(
      "itemsOnCart"
    ).innerHTML = ` &nbsp ${totalItem} item(s)`;
  } else {
    //Message chose an item
    alert(`How many ${product} (s) do you want to add to your cart? `);
  }
}

//updating the cart
function updateCartSummary() {
  const cartSummary = document.getElementById("cart-summary");
  const totalPriceE1 = document.getElementById("total-price");

  cartSummary.innerHTML = ""; //clear previous summary
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  let subtotal = 0;

  storedCart.forEach((element) => {
    const totalItemPrice = element.price * element.quantity;
    subtotal += totalItemPrice;

    const itemDiv = document.createElement("div");
    itemDiv.textContent = `${element.quantity} x ${element.product} $${
      element.price
    } = $${totalItemPrice.toFixed(2)}`;
    cartSummary.appendChild(itemDiv);
  });

  const taxes = subtotal * TAX_RATE;
  const total = subtotal + shipping + taxes;

  cartSummary.insertAdjacentHTML(
    "beforeend",
    `<div class="field">
            <p>Subtotal: $${subtotal.toFixed(2)}</p>
        </div>
        <div class="field">
        <p>Shipping: $${shipping}</p>
        </div>
        <div class="field">
        <p>Taxes (15%): $${taxes.toFixed(2)}</p>
        </div>`
  );

  totalPriceE1.textContent = total.toFixed(2);
}

// sending the formularie
document.getElementById("payment-form").addEventListener("submit", (e) => {
  e.preventDefault();

  //calculate the time on the formularie
  timeOnFormPage = Math.floor((Date.now() - formPageStartTime) / 1000);

  //taking the formularie data
  const formData = new FormData(document.getElementById("payment-form"));
  const formDetails = {};
  let personalData = "";
  formData.forEach((value, key) => {
    formDetails[key] = value;
    personalData += `\n ${key} :  ${value}`;
  });

  //show the data in an alert and also the times spented
  const confirmation = confirm(`
        Confirm your purchase:
        ${personalData}
        \n\nTime on Product Page: ${timeOnProductPage} seconds
        \nTime on Form Page: ${timeOnFormPage} seconds
  `);

  // If the user clicks "Confirm"

  if (confirmation) {
    //fechar modal
    modal.style.display = "none";

    //Resert formulaire
    document.getElementById("payment-form").reset();

    //empty the cart and clear the storage
    cart = [];
    localStorage.removeItem("cart");
    inputs.forEach((input) => {
      input.value = 0;
    });
    totalItem = 0;

    // update the cart
    updateCartSummary();

    //Message sucess
    alert("Thank you for your puchase");
  }

  document.getElementById("itemsOnCart").innerHTML = "";
});

// empty cart with the button "empty cart" manually
function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  alert("CART CLEARED!");

  //all inputs in zero because the cart is empty
  inputs.forEach((input) => {
    input.value = 0;
  });
  totalItem = 0;
  document.getElementById("itemsOnCart").innerHTML = "";
}
