const questionInput = document.getElementById('question-input');
const askButton = document.getElementById('ask-button');
const responseContainer = document.getElementById('response-container');

askButton.addEventListener('click', () => {
  const question = questionInput.value;
  if (question) {
    fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question })
    })
      .then(response => response.json())
      .then(data => {
        const responseText = data.response;
        responseContainer.innerHTML = `<p>${responseText}</p>`;
      });
  }
});


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
