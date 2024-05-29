document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});
let slideIndex = 1;
showSlide(slideIndex);

function moveSlide(n) {
    showSlide(slideIndex += n);
}

function showSlide(n) {
    let slides = document.getElementsByClassName("slide");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex-1].style.display = "block";  
}
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = cartItems.length;
    cartCountElement.textContent = cartCount; // Update the cart count

    // Store cart count in local storage
    localStorage.setItem('cartCount', cartCount);
}
