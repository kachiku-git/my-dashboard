import { useEffect, useState } from "react";

const STORAGE_KEY = "my-dashboard_today-goal";

export default function TodayGoalWidget() {
  const [goal, setGoal] = useState<string>("");
  const [draft, setDraft] = useState<string>("");      // 編集中の入力
  const [isEditing, setIsEditing] = useState(false);

  // 初回マウント時にローカルストレージから読み込み
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setGoal(saved);
      }
    } catch (event) {
      console.warn("今日の目標の読み込みに失敗しました", event);
    }
  }, []);

  
  const handleEditClick = () => {
    setDraft(goal); 
    setIsEditing(true);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDraft(event.target.value);
  };

  // 確定ボタンクリック
  // ローカルストレー時に保存する
  const handleConfirm = () => {
    const trimmed = draft.trim();
    setGoal(trimmed);

    try {
      localStorage.setItem(STORAGE_KEY, trimmed);
    } catch (e) {
      console.warn("今日の目標の保存に失敗しました", e);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft("");
    setIsEditing(false);
  };

  return (
    <div className="widget-card">
      <div className="widget-header">
        <h2 className="widget-title">今日の目標</h2>
        {!isEditing && (
          <div className="button-wrap">
            <button
              type="button"
              className="option-button"
              onClick={handleEditClick}
            >
              編集
            </button>
          </div>
        )}
      </div>

      <div className="widget-body">
        {isEditing ? (
          <>
            <textarea
              value={draft}
              onChange={handleChange}
              placeholder="本日の目標を入力してください"
            />
            <div className="button-wrap">
              <button
                type="button"
                className="option-button"
                onClick={handleConfirm}
              >
                確定
              </button>
              <button
                type="button"
                className="option-button"
                onClick={handleCancel}
              >
                キャンセル
              </button>
            </div>
          </>
        ) : (
          <p className="today-goal-text">
            {goal && goal.length > 0
              ? goal
              : "本日の目標はまだ設定してください"}
          </p>
        )}
      </div>
    </div>
  );
}