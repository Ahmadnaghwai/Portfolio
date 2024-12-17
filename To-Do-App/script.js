// Select DOM elements
const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const infoText = document.getElementById("info-text");

// Global tasks array
let tasks = [];

// Event listener for form submission
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the page from refreshing on form submission

  // Get the task value and trim whitespace
  const taskText = taskInput.value.trim();

  // Return early if input is empty
  if (!taskText) return;

  // Create task object
  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  // Add task to the tasks array
  tasks.push(task);

  // Clear the input field
  taskInput.value = "";

  // Render tasks
  renderTasks();
});

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = ""; // Clear the task list

  // Check if there are any tasks
  if (tasks.length === 0) {
    infoText.textContent = "Keine Aufgaben vorhanden!";
  } else {
    infoText.textContent = ""; // Hide the info text when tasks are available
  }

  // Create a list item for each task
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.toggle("completed", task.completed);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Aufgabe erledigen");
    checkbox.addEventListener("change", () => toggleTaskCompletion(task.id));

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Löschen";
    deleteButton.setAttribute("aria-label", "Aufgabe löschen");
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    // Append elements to the list item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    // Append list item to the task list
    taskList.appendChild(li);
  });
}

// Function to toggle task completion
function toggleTaskCompletion(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks(); // Re-render tasks
  }
}

// Function to delete task
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks(); // Re-render tasks
}

// Initial rendering of tasks
renderTasks();
