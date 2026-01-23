import prisma from '@/app/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import { boolean, object, string } from 'yup'

export async function GET(request: Request) { 

  const {searchParams} = new URL(request.url)
  const take = searchParams.get('take') ?? '10'
  const skip = searchParams.get('skip') ?? '0'

  if(isNaN(+take)) {
    return NextResponse.json({
      message: 'Take tiene que ser un número'
    }, {status: 400})
  }

  if(isNaN(+skip)) {
    return NextResponse.json({
      message: 'Skip tiene que ser un número'
    }, {status: 400})
  }

  const todos = await prisma.todo.findMany({
    take: +take,
    skip: +skip
  })

  return NextResponse.json(todos)
}

const postSchema = object({
  description: string().required(),
  complete: boolean().optional().default(false)
})

export async function POST(request: Request) { 
  try {
        const { description, complete} = 
        postSchema.validateSync( await request.json() );
        
        const todos = await prisma.todo.create({
            data: { complete, description },
        })
    
        return NextResponse.json(todos)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}
