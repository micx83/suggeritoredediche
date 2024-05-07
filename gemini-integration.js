const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
console.log(`API Key: ${apiKey}`);


function generateDedicationSuggestions(query) {
  const prompt = `Scrivi una dedica per ${query}`;

  const url = `https://api.ai.google.dev/v1/text-engines/gemini/completions?key=${apiKey}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: prompt
    })
  };

  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      const suggestions = data.choices.map(choice => choice.text);
      displayDedicationSuggestions(suggestions);
    })
    .catch(error => {
      console.error(error);
    });
}

function displayDedicationSuggestions(suggestions) {
  const suggestionsElement = document.getElementById('dedication-suggestions');
  suggestionsElement.innerHTML = '';

  suggestions.forEach(suggestion => {
    const suggestionElement = document.createElement('p');
    suggestionElement.textContent = suggestion;
    suggestionsElement.appendChild(suggestionElement);
  });
}

$(document).ready(function() {
  $('#dedica-input').keyup(function() {
    const query = $(this).val();
    if (query.length >= 3) {
      generateDedicationSuggestions(query);
    }
  });
});

