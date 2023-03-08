import { useState, useEffect } from "react";
import { Task, Itodo } from "../types";
import UseAnimations from "react-useanimations";
import trash from "react-useanimations/lib/trash";

export const Todo: React.FC<Itodo> = ({
  todo,
  onRemoveTodo,
  onHandleCompleted,
}) => {
  const [completed, setCompleted] = useState(todo.finished);
  const [data, setData] = useState(todo);
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.checked);
    onHandleCompleted({
      id: todo.id,
      finished: event.target.checked,
    });
  };

  const handleRemove = () => {
    onRemoveTodo(todo.id);
  };

  return (
    <li className="flex gap-40 rounded-md border-2 bg-gray-100 border-gray-100 px-8 py-2.5 mb-2 text-slate-700 font-mono text-xl font-extralight hover:bg-gray-200">
      <div>
        <input
          className="rounded-full p-3.5 -ml-6 mr-3 hover:bg-blue-400 cursor-pointer border-gray-400 focus:border-gray-500 focus:ring-0 checked:bg-blue-300"
          onChange={handleChangeCheckbox}
          checked={completed}
          type="checkbox"
        />
        <label
          className={`transition-all mr-8 ${
            completed ? "line-through text-gray-400 " : ""
          }`}
        >
          {data.task}
          <UseAnimations
            onClick={handleRemove}
            className="inline-block z-50 absolute right-2 ml-8 hover:scale-125"
            animation={trash}
            size={25}
          />
        </label>
      </div>
    </li>
  );
};
