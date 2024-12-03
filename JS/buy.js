let cart = [];
const TAX_RATE = 0.13; // Example: 13% (Ontario HST)
const modal = document.getElementById("payment-modal");
const openModalButton = document.getElementById("open-modal");
const closeModalButton = document.getElementById("close-modal");

openModalButton.addEventListener("click", () => {
  updateCartSummary(); // Update cart details before showing
  modal.style.display = "block";
});

closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

function addToCart(product, price, quantityInputId) {
  const quantity = parseInt(document.getElementById(quantityInputId).value, 10) || 1;
  const existingItem = cart.find((item) => item.product === product);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, price, quantity });
  }

  alert(`${quantity} ${product}(s) added to cart!`);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartSummary() {
  const cartSummary = document.getElementById("cart-summary");
  const totalPriceEl = document.getElementById("total-price");

  cartSummary.innerHTML = ""; // Clear previous summary
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  let subtotal = 0;

  storedCart.forEach((item) => {
    const totalItemPrice = item.price * item.quantity;
    subtotal += totalItemPrice;

    const itemDiv = document.createElement("div");
    itemDiv.textContent = `${item.quantity} x ${item.product} @ $${item.price} = $${totalItemPrice.toFixed(2)}`;
    cartSummary.appendChild(itemDiv);
  });

  const taxes = subtotal * TAX_RATE;
  const total = subtotal + taxes;

  cartSummary.insertAdjacentHTML(
    "beforeend",
    `<p>Subtotal: $${subtotal.toFixed(2)}</p>
     <p>Taxes (13%): $${taxes.toFixed(2)}</p>
     <p><strong>Total: $${total.toFixed(2)}</strong></p>`
  );

  totalPriceEl.textContent = total.toFixed(2);
}
