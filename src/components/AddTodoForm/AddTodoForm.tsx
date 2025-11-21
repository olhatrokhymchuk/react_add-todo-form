import React, { useState } from 'react';
import { TodoList } from '../TodoList';
import { User } from '../../App';

interface AddTodoFormProps {
  users: User[];
  onAdd: (title: string, userId: number) => void;
}


export const AddTodoForm: React.FC<AddTodoFormProps> = ({ users, onAdd }) => {
  const [title, setTitle] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [triedSubmit, setTriedSubmit] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ title?: string; user?: string }>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTriedSubmit(true);
    const newErrors: { title?: string; user?: string } = {};

    if (title.trim() === '') {
      newErrors.title = 'Please enter a title'
    };

    if (selectedUserId === '') {
      newErrors.user = 'Please choose a user'
    };

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onAdd(title.trim(),
        Number(selectedUserId))
      setTitle('');
      setSelectedUserId('');
      setTriedSubmit(false);
      setErrors({});
    }
  }

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          id="title"
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const v = e.target.value;
            setTitle(v);

            if (errors.title) {
              setErrors(prev => ({ ...prev, title: undefined }));
            }
          }}
      />

        {triedSubmit && errors.title && (
          <span className="error">{errors.title}</span>)}
      </div>

      <div className="field">
        <select
          id="user"
          data-cy="userSelect"
          value={selectedUserId}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedUserId(e.target.value);

            if (errors.user) {
              setErrors(prev => ({ ...prev, user: undefined}));
            }
          }}
        >
          <option value="" disabled>
            Choose a user
          </option>

          {users.map(u => (
            <option key={u.id} value={String(u.id)}>
             {u.name}
          </option>
          ))}
        </select>

    {triedSubmit && errors.user && (
      <span className="error">{errors.user}</span>
    )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
