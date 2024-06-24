document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value;

    fetch('/submit-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json().then(data => ({ status: response.status, body: data }));
    })
    .then(({ status, body }) => {
        const messageContainer = document.getElementById('messageContainer');
        let messageClass = '';

        if (status === 200 || status === 201) {
            messageClass = 'text-green-500';
        } else if (status === 409) { // Conflict status for already existing entry
            messageClass = 'text-yellow-500';
        } else {
            messageClass = 'text-red-500';
        }

        messageContainer.innerHTML = `<h1 class="${messageClass}">${body.message}</h1>`;

        // Clear the email input value
        emailInput.value = '';

        // Remove the message after 5 seconds
        setTimeout(() => {
            messageContainer.innerHTML = '';
            email.value = '';
        }, 5000);
    })
    .catch(error => {
        console.error('Error:', error);
        const messageContainer = document.getElementById('messageContainer');
        messageContainer.innerHTML = `<div class="text-red-500 mt-2">Failed to submit email. Please try again.</div>`;
    });
});
