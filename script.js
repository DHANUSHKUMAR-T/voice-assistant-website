// Speech recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.continuous = false;

const commandOutput = document.getElementById('command-output');
const responseOutput = document.getElementById('response');
const startButton = document.getElementById('start-recognition');

// Speech synthesis setup with female voice
const synth = window.speechSynthesis;
let voice = null;

// Function to set female voice
function setFemaleVoice() {
    const voices = synth.getVoices();
    voice = voices.find(v => v.name.includes('Female')) || voices[0]; // Default to the first available female voice
}
setTimeout(setFemaleVoice, 1000); // Give the browser time to load voices

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    synth.speak(utterance);
}

// Start recognition on button click
startButton.addEventListener('click', () => {
    recognition.start();
    commandOutput.textContent = "Listening for your command...";
});

// Handling speech recognition results
recognition.onresult = function(event) {
    const command = event.results[0][0].transcript.toLowerCase();
    commandOutput.textContent = `You said: "${command}"`;
    handleCommand(command);
};

recognition.onspeechend = function() {
    recognition.stop();
};

recognition.onerror = function(event) {
    commandOutput.textContent = 'Error occurred in recognition: ' + event.error;
};

// Function to handle commands
function handleCommand(command) {
    let response = '';

    // Play a song on YouTube
    if (command.includes('play')) {
        const song = command.replace('play', '').trim();
        response = `Playing ${song} on YouTube`;
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`, '_blank');
        speak(response);

    // Tell the time
    } else if (command.includes('time')) {
        const time = new Date().toLocaleTimeString();
        response = `The current time is ${time}`;
        speak(response);

    // Tell today's date
    } else if (command.includes('date')) {
        const date = new Date().toLocaleDateString();
        response = `Today's date is ${date}`;
        speak(response);

    // Tell a joke
    } else if (command.includes('joke')) {
        response = 'Why don’t skeletons fight each other? They don’t have the guts!';
        speak(response);

    // Google search command
    } else if (command.includes('search')) {
        const query = command.replace('search', '').trim();
        response = `Searching Google for ${query}`;
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        speak(response);

    // Open calendar
    } else if (command.includes('calendar')) {
        response = 'Opening Google Calendar';
        window.open('https://calendar.google.com', '_blank');
        speak(response);

    // Open Gmail
    } else if (command.includes('email')) {
        response = 'Opening Gmail';
        window.open('https://mail.google.com', '_blank');
        speak(response);

    // Default response if command is not understood
    } else {
        response = 'Sorry, I do not understand the command.';
        speak(response);
    }

    responseOutput.textContent = response;
}