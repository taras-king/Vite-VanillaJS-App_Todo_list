// src/__tests__/todoLogic.test.js
import { describe, it, expect, vi } from 'vitest';
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  getCompletedTodos,
  getActiveTodos,
  countTodos,
  editTodo,
} from '../todoLogic.js';

// ============================================
// Тестові дані (Stub — фіктивний масив задач)
// ============================================
const mockTodos = [
  { id: 1, text: 'Купити молоко', completed: false },
  { id: 2, text: 'Зробити лабу', completed: true },
  { id: 3, text: 'Погуляти', completed: false },
];

// ============================================
// UNIT ТЕСТИ
// ============================================

describe('addTodo', () => {
  it('додає нове завдання до масиву', () => {
    const result = addTodo(mockTodos, 'Нове завдання');
    expect(result).toHaveLength(4);
    expect(result[3].text).toBe('Нове завдання');
    expect(result[3].completed).toBe(false);
  });

  it('новий todo має поле id', () => {
    const result = addTodo([], 'Тест');
    expect(result[0]).toHaveProperty('id');
  });

  it('обрізає пробіли з тексту', () => {
    const result = addTodo([], '  Тест  ');
    expect(result[0].text).toBe('Тест');
  });

  it('кидає помилку якщо текст порожній', () => {
    expect(() => addTodo(mockTodos, '')).toThrow('Todo text cannot be empty');
  });

  it('кидає помилку якщо текст лише пробіли', () => {
    expect(() => addTodo(mockTodos, '   ')).toThrow();
  });
});

describe('deleteTodo', () => {
  it('видаляє завдання за id', () => {
    const result = deleteTodo(mockTodos, 1);
    expect(result).toHaveLength(2);
    expect(result.find((t) => t.id === 1)).toBeUndefined();
  });

  it('не змінює масив якщо id не існує', () => {
    const result = deleteTodo(mockTodos, 999);
    expect(result).toHaveLength(3);
  });
});

describe('toggleTodo', () => {
  it('змінює completed з false на true', () => {
    const result = toggleTodo(mockTodos, 1);
    expect(result.find((t) => t.id === 1).completed).toBe(true);
  });

  it('змінює completed з true на false', () => {
    const result = toggleTodo(mockTodos, 2);
    expect(result.find((t) => t.id === 2).completed).toBe(false);
  });

  it('не змінює інші елементи масиву', () => {
    const result = toggleTodo(mockTodos, 1);
    expect(result.find((t) => t.id === 3).completed).toBe(false);
  });
});

describe('getCompletedTodos', () => {
  it('повертає лише виконані завдання', () => {
    const result = getCompletedTodos(mockTodos);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it('повертає порожній масив якщо немає виконаних', () => {
    const active = [{ id: 1, text: 'Тест', completed: false }];
    expect(getCompletedTodos(active)).toHaveLength(0);
  });
});

describe('getActiveTodos', () => {
  it('повертає лише невиконані завдання', () => {
    const result = getActiveTodos(mockTodos);
    expect(result).toHaveLength(2);
  });
});

describe('countTodos', () => {
  it('правильно рахує total, completed, active', () => {
    const result = countTodos(mockTodos);
    expect(result.total).toBe(3);
    expect(result.completed).toBe(1);
    expect(result.active).toBe(2);
  });

  it('повертає нулі для порожнього масиву', () => {
    const result = countTodos([]);
    expect(result).toEqual({ total: 0, completed: 0, active: 0 });
  });
});

describe('editTodo', () => {
  it('змінює текст завдання', () => {
    const result = editTodo(mockTodos, 1, 'Новий текст');
    expect(result.find((t) => t.id === 1).text).toBe('Новий текст');
  });

  it('кидає помилку якщо новий текст порожній', () => {
    expect(() => editTodo(mockTodos, 1, '')).toThrow();
  });
});

// ============================================
// MOCK — перевірка виклику функції (Mock)
// ============================================
describe('Mock example — перевірка виклику', () => {
  it('функція збереження викликається після додавання todo', () => {
    const mockSave = vi.fn(); // Мок функції
    const todos = addTodo([], 'Тест мок');
    mockSave(todos);
    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(mockSave).toHaveBeenCalledWith(todos);
  });
});

// // ============================================
// // НАВМИСНО ЗЛАМАНИЙ ТЕСТ (для демонстрації)
// // ============================================
// describe('BROKEN TEST — демонстрація виявлення помилки', () => {
//   it('FAIL: очікує неправильний результат навмисно', () => {
//     const result = addTodo([], 'Тест');
//     // Навмисно неправильне очікування: очікуємо 2 елементи, але буде 1
//     expect(result).toHaveLength(2); // ← цей тест ВПАДЕ
//   });
// });