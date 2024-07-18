import { useEffect, useState } from 'react';

import ItemList from './ItemList';

interface Todo {
    id: number;
    task: string;
    isCompleted: boolean;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const tasks = localStorage.getItem('todos');
        return tasks ? JSON.parse(tasks) : [];
    });
    const [newTask, setNewTask] = useState<string>('');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTask = () => {
        const newTodo = {
            id: Date.now(),
            task: newTask,
            isCompleted: false,
        };

        setTodos([...todos, newTodo]);
        setNewTask('');
    };

    const toggleCompleted = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id
                    ? {
                          ...todo,
                          isCompleted: !todo.isCompleted,
                      }
                    : todo
            )
        );
    };

    const deleteTask = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div className="container-md mx-auto">
            <h1 className="text-center">Lista de Tareas</h1>
            <div className="flex gap-16 justify-center">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Nueva Tarea"
                />
                <button className="button-outline" onClick={addTask}>
                    Agregar
                </button>
            </div>

            <div className="flex flex-column gap-16">
                {todos.map((todo) => (
                    <ItemList
                        key={todo.id}
                        taskId={todo.id}
                        task={todo.task}
                        isCompleted={todo.isCompleted}
                        deleteTask={() => deleteTask(todo.id)}
                        toggleCompleted={() => toggleCompleted(todo.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default TodoList;
