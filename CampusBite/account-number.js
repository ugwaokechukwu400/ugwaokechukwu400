// ==========================================
// CAMPUSBITE - BANK TRANSFER MANAGEMENT SYSTEM
// ==========================================

// Helper function to clean prices safely against both N and ₦ symbols
function parsePrice(val) {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    
    // Removes ₦, regular letter N, commas, and spaces completely to ensure a clean number
    let clean = String(val).replace(/[₦N,]/gi, '').trim();
    return Number(clean) || 0;
}

// Display the total amount due on page load
document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('campusBiteCart')) || [];
    let subtotal = 0;

    cart.forEach(item => {
        let priceNum = parsePrice(item.price);
        let qty = Number(item.quantity) || 1;
        subtotal += priceNum * qty;
    });

    let deliveryFee = 200;
    let grandTotal = subtotal + deliveryFee;

    const amountEl = document.getElementById('finalTransferAmount');
    if (amountEl) {
        amountEl.innerText = `₦${grandTotal.toLocaleString()}`;
    }
});

// Confirm Transfer & Simulation Flow -> Clear Cart -> Show Success Screen
function confirmTransferOrder() {
    // 1. Target your payment confirmation button to run the spinner animation
    const confirmBtn = document.getElementById('confirmTransferBtn') 
                    || Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('transfer'));

    if (confirmBtn) {
        // Lock button interaction so users cannot trigger duplicate requests
        confirmBtn.disabled = true;
        
        // Transform inner label to native rolling Bootstrap loading state
        confirmBtn.innerHTML = `
            <div class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
            Verifying Transfer... Please wait a moment.
        `;
    }

    // 2. The spinner runs for exactly 4 seconds (Simulating bank verification checkpoints)
    setTimeout(() => {
        // Clear out user's active checkout basket database entries
        localStorage.removeItem('campusBiteCart');

        // 3. Render your custom receipt interface seamlessly right inside main
        const mainContainer = document.querySelector('main');
        if (mainContainer) {
            mainContainer.innerHTML = `
                <div class="row justify-content-center py-4">
                    <div class="col-md-8 text-center bg-white p-5 rounded-4 shadow-sm border">
                        <div class="mb-3 fs-1 text-success">🎉</div>
                        <h2 class="fw-bold text-dark mb-3">Payment Confirmed!</h2>
                        <p class="text-secondary fs-5 mb-4">
                            Thank you! Your transfer is being verified. Our campus dispatch rider has received your order and is heading your way! 🚴‍♂️💨
                        </p>
                        <div class="d-flex justify-content-center gap-3">
                            <a href="menu.html" class="btn btn-warning fw-bold text-dark px-4 py-2">Order More Food 🍔</a>
                            <a href="index.html" class="btn btn-outline-dark fw-semibold px-4 py-2">Back to Home 🏠</a>
                        </div>
                    </div>
                </div>
            `;
        }
    }, 4000); // 4 seconds delay tracker
}