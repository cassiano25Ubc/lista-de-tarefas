const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");

const tasks = [];

function renderTasks() {
	taskList.replaceChildren();
	emptyState.hidden = tasks.length > 0;

	tasks.forEach((task, index) => {
		const item = document.createElement("li");
		item.className = "task-item";

		const checkbox = document.createElement("input");
		checkbox.className = "task-checkbox";
		checkbox.type = "checkbox";
		checkbox.checked = task.completed;
		checkbox.dataset.action = "toggle";
		checkbox.dataset.index = index;
		checkbox.setAttribute("aria-label", `Marcar ${task.text} como concluída`);

		const text = document.createElement("span");
		text.className = task.completed ? "task-text completed" : "task-text";
		text.textContent = task.text;

		const deleteButton = document.createElement("button");
		deleteButton.className = "delete-button";
		deleteButton.type = "button";
		deleteButton.dataset.action = "delete";
		deleteButton.dataset.index = index;
		deleteButton.setAttribute("aria-label", `Excluir ${task.text}`);
		deleteButton.textContent = "×";

		item.append(checkbox, text, deleteButton);
		taskList.append(item);
	});
}

taskForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const text = taskInput.value.trim();
	if (!text) {
		taskInput.focus();
		return;
	}

	tasks.push({ text, completed: false });
	taskForm.reset();
	taskInput.focus();
	renderTasks();
});

taskList.addEventListener("change", (event) => {
	const checkbox = event.target.closest('[data-action="toggle"]');
	if (!checkbox) return;

	const task = tasks[Number(checkbox.dataset.index)];
	task.completed = checkbox.checked;
	renderTasks();
});

taskList.addEventListener("click", (event) => {
	const deleteButton = event.target.closest('[data-action="delete"]');
	if (!deleteButton) return;

	tasks.splice(Number(deleteButton.dataset.index), 1);
	renderTasks();
});

renderTasks();
