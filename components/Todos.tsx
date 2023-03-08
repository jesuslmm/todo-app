import { Task, ITodos } from "../types";
import { Todo } from "./Todo";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const Todos: React.FC<ITodos> = ({
  todos,
  onRemoveTodo,
  onHandleCompleted,
}) => {
  //Headers for the tabs
  const TABS = ["All", "Pending", "Completed"];

  //Ref for auto animation
  const [listRef] = useAutoAnimate<HTMLUListElement>();

  return (
    <div className="absolute px-5 mt-24 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {TABS.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-4 px-5 text-base font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-4",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            )}
          >
            <ul ref={listRef}>
              {todos.map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  onRemoveTodo={onRemoveTodo}
                  onHandleCompleted={onHandleCompleted}
                />
              ))}
            </ul>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-4",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            )}
          >
            <ul ref={listRef}>
              {todos.map((todo) => {
                if (todo.finished === false) {
                  return (
                    <Todo
                      key={todo.id}
                      todo={todo}
                      onRemoveTodo={onRemoveTodo}
                      onHandleCompleted={onHandleCompleted}
                    />
                  );
                }
              })}
            </ul>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-4",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            )}
          >
            <ul ref={listRef}>
              {todos.map((todo) => {
                if (todo.finished == true) {
                  return (
                    <Todo
                      key={todo.id}
                      todo={todo}
                      onRemoveTodo={onRemoveTodo}
                      onHandleCompleted={onHandleCompleted}
                    />
                  );
                }
              })}
            </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
