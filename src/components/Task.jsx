import React, { useState, useEffect } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function Task({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const editInputRef = React.useRef(null);

  useEffect(() => {
    setEditText(task.text);
  }, [task.text]);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== task.text) {
      onEdit(task.id, trimmedText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditSubmit(e);
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <li
      className={`${task.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
    >
      <div className='view'>
        <input
          id={`task-toggle-${task.id}`}
          className='toggle'
          type='checkbox'
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <label
          htmlFor={`task-toggle-${task.id}`}
          onDoubleClick={() => setIsEditing(true)}
        >
          <span className='description'>{task.text}</span>
          <span className='created'>
            created {formatDistanceToNow(task.createdAt, { addSuffix: true })}
          </span>
        </label>
        <button
          className='icon icon-edit'
          onClick={() => setIsEditing(true)}
          aria-label='Edit'
          type='button'
        />
        <button
          className='icon icon-destroy'
          onClick={() => onDelete(task.id)}
          aria-label='Delete'
          type='button'
        />
      </div>
      {isEditing && (
        <form onSubmit={handleEditSubmit}>
          <input
            type='text'
            className='edit'
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyDown}
            ref={editInputRef}
          />
        </form>
      )}
    </li>
  );
}
