document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    displayCartItems();
    displayTotalAmount();
    toggleCheckoutButton(); // Call the function to toggle checkout button
});

function displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name}</p>
            <p>₹${item.price}</p>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });

    toggleCheckoutButton(); // Call the function to toggle checkout button after updating items
}

function displayTotalAmount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);

    const totalAmountContainer = document.querySelector('.total-amount');
    totalAmountContainer.textContent = `₹${totalPrice.toFixed(2)}`;
}
function addToCart(event) {
    const button = event.target;
    const dish = button.parentElement;
    const dishName = dish.dataset.name;
    const dishPrice = dish.dataset.price;

    const cartItem = { name: dishName, price: dishPrice };
    saveCartItem(cartItem);
    displayPopup();
    updateCartCount();
}

function removeFromCart(event) {
    const button = event.target;
    const index = button.dataset.index;

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    displayCartItems();
    displayTotalAmount();
    updateCartCount();
}

function toggleCheckoutButton() {
    const checkoutButton = document.querySelector('.checkout-btn');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems.length > 0) {
        checkoutButton.disabled = false;
    } else {
        checkoutButton.disabled = true;
    }
}
function redirectToCheckout() {
    const totalAmount = document.querySelector('.total-amount').textContent;
    window.location.href = `checkout.html?totalAmount=${totalAmount}`;
}
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = cartItems.length;
    cartCountElement.textContent = cartCount; // Update the cart count

    // Store cart count in local storage
    localStorage.setItem('cartCount', cartCount);
}
