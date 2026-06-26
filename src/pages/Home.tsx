import React, { useEffect, useState } from 'react';
import { useLanguage } from '../i18n';

type HomeClock = {
  place: {
    en: string;
    ja: string;
  };
  timeZone: string;
  latitude: number;
  longitude: number;
  fallback: {
    temperatureC: number;
    weather: {
      en: string;
      ja: string;
    };
    windKph: number;
  };
};

const clocks: HomeClock[] = [
  {
    place: {
      en: 'San Francisco, California (currently located)',
      ja: 'アメリカ、サンフランシスコ（現在地）',
    },
    timeZone: 'America/Los_Angeles',
    latitude: 37.7749,
    longitude: -122.4194,
    fallback: {
      temperatureC: 14,
      weather: {
        en: 'Foggy',
        ja: '霧',
      },
      windKph: 21,
    },
  },
  {
    place: {
      en: 'Boston, Massachusetts',
      ja: 'アメリカ、ボストン',
    },
    timeZone: 'America/New_York',
    latitude: 42.3601,
    longitude: -71.0589,
    fallback: {
      temperatureC: 17,
      weather: {
        en: 'Clear',
        ja: '快晴',
      },
      windKph: 15,
    },
  },
  {
    place: {
      en: 'Osaka, Japan',
      ja: '日本、大阪',
    },
    timeZone: 'Asia/Tokyo',
    latitude: 34.6937,
    longitude: 135.5023,
    fallback: {
      temperatureC: 23,
      weather: {
        en: 'Partly cloudy',
        ja: '晴れ時々くもり',
      },
      windKph: 12,
    },
  },
  {
    place: {
      en: 'Sydney, Australia (previously)',
      ja: 'オーストラリア、シドニー（以前）',
    },
    timeZone: 'Australia/Sydney',
    latitude: -33.8688,
    longitude: 151.2093,
    fallback: {
      temperatureC: 20,
      weather: {
        en: 'Sunny',
        ja: '晴れ',
      },
      windKph: 18,
    },
  },
];

type WeatherSnapshot = {
  temperatureC: number;
  weatherCode: number;
  windKph: number;
};

const weatherCodeLabels: Record<number, { en: string; ja: string }> = {
  0: { en: 'Clear', ja: '快晴' },
  1: { en: 'Mostly clear', ja: 'ほぼ快晴' },
  2: { en: 'Partly cloudy', ja: '晴れ時々くもり' },
  3: { en: 'Overcast', ja: 'くもり' },
  45: { en: 'Foggy', ja: '霧' },
  48: { en: 'Rime fog', ja: '霧氷' },
  51: { en: 'Light drizzle', ja: '弱い霧雨' },
  53: { en: 'Drizzle', ja: '霧雨' },
  55: { en: 'Heavy drizzle', ja: '強い霧雨' },
  56: { en: 'Light freezing drizzle', ja: '弱い着氷性の霧雨' },
  57: { en: 'Freezing drizzle', ja: '着氷性の霧雨' },
  61: { en: 'Light rain', ja: '弱い雨' },
  63: { en: 'Rain', ja: '雨' },
  65: { en: 'Heavy rain', ja: '強い雨' },
  66: { en: 'Light freezing rain', ja: '弱い凍雨' },
  67: { en: 'Freezing rain', ja: '凍雨' },
  71: { en: 'Light snow', ja: '弱い雪' },
  73: { en: 'Snow', ja: '雪' },
  75: { en: 'Heavy snow', ja: '大雪' },
  77: { en: 'Snow grains', ja: '細かい雪' },
  80: { en: 'Light showers', ja: '弱いにわか雨' },
  81: { en: 'Showers', ja: 'にわか雨' },
  82: { en: 'Heavy showers', ja: '強いにわか雨' },
  85: { en: 'Light snow showers', ja: '弱いにわか雪' },
  86: { en: 'Snow showers', ja: 'にわか雪' },
  95: { en: 'Thunderstorm', ja: '雷雨' },
  96: { en: 'Thunderstorm with hail', ja: 'ひょうを伴う雷雨' },
  99: { en: 'Severe thunderstorm', ja: '激しい雷雨' },
};

