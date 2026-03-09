
//'use client';
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getUserSessionServer } from "@/app/api/auth/actions/auth-actions";
import prisma from "@/app/lib/prisma";
import { NewTodo, TodosGrid } from "@/app/todos";
import { redirect } from "next/navigation";

//import { title } from "process";
//import { useEffect } from "react";

export const metadata = {
  title: "Listado de Todos",
  description: "Director de PATATAS RISI"
}

export default async function ServerTodosPage() {

   const user = await getUserSessionServer();
    
    if(!user) {
      redirect("/api/auth/signin");
    }

  const todos = await prisma.todo.findMany({ 
    where: {userId: user.id},
    orderBy: {description: 'asc'}})

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