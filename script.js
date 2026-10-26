
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${encodeURIComponent(city)}`
    );

    if (!response.ok) {
      throw new Error(`Weather request failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return undefined;
  }
}

async function showWeather(city) {
  if (!city) {
    return;
  }

  const weatherData = await getWeather(city);

  if (!weatherData) {
    alert("Something went wrong, please try again later");
    return;
  }

  const weather = weatherData.weather?.[0];
  const main = weatherData.main;
  const wind = weatherData.wind;

  document.getElementById("location").textContent =
    weatherData.name ?? "N/A";

  document.getElementById("weather-main").textContent =
    weather?.main ?? "N/A";

  document.getElementById("main-temperature").textContent =
    main?.temp !== undefined && main?.temp !== null
      ? `${main.temp} °C`
      : "N/A";

  document.getElementById("feels-like").textContent =
    main?.feels_like !== undefined && main?.feels_like !== null
      ? `${main.feels_like} °C`
      : "N/A";

  document.getElementById("humidity").textContent =
    main?.humidity ?? "N/A";

  document.getElementById("wind").textContent =
    wind?.speed ?? "N/A";

  document.getElementById("wind-gust").textContent =
    wind?.gust ?? "N/A";

  const weatherIcon = document.getElementById("weather-icon");
  const weatherPlaceholder = document.getElementById("weather-placeholder");

  if (weather?.icon) {
    weatherIcon.src = weather.icon;
    weatherIcon.alt = weather.description ?? weather.main ?? "Weather icon";
    weatherIcon.hidden = false;
    weatherPlaceholder.hidden = true;
  } else {
    weatherIcon.removeAttribute("src");
    weatherIcon.alt = "Weather icon unavailable";
    weatherIcon.hidden = true;
    weatherPlaceholder.hidden = false;
  }
}

document
  .getElementById("get-weather-btn")
  .addEventListener("click", function () {
    const city = document.getElementById("city-select").value;

    if (!city) {
      return;
    }

    showWeather(city);
  });