const Home: React.FC = () => {
  const assetPrefix = process.env.PUBLIC_URL || '';
  const { language } = useLanguage();
  const [now, setNow] = useState(() => new Date());
  const [weatherByZone, setWeatherByZone] = useState<Record<string, WeatherSnapshot>>({});

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadWeather = async () => {
      try {
        const responses = await Promise.all(
          clocks.map(async (clock) => {
            const params = new URLSearchParams({
              latitude: String(clock.latitude),
              longitude: String(clock.longitude),
              current: 'temperature_2m,weather_code,wind_speed_10m',
              temperature_unit: 'celsius',
              wind_speed_unit: 'kmh',
              timezone: 'auto',
            });

            const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);

            if (!response.ok) {
              throw new Error(`Weather request failed for ${clock.timeZone}`);
            }

            const data = await response.json();
            return {
              timeZone: clock.timeZone,
              snapshot: {
                temperatureC: data.current.temperature_2m,
                weatherCode: data.current.weather_code,
                windKph: data.current.wind_speed_10m,
              },
            };
          })
        );

        if (!isMounted) {
          return;
        }

        setWeatherByZone(
          responses.reduce<Record<string, WeatherSnapshot>>((accumulator, item) => {
            accumulator[item.timeZone] = item.snapshot;
            return accumulator;
          }, {})
        );
      } catch {
        if (isMounted) {
          setWeatherByZone({});
        }
      }
    };

    void loadWeather();
    const refreshTimer = window.setInterval(() => {
      void loadWeather();
    }, 15 * 60 * 1000);

    return () => {
      isMounted = false;
      window.clearInterval(refreshTimer);
    };
  }, []);

  const formatTemperature = (temperatureC: number) => {
    if (language === 'ja') {
      return `${temperatureC}°C`;
    }

    return `${Math.round((temperatureC * 9) / 5 + 32)}°F`;
  };

  const formatWind = (windKph: number) => {
    if (language === 'ja') {
      return `風速 ${windKph}km/h`;
    }

    return `${Math.round(windKph / 1.609)} mph wind`;
  };

  const getWeatherLabel = (clock: HomeClock) => {
    const liveWeather = weatherByZone[clock.timeZone];

    if (!liveWeather) {
      return clock.fallback.weather[language];
    }

    return weatherCodeLabels[liveWeather.weatherCode]?.[language] ?? clock.fallback.weather[language];
  };

  const copy =
    language === 'ja'
      ? {
          portraitAlt: 'アレクサンダー・スカイのポートレート',
          description:
            'カリフォルニア州バークレーと日本の大阪で育ったフリーランスの映像作家。自然、スポーツ、音楽、カルチャーを映像で捉えることに関心があります。ボストン大学で映画・テレビとデータサイエンスを学んでいます。暖かい気候やサーフィン、ヘアカット、ガーデニングが好きです。',
          contactLabel: '連絡先',
          contactEmail: 'alex@stomii.com',
          linkedinLabel: 'linkedin',
          instagramLabel: 'instagram',
          youtubeLabel: 'youtube',
        }
      : {
          portraitAlt: 'Alexander Sky portrait',
          description:
            'Freelance Filmmaker raised in Berkeley, CA and Osaka, Japan interested in capturing the outdoors, sports, music and culture. Studying Film/TV and Data Science at Boston University. Some things I like include warm weather, surfing, cutting hair, and gardening.',
          contactLabel: 'Contact',
          contactEmail: 'alex@stomii.com',
          linkedinLabel: 'linkedin',
          instagramLabel: 'instagram',
          youtubeLabel: 'youtube',
        };

  return (
    <main className="info-page" id="info">
      <section className="info-hero">
        <div className="info-layout">
          <div className="info-photo-panel">
            <img src={`${assetPrefix}/Alex.jpeg`} alt={copy.portraitAlt} className="info-photo" draggable={false} />
          </div>
          <div className="info-copy-panel">
            <p className="info-description">{copy.description}</p>
            <section className="info-contact-block" aria-labelledby="info-contact-heading">
              <h2 id="info-contact-heading" className="info-section-label">
                {copy.contactLabel}
              </h2>
              <a href={`mailto:${copy.contactEmail}`} className="info-contact-link">
                {copy.contactEmail}
              </a>
              <a
                href="https://www.linkedin.com/in/alexanderskybischof/"
                target="_blank"
                rel="noreferrer"
                className="info-contact-link"
              >
                {copy.linkedinLabel}
              </a>
              <a
                href="https://www.instagram.com/alexskyfilms/"
                target="_blank"
                rel="noreferrer"
                className="info-contact-link"
              >
                {copy.instagramLabel}
              </a>
              <a
                href="https://www.youtube.com/@bykinosky"
                target="_blank"
                rel="noreferrer"
                className="info-contact-link"
              >
                {copy.youtubeLabel}
              </a>
            </section>
            <div className="info-otter-wrap">
              <div className="info-otter" aria-hidden="true">
                <img src={`${assetPrefix}/otter.png`} alt="" className="hero-otter-image" draggable={false} />
              </div>
            </div>
          </div>
        </div>
        <aside className="info-clocks-block" aria-label="Location times">
          {clocks.map((clock) => (
            <article key={clock.timeZone} className="info-clock-line">
              <p className="info-clock-row">
                <span className="info-clock-time">
                  {new Intl.DateTimeFormat(language === 'ja' ? 'ja-JP' : 'en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: language !== 'ja',
                    timeZone: clock.timeZone,
                  }).format(now)}
                </span>
                <span className="info-clock-place">{clock.place[language]}</span>
                <span className="info-clock-meta">
                  {formatTemperature(weatherByZone[clock.timeZone]?.temperatureC ?? clock.fallback.temperatureC)}{' '}
                  {getWeatherLabel(clock)} ·{' '}
                  {formatWind(weatherByZone[clock.timeZone]?.windKph ?? clock.fallback.windKph)}
                </span>
              </p>
            </article>
          ))}
        </aside>
      </section>
    </main>
  );
};

export default Home;
