import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';

const Weather = () => {
    const apiKey = '751e91b5732623498767717c10c1840c';
    const [city, setCity] = useState(''); // Store city name input by user
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(false); // Track loading state
    const [submitClicked, setSubmitClicked] = useState(false); // Flag to check if button is clicked

    // Variable to store chart instance using useRef
    const chartInstanceRef = useRef(null);

    const handleCityChange = (event) => {
        setCity(event.target.value); // Update city as user types
    };

    const handleCitySubmit = (event) => {
        event.preventDefault();
        if (city.trim()) {
            setLoading(true); // Set loading to true when fetching data
            setSubmitClicked(true); // Indicate that the button has been clicked
            setWeatherData(null); // Clear previous weather data
            setForecastData(null); // Clear previous forecast data
        }
    };

    // Fetch weather data when the submit button is clicked
    useEffect(() => {
        if (!submitClicked || !city) return; // Don't fetch if button is not clicked or city is empty

        // Fetch current weather data
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.main && data.weather) {
                    setWeatherData(data); // Store weather data
                } else {
                    console.error('Error: Invalid weather data');
                }
                setLoading(false); // Stop loading after data is fetched
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
                setLoading(false); // Stop loading in case of an error
            });

        // Fetch forecast data for the next few hours
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
            .then((response) => response.json())
            .then((data) => setForecastData(data))
            .catch((error) => console.error('Error fetching forecast data:', error));
    }, [submitClicked, city, apiKey]);

    useEffect(() => {
        if (forecastData && forecastData.list) {
            const labels = [];
            const temperatures = [];

            // Get 6-hourly temperature forecast
            for (let i = 0; i < 6; i++) {
                const entry = forecastData.list[i];
                if (entry && entry.main && entry.main.temp) {
                    const time = new Date(entry.dt_txt).getHours();
                    labels.push(`${time}:00`);
                    temperatures.push(entry.main.temp);
                }
            }

            // Destroy the existing chart if it exists
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            // Create the new chart
            const ctx = document.getElementById('weatherChart').getContext('2d');
            chartInstanceRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Temperature (°C)',
                        data: temperatures,
                        borderColor: 'rgba(200, 190, 135, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        }

        // Cleanup on component unmount or when forecastData changes
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [forecastData]);

    return (
        <div className="content-wrapper">
            <h1>Weather API</h1>

            {/* City input form */}
            <div className="weather-container">
                <form onSubmit={handleCitySubmit}>
                    <input
                        type="text"
                        value={city}
                        onChange={handleCityChange}
                        placeholder="Enter city name"
                        className="form-control"
                    />
                    <button type="submit" className="btn btn-primary mt-2">Get Weather</button>
                </form>
            </div>

            {/* Loading state */}
            {loading && <p>Loading weather data...</p>}

            {/* Weather information */}
            {weatherData && !loading ? (
                <div className="weather-info">
                    <h6>Temperature: {weatherData.main.temp}°C</h6>
                    <p>{weatherData.weather[0].description}</p>
                    <img
                        src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                        alt="Weather Icon"
                    />
                </div>
            ) : null}

            {/* Forecast chart */}
            {forecastData && !loading ? (
                <div className="chart-container">
                    <canvas id="weatherChart"></canvas>
                </div>
            ) : null}
        </div>
    );
};

export default Weather;
