export type TaskStatus = '未選択'| '未着手' | '進行中' | '完了';

export interface Task {
    id:number,
    title:string,
    detail:string,
    status:TaskStatus,
    createdAt:string,
    dueDate:number,
}

export const TaskDate:Task[] = [
    {
        id:0,
        title:'タスクが選択されてません',
        detail:'選択されたタスクの内容を表示します',
        status:'未選択',
        createdAt:'',
        dueDate:20250101,
    },
    {
        id:1,
        title:'森の集会',
        detail:'森の会合に行かないといけない、村長にどうバナナの木の件を説明するのか考える',
        status:'未着手',
        createdAt:'2025-11-25AM09:00:00',
        dueDate:20250101,
    },
    {
        id:2,
        title:'買い物',
        detail:'にんじん、じゃがいも、たまご、バナナ',
        status:'未着手',
        createdAt:'2025-11-25AM09:00:00',
        dueDate:20251126,
    },
    {
        id:3,
        title:'筋トレ',
        detail:'スクワットx20、腕立て伏せx10、レッグレイズx15',
        status:'進行中',
        createdAt:'2025-11-25AM12:15:30',
        dueDate:20251126,
    },
    {
        id:4,
        title:'ライトを購入する',
        detail:'机のライトを購入する、Zライトがいいなぁ',
        status:'完了',
        createdAt:'2025-11-24PM18:27:57',
        dueDate:20251125,
    },
];