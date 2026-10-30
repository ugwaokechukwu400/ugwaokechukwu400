// ==========================================
// CAMPUSBITE - MENU & CART HELPER SCRIPT
// ==========================================

// Initialize cart array from localStorage
let cart = JSON.parse(localStorage.getItem('campusBiteCart')) || [];

// Add item to cart function
function addToCart(id, name, price, defaultFlavor = '') {
    let existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1,
            flavor: defaultFlavor
        });
    }

    // Save to localStorage and update badge count
    localStorage.setItem('campusBiteCart', JSON.stringify(cart));
    updateCartCount();

    // Show Custom Toast Notification
    showNotification(`Added <strong>${name}</strong> to your cart! 🛒`);
}

// Custom Toast Notification Function
function showNotification(message) {
    const toastEl = document.getElementById('cartToast');
    const toastMsg = document.getElementById('toastMessage');

    if (toastEl && toastMsg) {
        toastMsg.innerHTML = message;
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    } else {
        console.log(message);
    }
}

// Update dynamic badge count in navbar
function updateCartCount() {
    const cartCountBadge = document.getElementById('cartCountBadge');
    if (cartCountBadge) {
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountBadge.innerText = totalCount;
    }
}

// Run counter when the page finishes loading
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});