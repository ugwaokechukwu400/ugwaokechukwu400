// ==========================================
// CAMPUSBITE - LOGIN SCRIPT
// ==========================================

function handleLogin(event) {
    if (event) event.preventDefault();

    const emailInput = document.getElementById('loginEmail') || document.getElementById('authEmail');
    const passwordInput = document.getElementById('loginPassword') || document.getElementById('authPassword');
    const rememberMeInput = document.getElementById('rememberMe'); // Matches your remember me checkbox ID

    if (!emailInput || !passwordInput) {
        alert("Please fill in all required fields.");
        return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let users = JSON.parse(localStorage.getItem('campusBiteUsers')) || [];
    let foundUser = users.find(user => user.email === email);

    if (!foundUser) {
        alert("No account found with this email. Redirecting to sign up.");
        window.location.href = "signup.html";
        return;
    }

    if (foundUser.password !== password) {
        alert("Incorrect password! Please check your details and try again.");
        return;
    }

    // Existing User Confirmation Message (FIXED)
    alert("Logged in successfully! Welcome back.");

    // Handle Remember Me feature
    if (rememberMeInput && rememberMeInput.checked) {
        localStorage.setItem('campusBiteRememberedUser', JSON.stringify(foundUser));
    }

    // Save active session
    localStorage.setItem('campusBiteLoggedInUser', JSON.stringify(foundUser));

    // Redirect back to checkout if they were sent here from checkout, otherwise send to home/dashboard
    const redirectTo = localStorage.getItem('authRedirectTarget');
    if (redirectTo) {
        localStorage.removeItem('authRedirectTarget'); // clear it
        window.location.href = redirectTo;
    } else {
        window.location.href = "index.html"; // Fallback page if they just logged in directly
    }
}

// Check if user chose "Remember Me" previously to skip login completely
document.addEventListener('DOMContentLoaded', () => {
    const rememberedUser = localStorage.getItem('campusBiteRememberedUser');
    // if (rememberedUser) {
    //     localStorage.setItem('campusBiteLoggedInUser', rememberedUser);
    //     // If they are on the login page but are remembered, send them where they need to go
    //     const redirectTo = localStorage.getItem('authRedirectTarget') || "index.html";
    //     localStorage.removeItem('authRedirectTarget');
    //     window.location.href = redirectTo;
    //     return;
    // }

    const loginForm = document.getElementById('loginForm') || document.getElementById('authForm') || document.querySelector('form');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
});