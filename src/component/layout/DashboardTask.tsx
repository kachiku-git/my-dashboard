import { useState } from "react";
import { TaskDate } from "../../date/TaskDate";

const DashboardTask = () => {
  const [tasks,setTasks] = useState(TaskDate);
  const [selectedTask,setSelectedTask]=useState(TaskDate[0]);
  const [newTitle,setNewTile] = useState('');
  const [newDetail,setNewDetail] = useState('');
  const [onMakeTask,setOnMakeTask] = useState(false);

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
            <h2 className="widget-title">タスク一覧を表示させる</h2>
            <div className="task-wrap">

              {/* 新規タスク追加コンポーネント */}
              <div className="button-wrap">
                {/* buttonがクリックされたらtrue */}
                <button className="option-button" onClick={()=>setOnMakeTask(!onMakeTask)}>
                  新規タスク作成
                </button>
              </div>
              {!onMakeTask && (
              <div className="make-task">
                <input type="text" className="title-input" placeholder="タイトル入力" value={newTitle} onChange={(e)=>setNewTile(e.target.value)} />
                <textarea  className="detail-input" placeholder="内容入力" value={newDetail} onChange={(e)=>setNewDetail(e.target.value)} />
                
                <div className="button-wrap">
                 <button className="option-button" onClick={()=>{
                
                  // クリック時にタイトルがない場合は何も処理しない
                  if(!newTitle.trim()) return;
                  // newタスク作成の内容

                  const createdTime = new Date();
                  const createdAt = createdTime.toLocaleDateString('ja-JP',{
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                  const newTask = {
                    id:tasks.length+1,
                    title:newTitle,
                    detail:newDetail,
                    status:'未着手',
                    createdAt,
                    dueDate:20250101,
                  };

                  setTasks([...tasks,newTask]);
                  setNewTile('');
                  setNewDetail('');
                  setOnMakeTask(!onMakeTask);

                  }}>追加する？
                </button>
                </div>
              </div>

              )}

              {/* 現行のタスク一覧表示 */}
              <ul className="task-lists">
                {tasks.map((task)=>(
                  <li className="task-item">
                    <p key={task.id} className="task" onClick={()=>setSelectedTask(task)}>
                      締切日時：{task.dueDate} <br />
                      タスク名：{task.title} <br />
                      進行状況：{task.status}
                    </p>
                  </li>
                ))}
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
