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
    const [filter, setFilter] = useState<String>(
        'all' || 'completed' || 'incomplete'
    );

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

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'completed') {
            return todo.isCompleted;
        }
        if (filter === 'incomplete') {
            return !todo.isCompleted;
        }

        return true;
    });

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
        <div className="container-md mx-auto padding-8">
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
            <div className="flex justify-center">
                <select
                    className="custom-select"
                    onChange={(e) => {
                        setFilter(e.target.value);
                    }}
                >
                    <option value="all">Todas</option>
                    <option value="completed">Completadas</option>
                    <option value="incomplete">Incompletas</option>
                </select>
            </div>
            <div className="flex flex-column gap-16">
                {filteredTodos.map((todo) => (
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
