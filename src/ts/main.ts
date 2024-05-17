import { Todo } from './models/todo';
import { changeTodo, addTodo, removeAllTodos } from './functions';
import { createHtml, displayError } from './htmlFunctions';

let todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');

export function toggleTodo(todo: Todo) {
  changeTodo(todo);
  createHtml(todos);
}

export function createNewTodo(todoText: string, todos: Todo[]) {
  let result = addTodo(todoText, todos);

  if (result.success) {
    createHtml(todos);
  } else {
    displayError(result.error, true);
  }
}

export function clearTodos(todos: Todo[]) {
  removeAllTodos(todos);
  createHtml(todos);
}
