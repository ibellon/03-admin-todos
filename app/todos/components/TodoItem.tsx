'use client'

import { Todo } from "@prisma/client";
import styles  from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { startTransition, useOptimistic } from "react";
import { updateTodoService } from "../actions/todo-action";

interface Props {
    todo: Todo;
    completar: (id:string, completo:boolean) => Promise<Todo>
}

export const TodoItem = ({todo, completar}:Props) => {

    const [todoOptimistic, updateTodoOptimistic] = useOptimistic(
        todo,
        (state, newCompleteValue:boolean) => ({
            ...state, complete: newCompleteValue
        })
    )

    const onUpdateTodo = async() => {
        try {
            startTransition(() => {
                updateTodoOptimistic(!todoOptimistic.complete)    
            })
            
            await updateTodoService(todoOptimistic.id, !todoOptimistic.complete)
        } catch (error) {
            startTransition(() => {
                updateTodoOptimistic(!todoOptimistic.complete)    
            })
        }
    }

    return (
        <div className={todo.complete ? styles.todoDone: styles.todoPending}>
            <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
               
               <div 
                    //onClick={() => completar(todoOptimistic.id, !todoOptimistic.complete)}
                    onClick={() => onUpdateTodo()}
                    className= {`
                    flex p-2 rounded-md cursor-pointer
                    hover:opacity-60
                    ${ todoOptimistic.complete ? 'bg-blue-100': 'bg-red-300'}
                `}>
                    
                    {
                        todoOptimistic.complete
                            ? <IoCheckboxOutline size={30}></IoCheckboxOutline>
                            : <IoSquareOutline size={30}></IoSquareOutline>
                    }
               </div>

               <div className="text-center sm:text-left">
                    { todoOptimistic.description }
               </div>
            </div>
        </div>
    )
}

