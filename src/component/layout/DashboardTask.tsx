import React from "react";



const DashboardTask = () => {
  return (
    <>
      <section className="dashboard-task">
        <div className="task-header">
          <button className="task-button task-button-active">タスク一覧</button>
          <button className="task-button">進行中タスク</button>
          <button className="task-button">完了済みタスク</button>
        </div>

        <div className="task-content">
          <div className="widget-card">
            <h2 className="widget-title">ここにタスク一覧を表示させる</h2>
            <div className="task-wrap">
              <ul className="task-lists">
                <li className="task-item">
                  <div className="button-wrap">
                    <button className="option-button">追加</button>
                    <button className="option-button">編集</button>
                    <button className="option-button">削除</button>
                  </div>
                  {taskDate}
                  <p className="task">
                    タスクの追加・編集・削除ができるようにする
                  </p>
                </li>
                <li className="task-item">
                  <div className="button-wrap">
                    <button className="option-button">追加</button>
                    <button className="option-button">編集</button>
                    <button className="option-button">削除</button>
                  </div>
                  <p className="task">
                    タスクの追加・編集・削除ができるようにする
                  </p>
                </li>
                <li className="task-item">
                  <div className="button-wrap">
                    <button className="option-button">追加</button>
                    <button className="option-button">編集</button>
                    <button className="option-button">削除</button>
                  </div>
                  <p className="task">
                    タスクの追加・編集・削除ができるようにする
                    タスクの追加・編集・削除ができるようにする
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
    </>
  );
};

export default DashboardTask;
