const form = document.getElementById('registerForm');
const qrCodeContainer = document.getElementById('qrCodeContainer');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const loadingMessage = document.getElementById('loadingMessage');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const phoneNumber = document.getElementById('phoneNumber').value;

    // Validate phone number
    if (!/^\d{10,15}$/.test(phoneNumber)) {
        errorMessage.textContent = 'Please enter a valid phone number.';
        loadingMessage.style.display = 'none';
        return;
    }

    // Clear previous messages
    qrCodeContainer.innerHTML = '';
    successMessage.textContent = '';
    errorMessage.textContent = '';
    loadingMessage.style.display = 'block';

    try {
        const userId = window.location.pathname.split('/').pop(); // Extract userId from URL
        const response = await fetch('https://84db-197-211-59-100.ngrok-free.app/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, phoneNumber }),
        });

        const data = await response.json();

        if (response.ok) {
            qrCodeContainer.innerHTML = `<img src="${data.qrCode}" alt="QR Code" />`;
            successMessage.textContent = '🎉 Registration successful! You can now use the TECHITOON BOT.';
        } else {
            errorMessage.textContent = data.message;
        }
    } catch (error) {
        console.error('Error during registration:', error);
        errorMessage.textContent = 'An error occurred. Please try again.';
    } finally {
        loadingMessage.style.display = 'none';
    }
});