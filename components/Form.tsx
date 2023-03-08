import { useState } from "react";
import { IForm } from "../types";

export const Form: React.FC<IForm> = ({ onHandleAdd }) => {
  const [value, setValue] = useState("");

  //Send the new todo and reset the value
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onHandleAdd(value);
    setValue("");
  };

  return (
    <div>
      <form className="z-50" onSubmit={handleSubmit}>
        <input
          className="border-2 inline-block border-stone-300 p-1.5  rounded-md shadow-md "
          value={value}
          onChange={(evt) => {
            setValue(evt.target.value);
          }}
          placeholder="Add a task!"
          autoFocus
        />
        <button className="ml-0.5">
          <a href="#_" className="relative  text-sm group">
            <span className="bg-stone-400 relative z-10 block px-2 py-2 overflow-hidden font-medium leading-tight text-white transition-colors duration-300 ease-out border-2 border-stone-500 rounded-md group-hover:text-gray-900">
              <span className=" bg-stone-400 absolute inset-0 w-full h-full px-5 py-3 rounded-lg "></span>
              <span className=" absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-white group-hover:-rotate-180 ease"></span>
              <span className="relative">Add task</span>
            </span>
          </a>{" "}
        </button>
      </form>
    </div>
  );
};
