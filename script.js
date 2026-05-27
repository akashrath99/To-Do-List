const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const toggleThemeBtn = document.getElementById("toggleTheme");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        const actions = document.createElement("div");
        actions.classList.add("actions");

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✓";
        completeBtn.classList.add("complete-btn");
        completeBtn.onclick = () => toggleComplete(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✗";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => deleteTask(index);

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(actions);
        taskList.appendChild(li);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();

    if (text !== "") {
        tasks.push({
            text: text,
            completed: false
        });

        taskInput.value = "";
        renderTasks();
    }
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    toggleThemeBtn.textContent =
        document.body.classList.contains("dark")
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";
});

renderTasks();