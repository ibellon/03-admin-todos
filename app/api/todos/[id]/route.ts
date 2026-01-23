import prisma from '@/app/lib/prisma';
import { Segment } from 'next/dist/shared/lib/app-router-types'
import { NextResponse, NextRequest } from 'next/server'

interface Segments {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, {params}: Segments) { 
  const id = (await params).id; 
  
  const todo = await prisma.todo.findFirst({
    where: {id}
  })

  if(!todo) {
    return NextResponse.json({
      message: 'No existe el registro con ID: '+id
    }, {status: 404})
  }

  return NextResponse.json({
        todo
  })
}