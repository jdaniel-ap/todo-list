import { FormEvent, useState } from 'react';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask(e: FormEvent<HTMLFormElement>) {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    e.preventDefault();
    try {
      if (!newTaskTitle.trim().length) {
        throw Error('A tarefa não pode estar vazia');
      }

      const obj = {
        id: crypto.randomUUID(),
        title: newTaskTitle,
        isComplete: false,
      };
      setTasks((state) => [...state, obj]);
      setNewTaskTitle('');
    } catch (err) {
      alert(err);
    }
  }

  function handleToggleTaskCompletion(id: string) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const updatedList = tasks.map((item) => {
      if (item.id === id) {
        item.isComplete = !item.isComplete;
        return item;
      }

      return item;
    });
    setTasks(updatedList);
  }

  function handleRemoveTask(id: string) {
    // Remova uma task da listagem pelo ID
    const filter = tasks.filter((item) => item.id !== id);
    setTasks(filter);
  }

  return (
    <section className='task-list container'>
      <header>
        <h2>Minhas tasks</h2>

        <form className='input-group' onSubmit={handleCreateNewTask}>
          <input
            type='text'
            placeholder='Adicionar novo todo'
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type='submit' data-testid='add-task-button'>
            <FiCheckSquare size={16} color='#fff' />
          </button>
        </form>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? 'completed' : ''}
                data-testid='task'
              >
                <label className='checkbox-container'>
                  <input
                    type='checkbox'
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className='checkmark'></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type='button'
                data-testid='remove-task-button'
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
