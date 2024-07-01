#<h2>Speech To OpenAI</h2>
<h3>Installation</h3>
<p>Go to your Visual Studio solution Explorer area</p>
<p>Right click on solution name</p>
<p>Select "Open with Terminal"</p>
<p>Type this command on terminal</p>
<pre>npm install</pre>
<p>Start project with "Start" button or type this command</p>
<pre>node app.js</pre>
<h3>Regulation</h3>
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
<pre>
alloy , echo , fable , onyx , nova , and shimmer
</pre>
<p>OpenAI voiceover alternatives</p>
<h3>LANGUAGE</h3>
<p>You should edit the "LANGUAGE" field according to your language</p>
<p>This field is important for the Google Speech To Text API</p>
<p>There is no language parameter for the OpenAI Text to Speech API</p>
<p>OpenAI will detect the language itself</p>
<h3>SYSTEMMESSAGE</h3>
<p>You can change the job description of the ChatGPT AI model according to your wishes.</p>
