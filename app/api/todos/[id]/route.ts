import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server'
import { boolean, object, string } from 'yup'

interface Segments {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, {params}: Segments) { 
  const id = (await params).id; 

  return NextResponse.json({
        todo: await getTodo(id, params)
  })
}

const putSchema = object({
  description: string().optional(),
  complete: boolean().optional()
})

export async function PUT(request: Request, {params}: Segments) { 
  try{
      const id = (await params).id; 

      getTodo(id, params);

      const {complete, description} = 
        await putSchema.validate(await request.json());

      const updateTodo = await prisma.todo.update({
        where: {id},
        data: {complete, description}
      })

      return NextResponse.json({
            updateTodo
      })
  }
  catch(error){
    return NextResponse.json(error, {status: 400})
  }
 
}
async function getTodo(id:string, params:any) {
  const todo = await prisma.todo.findFirst({
    where: {id}
  })

  if(!todo) {
    return NextResponse.json({
      message: 'No existe el registro con ID: '+id
    }, {status: 404})
  }
  return todo;
}
