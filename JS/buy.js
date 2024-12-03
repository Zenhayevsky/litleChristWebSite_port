let cart = [];
const TAX_RATE = 0.13;
const modal = document.getElementById("payment-modal");
const openModalButton = document.getElementById("open-modal");

openModalButton.addEventListener("click", () => {
    updateCartSummary(); //u[date cart details before showing]
    modal.style.display = "block";
})

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
})

function addToCart(product,price,quantityInputId) {
    const quantity = parseInt(document.getElementById(quantityInputId).value, 10) || 1;
    const existingItem = cart.find((item) => item.product === product);

    if (existingItem) {
        existingItem.quantity += quantity;
    }else {
        cart.push({product, price, quantity});
    }

    alert(`${quantity} ${product}(s) added to cart!`);
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartSummary() {
    const cartSummary = document.getElementById("cart-summary");
    const totalPriceE1 = document.getElementById("total-price");

    cartSummary.innerHTML = ""; //cart previous summary
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    let subtotal = 0;

    storedCart.array.forEach(element => {
        const totalItemPrice = element.price * element.quantity;
        subtotal += totalItemPrice;

        const itemDiv = document.createElement("div");
        itemDiv.textContent = `${element.quantity} x ${element.product} $${element.price} = $${totalItemPrice.toFixed(2)}`;
        cartSummary.appendChild(itemDiv);
    });

    const taxes = subtotal * TAX_RATE;
    const total = subtotal + taxes;

    cartSummary.insertAdjacentHTML(
        "beforeend",
        `<p>Subtotal: $${subtotal.toFixed(2)}</p>
        <p>Taxes (13%): $${taxes.toFixed(2)}</p>
        <p><strong>Total:$${total.toFixed(2)}</strong></p>`
    );

    totalPriceE1.textContent = total.toFixed(2);
}