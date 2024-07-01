
let ismicon = 1;
let audioContext;
let microphone;
let gainNode;
import API from './app.json' with { type: 'json' };
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();;

// Index.html page load events
window.onload = async () => {
    // When the page is loaded, the following actions are initiated

    // Initializing Microphone
    initMicrophone().then(() => {
        console.log('Microphone initialized and listening...');
    }).catch(error => {
        console.error('Error initializing microphone:', error);
    });

    // Allows your web browser to get permission for microphone access
    requestMicrophoneAccess();

    // Recognition parameters and events
    recognition.lang = `${API.LANGUAGE}`;
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.addEventListener('result', e => {
        // Recognition Transcript word by word
        // You need to combine the results to get the last completed sentence
        // By checking the 'isFinal' property, we retrieve and merge only completed (final) transcripts. 
        // This way, we only get the last completed sentence
        let finalTranscript = '';
        for (let i = 0; i < e.results.length; i++) {
            if (e.results[i].isFinal) {
                finalTranscript += e.results[i][0].transcript;
            }
        }
        let transcript = finalTranscript.trim();
        if (transcript.length > 0) {
            console.log('User : ', transcript);

            // Sends user STT message to index.html
            addUserText(transcript);

            // Sends chat request to OpenAI
            sendChatRequest(transcript);
        }
    });
    recognition.addEventListener('end', () => {
        // Allows restarting Recognition when it ends
        // If microphone is listening
        // This condition prevents Recognition from restarting when the microphone is off
        if (ismicon == 1) {
            recognition.start();
            console.log('Recognition restarted', '');
        }
    });
    recognition.addEventListener('error', () => {
        console.log('Recognition : ', 'ERROR !');
    });

    // Recognition is started when the page loads
    recognition.start();
    console.log('Recognition started', '');
    
};

// Sends chat request to OpenAI
async function sendChatRequest(message) {
    try {
        // Recognition is stopped so that the microphone does not hear the sound when OpenAI text to speech is played
        // Web browsers like Google Chrome may not allow to manage the microphone, so Recognition is also stopped.
        recognition.stop();
        // Microphone is mute
        muteMicrophone();
        // The 'ismicon' value is set to '0' so that Recognition is not restarted when the microphone is off
        ismicon = 0;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API.OPENAIAPI}` // Your OpenAI API key is called from app.json
            },
            body: JSON.stringify({
                'model': 'gpt-4o',
                'messages': [
                    {
                        'role': 'system',
                        'content': `${API.SYSTEMMESSAGE}`// Your system message is called from app.json
                    },
                    {
                        'role': 'user',
                        'content': `${message}` // Call from function parameter
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Network response was not ok: ${errorText}`);
            throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const responseText = data.choices[0].message.content;
        // We send the response returned from ChatGPT to the Text To Speech API
        await sendSpeechRequest(responseText);
        // We send the text message returned from ChatGPT to index.html
        await addSystemText(responseText);
        console.log('System : ', responseText);
    } catch (error) {
        console.error('OpenAI : ', error);
    }
}

// Sends text to speech request to OpenAI
async function sendSpeechRequest(speechmessage) {
    try {
        // 
        const response = await fetch('https://api.openai.com/v1/audio/speech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API.OPENAIAPI}`  // Your OpenAI API key is called from app.json
            },
            body: JSON.stringify({
                'model': 'tts-1',
                'input': `${speechmessage}`,
                'voice': `${API.VOICE}` // Your voiceover option is called from app.json
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Network response was not ok: ${errorText}`);
            throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const audioBlob = new Blob([arrayBuffer], { type: 'audio/wav' });
        // We send the blob audio returned from the OpenAI Text To Speech API to the player
        playAudio(audioBlob);
    } catch (error) {
        console.error('OpenAI : ', error);
    }
}

// Sends user STT message to index.html
async function addUserText(newText) {
    const paragraph = document.getElementById('usermessage');
    paragraph.innerHTML += newText + '<br>';
}

// Sends system text message to index.html
async function addSystemText(newText) {
    const paragraph = document.getElementById('systemmessage');
    paragraph.innerHTML += newText + '<br>';
}

// Request microphone access permission from web browser
async function requestMicrophoneAccess() {
    const status = document.getElementById('status');

    // Tarayýcý getUserMedia API'sini destekliyor mu kontrol et
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Request microphone access permission
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                // Access granted
                status.innerText = "Mikrofon izni verildi.";
                // Stop microphone streaming (optional, we only use it to get permission)
                stream.getTracks().forEach(track => track.stop());
            })
            .catch(function (err) {
                // Access denied
            });
    } else {
        status.innerText = "Tarayýcýnýz mikrofon izni özelliðini desteklemiyor.";
    }
}

// Audio blob received from OpenAI played in audio player
async function playAudio(audioBlob) {
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);

    // Turn the microphone back on when the sound is finished
    audio.addEventListener('ended', () => {
        console.log('Audio ended, starting recognition...');
        // When the player finishes playing the audio, we turn on the microphone and start Recognition
        ismicon = 1;
        recognition.start();
        unmuteMicrophone();
    });

    audio.play();
}

// Initializing Microphone
async function initMicrophone() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    microphone = audioContext.createMediaStreamSource(stream);
    gainNode = audioContext.createGain();
    gainNode.gain.value = 1; // Varsayýlan ses seviyesi

    microphone.connect(gainNode).connect(audioContext.destination);
}

// Microphone mute
async function muteMicrophone() {
    if (gainNode) {
        gainNode.gain.value = 0; // Mikrofonu sessize al
        console.log('Microphone muted');
    }
}

// Microphone unmute
async function unmuteMicrophone() {
    if (gainNode) {
        gainNode.gain.value = 1; // Mikrofonu aç
        console.log('Microphone unmuted');
    }
}

