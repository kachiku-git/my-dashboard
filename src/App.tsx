import AppHeader from "./component/layout/AppHeader";
import DashboardTask from "./component/layout/DashboardTask";
import DashboardTop from "./component/layout/DashboardTop";
import "./styles/index.scss";

function App() {
  return (
    <div className="app">
      <AppHeader></AppHeader>

      <main className="app-main">
        {/* 上部は固定 時間・ウィジェット・天気・今日の一言メモ・カレンダー */}
        <DashboardTop></DashboardTop>

        {/* 下部はタブ＋タスクを切り替え可能にする */}
        <DashboardTask></DashboardTask>
      </main>
    </div>
  );
}

export default App;
