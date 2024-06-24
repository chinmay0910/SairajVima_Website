function createWhatsAppLink( message) {
    // Encode the message for URL
    const phoneNumber = '9324339904'
    let encodedMessage = encodeURIComponent("I need information about "+message);

    // Construct the WhatsApp link
    let whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappLink, '_blank');
}