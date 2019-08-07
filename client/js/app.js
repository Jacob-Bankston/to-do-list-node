let taskList = document.getElementById("task-list-div");
let saveButton = document.getElementById("save-button");
let taskName = document.getElementById("task-name");
let priorityLevel = document.getElementById("priority");

let hostUrl = "http://localhost:3000/todos";

function populateTasks() {
  fetch(hostUrl)
    .then(response => response.json())
    .then(json => displayTasks(json));
}

function displayTasks(tasks) {
//   if (tasks.length > 0) {
    let taskItems = tasks.map(task => {
      return `<li>
      <input type="checkbox" class="checkbox" onclick="addCompletedTime(
        '${task.title}', 
        '${task.priority}', 
        '${task.dateCreated}', 
        '${task.dateCompleted}', 
        '${task.isCompleted}'
        />
      <span>Task: ${task.title} </span>
      <span>Priority Level:${task.priority} </span>
      <span>Created: ${task.dateCreated} </span>
      <button class="remove-task-button" onclick="deleteTask(
          '${task.title}', 
          '${task.priority}', 
          '${task.dateCreated}', 
          '${task.dateCompleted}', 
          '${task.isCompleted}'
          )">X</button>
      </li>`;
    });
    taskList.innerHTML = taskItems.join("");
    console.log(tasks);
//   }
}

function addTask(title, priority) {
  fetch(hostUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      priority: priority,
      dateCreated: new Date().toLocaleTimeString("en-US", {
        hour12: true,
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
      }),
      dateCompleted: "",
      isCompleted: false
    })
  }).then(response => {
    return response.json()
        .then(json => {
            if (json.saved == true) {
                populateTasks()
            }
        })
    })
}

function deleteTask(title, priority, dateCreated, dateCompleted, isCompleted) {
  fetch(hostUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      priority: priority,
      dateCreated: dateCreated,
      dateCompleted: dateCompleted,
      isCompleted: isCompleted
    })
  }).then(response => {
    return response.json()
        .then(json => {
            if (json.saved == true) {
                populateTasks()
            }
        })
    })
}

saveButton.addEventListener("click", () => {
  let task = taskName.value;
  let priority = priorityLevel.value;
  taskName.value = "";
  priorityLevel.value = "";
  return addTask(task, priority);
});

populateTasks();
