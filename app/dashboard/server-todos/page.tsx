
//'use client';
export const dynamic = 'force-dynamic'
export const revalidate = 0

import prisma from "@/app/lib/prisma";
import { NewTodo, TodosGrid } from "@/app/todos";

//import { title } from "process";
//import { useEffect } from "react";

export const metadata = {
  title: "Listado de Todos",
  description: "Director de PATATAS RISI"
}

export default async function ServerTodosPage() {

  const todos = await prisma.todo.findMany({ orderBy: {description: 'asc'}})

  console.log("construido ServerTodosPage")

  return (
    <>
      <span className="text-3xl mb-10">Server Actions</span>
      <div>
        <div className="w-full px-6 mx-5 mb-5 bg-white">
          <NewTodo></NewTodo>
        </div>
        
        <TodosGrid todos={todos}></TodosGrid>
      </div>
    </>
  );
}