export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen items-center ">
      <div className="relative">
        <div className="flex justify-center mt-36 top-36 items-center">
          <div
            className="absolute top-10 ml-36 w-80 h-80 bg-purple-200 
          rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
          ></div>
          <div
            className="absolute top-10 mr-36 w-80 h-80 bg-yellow-200 
          rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
          ></div>
          <div
            className="absolute top-32 -bottom-8 w-80 h-80 bg-pink-200 
          rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
          ></div>
        </div>
        <div className="m-8 relative space-y-4 ">{children}</div>
      </div>
    </main>
  );
}
