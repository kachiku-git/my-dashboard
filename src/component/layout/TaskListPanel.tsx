import { useState } from "react";
import type { FC } from "react";
import type { Task } from "../../date/TaskDate";
import type { FilterStatus } from "./DashboardTask";
import { formatDueDateNumberToDisplay } from "./DashboardTask";

type TaskListPanelProps = {
  tasks: Task[];
  filterStatus: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
  selectedTaskId: number;
  onSelectTask: (id: number) => void;
  onCreateTask: (payload: {
    title: string;
    detail: string;
    dueDate: string;
  }) => void;
  onResetDetail: () => void;
};

export const TaskListPanel: FC<TaskListPanelProps> = ({
  tasks,
  filterStatus,
  onFilterChange,
  selectedTaskId,
  onSelectTask,
  onCreateTask,
  onResetDetail,
}) => {
  const [onMakeTask, setOnMakeTask] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDetail, setNewDetail] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  // フィルタリング（ダミータスクは TaskDate 側で除外済み）
  const filteredTasks = tasks.filter((task)=>{
    if(filterStatus === 'all') return true;
    if(filterStatus === '進行中') {
        return task.status === '進行中'
    }
    if(filterStatus === '完了') {
        return task.status === '完了'
    }
    return true
  });
    

  const handleClickCreate = () => {
    onCreateTask({
      title: newTitle,
      detail: newDetail,
      dueDate: newDueDate,
    });
    setNewTitle("");
    setNewDetail("");
    setNewDueDate("");
    setOnMakeTask(false);
  };

  return (
    <div className="widget-card">
      {/* タブ切り替え */}
      <div className="task-header">
        <button
          className={`task-button ${
            filterStatus === "all" ? "task-button-active" : ""
          }`}
          onClick={() => {
            onFilterChange("all");
            setOnMakeTask(false);
            onResetDetail();
          }}
        >
          タスク一覧
        </button>
        <button
          className={`task-button ${
            filterStatus === "進行中" ? "task-button-active" : ""
          }`}
          onClick={() => {
            onFilterChange("進行中");
            setOnMakeTask(false);
            onResetDetail();
          }}
        >
          進行中タスク
        </button>
        <button
          className={`task-button ${
            filterStatus === "完了" ? "task-button-active" : ""
          }`}
          onClick={() => {
            onFilterChange("完了");
            setOnMakeTask(false);
            onResetDetail();
          }}
        >
          完了済みタスク
        </button>
      </div>

      <div className="task-wrap">
        {/* 新規タスク追加ボタン */}
        <div className="button-wrap">
          <button
            className="option-button"
            onClick={() => {
            // 右側の編集モードをリセット
              onResetDetail();
            // タイトル・内容は毎回リセット
              setNewTitle("");
              setNewDetail("");
            // 締切日は「今日」の日付を初期値としてセット
              const today = new Date();
              const yyyy = today.getFullYear();
              const mm = String(today.getMonth() + 1).padStart(2, "0");
              const dd = String(today.getDate()).padStart(2, "0");
              const todayStr = `${yyyy}-${mm}-${dd}`;
              setNewDueDate(todayStr);
            // フォームの表示／非表示をトグル
              setOnMakeTask((prev) => !prev);
            }}
          >
            新規タスク作成
          </button>
        </div>

        {/* 新規タスク入力フォーム */}
        {onMakeTask && (
          <div className="make-task">
            <input
              type="text"
              className="title-input"
              placeholder="タイトル入力"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
              className="detail-input"
              placeholder="内容入力"
              value={newDetail}
              onChange={(e) => setNewDetail(e.target.value)}
            />
            <input
              type="date"
              className="due-input"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
            />
            <div className="button-wrap">
              <button
                className="option-button"
                onClick={handleClickCreate}
                disabled={!newTitle.trim()}
              >
                追加する？
              </button>
              <button
                className="option-button"
                onClick={() => setOnMakeTask(false)}
              >
                キャンセル
              </button>
            </div>
          </div>
        )}

        {/* タスク一覧 */}
        
        <ul className="task-lists">
          {filteredTasks.map((task) => (
            <li key={`${task.id}-${task.createdAt}`} className="task-item">
              <p
                className={`task ${
                  task.id === selectedTaskId ? "task-selected" : ""
                }`}
                onClick={() => {
                  onSelectTask(task.id);
                  onResetDetail();
                }}
              >
                締切日時：{formatDueDateNumberToDisplay(task.dueDate)} <br />
                タスク名：{task.title} <br />
                進行状況：{task.status}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
