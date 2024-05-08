import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.css';

// Sostituisci con il tuo ID del progetto Vertex AI
const projectId = 'YOUR_PROJECT_ID';

// Sostituisci con il nome del tuo prompt Vertex AI
const promptId = 'YOUR_PROMPT_ID'; // Sostituisci con l'ID del tuo prompt

// Funzione per inviare una richiesta all'API Vertex AI
async function sendRequest(text) {
  const accessToken = await getAccessToken(); // Funzione per ottenere l'access token
  const response = await fetch(`https://vertex.googleapis.com/v1/projects/${projectId}/locations/us-central1/models/${promptId}:predict`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: {
        text: text
      }
    })
  });
  const data = await response.json();
  return data.outputs.text[0].text;
}

// Funzione per ottenere l'access token dall'account di servizio
async function getAccessToken() {
  // Implementa la logica per ottenere l'access token dalle credenziali del tuo account di servizio
  // (ad esempio, utilizzando la libreria Google Cloud Node.js)
}

// Componente React principale
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      response: ''
    };
  }

  handleChange = (event) => {
    this.setState({ inputText: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const responseText = await sendRequest(this.state.inputText);
    this.setState({ response: responseText });
  };

  render() {
    return (
      <div className="App">
        <h1>Interfaccia web Vertex AI</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="inputText">Inserisci il testo:</label>
          <textarea id="inputText" value={this.state.inputText} onChange={this.handleChange} />
          <button type="submit">Invia</button>
        </form>
        <div className="response">
          {this.state.response && <p>{this.state.response}</p>}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
