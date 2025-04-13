async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const userMessage = input.value;

    if (!userMessage) return;

    // Exibe a mensagem do usuário
    chatBox.innerHTML += `<div><strong>Você:</strong> ${userMessage}</div>`;
    input.value = '';

    // Envia para o servidor
    const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();

    // Exibe a resposta do chatbot
    chatBox.innerHTML += `<div><strong>IGSBot:</strong> ${data.reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}
