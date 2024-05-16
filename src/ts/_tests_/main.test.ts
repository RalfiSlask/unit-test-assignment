/**
 * test-environment jsdom
 */

import { displayError, createHtml } from '../main';
import { Todo } from '../models/todo';
import * as functions from '../main';

describe('#create', () => {
  let mockedToggleTodo: jest.SpyInstance<void>;

  beforeEach(() => {
    document.body.innerHTML = ` <ul id="todos" class="todo"></ul>`;
  });

  test('todos', () => {
    // Assign

    mockedToggleTodo = jest.spyOn(functions, 'toggleTodo');

    let todos: Todo[] = [new Todo('hej', true)];

    // Act

    createHtml(todos);
    const list = document.getElementById('todos');
    const listItems = document.getElementsByTagName('li');

    // Assert

    expect(list?.childNodes).toHaveLength(1);

    Array.from(listItems).forEach((listItem) => {
      expect(listItem.classList.contains('todo__text--done')).toBeTruthy();
      listItem.click();
    });

    expect(mockedToggleTodo).toHaveBeenCalledTimes(1);

    mockedToggleTodo.mockRestore();
  });
});

describe('#DOM functions', () => {
  let show: boolean;
  let errorMessage: string;

  beforeEach(() => {
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    show = true;
    errorMessage = 'error';
  });

  test('innerHTML should be error', () => {
    // Act

    displayError(errorMessage, show);
    const errorContainer = document.getElementById('error');

    // Assess

    expect(errorContainer?.innerHTML).toBe(errorMessage);
    expect(errorContainer?.classList.contains('show')).toBeTruthy();
  });

  test('error container should not have any class', () => {
    // Assign

    show = false;

    // Act

    displayError(errorMessage, show);
    const errorContainer = document.getElementById('error');

    // Assess

    expect(errorContainer?.innerHTML).toBe(errorMessage);
    expect(errorContainer?.classList.contains('show')).toBeFalsy();
  });
});
