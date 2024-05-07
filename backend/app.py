from flask import Flask, request, jsonify
import vertex_ai_prediction as vertex_ai

app = Flask(__name__)

@app.route('/api/ask', methods=['POST'])
def ask_question():
  question = request.get_json()['question']
  response = vertex_ai.predict(question)
  return jsonify({'response': response})

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080)
