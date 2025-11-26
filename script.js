let tasksData = {};
const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const completed = document.querySelector("#completed");
const columns = [todo, progress, completed]
let dragElement = null;

const message = {
    error_msg: "❌ Cannot Move Task Directly to Completed"
}

const allowedTransition = {
    todo: ["progress"],
    progress: ["todo", "completed"],
    completed: ["progress", "todo"]
}

function showToast(message, duration = 2000) {

    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, duration);
}


const tasks = document.querySelectorAll(".task");

function addTask(taskTitle, taskDescription, column = todo) {
    const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable", "true");
    div.innerHTML = `
                        <h2>${taskTitle}</h2>
                    <p>${taskDescription}</p>
                    <button>Delete</button>
    `

    column.appendChild(div);
    div.addEventListener("dragstart", (e) => {
        dragElement = div;
    })
    const deleteButton = div.querySelector("button");
    deleteButton.addEventListener("click", (e) => {
        div.remove();
        updateTaskCount();
    })

    return div;
}

function updateTaskCount() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");
        tasksData[col.id] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector("h2").innerText,
                description: t.querySelector("p").innerText
            }
        })
        localStorage.setItem("tasks", JSON.stringify(tasksData));
        count.innerHTML = tasks.length;
    })
}

function canMove(fromColumn, toColumn) {
    const allowed = allowedTransition[fromColumn] || [];
    return allowed.includes(toColumn);
}

function findTask(title) {
    const allTasks = Object.values(tasksData).flat();
    return allTasks.find(task => task.title.toLowerCase() === title.toLowerCase());

}

if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));

    for (const col in data) {
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task => {
            addTask(task.title, task.description, column)
        })
    }
    updateTaskCount();
}


tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        dragElement = task;
    })
})

function addDragEventsOnColumn(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        console.log(dragElement);
        const from = dragElement.parentElement.id;
        const to = column.id;

        column.classList.remove("hover-over", "blocked-drop");
        column.classList.add(canMove(from, to) ? "hover-over" : "blocked-drop");

    })

    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over", "blocked-drop");
    })

    column.addEventListener("dragover", (e) => {
        e.preventDefault();

    })

    column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
        const from = dragElement.parentElement.id;
        const to = column.id;

        if (!canMove(from, to)) {
            showToast(message.error_msg);
            column.classList.remove("blocked-drop")
            return;
        }
        column.appendChild(dragElement);
        updateTaskCount();

    })
}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(completed);

/*Modal Related Logic*/
const toggleModalButton = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector("#add-new-task")

toggleModalButton.addEventListener("click", (e) => {
    modal.classList.toggle("active")
});

modalBg.addEventListener("click", (e) => {
    modal.classList.remove("active");
})

addTaskButton.addEventListener("click", (e) => {
    const taskTitle = document.querySelector("#task-title-input").value;
    const taskDescription = document.querySelector("#task-description").value;

    if (taskTitle.trim() === "" || taskDescription.trim() === "") {
        showToast(`Task Details must be fulfilled`);
        return;
    }

    if (findTask(taskTitle)) {
        showToast("Please Enter Unique Title");
        return;
    }

    addTask(taskTitle, taskDescription, todo);
    updateTaskCount();
    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-description").value = "";
    modal.classList.remove("active");
})

