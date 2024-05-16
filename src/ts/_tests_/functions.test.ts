import { removeAllTodos, addTodo, changeTodo } from '../functions';
import { Todo } from '../models/todo';

describe('#todo functions', () => {
  let list: Todo[];
  let todoTextOverTwo: string;
  let todoTextUnderThree: string;

  beforeEach(() => {
    list = [];
    todoTextOverTwo = 'Hej';
    todoTextUnderThree = 'Mu';
  });

  test('should empty the list', () => {
    // Assign

    list = [{ text: 'hej', done: true }];

    // Act

    removeAllTodos(list);

    // Assess

    expect(list).toHaveLength(0);
  });

  test('should toggle todo', () => {
    // Assign

    const todo = new Todo('new', false);

    // Act

    changeTodo(todo);

    // Assess

    expect(todo.done).toBe(true);
  });

  test('should add todo to list', () => {
    // Act

    const returnObject = addTodo(todoTextOverTwo, list);

    // Assess

    expect(list).toHaveLength(1);
    expect(returnObject).toStrictEqual({
      success: true,
      error: '',
    });
  });

  test('should not add todo, return error message', () => {
    // Assign

    const list: Todo[] = [];

    // Act

    const messageObject = addTodo(todoTextUnderThree, list);

    // Assess

    expect(list).toHaveLength(0);
    expect(messageObject).toStrictEqual({
      success: false,
      error: 'Du måste ange minst tre bokstäver',
    });
  });
});
