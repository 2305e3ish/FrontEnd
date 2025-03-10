import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';

const Weather = () => {
    const apiKey = '751e91b5732623498767717c10c1840c';
    const city = 'Hyderabad';
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);

    // Variable to store chart instance
    let chartInstance = null;

    useEffect(() => {
        // Fetch current weather data
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => setWeatherData(data))
            .catch(error => console.error('Error fetching weather data:', error));

        // Fetch forecast data for the next few hours
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => setForecastData(data))
            .catch(error => console.error('Error fetching forecast data:', error));
    }, [city, apiKey]);

    useEffect(() => {
        if (forecastData) {
            const labels = [];
            const temperatures = [];

            // Get 6-hourly temperature forecast
            for (let i = 0; i < 6; i++) {
                const entry = forecastData.list[i];
                const time = new Date(entry.dt_txt).getHours();
                labels.push(`${time}:00`);
                temperatures.push(entry.main.temp);
            }

            // Destroy the existing chart if it exists
            if (chartInstance) {
                chartInstance.destroy();
            }

            // Create the new chart
            const ctx = document.getElementById('weatherChart').getContext('2d');
            chartInstance = new Chart(ctx, {
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
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [forecastData]);

    return (
        <div className="content-wrapper">
            <h1>Welcome to E-Ticketing</h1>
            <p>Select a page from the sidebar to get started.</p>

            <div className="weather-container">
                <div id="weather-info">
                    {weatherData ? (
                        <>
                            <h6>Temperature: {weatherData.main.temp}°C</h6>
                            <p>{weatherData.weather[0].description}</p>
                            <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
                        </>
                    ) : (
                        'Loading weather data...'
                    )}
                </div>
            </div>

            <div className="chart-container">
                <canvas id="weatherChart"></canvas>
            </div>
        </div>
    );
};

export default Weather;
