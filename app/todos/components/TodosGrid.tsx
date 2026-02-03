'use client'

import { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem";
import { todo } from "node:test";

interface Props {
    todos?: Todo[];
}

export const TodosGrid = ({todos}:Props) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {
                todos && todos.map(item => {
                 return <TodoItem key={item.id} todo={item}></TodoItem>
                })
            }
        </div>
    )
}

