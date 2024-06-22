function sendToWhatsApp() {
    const inputField = document.getElementById('inputTextarea');
    const inputValue = inputField.value;
    const whatsappNumber = '9324339904';
    const whatsappMessage = `Hello there! I would like to get a call from you for `;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, '_blank');
  }