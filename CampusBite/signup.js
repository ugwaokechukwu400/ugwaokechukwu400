// Handle Registration & Save User to localStorage
function handleSignup(event) {
    // Prevent page reload on submit
    event.preventDefault();

    const nameInput = document.getElementById('signupName').value.trim();
    const emailInput = document.getElementById('signupEmail').value.trim();
    const passwordInput = document.getElementById('signupPassword').value.trim();
    const confirmPasswordInput = document.getElementById('signupConfirmPassword').value.trim();

    // Check if passwords match
    if (passwordInput !== confirmPasswordInput) {
        alert("Passwords do not match! Please check and try again.");
        return;
    }

    // Fetch existing users database from localStorage
    let users = JSON.parse(localStorage.getItem('campusBiteUsers')) || [];

    // Check if email is already registered
    let existingUser = users.find(user => user.email === emailInput);
    if (existingUser) {
        alert("An account with this email already exists! Please log in instead.");
        window.location.href = "login.html";
        return;
    }

    // Save new user object into the array
    users.push({
        name: nameInput,
        email: emailInput,
        password: passwordInput
    });

    // Save updated users list back to localStorage
    localStorage.setItem('campusBiteUsers', JSON.stringify(users));

    // Success Alert & Redirect to Login Page
    alert("Account created successfully! 🎉 You can now log in with your new details.");
    window.location.href = "login.html";

    // INSIDE YOUR SIGNUP SUCCESS LOGIC:
// After saving the new user details to 'campusBiteUsers', log them in automatically and route them back.

localStorage.setItem('campusBiteLoggedInUser', JSON.stringify(newCreatedUser));
alert("Account created successfully!");

const redirectTo = localStorage.getItem('authRedirectTarget');
if (redirectTo) {
    localStorage.removeItem('authRedirectTarget');
    window.location.href = redirectTo; // Goes straight back to checkout.html!
} else {
    window.location.href = "login.html"; // Standard fallback
}
}