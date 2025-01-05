async function getWhatsappNumber() {
    const response = await fetch(`data/profile.json`);
    const profile = await response.json();
    return profile.whatsapp_number;
}

document.getElementById('whatsapp-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const phoneNumber = await getWhatsappNumber();
    const message = document.getElementById('message-field').value;

    if (message.trim() !== '') {
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, '_blank');
    } else {
      alert('Pesan tidak boleh kosong!');
    }
});