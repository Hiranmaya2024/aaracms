document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    errorMessage.textContent = '';

    try {
        const credentials = await getLoginCredentials();
        const user = credentials.find(row => row[0] === username && row[1] === password);

        if (user) {
            // Store user info in sessionStorage
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('userType', user[2]);
            sessionStorage.setItem('username', username);

            // Redirect based on user type
            if (user[2] === 'staff') {
                window.location.href = 'pages/staff.html';
            } else if (user[2] === 'customer') {
                window.location.href = 'pages/customer.html';
            } else {
                errorMessage.textContent = 'Unauthorized Access';
            }
        } else {
            errorMessage.textContent = 'Invalid username or password';
        }
    } catch (error) {
        errorMessage.textContent = 'An error occurred. Please try again.';
        console.error('Authentication error:', error);
    }
});
