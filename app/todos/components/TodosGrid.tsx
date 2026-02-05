'use client'

import { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem";
//import * as todosApi from "../helpers/todos"
import { useRouter } from "next/navigation";
import { updateTodoService } from '../actions/todo-action';

interface Props {
    todos?: Todo[];
}

export const TodosGrid = ({todos = []}:Props) => {
    const router = useRouter();

    // const completar = async (id:string, complete:boolean) => {
    //     const updateTodo = await todosApi.updateTodo(id, complete);
    //     router.refresh();
    //     return updateTodo;
    // }
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {
                todos && todos.map(item => {
                 return <TodoItem key={item.id} todo={item} 
                    completar={updateTodoService}></TodoItem>
                })
            }
        </div>
    )
}

