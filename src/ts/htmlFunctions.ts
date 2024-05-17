import { Todo } from './models/todo';
import { toggleTodo } from './main';

let todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');

export function createHtml(todos: Todo[]) {
  localStorage.setItem('todos', JSON.stringify(todos));

  let todosContainer: HTMLUListElement = document.getElementById(
    'todos'
  ) as HTMLUListElement;

  // Varför behöver jag lägga till detta för att testet ska fungera?
  if (todosContainer === null) return;
  todosContainer.innerHTML = '';

  for (let i = 0; i < todos.length; i++) {
    let li: HTMLLIElement = document.createElement('li');

    if (todos[i].done) {
      li.classList.add('todo__text--done');
    }

    li.classList.add('todo__text');
    li.innerHTML = todos[i].text;
    li.addEventListener('click', () => {
      console.log('click event fungerar');
      toggleTodo(todos[i]);
    });

    todosContainer.appendChild(li);
  }
}

export function displayError(error: string, show: boolean) {
  let errorContainer: HTMLDivElement = document.getElementById(
    'error'
  ) as HTMLDivElement;

  errorContainer.innerHTML = error;

  if (show) {
    errorContainer.classList.add('show');
  } else {
    errorContainer.classList.remove('show');
  }
}

createHtml(todos);
