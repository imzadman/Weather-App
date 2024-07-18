import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const apiKey = "b9a199bb489dce5591456f3cff637c11";
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`;
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [icon, setIcon] = useState(null);
  const [error, setError] = useState("");

  const handler = async () => {
    setLoading(true);
    setError("");
    setWeatherData(null);
    try {
      const res = await fetch(api);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setWeatherData(data);
      const id = data.weather[0].id;
      if (id >= 200 && id < 300) {
        setIcon("🌩️");
      } else if (id >= 300 && id < 500) {
        setIcon("🌧️");
      } else if (id >= 500 && id < 600) {
        setIcon("🌧️");
      } else if (id >= 600 && id <= 700) {
        setIcon("❄️");
      } else if (id > 700 && id < 800) {
        setIcon("🌫️");
      } else if (id === 800) {
        setIcon("☀️");
      } else if (id > 800) {
        setIcon("⛅");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(
        error.message === "HTTP error! status: 404"
          ? "City not found. Please check the spelling and try again."
          : "Failed to fetch weather data. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className=" bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-blue-500 text-white">
          <h2 className="text-2xl font-bold text-center">Weather Dashboard</h2>
        </div>
        <div className="p-4">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter a city"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="px-2 py-1 md:p-2 xl:px-3 xl:py-2 w-[70%] border border-gray-300 rounded-md outline-none"
            />
            <button
              onClick={handler}
              disabled={!inputValue || loading}
              className={`px-2 md:p-2 xl:px-3 xl:py-2 rounded-md w-[30%]  text-white font-semibold ${
                !inputValue || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
              }`}
            >
              {loading ? "Loading..." : "Get Data"}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {weatherData && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{weatherData.name}</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">
                    {Math.round(weatherData.main.temp)}°C
                  </p>
                  <p className="text-gray-600">
                    {weatherData.weather[0].description}
                  </p>
                </div>
                <div className="text-5xl">{icon}</div>
              </div>
              <div className="mt-4 flex justify-between gap-2">
                <div>
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="font-semibold">{weatherData.main.humidity}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Wind Speed</p>
                  <p className="font-semibold">
                    {Math.round(weatherData.wind.speed * 3.6)} km/h
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
