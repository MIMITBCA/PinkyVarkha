document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
});

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

function saveCartItem(cartItem) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
function displayPopup() {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.textContent = 'The Dish has been added to cart';
    document.body.appendChild(popup);

    // Remove the popup after a short delay
    setTimeout(() => {
        popup.remove();
    }, 2000); // Adjust the delay as needed (here it's set to 2 seconds)
}
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = cartItems.length;
    cartCountElement.textContent = cartCount; // Update the cart count

    // Store cart count in local storage
    localStorage.setItem('cartCount', cartCount);
}