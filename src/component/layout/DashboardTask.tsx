import { useEffect, useState } from "react";
import type { FC } from "react";
import { TaskDate, type Task } from "../../date/TaskDate";
import { TaskListPanel } from "../widgets/TaskListPanel";
import { TaskDetailPanel } from "../widgets/TaskDetailPanel";

type FilterStatus = "all" | "進行中" | "完了";

// 締切の日付numberをストリング型へ変換ヘルパー（表示用）
export const formatDueDateNumberToDisplay = (dueDate: number): string => {
  if (!dueDate) return "未設定";
  const s = dueDate.toString().padStart(8, "0");
  const y = s.slice(0, 4);
  const m = s.slice(4, 6);
  const d = s.slice(6, 8);
  return `${y}/${m}/${d}`;
};

// ローカル保存時にNumber型へ戻す
export const parsedInputDateToNumber = (value: string): number => {
  if (!value) return 0;
  const cleaned = value.replace(/-/g, "");
  const num = Number(cleaned);
  return Number.isNaN(num) ? 0 : num;
};


const DashboardTask: FC = () => {
  // 共通ステート
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === "undefined") {
      return TaskDate.slice(1);
    }
    try {
      const saved = localStorage.getItem("dashboardTasks");
      if (saved) {
        const parsed: Task[] = JSON.parse(saved);
        const filtered = parsed.filter((task)=> task.id !== 0);
        if (parsed.length > 0) {
          return filtered;
        }
      }
    } catch (error) {
      console.error("ローカルストレージからタスクを読み込めません", error);
    }
    return TaskDate.slice(1);
  });

  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [selectedTaskId, setSelectedTaskId] = useState<number>(
    tasks[0]?.id ?? TaskDate[0]?.id ?? 1
  );

  const [taskListPanelKey, setTaskListPanelKey] = useState(0);
  const [taskDetailPanelKey, setTaskDetailPanelKey] = useState(0);

  // 選択中タスク
  const selectedTask =
    tasks.find((t) => t.id === selectedTaskId) ?? tasks[0] ?? TaskDate[0];

  // タスク変更時に保存する
  useEffect(() => {
    try {
      localStorage.setItem("dashboardTasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("ローカルストレージにタスクを保存できません", error);
    }
  }, [tasks]);

  // 新規タスク作成（左パネルから呼び出す）
  const handleCreateTask = (payload: {
    title: string;
    detail: string;
    dueDate: string; // "YYYY-MM-DD"
  }) => {
    const { title, detail, dueDate } = payload;

    if (!title.trim()) return;

    const createdTime = new Date();
    const createdAt = createdTime.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    
    const dueDateNumber = parsedInputDateToNumber(dueDate);
    const maxId = tasks.reduce((max , task)=> {
      return task.id > max ? task.id : max;
    },0);

    const newId = maxId +1;

    const newTask: Task = {
      id: newId,
      title,
      detail,
      status: "未着手",
      createdAt,
      dueDate: dueDateNumber,
    };

    setTasks((prev) => [...prev, newTask]);
    setSelectedTaskId(newTask.id);
  };

  // タスク更新（右パネルから呼び出す）
  const handleUpdateTask = (updated: Task) => {
    const updatedList = tasks.map((t) => (t.id === updated.id ? updated : t));
    setTasks(updatedList);
  };

  // 削除（右パネルから呼び出す）
  const handleDeleteTask = (id: number) => {
    const newList = tasks.filter((t) => t.id !== id);
    setTasks(newList);
    // 削除したタスクが選択中だったら、適当に一つ選び直す
    if (selectedTaskId === id) {
      const next = newList[0] ?? TaskDate[0];
      setSelectedTaskId(next.id);
    }
  };

  // タスク選択時：右側の編集状態をリセットしつつタスクを選択
  const handleSelectTask = (id: number) => {
    setSelectedTaskId(id);
    setTaskDetailPanelKey((prev) => prev + 1);
  };

  // タブ切り替えやその他のタイミングで右側の編集状態をリセット
  const handleResetDetail = () => {
    setTaskDetailPanelKey((prev) => prev + 1);
  };

  // 右側パネルがクリックされたときに左側の「新規作成」をリセット
  const handleFocusDetailPanel = () => {
    setTaskListPanelKey((prev) => prev + 1);
  };

  return (
    <section className="dashboard-task">
      <div className="task-content">
        <TaskListPanel
          key={taskListPanelKey}
          tasks={tasks}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          selectedTaskId={selectedTaskId}
          onSelectTask={handleSelectTask}
          onCreateTask={handleCreateTask}
          onResetDetail={handleResetDetail}
        />
        <TaskDetailPanel
          key={taskDetailPanelKey}
          task={selectedTask}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onFocusPanel={handleFocusDetailPanel}
        />
      </div>
    </section>
  );
};

export default DashboardTask;

export type { FilterStatus };