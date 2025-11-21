import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { AddTodoForm, Todo } from './types';
import { TodoList } from './types';
import { Todo } from './types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [users, setUsers] = useState(usersFromServer);

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
    }

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
