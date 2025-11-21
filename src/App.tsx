import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { ServerTodo, Todo, User } from './types';

import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const initialTodos: Todo[] = todosFromServer.map((t: ServerTodo) => {
    const user = usersFromServer.find(u => u.id === t.userId)!;

    return { ...t, user };
  });

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [users] = useState<User[]>(usersFromServer);

  const addTodo = (title: string, userId: number) => {
    const maxId = todos.length ? Math.max(...todos.map(t => t.id)) : 0;
    const user = users.find(u => u.id === userId);

    if (!user) {
      return;
    }

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      userId,
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm users={users} onAdd={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
