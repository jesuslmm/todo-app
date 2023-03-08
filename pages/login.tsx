import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "../components/layout";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="grid grid-cols-2">
      <div className="flex bg-slate-100 max-w-2xl ">
        <h1 className="absolute font-bold text-2xl p-3">
          ZIALE<span className="font-light">TASKS</span>
        </h1>
        <div className="mx-auto my-56 text-gray-700 items-center">
          <h2 className="font-bold text-4xl px-14">Log in</h2>
          <button
            className="flex mt-16 px-7 py-2 border-2 rounded-lg bg-white border-slate-200 hover:scale-105 transition-all"
            onClick={() => signIn("github")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 mr-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Log in with GitHub
          </button>
          <button
            className="flex mt-2 px-6 py-2 border-2 rounded-lg bg-white border-slate-200 hover:scale-105 transition-all"
            onClick={() => signIn("github")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 mr-4 text-blue-500 fill-current"
              fill="currentColor"
              viewBox="0 0 448 512"
            >
              <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
            </svg>
            Log in with Linkedin
          </button>
          <button
            className="flex mt-2 px-5 py-2 border-2 rounded-lg bg-white border-slate-200 hover:scale-105 transition-all"
            onClick={() => signIn("github")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 mr-4 text-[#1877f2]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>{" "}
            Log in with Facebook
          </button>
        </div>
      </div>
      <Layout>
        <div className="absolute font-bold text-3xl">
          <h1>The best way to take a note on your tasks</h1>
          <h2 className="text-center">Never miss one!</h2>
          <Image
            className="absolute right-5 top-32"
            src="/tasks.png"
            alt="tasks-image"
            width="400"
            height="400"
          />
        </div>
      </Layout>
    </div>
  );
}
