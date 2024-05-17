/**
 * test-environment jsdom
 */

import * as htmlFunctions from '../htmlFunctions';
import { IAddResponse } from '../models/IAddResponse';
import { Todo } from '../models/todo';
import * as todoFunctions from '../main';
import * as functions from '../functions';
import { setupEventListeners } from '../setupEventListeners';

describe('#Todos', () => {
  let mockedCreateNewTodo: jest.SpyInstance<IAddResponse>;
  let mockedCreateHtml: jest.SpyInstance<void>;
  let mockedDisplayError: jest.SpyInstance<void>;
  let mockedClearTodos: jest.SpyInstance<void>;
  let mockedToggleTodo: jest.SpyInstance<void>;

  let show: boolean;
  let errorMessage: string;

  beforeEach(() => {
    mockedCreateNewTodo = jest.spyOn(functions, 'addTodo');
    mockedCreateHtml = jest.spyOn(htmlFunctions, 'createHtml');
    mockedToggleTodo = jest.spyOn(todoFunctions, 'toggleTodo');
    mockedDisplayError = jest.spyOn(htmlFunctions, 'displayError');
    mockedClearTodos = jest.spyOn(todoFunctions, 'clearTodos');

    document.body.innerHTML = `<div id="app">
    <form id="newTodoForm">
      <div>
        <input type="text" id="newTodoText" />
        <button>Skapa</button>
        <button type="button" id="clearTodos">Rensa lista</button>
      </div>
      <div id="error" class="error"></div>
    </form>
     <ul id="todos" class="todo"></ul>
    </div>`;
    show = true;
    errorMessage = 'error';
    const todos: Todo[] = [];
    setupEventListeners(todos);
  });

  test('innerHTML should be error', () => {
    // Act

    htmlFunctions.displayError(errorMessage, show);
    const errorContainer = document.getElementById('error');

    // Assess

    expect(errorContainer?.innerHTML).toBe(errorMessage);
    expect(errorContainer?.classList.contains('show')).toBeTruthy();
  });

  test('error container should not have any class', () => {
    // Assign

    show = false;

    // Act

    htmlFunctions.displayError(errorMessage, show);
    const errorContainer = document.getElementById('error');

    // Assess

    expect(errorContainer?.innerHTML).toBe(errorMessage);
    expect(errorContainer?.classList.contains('show')).toBeFalsy();
  });

  test('should run clearTodos on click', () => {
    const clearButton = document.getElementById('clearTodos');
    console.log(clearButton, 'clear');

    clearButton?.click();
    expect(mockedClearTodos).toHaveBeenCalled();
    mockedClearTodos.mockReset();
  });

  test('add class, list length to be 1, call toggleTodo', () => {
    // Assign

    let todos: Todo[] = [new Todo('hej', true)];

    // Act

    htmlFunctions.createHtml(todos);
    const list = document.getElementById('todos');
    const listItem = document.querySelector('li');

    // Assert

    expect(list?.childNodes).toHaveLength(1);

    if (listItem) {
      listItem.click();
      expect(listItem.classList.contains('todo__text--done')).toBeTruthy();
      expect(mockedToggleTodo).toHaveBeenCalledTimes(1);
    }

    mockedToggleTodo.mockReset();
  });

  test('should add the todo and call htmlFunctions.createHtml', () => {
    // Assign

    const todoText = 'Lorem';
    const todos: Todo[] = [];
    mockedCreateNewTodo.mockImplementation(() => {
      return { success: true, error: '' };
    });

    // Act

    todoFunctions.createNewTodo(todoText, todos);

    // Assert

    expect(mockedCreateHtml).toHaveBeenCalled();

    mockedCreateHtml.mockReset();
  });

  test('it should call displayError', () => {
    // Assign
    const todoText = 'Lorem';
    const todos: Todo[] = [];

    mockedCreateNewTodo.mockImplementation(() => {
      return { success: false, error: '' };
    });
    // Act

    todoFunctions.createNewTodo(todoText, todos);

    // Assert

    expect(mockedDisplayError).toHaveBeenCalled();

    mockedDisplayError.mockReset();
  });

  test('submit test', () => {
    // Assign

    const todoForm = document.getElementById('newTodoForm') as HTMLFormElement;

    // Act

    todoForm.dispatchEvent(new Event('submit'));

    // Assess

    expect(mockedCreateNewTodo).toHaveBeenCalled();
  });
});
