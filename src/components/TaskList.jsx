import React from 'react';

import Task from './Task';

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  return (
    <ul className='todo-list'>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
