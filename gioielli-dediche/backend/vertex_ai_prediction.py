import vertex_ai_service as vertex_ai
from vertex_ai_multimodal import VertexAIMultimodal

def predict(question, input_type, input_data):
  # Sostituisci "your_project_id", "your_model_id" e "your_model_version" con le tue informazioni
  project_id = "your_project_id"
  model_id = "your_model_id"
  model_version = "your_model_version"

  # Crea un'istanza di VertexAIMultimodal
  multimodal_client = VertexAIMultimodal(project_id)

  # Invia la domanda e i dati di input al prompt AI
  if input_type == "text":
    response = multimodal_client.predict_text(model_id, model_version, question)
  elif input_type == "image":
    response = multimodal_client.predict_image(model_id, model_version, input_data)
  elif input_type == "audio":
    response = multimodal_client.predict_audio(model_id, model_version, input_data)
  else:
    raise ValueError(f"Unsupported input type: {input_type}")

  # Restituisce la risposta
  return response
