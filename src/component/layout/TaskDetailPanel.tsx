import type { FC } from "react";
import { useState } from "react";
import type { Task } from "../../date/TaskDate";
import { formatDueDateNumberToDisplay, parsedInputDateToNumber } from "./DashboardTask";

type TaskDetailPanelProps = {
  task: Task;
  onUpdateTask: (updated: Task) => void;
  onDeleteTask: (id: number) => void;
};

export const TaskDetailPanel: FC<TaskDetailPanelProps> = ({
  task,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [onEdit, setOnEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDetail, setEditDetail] = useState(task.detail);
  const [editStatus, setEditStatus] = useState<Task["status"]>(task.status);
  const [editDueDate, setEditDueDate] = useState("");

  if (task.status === "未選択") {
    return (
      <div className="widget-card">
        <div className="widget-header">
          <h2 className="widget-title">{task.title}</h2>
        </div>
        <p className="widget-body">{task.detail}</p>
      </div>
    );
  }

  const numberToInputDate = (due: number): string => {
    if (!due) return "";
    const s = due.toString().padStart(8, "0");
    const y = s.slice(0, 4);
    const m = s.slice(4, 6);
    const d = s.slice(6, 8);
    return `${y}-${m}-${d}`;
  };

  const handleStartEdit = () => {
    setEditTitle(task.title);
    setEditDetail(task.detail);
    setEditStatus(task.status);
    // 締切日を "YYYY-MM-DD" 形式で初期表示
    setEditDueDate(numberToInputDate(task.dueDate));
    setOnEdit(true);
  };

  const handleEditTask = () => {
    const updated: Task = {
      ...task,
      title: editTitle,
      detail: editDetail,
      status: editStatus,
      dueDate: parsedInputDateToNumber(editDueDate),
    };
    onUpdateTask(updated);
    setOnEdit(false);
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  return (
    <div className="widget-card">
      {onEdit ? (
        <div className="edit-task">
          <div className="widget-header">
            <div>
              <label htmlFor="edit-title">タイトル:</label>
              <input
                id="edit-title"
                type="text"
                className="title-edit"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <label htmlFor="edit-status">進行状況:</label>
              <select
                id="edit-status"
                className="status-edit"
                value={editStatus}
                onChange={(e) =>
                  setEditStatus(e.target.value as Task["status"])
                }
              >
                <option value="未着手">未着手</option>
                <option value="進行中">進行中</option>
                <option value="完了">完了</option>
              </select>
            </div>
            <div className="button-wrap">
              <button className="option-button" onClick={handleEditTask}>
                変更する?
              </button>
              <button
                className="option-button"
                onClick={() => setOnEdit(false)}
              >
                キャンセル
              </button>
            </div>
          </div>

          <p className="widget-body">
            作成日:{task.createdAt} <br />
            <label htmlFor="edit-dueDate">締切日:</label>
            <input
              id="edit-dueDate"
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />{" "}
            <br />
            <label htmlFor="edit-detail">タスク内容:</label>
            <textarea
              id="edit-detail"
              value={editDetail}
              onChange={(e) => setEditDetail(e.target.value)}
            />
          </p>
        </div>
      ) : (
        <>
          <div className="widget-header">
            <h2 className="widget-title">
              {task.title} / 進行状況:{task.status}
            </h2>
            <div className="button-wrap">
              <button className="option-button" onClick={handleStartEdit}>
                編集
              </button>
              <button className="option-button" onClick={handleDelete}>
                削除
              </button>
            </div>
          </div>
          <p className="widget-body">
            作成日:{task.createdAt} <br />
            締切日:{formatDueDateNumberToDisplay(task.dueDate)} <br />
            タスク内容:
            <br />
            {task.detail}
          </p>
        </>
      )}
    </div>
  );
};