import { useEffect, useState } from "react";

export default function ClockWidget() {
  const [nowTime, setNowTime] = useState<Date>(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setNowTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  // 日本時間の24時間表示秒まで
  const timeFormatter = new Intl.DateTimeFormat("js-JP", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Tokyo",
  });

  // 日付と曜日表示設定
  const datFormatter = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Tokyo",
  });
  const timeString = timeFormatter.format(nowTime);
  const dateString = datFormatter.format(nowTime);
  const weekDayLabels = ["日", "月", "火", "水", "木", "金", "土"];
  const weekDay = weekDayLabels[nowTime.getDay()];

  return (
    <div className="widget-card">
      <h2 className="widget-title">時計</h2>
      <div className="widget-body clock-widget">
        <p className="clock-label">日本標準(JST)</p>
        <p className="clock-time">{timeString}</p>
        <p className="clock-date">
          {dateString}({weekDay})
        </p>
      </div>
    </div>
  );
}
