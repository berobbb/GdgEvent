from flask import Flask, request, jsonify
from sklearn.metrics.pairwise import cosine_similarity
import pickle
import pandas as pd
import requests
from flask_cors import CORS


# Load model
with open('sentence_transformer_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Load embeddings
with open('movie_embeddings.pkl', 'rb') as file:
    movies_embeddings = pickle.load(file)

# Load metadata
movies = pd.read_csv('movies_metadata.csv')

app = Flask(__name__)
CORS(app)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    query = data['query']
    top_n = data.get('top_n', 5)

    query_embedding = model.encode([query])
    similarities = cosine_similarity(query_embedding, movies_embeddings)
    top_indices = similarities[0].argsort()[-top_n:][::-1]
    recommendations = movies.iloc[top_indices]

    # storing the movie titles in a list separated by '+' and removed the year from the title
    movie_titles = recommendations['title'].tolist()
    moviesList = ["+".join(title.split()[:-1]) for title in movie_titles]
    print(moviesList)

    # Fetch detailed data for each movie
    omdb_responses = []
    for movie in moviesList:
        response = requests.get(f"https://www.omdbapi.com/?apikey=a9d85162&t={movie}")
        if response.status_code == 200:
            omdb_responses.append(response.json())
        else:
            omdb_responses.append({"error": f"Failed to fetch data for {movie}"})

    
    return jsonify(omdb_responses)

if __name__ == '__main__':
    app.run()


