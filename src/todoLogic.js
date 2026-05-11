// src/todoLogic.js

/**
 * Додає нове завдання до масиву
 */
export function addTodo(todos, text) {
  if (!text || text.trim() === '') {
    throw new Error('Todo text cannot be empty');
  }
  return [
    ...todos,
    {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    },
  ];
}

/**
 * Видаляє завдання за id
 */
export function deleteTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}

/**
 * Перемикає стан виконання завдання
 */
export function toggleTodo(todos, id) {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
}

/**
 * Повертає лише виконані завдання
 */
export function getCompletedTodos(todos) {
  return todos.filter((todo) => todo.completed);
}

/**
 * Повертає лише невиконані завдання
 */
export function getActiveTodos(todos) {
  return todos.filter((todo) => !todo.completed);
}

/**
 * Підраховує кількість завдань
 */
export function countTodos(todos) {
  return {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    active: todos.filter((t) => !t.completed).length,
  };
}

/**
 * Редагує текст завдання
 */
export function editTodo(todos, id, newText) {
  if (!newText || newText.trim() === '') {
    throw new Error('Todo text cannot be empty');
  }
  return todos.map((todo) =>
    todo.id === id ? { ...todo, text: newText.trim() } : todo
  );
}