"use strict";
var PriorityTypes;
(function (PriorityTypes) {
    PriorityTypes[PriorityTypes["low"] = 0] = "low";
    PriorityTypes[PriorityTypes["medium"] = 1] = "medium";
    PriorityTypes[PriorityTypes["high"] = 2] = "high";
})(PriorityTypes || (PriorityTypes = {}));
class TaskManager {
    constructor() {
        var _a;
        this.isCurrentlyEditing = false;
        this.tasks = [
            {
                id: 1,
                title: 'דוגמא',
                addedTime: '2023-06-11 11:11:22',
                description: 'פה יופיע תיאור המשימה',
                isCompleted: false,
                priority: PriorityTypes.low,
                contentEditable: false,
            },
            {
                id: 2,
                title: 'דוגמא',
                addedTime: '2023-06-11 11:11:22',
                description: 'פה יופיע תיאור המשימה',
                isCompleted: false,
                priority: PriorityTypes.high,
                contentEditable: false,
            },
            {
                id: 3,
                title: 'דוגמא',
                addedTime: '2023-06-11 11:11:22',
                description: 'פה יופיע תיאור המשימה',
                isCompleted: false,
                priority: PriorityTypes.medium,
                contentEditable: false,
            },
        ];
        this.showTasks();
        const elem = document.querySelector("header");
        // מגדירים שבלחיצה על הכפתור תופעל פונקציה המוסיפה משימה
        (_a = elem === null || elem === void 0 ? void 0 : elem.querySelector("button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", ev => {
            const elemTitle = elem === null || elem === void 0 ? void 0 : elem.querySelector("input");
            const elemPriority = elem === null || elem === void 0 ? void 0 : elem.querySelector("select");
            const elemdescription = elem === null || elem === void 0 ? void 0 : elem.querySelector("input.dis");
            const title = (elemTitle === null || elemTitle === void 0 ? void 0 : elemTitle.value) || '';
            const priority = (elemPriority === null || elemPriority === void 0 ? void 0 : elemPriority.value) || '';
            const description = (elemdescription === null || elemdescription === void 0 ? void 0 : elemdescription.value) || '';
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
    addTask(title, priority, description) {
        // מערך של ה-ids
        const ids = this.tasks.map(x => x.id);
        let max;
        if (ids.length == 0) {
            max = 0;
        }
        else {
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
    editTask(taskId) {
        const item = this.tasks.find(x => x.id == taskId);
        const isDivFound = document.querySelector("div[contenteditable='true']");
        if (item && isDivFound == null) {
            item.contentEditable = true;
            this.isCurrentlyEditing = true;
        }
        else {
            throw new Error(`Task ${taskId}`);
        }
        this.showTasks();
    }
    saveTask(taskId) {
        const item = this.tasks.find(x => x.id == taskId);
        const div = document.querySelector("div[contenteditable='true']");
        if (div == null || item == null) {
            return;
        }
        item.contentEditable = false;
        this.isCurrentlyEditing = false;
        item.description = div.innerHTML;
        this.showTasks();
    }
    //פונקציה המאפשרת מחיקה//
    removeTask(taskId) {
        const i = this.tasks.findIndex(x => x.id == taskId);
        this.tasks.splice(i, 1);
        this.showTasks();
    }
    //פונקציה המאפשרת סימון בוצע//
    completeTask(taskId) {
        const item = this.tasks.find(x => x.id == taskId);
        if (item) {
            item.isCompleted = true;
        }
        this.showTasks();
    }
    //ביטול סימון בוצע//
    unCompleteTask(taskId) {
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
            var _a, _b, _c, _d;
            const div = document.createElement("div");
            if (t.isCompleted) {
                div.classList.add('completed');
            }
            switch (t.priority) {
                case PriorityTypes.low:
                    div.classList.add('low');
                    break;
                case PriorityTypes.medium:
                    div.classList.add('medium');
                    break;
                case PriorityTypes.high:
                    div.classList.add('high');
                    break;
            }
            div.innerHTML = `
                <h3>${t.title}</h3>
                <p><b>זמן יצירה:</b> ${t.addedTime}</p>
                <p contenteditable="${t.contentEditable}"><b>תיאור:</b> ${t.description || 'אין הערה'}</p>

                <footer>
                    <button class="remove">מחק</button>
                    ${t.isCompleted ? '<button class="uncomplete">לא בוצע</button>' : '<button class="complete">בוצע</button>'}
                    <button class="edit">עריכה</button>
                    <button class="finishEdit">שמור</button>
                </footer>
            `;
            (_a = div.querySelector('.remove')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.removeTask(t.id));
            (_b = div.querySelector('.complete')) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => this.completeTask(t.id));
            (_c = div.querySelector('.uncomplete')) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => this.unCompleteTask(t.id));
            (_d = div.querySelector('.edit')) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => this.editTask(t.id));
            elem === null || elem === void 0 ? void 0 : elem.appendChild(div);
        });
    }
}
const tasks = new TaskManager;
