import "./styles/index.scss";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <h1 className="app-title">Welcome to My Dashboard</h1>
          <p className="app-subtitle">
            This is a simple React application with SCSS styling and TypeScript.
            <br />
            今日のタスク管理と天気情報、時間、予定を一目で確認できる
            <br />
            小さなダッシュボードアプリケーションです。
          </p>
        </div>
      </header>

      <main className="app-main">
        {/* 上部は固定 時間・ウィジェット・天気・今日の一言メモ・カレンダー */}
        <section className="dashboard-top">
          <div className="widget-card">
            <h2 className="widget-title">時計</h2>
            <p>今現在の時刻を表示させるエリアにする</p>
            <p>日本時間を表示させる</p>
          </div>
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

        {/* 下部はタブ＋タスクを切り替え可能にする */}
        <section className="dashboard-task">
          <div className="task-header">
            <button className="task-button task-button-active">
              タスク一覧
            </button>
            <button className="task-button">進行中タスク</button>
            <button className="task-button">完了済みタスク</button>
          </div>

          <div className="task-content">

            <div className="widget-card">
              <h2 className="widget-title">ここにタスク一覧を表示させる</h2>
              <div className="task-wrap">
                <ul className="task-lists">
                  <li className="task-item">
                    <button className="option-button">追加</button>
                    <button className="option-button">編集</button>
                    <button className="option-button">削除</button>
                    <p className="task">
                      タスクの追加・編集・削除ができるようにする
                    </p>
                  </li>
                  <li className="task-item">
                    <button className="option-button">編集</button>
                    <button className="option-button">削除</button>
                    <button className="option-button">追加</button>
                    <p className="task">
                      タスクの追加・編集・削除ができるようにする
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="widget-card">
              <h2 className="widget-title">タスク内容</h2>
              <p className="widget-body">
                タスクの内容やアイディアを記述するテキスエリア
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
