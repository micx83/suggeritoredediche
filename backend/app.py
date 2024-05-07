from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
import vertexai

app = Flask(__name__, static_url_path='/static')
socketio = SocketIO(app)

vertexai.init(project="gemini-1.5-pro-preview-0409", location="us-central1")

model = vertexai.GenerativeModel(
    "gemini-1.5-pro-preview-0409",
    system_instruction=[textsi_1]
)

@app.route("/")
def index():
    return render_template("index.html")

@socketio.on("chat message")
def handle_chat_message(message):
    # Invia il messaggio dell'utente al modello Gemini
    response = model.send_message([message])

    # Emetti la risposta del modello agli utenti connessi
    emit("chat response", response[0].text)
