import React from "react";
import ClockWidget from "../widgets/ClockWidget";

const DashboardTop = () => {
  return (
    <>
      <section className="dashboard-top">
        <ClockWidget />

        <div className="widget-card">
          <h2 className="widget-title">天気予報</h2>
          <p>現在の天気予報を表示するエリア</p>
          <p>とりあえず場所は選択できるようにする</p>
        </div>
        <div className="widget-card">
          <h2 className="widget-title">カレンダー</h2>
          <p>今月カレンダーと締切日付をハイライト表示するエリアにする</p>
          <p>ToDoリストと連携させるのが目標</p>
        </div>
        <div className="widget-card">
          <h2 className="widget-title">今日の目標</h2>
          <p>本日の大切なタスクやメモを表示するエリアにする</p>
          <p>ToDoリストと連携させなくても良き</p>
        </div>
      </section>
    </>
  );
};

export default DashboardTop;
