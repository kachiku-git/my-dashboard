import { useEffect, useState } from "react";

// 表示地域のキーワード設定
type RegionKey =
  | "hokkaido"
  | "tohoku"
  | "kanto"
  | "chubu"
  | "kinki"
  | "chugoku"
  | "shikoku"
  | "kyushu"
  | "okinawa";

// 表示地域の設定
type RegionOption = {
  key: RegionKey;
  label: string;
  cityName: string;
};
// 表示地域のoption設定
const REGION_OPTIONS: RegionOption[] = [
  { key: "hokkaido", label: "北海道", cityName: "Sapporo" },
  { key: "tohoku", label: "東北", cityName: "Sendai" },
  { key: "kanto", label: "関東", cityName: "Tokyo" },
  { key: "chubu", label: "中部", cityName: "Nagoya" },
  { key: "kinki", label: "近畿", cityName: "Osaka" },
  { key: "chugoku", label: "中国", cityName: "Hiroshima" },
  { key: "shikoku", label: "四国", cityName: "Takamatsu" },
  { key: "kyushu", label: "九州", cityName: "Fukuoka" },
  { key: "okinawa", label: "沖縄", cityName: "Okinawa" },
];

// 表示する天気予報の設定　気温・天気・最高気温・最低気温・天気の説明・アイコン
type WeatherData = {
  temp: number;
  feelsLike: number;
  tempMax: number;
  tempMin: number;
  description: string;
  iconCode: string;
};

export default function WeatherWidget() {
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>("kanto");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //getWeather
  useEffect(() => {
    // api呼び出し処理を地域選択時に行う
    // envファイルのAPIKeyを呼び出し
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY as string;
    if (!apiKey) {
      setError("APIキーが設定されていません");
      setWeather(null);
      return;
    }
    const region = REGION_OPTIONS.find(
      (region) => region.key === selectedRegion
    );
    if (!region) return;

    const city = region.cityName;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        // 取得情報のリクエスト
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},JP&appid=${apiKey}&units=metric&lang=ja`;
        // 取得情報のレスポンス設定
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTPエラー：${res.status}`);
        }
        // JSONへ取得したデータを変換
        const date = await res.json();
        // 取得したデータから欲しい情報を精査にする
        const newWeather: WeatherData = {
          temp: date.main.temp,
          feelsLike: date.main.feels_like,
          tempMax: date.main.temp_max,
          tempMin: date.main.temp_min,
          description: date.weather?.[0]?.description ?? "天気情報なし",
          iconCode: date.weather?.[0]?.icon ?? "",
        };
        // 精査した欲しい情報を取得
        setWeather(newWeather);
      } catch (err) {
        console.log(err);
        setError("天気情報を取得できませんでした");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [selectedRegion]);

  //選択した地域を表示する
  const currentRegion =
    REGION_OPTIONS.find((region) => region.key === selectedRegion) ??
    REGION_OPTIONS[0];

  return (
    <div className="widget-card">
      <h2 className="widget-title">今日の天気予報！</h2>
      <div className="widget-body weather-widget">
        <label htmlFor="region" className="weather-label">
          地域：
        </label>
        <select
          name="region"
          id="region"
          className="weather-select"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value as RegionKey)}
        >
          {REGION_OPTIONS.map((region) => (
            <option key={region.key} value={region.key}>
              {region.label}
            </option>
          ))}
        </select>
        <p className="weather-region-note">
          表示地点：{currentRegion.label}({currentRegion.cityName})
        </p>

        {/* 読み込み状況によっての表示切り替え */}
        {loading && <p>天気情報を取得中...</p>}
        {error && (
          <p className="weather-error">
            天気情報を読み込めませんでした：{error}
          </p>
        )}
        {/* 読み込みできた場合の表示 */}
        {!loading && !error && weather && (
          <div className="weather-main">
            {weather.iconCode && (
              <div className="weather-icon">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.iconCode}@2x.png`}
                  alt={weather.description}
                />
              </div>
            )}
            <p className="weather-description">{weather.description}</p>
            <p className="weather-temp">
              現在の気温：{Math.round(weather.temp)}℃ /
              <span className="weather-feels">
                体感温度：{Math.round(weather.feelsLike)}℃
              </span>
            </p>
            <p className="weather-range">
              最高気温：{Math.round(weather.tempMax)}℃ / 最低気温：
              {Math.round(weather.tempMin)}℃
            </p>
          </div>
        )}
        {/* 地域を選択されてない場合の表示 */}
        {!loading && !error && !weather && (
          <p>天気を表示したい地域を選択してください...</p>
        )}
      </div>
    </div>
  );
}
