<h2>Speech To OpenAI</h2>
<h3>Speech To Text => ChatGPT => Text To Speech</h3>
<p>Node.js, Express, Cors, Java Script</p>
<p>With this illustration, you can reinforce the chatting environment by talking to ChatGPT</p>
<h3>API's</h3>
<ul>
  <li>Google Speech To Text API</li>
  <li>OpenAI Chat Completion API</li>
  <li>OpenAI Text To Speech API</li>
</ul>

<h3>Installation</h3>
<p>Go to your Visual Studio Solution Explorer area</p>
<p>Right click on solution name</p>
<p>Select "Open with Terminal"</p>
<p>Type this command on Developer Powershell</p>
<pre>npm install</pre>
<p>When you run this command, a directory called "node_modules" is created in the project root directory and the required modules are saved in this directory. You can also see the modules installed under npm in Solution Explorer. You do not need to include the "node_modules" directory in your project.</p>
<p>Start project with "Start" button or type this command</p>
<pre>node app.js</pre>
<h3>Regulation</h3>
<p>app.json</p>
<pre>
{
    "OPENAIAPI": "YOUR_OPENAI_API_KEY",
    "VOICE": "onyx",
    "LANGUAGE": "en-GB",
    "SYSTEMMESSAGE": "You are a helpful assistant."
}
</pre>
<h3>OPENAIAPI</h3>
<p>You must write your OpenAI API key in the "YOUR_OPENAI_API_KEY" field</p>
<h3>VOICE</h3>
<p>The voice to use when generating the audio. Supported voices are :</p>
<pre>
  alloy , echo , fable , onyx , nova , shimmer
</pre>

<h3>LANGUAGE</h3>
<p>You should edit the "LANGUAGE" field according to your language</p>
<p>This field is important for the Google Speech To Text API</p>
<p>There is no language parameter for the OpenAI Text to Speech API</p>
<p>OpenAI will detect the language itself</p>
<h3>SYSTEMMESSAGE</h3>
<p>You can change the job description of the ChatGPT AI model according to your wishes</p>
<h2>Important Notes</h2>
<ul>
  <li>The app has only been tested with Google Chrome</li>
  <li>When the application runs, Google Chrome will ask for permission to access your microphone, you should confirm this request</li>
  <li>If you approve this request but the app cannot hear you, you must grant your browser permission for microphone access in Windows settings/permissions</li>
  <li>Speech To Text has a timeout period. After this time, it stops and starts again. In this way, continuous listening is provided</li>
  <li>When the app is running Text To Speech, it turns off the microphone and stops Speech To Text</li>
  <li>When Text To Speech ends, it opens the microphone and starts Speech To Text again</li>
  <li>If this is blocked, ChatGPT will start chatting by itself. This may seem funny at first, but can become annoying after a while</li>
</ul>
<h2>Structure</h2>
<p>Server side : app.js</br>
Client side : index.js</p>
<p></p>




