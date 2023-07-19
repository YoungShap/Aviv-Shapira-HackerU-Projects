interface Task {
    id: number;
    title: string;
    description: string;
    addedTime: string;
    priority: PriorityTypes;
    isCompleted: boolean;
    contentEditable:boolean;
}

enum PriorityTypes {
    low,
    medium,
    high,
}

class TaskManager {
    tasks: Task[] = [
        {
            id: 1,
            title: 'דוגמא',
            addedTime: '2023-06-11 11:11:22',
            description: 'פה יופיע תיאור המשימה',
            isCompleted: false,
            priority: PriorityTypes.low,
            contentEditable:false,
        },
        {
            id: 2,
            title: 'דוגמא',
            addedTime: '2023-06-11 11:11:22',
            description: 'פה יופיע תיאור המשימה',
            isCompleted: false,
            priority: PriorityTypes.high,
            contentEditable:false,
        },
        {
            id: 3,
            title: 'דוגמא',
            addedTime: '2023-06-11 11:11:22',
            description: 'פה יופיע תיאור המשימה',
            isCompleted: false,
            priority: PriorityTypes.medium,
            contentEditable:false,
        },
    ];

    constructor() {
        this.showTasks();

        const elem = document.querySelector("header");

        // מגדירים שבלחיצה על הכפתור תופעל פונקציה המוסיפה משימה
        elem?.querySelector("button")?.addEventListener("click", ev => {
            const elemTitle = elem?.querySelector("input");
            const elemPriority = elem?.querySelector("select");
            const elemdescription = elem?.querySelector("input.dis") as HTMLInputElement;

            const title = elemTitle?.value || '';
            const priority = elemPriority?.value || '';
            const description = elemdescription?.value || '';

            // איפוס התיבה של הכותרת
            if (elemTitle) {
                elemTitle.value = "";
            }

            // איפוס התיבה של רמת העדיפות
            if (elemPriority) {
                elemPriority.value = "";
            }
            if (elemdescription) {
                elemdescription.value = "";
            }

            this.addTask(title, +priority, description);
        });
    }

    addTask(title: string, priority?: PriorityTypes, description?: string) {
        // מערך של ה-ids
        const ids = this.tasks.map(x => x.id);
        let max;
        if (ids.length == 0) {
            max = 0
        } else {
            max = Math.max(...ids);
        }

        const now = new Date();
        const y = now.getFullYear();
        const m = now.getMonth() + 1;
        const d = now.getDate();

        const h = now.getHours();
        const mn = now.getMinutes();
        const s = now.getSeconds();

        const addedTime = `${y}-${(m < 10 ? '0' + m : m)}-${d} ${h}:${mn}:${s}`;

        this.tasks.push({
            id: max + 1,
            title,
            addedTime,
            description: `${description}`,
            isCompleted: false,
            priority: priority || PriorityTypes.low,
            contentEditable: false,
        });

        this.showTasks();
    }
    //פונקציה האפשרת עריכה//
    editTask(taskId: number) {
        const item = this.tasks.find(x => x.id == taskId);
        if (item) {
            item.contentEditable = true
        }

        this.showTasks();
    }
    //פונקציה המאפשרת מחיקה//
    removeTask(taskId: number) {
        const i = this.tasks.findIndex(x => x.id == taskId);
        this.tasks.splice(i, 1);

        this.showTasks();
    }
    //פונקציה המאפשרת סימון בוצע//
    completeTask(taskId: number) {
        const item = this.tasks.find(x => x.id == taskId);

        if (item) {
            item.isCompleted = true;
        }

        this.showTasks();
    }
   //ביטול סימון בוצע//
    unCompleteTask(taskId: number) {
        const item = this.tasks.find(x => x.id == taskId);

        if (item) {
            item.isCompleted = false;
        }

        this.showTasks();
    }
   //פונקציה שיוצרת את המשימה לפי תנאים שהוגדרו על ידי המשתמש//
    showTasks() {
        const elem = document.querySelector("div.tasks");


        if (elem) {
            elem.innerHTML = "";
        }

        this.tasks.forEach(t => {
            const div = document.createElement("div");

            if (t.isCompleted) {
                div.classList.add('completed');
            }

            switch (t.priority) {
                case PriorityTypes.low: div.classList.add('low'); break;
                case PriorityTypes.medium: div.classList.add('medium'); break;
                case PriorityTypes.high: div.classList.add('high'); break;
            }

            div.innerHTML = `
                <h3>${t.title}</h3>
                <p><b>זמן יצירה:</b> ${t.addedTime}</p>
                <p contenteditable="${t.contentEditable}"><b>תיאור:</b> ${t.description || 'אין הערה'}</p>

                <footer>
                    <button class="remove">מחק</button>
                    ${t.isCompleted ? '<button class="uncomplete">לא בוצע</button>' : '<button class="complete">בוצע</button>'}
                    <button class="edit">עריכה</button>
                </footer>
            `;

            div.querySelector('.remove')?.addEventListener("click", () => this.removeTask(t.id));
            div.querySelector('.complete')?.addEventListener("click", () => this.completeTask(t.id));
            div.querySelector('.uncomplete')?.addEventListener("click", () => this.unCompleteTask(t.id));
            div.querySelector('.edit')?.addEventListener("click", () => this.editTask(t.id));

            elem?.appendChild(div);
        });
    }
}

const tasks = new TaskManager;