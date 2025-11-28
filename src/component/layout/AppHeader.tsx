const AppHeader = () => {
  return (
    <>
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
    </>
  );
};

export default AppHeader;
