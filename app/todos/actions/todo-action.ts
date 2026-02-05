'use server';

import prisma from "@/app/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async(seconds:number = 0) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true)
        }, seconds * 1000)
    })
}

export const updateTodoService = async (id:string, complete:boolean): Promise<Todo> => {
    
    await sleep(3)

    const todo = await prisma.todo.findFirst({where: {id}})

    if(!todo) {
        throw `Todo con id ${id} no encontrado`
    }

    const updateTodoService = await prisma.todo.update({
        where: {id},
        data: {complete: complete}
    })

    revalidatePath("/dashboard/server-todos")

    return updateTodoService
}

export const addTodoService = async(description:string): Promise<Todo|any> => {
    try {
        const addTodoService = await prisma.todo.create({
            data: {description}
        })

        revalidatePath("/dashboard/server-todos")

        return addTodoService;
    }
    catch(error) {
        return {
            message: "Se ha producido un error: "+error
        }
    }
}

export const borrarTodoService = async(): Promise<Todo|any> => {
    try {
       
        const borrarTodoService = await prisma.todo.deleteMany({
            where: {complete: true },
        })

        revalidatePath("/dashboard/server-todos")
        
        return borrarTodoService;
    }
    catch(error) {
        return {
            message: "Se ha producido un error: "+error
        }
    }
}