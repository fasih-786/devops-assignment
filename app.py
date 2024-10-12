from flask import Flask, render_template, jsonify, request
import requests
from datetime import datetime

app = Flask(__name__)

API_KEY = 'a22a79d767ec8ab056163d094e954646'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    if not city:
        return jsonify({'error': 'City not provided'}), 400

    weather_url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(weather_url)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to get weather data'}), response.status_code

    data = response.json()

    # Extract relevant information
    weather_data = {
        'city': data['name'],
        'country': data['sys']['country'],
        'temperature': data['main']['temp'],
        'description': data['weather'][0]['description'],
        'humidity': data['main']['humidity'],
        'wind_speed': data['wind']['speed'],
        'icon': data['weather'][0]['icon'],  # Weather icon ID
        'timestamp': datetime.utcfromtimestamp(data['dt']).strftime('%Y-%m-%d %H:%M:%S')  # Convert to readable date
    }

    return jsonify(weather_data)

if __name__ == '__main__':
    app.run(debug=True)
