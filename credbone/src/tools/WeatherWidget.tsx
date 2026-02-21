// WeatherWidget.tsx
import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import Popover from "../components/popover";
import Count from "../components/Coutner";
import { SvgLoaderCircle } from "../components/svg";

import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudLightning,
  Snowflake,
  CloudFog,
  Cloudy,
} from "lucide-react";
import Ripple from "../components/Ripple";

type WeatherData = {
  temperature: number;
  feelsLike: number;
  description: string;
  icon: ReactElement;
  rawIcon: string;
  city: string;
};

type ForecastData = {
  day: string;
  tempMin: number;
  tempMax: number;
  icon: ReactElement;
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

const iconMap: Record<string, JSX.Element> = {
  "01d": <Sun size={20} />,
  "01n": <Moon size={20} />,
  "02d": <CloudSun size={20} />,
  "02n": <CloudMoon size={20} />,
  "03d": <Cloud size={20} />,
  "03n": <Cloud size={20} />,
  "04d": <Cloudy size={20} />,
  "04n": <Cloudy size={20} />,
  "09d": <CloudDrizzle size={20} />,
  "09n": <CloudDrizzle size={20} />,
  "10d": <CloudRain size={20} />,
  "10n": <CloudRain size={20} />,
  "11d": <CloudLightning size={20} />,
  "11n": <CloudLightning size={20} />,
  "13d": <Snowflake size={20} />,
  "13n": <Snowflake size={20} />,
  "50d": <CloudFog size={20} />,
  "50n": <CloudFog size={20} />,
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

  // Function to fetch weather
  const fetchWeather = async () => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=${unit}&appid=${API_KEY}`,
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=${unit}&appid=${API_KEY}`,
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
          icon: iconMap[entry.weather[0].icon] || <Cloud size={20} />,
        }))
        .slice(0, 3); // Only take the first three days;

      setWeather({
        temperature: Math.round(weatherData.main.temp),
        feelsLike: Math.round(weatherData.main.feels_like),
        description: weatherData.weather[0].description,
        icon: iconMap[weatherData.weather[0].icon] || <Cloud size={20} />,
        rawIcon: weatherData.weather[0].icon,
        city: weatherData.name,
      });
      setForecast(forecastData);
      setError(null);
    } catch (err) {
      setError("Unable to fetch weather data.\nPlease try again.");
    }
  };

  // Retry function
  const handleRetry = () => {
    setError(null); // Clear the error message before retrying
    fetchWeather(); // Retry fetching weather
  };

  // Trigger fetch on city or unit change
  useEffect(() => {
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
      data-radius="15"
      data-space="5"
      placement="middle"
      content={(closePopover) => (
        <group data-direction="column" onClick={closePopover}>
          {cities.map((city, index) => (
            <group
              data-radius="10"
              data-cursor="pointer"
              data-interactive=""
              data-space="15"
              data-background={city === selectedCity ? "main" : ""}
              data-color={city === selectedCity ? "main-text" : ""}
              key={index}
              //   data-length="180"
              data-align="center"
              onClick={() => handleCityClick(city)}
              data-gap="5"
              data-animation-name="appear-bottom"
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
        data-radius="15"
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
        <text data-position="right" data-weight="700">
          {selectedCity}
        </text>
      </group>
    </Popover>
  );

  return (
    <group
      data-direction="column"
      data-name="weather-widget"
      data-align="start"
      // data-color="main-text"
      // data-background="main"

      //  data-duration=".325"
    >
      {error ? (
        <group
          data-space="30"
          data-align="center"
          data-gap="20"
          data-direction="column"
        >
          <text data-line="20" data-text-align="center" data-wrap="preline">
            {error}
          </text>

          <group
            onClick={handleRetry}
            data-interactive=""
            data-cursor="pointer"
            data-radius="10"
            data-width="auto"
            data-contain=""
            data-space="15"
            data-wrap="no"
            data-align="center"
            data-gap="15"
            data-background="highlight"
          >
            <text data-weight="600">Retry</text>
          </group>
        </group>
      ) : weather ? (
        <group
       //   data-gap="15"
          data-direction="column"
          data-align="start"
          
          //  style={weatherStyle}
        >
          <group
            data-direction="column"
            data-align="start"
            data-width="auto"
            data-gap="20"
            data-space="30"
          >
            <group
              data-direction="column"
              //  data-gap="5"
            >
              <text data-weight="300" data-text-size="large">
                {weather.city}
              </text>
              <text
                data-weight="700"
                data-text-size="large"
                data-text-transform="capitalize"
                data-wrap="wrap"
                data-font-type="hero"
                data-line="1"
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
                data-text-size="display-md"
                data-index="2"
                //data-cast-shadow="1"
                data-weight="300"
              >
                <text>
                  <Count
                    from={weather.temperature + 5}
                    to={weather.temperature}
                    duration={900}
                  ></Count>
                </text>
                <text data-position="absolute" data-left="full">
                  °
                </text>
              </group>
            </group>

            <group data-align="center" data-gap="15">
              <group
                data-direction="column"
                data-align="center"
                data-width="auto"
              >
                <>{weather.icon}</>
              </group>
              <separator data-vertical="" data-height="20"></separator>
              <text>
                Feels like {weather.feelsLike}°{unit === "imperial" ? "F" : "C"}
              </text>
            </group>

          {showForecast && (
            <group >
              {forecast.map((day, index) => (
                <group
                  key={index}
                  data-direction="column"
                  data-animation-name="appear-top-small"
                  data-fill-mode="backwards"
                  data-animation-duration={3 + index * 0.5}

                   //data-space-horizontal="15"
                >
                  {index > 0 && <separator data-horizontal="dotted"></separator>}
                  <group
                  data-radius="15"
                   
                    data-space-vertical="10"
                    data-align="center"
                    data-gap="5"
                    data-wrap="no"
                   
                  >
                    <text data-opacity="30">
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

          </group>


          <separator data-horizontal="dotted" data-opacity="20"></separator>
          <Popover
            data-radius="25"
            data-space="10"
            placement="top"
            data-length="320"
            content={(closePopover) => (
              <group data-direction="column" data-gap="10" data-align="start">
                <group
                  data-interactive=""
                  data-cursor="pointer"
                  data-radius="15"
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
                    Show Forecast
                  </text>

                  <separator data-vertical="" data-height="fit"></separator>
                  <text data-weight="700">{showForecast ? "On" : "No"}</text>
                </group>

                <separator data-horizontal="dotted"></separator>

                <group data-wrap="no" data-gap="5" data-align="center">
                  <group>
                    <text
                      data-light=""
                      data-wrap="wrap"
                      data-space-horizontal="15"
                    >
                      Temperature Unit
                    </text>
                  </group>

                  <group
                    data-wrap="no"
                    data-width="auto"
                    data-background="adaptive-gray"
                    data-space="5"
                    data-radius="15"
                  >
                    {["metric", "imperial"].map((unitType) => (
                      <group
                        // data-width="auto"
                        key={unitType}
                        onClick={() => {
                          handleUnitChange(unitType as "metric" | "imperial");
                          closePopover();
                        }}
                        data-interactive=""
                        data-radius="10"
                        data-space="10"
                        data-space-horizontal="15"
                        // data-ratio="1:1"
                        data-length="50"
                        data-cursor="pointer"
                        data-background={unit === unitType ? "context" : ""}
                        data-color={unit === unitType ? "" : ""}
                        data-border={unit === unitType ? "" : "none"}
                        // data-color={unit === unitType ? "main-text" : ""}
                        data-align="center"
                        data-direction="column"
                        data-over-color="neutral"
                      >
                        <text data-weight="600">
                          {unitType === "metric" ? "°C\u00A0" : "°F\u00A0"}
                        </text>
                      </group>
                    ))}
                  </group>
                </group>
                <separator data-horizontal="dotted"></separator>

                <group>{selectCity}</group>
              </group>
            )}
          >
            <group data-space="10">
              <Ripple>
                <group
                  data-interactive=""
                  data-cursor="pointer"
                  data-radius="15"
                  //  data-width="auto"
                  data-contain=""
                  data-space="15"
                  data-wrap="no"
                  data-align="center"
                  data-gap="15"
                  data-position="right"
                >
                  <text>Configure</text>
                </group>
              </Ripple>
            </group>
          </Popover>
        </group>
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
