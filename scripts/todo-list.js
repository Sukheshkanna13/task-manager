const storedTodoList = JSON.parse(localStorage.getItem('todoList'));
const todoList = storedTodoList ? storedTodoList : [];

renderTodoList();

function renderTodoList() {
    let todoListHTML = '';
    todoList.forEach((todoObject, index) => {
        const { name, dueDate } = todoObject;
        const html = `
            <div>${name}</div>
            <div>${dueDate}</div>
            <button class="delete-todo-button js-delete-todo-button" data-index="${index}">Delete</button> 
        `;
        todoListHTML += html;
    });
    document.querySelector('.js-todo-list').innerHTML = todoListHTML;
    document.querySelectorAll('.js-delete-todo-button')
        .forEach(deleteButton => {
            deleteButton.addEventListener('click', () => {
                const index = parseInt(deleteButton.getAttribute('data-index'));
                todoList.splice(index, 1);
                updateLocalStorage();
                renderTodoList();
            });
        });
}
document.querySelector('.js-add-todo-button').addEventListener('click', () => {
    addTodo();
});
function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;
    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;
    todoList.push({ name, dueDate });

    updateLocalStorage();
    renderTodoList();
    inputElement.value = '';
}

function updateLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}
