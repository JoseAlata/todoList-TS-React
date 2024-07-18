interface ItemListProps {
    task: string;
    isCompleted: boolean;
    deleteTask: () => void;
    toggleCompleted: () => void;
    taskId: number;
}

const ItemList: React.FC<ItemListProps> = ({
    task,
    isCompleted,
    deleteTask,
    toggleCompleted,
    taskId,
}: ItemListProps) => {
    return (
        <div className="flex justify-between gap-16">
            <span className={isCompleted ? 'line-through' : ''}>{task} </span>
            <div className="flex gap-16">
                <label htmlFor={`${taskId}`}>
                    <input
                        type="checkbox"
                        id={`${taskId}`}
                        checked={isCompleted}
                        onChange={toggleCompleted}
                    />
                    <div className="custom-checkbox"></div>
                </label>

                <button
                    className="button-outline border-red"
                    onClick={deleteTask}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default ItemList;
