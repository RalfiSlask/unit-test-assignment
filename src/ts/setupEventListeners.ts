import { clearTodos, createNewTodo } from './main';
import { Todo } from './models/todo';

export const setupEventListeners = (todos: Todo[]) => {
  document.getElementById('clearTodos')?.addEventListener('click', () => {
    clearTodos(todos);
  });

  (document.getElementById('newTodoForm') as HTMLFormElement)?.addEventListener(
    'submit',
    (e: SubmitEvent) => {
      e.preventDefault();

      let todoText: string = (
        document.getElementById('newTodoText') as HTMLInputElement
      ).value;

      createNewTodo(todoText, todos);
    }
  );
};
