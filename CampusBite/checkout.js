// ==========================================
// CAMPUSBITE - CHECKOUT PRIVACY PROTECTION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('campusBiteLoggedInUser');

    // If NO user session exists (New/Unregistered user trying to checkout)
    if (!loggedInUser) {
        // 1. Notify them
        alert("Please log in or create a new account to complete your checkout.");
        
        // 2. Remember that they wanted to go to checkout.html
        localStorage.setItem('authRedirectTarget', 'checkout.html');
        
        // 3. Kick them to the login page
        window.location.href = "login.html";
    }
    // Existing users or users logged in via "Remember Me" bypass this entirely with no popups!
});
// Function to calculate and render the grand total on checkout.html
function displayCheckoutTotal() {
    // Retrieve cart items from localStorage using CampusBite's exact key
    let cart = JSON.parse(localStorage.getItem('campusBiteCart')) || [];
    
    const checkoutTotalEl = document.getElementById('checkoutTotal');
    if (!checkoutTotalEl) return;

    // If cart is empty
    if (cart.length === 0) {
        checkoutTotalEl.innerText = '₦200'; // Just delivery fee or ₦0
        return;
    }

    // Calculate subtotal from cart items safely
    let subtotal = 0;
    cart.forEach(item => {
        let price = Number(item.price) || 1;
        let quantity = Number(item.quantity) || 1;
        subtotal += price * quantity;
    });

    // Add fixed ₦200 delivery runner fee
    let deliveryFee = 200;
    let grandTotal = subtotal + deliveryFee;

    // Update the total display element on checkout.html
    checkoutTotalEl.innerText = `₦${grandTotal.toLocaleString()}`;
}

// Function to handle moving to account-number.html
function goToAccountNumber() {
    let cart = JSON.parse(localStorage.getItem('campusBiteCart')) || [];
    
    if (cart.length === 0) {
        alert("Your cart is empty! Please add food before checking out.");
        window.location.href = "menu.html";
        return;
    }

    // Move to the final payment screen
    window.location.href = "account-number.html";
}

// Run automatically when checkout.html finishes loading
document.addEventListener('DOMContentLoaded', displayCheckoutTotal);