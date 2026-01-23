
import prisma from '@/app/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

  await prisma.todo.deleteMany()

  await prisma.todo.createMany({
    data: [
      {
        description: 'Evagenlio de San Mateo',
        complete: true
      },
      {
        description: 'Evagenlio de San Marcos',
        complete: true
      },
      {
        description: 'Evagenlio de San Lucas',
        complete: false
      },
      {
        description: 'Evagenlio de San Juan',
        complete: true
      },
      {
        description: 'Génesis',
        complete: true
      },
      {
        description: 'Éxodo',
        complete: true
      },
      {
        description: 'Libro del Apocalipsis',
        complete: true
      },
  ]
  })

  return NextResponse.json({
    message: 'Executed seed',
  })

}
