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
        // 3 Defult tasks
        this.tasks = [
            {
                id: 1,
                title: 'דוגמא',
                addedTime: '2023-06-11 11:11:22',
                description: 'פה יופיע תיאור המשימה',
                contentEditable: false,
                isCompleted: false,
                priority: PriorityTypes.low,
            },
            {
                id: 2,
                title: 'דוגמא',
                addedTime: '2023-06-11 11:11:22',
                description: 'פה יופיע תיאור המשימה',
                contentEditable: false,
                isCompleted: false,
                priority: PriorityTypes.high,
            },
            {
                id: 3,
                title: 'דוגמא',
                addedTime: '2023-06-11 11:11:22',
                description: 'פה יופיע תיאור המשימה',
                contentEditable: false,
                isCompleted: false,
                priority: PriorityTypes.medium,
            },
        ];
        this.showTasks();
        const elem = document.querySelector("header");
        // When the button add task is clicked a task is added
        (_a = elem === null || elem === void 0 ? void 0 : elem.querySelector("button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", ev => {
            const elemTitle = elem === null || elem === void 0 ? void 0 : elem.querySelector("input");
            const elemPriority = elem === null || elem === void 0 ? void 0 : elem.querySelector("select");
            const elemdescription = elem === null || elem === void 0 ? void 0 : elem.querySelector("input.dis");
            const title = (elemTitle === null || elemTitle === void 0 ? void 0 : elemTitle.value) || '';
            const priority = (elemPriority === null || elemPriority === void 0 ? void 0 : elemPriority.value) || '';
            const description = (elemdescription === null || elemdescription === void 0 ? void 0 : elemdescription.value) || '';
            // Clears the inputs
            if (elemTitle) {
                elemTitle.value = "";
            }
            if (elemPriority) {
                elemPriority.value = "";
            }
            if (elemdescription) {
                elemdescription.value = "";
            }
            this.addTask(title, +priority, description);
        });
    }
    // Function to add a task
    addTask(title, priority, description) {
        // Creates an array of ids
        const ids = this.tasks.map(x => x.id);
        let max;
        if (ids.length == 0) {
            max = 0;
        }
        else {
            max = Math.max(...ids);
        }
        ;
        const now = new Date();
        const y = now.getFullYear();
        const m = now.getMonth() + 1;
        const d = now.getDate();
        const h = now.getHours();
        const mn = now.getMinutes();
        const s = now.getSeconds();
        // Added time
        const addedTime = `${y}-${(m < 10 ? '0' + m : m)}-${d} ${h}:${mn}:${s}`;
        this.tasks.push({
            id: max + 1,
            title,
            addedTime,
            description: `${description}`,
            contentEditable: false,
            isCompleted: false,
            priority: priority || PriorityTypes.low,
        });
        this.showTasks();
    }
    // Function to edit a task
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
    // Function that allows you to save a task you edited
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
    // Function to remove a task
    removeTask(taskId) {
        const i = this.tasks.findIndex(x => x.id == taskId);
        this.tasks.splice(i, 1);
        this.showTasks();
    }
    // Function to complete a task
    completeTask(taskId) {
        const item = this.tasks.find(x => x.id == taskId);
        console.log(item);
        if (item) {
            item.isCompleted = true;
        }
        this.showTasks();
    }
    // Function to uncomplete a task
    unCompleteTask(taskId) {
        const item = this.tasks.find(x => x.id == taskId);
        if (item) {
            item.isCompleted = false;
        }
        this.showTasks();
    }
    // Function to show all tasks
    showTasks() {
        const elem = document.querySelector("div.tasks");
        if (elem) {
            elem.innerHTML = "";
        }
        this.tasks.forEach(t => {
            var _a, _b, _c, _d, _e;
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
            div.contentEditable = "false";
            div.innerHTML = `
                <h3>${t.title}</h3>
                <p><b>זמן יצירה:</b> ${t.addedTime}</p>
                <p><b>תיאור:</b><div class"onEdit" contenteditable="${t.contentEditable}"> ${t.description || '*אין הערה*'}</div></p>
                <footer>
                    <button class="remove">מחק</button>
                    ${t.isCompleted ? '<button class="uncomplete">לא בוצע</button>' : '<button class="complete">בוצע</button>'}
                    <button class="edit">עריכה</button>
                    <button class="finishEdit">שמור</button>
                </footer>
            `;
            // Adds event listeners to each button
            (_a = div.querySelector('.remove')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.removeTask(t.id));
            (_b = div.querySelector('.complete')) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => this.completeTask(t.id));
            (_c = div.querySelector('.uncomplete')) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => this.unCompleteTask(t.id));
            (_d = div.querySelector('.edit')) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => this.editTask(t.id));
            (_e = div.querySelector('.finishEdit')) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => this.saveTask(t.id));
            elem === null || elem === void 0 ? void 0 : elem.appendChild(div);
        });
    }
}
const tasks = new TaskManager;
