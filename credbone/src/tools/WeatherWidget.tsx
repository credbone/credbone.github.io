// WeatherWidget.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Popover from "../components/popover";
import Count from "../components/Coutner";
import { SvgLoaderCircle } from "../components/svg";

type WeatherData = {
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
  rawIcon: string;
  city: string;
};

type ForecastData = {
  day: string;
  tempMin: number;
  tempMax: number;
  icon: string;
};

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const cities = [
  "Yerevan",
  "Tokyo",
  "Paris",
  "Sydney",
  "New York",
  "Los Angeles",
  "San Francisco",
];

const iconMap: Record<string, string> = {
  "01d": "sunny",
  "01n": "bedtime",
  "02d": "partly_cloudy_day",
  "02n": "partly_cloudy_night",
  "03d": "cloud",
  "03n": "cloud",
  "04d": "cloud",
  "04n": "cloud",
  "09d": "weather_mix",
  "09n": "weather_mix",
  "10d": "rainy",
  "10n": "rainy",
  "11d": "thunderstorm",
  "11n": "thunderstorm",
  "13d": "weather_snowy",
  "13n": "weather_snowy",
  "50d": "mist",
  "50n": "mist",
};

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>(cities[0]);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [showForecast, setShowForecast] = useState<boolean>(false);

  const currentIcon = weather?.rawIcon || "default";
  const weatherStyle = {
    background: `var(--weather-${currentIcon}-bg)`,
    color: `var(--weather-${currentIcon}-color)`,
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=${unit}&appid=${API_KEY}`
        );
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=${unit}&appid=${API_KEY}`
        );

        const weatherData = weatherResponse.data;
        const forecastData = forecastResponse.data.list
          .filter((_: any, index: number) => index % 8 === 0)
          .map((entry: any) => ({
            day: new Date(entry.dt * 1000).toLocaleDateString("en-US", {
              weekday: "short",
            }),
            tempMin: Math.round(entry.main.temp_min),
            tempMax: Math.round(entry.main.temp_max),
            icon: iconMap[entry.weather[0].icon] || "cloud",
          }))
          .slice(0, 3); // Only take the first three days;

        setWeather({
          temperature: Math.round(weatherData.main.temp),
          feelsLike: Math.round(weatherData.main.feels_like),
          description: weatherData.weather[0].description,
          icon: iconMap[weatherData.weather[0].icon] || "cloud",
          rawIcon: weatherData.weather[0].icon,
          city: weatherData.name,
        });
        setForecast(forecastData);
        setError(null);
      } catch (error) {
        setError("Unable to fetch weather data.");
      }
    };

    fetchWeather();
  }, [selectedCity, unit]);

  const handleCityClick = (city: string) => {
    setSelectedCity(city);
  };

  const handleUnitChange = (selectedUnit: "metric" | "imperial") => {
    setUnit(selectedUnit);
  };

  const toggleForecast = () => {
    setShowForecast((prev) => !prev); // Toggle show/hide forecast
  };

  const selectCity = (
    <Popover
      data-space="5"
      placement="bottom"
      content={(closePopover) => (
        <group data-direction="column" onClick={closePopover}>
          {cities.map((city, index) => (
            <group
              data-radius="5"
              data-cursor="pointer"
              data-interactive=""
              data-space="15"
              data-background={city === selectedCity ? "main" : ""}
              data-color={city === selectedCity ? "main-text" : ""}
              key={index}
              data-length="180"
              data-align="center"
              onClick={() => handleCityClick(city)}
              data-gap="5"
              data-animation-name="appear-top"
              data-fill-mode="backwards"
              data-animation-duration={2 + index * 0.25}
            >
              <text>{city}</text>
            </group>
          ))}
        </group>
      )}
    >
      <group
        data-cursor="pointer"
        data-radius="5"
        data-contain=""
        data-interactive=""
        data-space="15"
        data-wrap="no"
        data-align="center"
        data-gap="15"
      >
        <text data-light="" data-wrap="wrap">
          Select City
        </text>
        <text data-position="right" data-weight="600">
          {selectedCity}
        </text>
      </group>
    </Popover>
  );

  return (
    <group
      data-direction="column"
      data-gap="20"
      data-space="20"
      data-align="start"
      // data-color="main-text"
      // data-background="main"
      style={weatherStyle}
      //   data-duration=".725"
    >
      {error ? (
        <group
          data-space="30"
          data-align="center"
          data-line="20"
          data-direction="column"
        >
          <text data-text-align="center" data-wrap="wrap">
            {error}
          </text>
        </group>
      ) : weather ? (
        <>
          <group
            data-direction="column"
            data-align="start"
            data-width="auto"
            data-gap="30"
            data-space="15"
          >
            <group data-direction="column" data-gap="5">
              <text data-weight="300" data-text-size="large">
                {weather.city}
              </text>
              <text
                data-weight="700"
                data-text-size="large"
                data-text-transform="capitalize"
                data-wrap="wrap"
              >
                {weather.description}
              </text>
            </group>

            <group
              data-direction="column"
              data-align="start"
              data-width="auto"
              // data-gap="5"
            >
              <group
                data-width="auto"
                data-text-size="96"
                data-index="2"
                data-cast-shadow="1"
                data-weight="700"
              >
                <text>
                  <Count
                    from={0}
                    to={weather.temperature}
                    duration={900}
                  ></Count>
                </text>
                <text data-position="absolute" data-left="full">
                  °
                </text>
              </group>
              <group data-align="center" data-gap="10">
                {/* <group
                  data-direction="column"
                  data-align="center"
                  data-width="auto"
                >
                  <icon data-fill="fill">{weather.icon}</icon>
                </group>
                <separator data-vertical="" data-height="20"></separator> */}
                <text>
                  Feels like {weather.feelsLike}°
                  {unit === "imperial" ? "F" : "C"}
                </text>
              </group>
            </group>
          </group>

          {showForecast && (
            <group data-space="5">
              {forecast.map((day, index) => (
                <group
                  key={index}
                  data-direction="column"
                  // data-animation-name="appear-top"
                  // data-fill-mode="backwards"
                  // data-animation-duration={2 + index * 0.5}
                >
                  {index > 0 && <separator data-horizontal=""></separator>}
                  <group
                    data-space="10"
                    data-align="center"
                    data-gap="5"
                    data-wrap="no"
                  >
                    <text data-weight="600" data-opacity="30">
                      {day.day}
                    </text>
                    <icon data-length="30" data-position="right">
                      {day.icon}
                    </icon>
                    <group
                      data-gap="5"
                      data-width="auto"
                      data-text-align="right"
                    >
                      <text data-length="30" data-weight="700">
                        {day.tempMax}°
                      </text>
                      <text data-length="30" data-opacity="60">
                        {day.tempMin}°
                      </text>
                    </group>
                  </group>
                </group>
              ))}
            </group>
          )}

          <Popover
            data-radius="15"
            data-space="20"
            placement="top"
            content={(closePopover) => (
              <group data-direction="column" data-gap="15" data-align="start">
                <group
                  data-interactive=""
                  data-cursor="pointer"
                  data-radius="5"
                  data-width="auto"
                  data-contain=""
                  data-space="15"
                  data-wrap="no"
                  data-align="center"
                  data-gap="15"
                  onClick={() => {
                    toggleForecast();
                    closePopover();
                  }}
                >
                  <text data-light="" data-wrap="wrap">
                    Forecast
                  </text>

                  <text data-weight="700">{showForecast ? "On" : "Off"}</text>
                </group>

                <separator data-horizontal=""></separator>

                <group data-wrap="no" data-gap="5" data-align="center">
                  <text
                    data-light=""
                    data-wrap="wrap"
                    data-space-horizontal="15"
                  >
                    Temperature Unit
                  </text>

                  {["metric", "imperial"].map((unitType) => (
                    <group
                      data-width="auto"
                      key={unitType}
                      onClick={() => {
                        handleUnitChange(unitType as "metric" | "imperial");
                        closePopover();
                      }}
                      data-interactive=""
                      data-radius="5"
                      data-space="15"
                      data-cursor="pointer"
                      data-background={unit === unitType ? "main-lighter" : ""}
                      // data-color={unit === unitType ? "main-text" : ""}
                    >
                      <text data-weight="600">
                        {unitType === "metric" ? "°C" : "°F"}
                      </text>
                    </group>
                  ))}
                </group>
                <separator data-horizontal=""></separator>

                <group>{selectCity}</group>
              </group>
            )}
          >
            <group
              data-interactive=""
              data-cursor="pointer"
              data-radius="10"
              data-width="auto"
              data-contain=""
              data-space="15"
              data-wrap="no"
              data-align="center"
              data-gap="15"
            >
              <text>Configure</text>
            </group>
          </Popover>
        </>
      ) : (
        <group
          data-space="30"
          data-align="center"
          data-line="20"
          data-direction="column"
          data-gap="30"
        >
          <SvgLoaderCircle />
          <text data-text-align="center" data-opacity="30" data-wrap="wrap">
            Loading weather data...
          </text>
        </group>
      )}
    </group>
  );
};

export default WeatherWidget;
