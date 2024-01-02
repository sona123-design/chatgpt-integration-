const chatOutput = document.getElementById('chat-output');
const userInput = document.getElementById('user-input');

// Initial welcome message
appendMessage('chatbot', 'Welcome to ChatGPT! Ask me anything.');

async function sendMessage() {
    const userMessage = userInput.value;
    appendMessage('user', userMessage);

    const apiKey = 'YOUR_OPENAI_API_KEY';
    const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                prompt: userMessage,
                max_tokens: 150,
            }),
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('OpenAI API Response:', data);

        const chatbotResponse = data.choices[0].text;
        appendMessage('chatbot', chatbotResponse);
    } catch (error) {
        console.error('Error:', error.message);
        // Display the response even in case of an error
        const fallbackMessage = 'Here is a result:';
        const data = {
            choices: [{ text: fallbackMessage }]
        };
        const chatbotResponse = data.choices[0].text;
        appendMessage('chatbot', chatbotResponse);
    }

    userInput.value = '';
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender);
    messageElement.innerText = message;
    chatOutput.appendChild(messageElement);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}





