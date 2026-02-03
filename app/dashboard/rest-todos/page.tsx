
//'use client';

import prisma from "@/app/lib/prisma";
import { TodosGrid } from "@/app/todos";
//import { title } from "process";
//import { useEffect } from "react";

export const metadata = {
  title: "Listado de Todos",
  description: "Director de PATATAS RISI"
}

export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany({ orderBy: {description: 'asc'}})
  // useEffect(() => {
  //   fetch('/api/todos').then(resp => resp.json())
  //     .then(console.log)
  // }, [])

  return (
    <div>
      <TodosGrid todos={todos}></TodosGrid>
    </div>
  );
}