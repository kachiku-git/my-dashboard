import { useState } from "react";
import { TaskDate } from "../../date/TaskDate";

const DashboardTask = () => {
  const [selectedTask,setSelectedTask]=useState(TaskDate[0]);
  return (
    <>
      <section className="dashboard-task">
        {/* タスク一覧などの切り替えコンポーネント */}
        <div className="task-header">
          <button className="task-button task-button-active">タスク一覧</button>
          <button className="task-button">進行中タスク</button>
          <button className="task-button">完了済みタスク</button>
        </div>

        {/* 左側のタスク一覧コンポーネント */}
        <div className="task-content">
          <div className="widget-card">
            <h2 className="widget-title">ここにタスク一覧を表示させる</h2>
            <div className="task-wrap">
              <ul className="task-lists">
                <li className="task-item">
                    <div className="button-wrap">
                      <button className="option-button">追加</button>
                    </div>
                    {/* 現行のタスク一覧表示 */}
                  {TaskDate.map((task)=>(
                    <p key={task.id} className="task" onClick={()=>setSelectedTask(task)}>
                      締切日時：{task.dueDate} <br />
                      タスク名：{task.title} <br />
                      進行状況：{task.status}
                    </p>
                  ))}
                </li>
              </ul>
            </div>
          </div>
          
          {/* 右側の選択タスクの詳細コンポーネント */}
          <div className="widget-card">
            <div className="widget-header">
              <h2 className="widget-title">
                {selectedTask.title} / 進行状況:{selectedTask.status}
              </h2>
              <div className="button-wrap">
                  <button className="option-button">編集</button>
                  <button className="option-button">削除</button>
              </div>
            </div>
            <p className="widget-body">
              作成日:{selectedTask.createdAt} <br />
              締切日:{selectedTask.dueDate} <br />
              タスク内容:<br />
              {selectedTask.detail}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardTask;
