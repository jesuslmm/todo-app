import { useState } from "react";
import { Todos } from "../components/Todos";
import { Form } from "../components/Form";
import { GetServerSideProps } from "next";
import { Task } from "../types";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../components/layout";

const prisma = new PrismaClient();

const Home = ({ allTodos }: { allTodos: Task[] }) => {
  const [todos, setTodos] = useState(allTodos);
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div
        role="status"
        className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else if (status !== "authenticated") {
    router.push("/login");
  }
  const handleRemove = async (id: string) => {
    const response = await fetch("api/todos/finishTodo", {
      method: "PUT",
      body: JSON.stringify(id),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleCompleted = async ({
    id,
    finished,
  }: Pick<Task, "id" | "finished">) => {
    const response = await fetch("/api/todos/completeTodo", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        finished: finished,
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, finished: finished } : todo
    );

    setTodos(newTodos);
  };

  const handleAdd = async (task: string) => {
    const response = await fetch("/api/todos/addTodo", {
      method: "POST",
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
  };

  return (
    <>
      <h1 className="font-bold text-2xl px-8 py-3">
        ZIALE<span className="font-light">TASKS</span>
      </h1>

      <Layout>
        <div className="pb-10 flex justify-center">
          <Form onHandleAdd={handleAdd} />
          <Todos
            todos={todos}
            onRemoveTodo={handleRemove}
            onHandleCompleted={handleCompleted}
          />
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const allTodos = await prisma.toDo.findMany();

  return {
    props: {
      allTodos: JSON.parse(JSON.stringify(allTodos)),
    },
  };
};

export default Home;
