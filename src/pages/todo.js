// File: src/pages/todo.js

import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '@/styles/Todo.module.css';

export default function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Could not parse tasks from localStorage", error);
    }
  }, []);

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return; // Prevent adding empty tasks
    
    const newTask = {
      id: Date.now(), // Simple unique ID
      text: inputText,
      isCompleted: false,
    };

    setTasks(prevTasks => [newTask, ...prevTasks]);
    setInputText(''); // Clear input field
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <>
      <Head>
        <title>J.A.R.V.I.S. | Task Manager</title>
      </Head>
      <div className={styles.todoPage}>
        <div className={styles.todoContainer}>
          <header className={styles.header}>
            <h1 className={styles.title}>Task Matrix</h1>
            <p className={styles.subtitle}>Log and manage mission objectives.</p>
          </header>

          <form onSubmit={handleAddTask} className={styles.taskForm}>
            <input
              type="text"
              className={styles.taskInput}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter new objective..."
            />
            <button type="submit" className={styles.addButton}>
              Add Task
            </button>
          </form>

          <div className={styles.taskList}>
            {tasks.map(task => (
              <div
                key={task.id}
                className={`${styles.taskItem} ${task.isCompleted ? styles.completed : ''}`}
              >
                <div 
                  className={styles.taskTextWrapper} 
                  onClick={() => handleToggleComplete(task.id)}
                >
                  <p className={styles.taskText}>{task.text}</p>
                </div>
                <button 
                  onClick={() => handleRemoveTask(task.id)}
                  className={styles.removeButton}
                  aria-label="Remove task"
                >
                  &#10005; {/* This is a simple 'X' character */}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}