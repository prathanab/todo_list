let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById('taskinput');
    const text = taskInput.value;
    if (text) { // Prevent adding empty tasks
        tasks.push({ text: text, completed: false });
        taskInput.value = ''; // Clear the input field
        updateTasksList();
        updateStats();
    }
};

const updateTasksList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the current list

    tasks.forEach((task, index) => {
        const listItem = document.createElement('ul');

        listItem.innerHTML = `
            <div class="taskitem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}/>
                    <p>${task.text}</p>
                </div>
                <button class="delete-btn">X</button>
            </div>
        `;
        listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index));
        listItem.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));

        taskList.append(listItem);
    });
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
};

document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});

const updateStats = ()=>{
    const completeTasks = tasks.filter(task=> task.completed).length
    const totalTasks = tasks.length
    const progress = ( completeTasks/totalTasks)*100
    const progressBar = document.getElementById('progress')

    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completeTasks} /${totalTasks}`;
}