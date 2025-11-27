import { useState } from "react";
import { TaskDate, type Task, } from "../../date/TaskDate";


const DashboardTask = () => {
  // 共通ステート
  const [tasks, setTasks] = useState(TaskDate.slice(1));
  // 左側ステート
  const [onMakeTask, setOnMakeTask] = useState(false);
  const [newTitle, setNewTile] = useState('');
  const [newDetail, setNewDetail] = useState('');
  const [selectedTask, setSelectedTask]=useState(TaskDate[0]);
  // 右側ステート
  const [onEdit, setOnEdit] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDetail, setEditDetail] = useState('');
  const [editStatus, setEditStatus] = useState<Task['status']>('未着手');
  const [editDueDate, setEditDueDate] = useState<number>(selectedTask.dueDate);

  // 右側関数
  // 新規タスク作成
  const handleNewTask = () => {
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
  };

  // 削除
  const handleDeleteTask = () => {
    if(tasks.length === 0){
      alert('削除できるタスクがありません、タスクを追加してください！')
      return
    };
    const newTaskList = tasks.filter((task)=>task.id !== selectedTask.id)
    setTasks(newTaskList);
    setSelectedTask(TaskDate[0]);
  }

  // 編集
  const handleStartEdit = () => {
    if(selectedTask.id === 0){
      alert('タスクが選択されてません');
      return
    };
    setEditTitle(selectedTask.title);
    setEditDetail(selectedTask.detail);
    setEditStatus(selectedTask.status);
    setEditDueDate(selectedTask.dueDate);
    setOnEdit(!onEdit);
  };

  // 変更する
  const handleEditTask = () => {
    if(selectedTask.id === 0){
      alert('編集できるタスクがありません');
      return
    };
    // 選択したタスクと同じIDの編集
    const updateTasks = tasks.map((task)=>
      task.id === selectedTask.id 
    ?{
        ...task,
        title: editTitle,
        detail: editDetail,
        status: editStatus,
        dueDate: editDueDate,
      }
      :task
    );
    
    setTasks(updateTasks);
    
    // 選択したタスクと同じIDのタスクに編集した内容を反映させる
    const upDateSelected = updateTasks.find(
      (task)=> task.id === selectedTask.id
    );

    if(upDateSelected){
      setSelectedTask(upDateSelected);
    }
    setOnEdit(!onEdit);
  }

  return (
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
              {onMakeTask && (
              <div className="make-task">
                <input type="text" className="title-input" placeholder="タイトル入力" value={newTitle} onChange={(e)=>setNewTile(e.target.value)} />
                <textarea  className="detail-input" placeholder="内容入力" value={newDetail} onChange={(e)=>setNewDetail(e.target.value)} />
                <div className="button-wrap">
                 <button className="option-button" onClick={handleNewTask}>追加する？</button>
                <button className="option-button" onClick={()=>setOnMakeTask(!onMakeTask)}>キャンセル</button>
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
            {onEdit ? (
              <div className="edit-task">
                <div className="widget-header">
                  <div>
                    <label htmlFor="">タイトル:</label>
                    <input type="text" className="title-edit"  value={editTitle} onChange={(e)=>setEditTitle(e.target.value)} />
                    <label htmlFor="">進行状況:</label>
                    <select className="status-edit" value={editStatus} onChange={(e)=>setEditStatus(e.target.value)}>
                      <option value="未着手">未着手</option>
                      <option value="進行中">進行中</option>
                      <option value="完了">完了</option>
                    </select>
                  </div>
                  <div className="button-wrap">
                    <button className="option-button" onClick={()=>handleEditTask()}>変更する?</button>
                    <button className="option-button" onClick={()=>setOnEdit(!onEdit)}>キャンセル</button>
                  </div>
                </div>
              </div>
              ):(
                <div className="widget-header">
                  <h2 className="widget-title">
                    {selectedTask.title} / 進行状況:{selectedTask.status}
                  </h2>
                  <div className="button-wrap">
                      <button className="option-button" onClick={handleStartEdit}>編集</button>
                      <button className="option-button" onClick={handleDeleteTask}>削除</button>
                  </div>
                </div>
              )}
            {/* 編集状態の右側タスクコンポーネント */}
            {onEdit ? 
            (
              <p className="widget-body">作成日:{selectedTask.createdAt} <br />
                   <label htmlFor="">締切日:</label>
                   <input type='number' value={editDueDate} onChange={(e)=>setEditDueDate(Number(e.target.value))} /> <br />
                   <label htmlFor="">タスク内容:</label>
                   <textarea value={editDetail} onChange={(e)=>setEditDetail(e.target.value)} />
              </p>
            ):
            ( //通常表示
              <p className="widget-body">
                作成日:{selectedTask.createdAt} <br />
                締切日:{selectedTask.dueDate} <br />
                タスク内容:<br />
                {selectedTask.detail}
              </p>
            )}
          </div>
        </div>
    </section>
  )
}

export default DashboardTask;