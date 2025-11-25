import React from "react";
import { TaskDate } from "../../date/TaskDate";

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
                  {TaskDate.map((task)=>(
                    <p key={task.id} className="task">
                      締切日時：{task.dueDate} <br />
                      タスク名：{task.title} <br />
                      進行状況：{task.status}
                    </p>
                  ))}
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
