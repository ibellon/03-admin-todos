
import prisma from '@/app/lib/prisma'
import bcrypt from 'bcryptjs';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "test1@yopmail.com",
      password: bcrypt.hashSync("123456"),
      roles: ['admin', 'manager', 'client'],
      todos: {
        create: [
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
      }
    }
  });

  // await prisma.todo.createMany({
  //   data: [
  //     {
  //       description: 'Evagenlio de San Mateo',
  //       complete: true
  //     },
  //     {
  //       description: 'Evagenlio de San Marcos',
  //       complete: true
  //     },
  //     {
  //       description: 'Evagenlio de San Lucas',
  //       complete: false
  //     },
  //     {
  //       description: 'Evagenlio de San Juan',
  //       complete: true
  //     },
  //     {
  //       description: 'Génesis',
  //       complete: true
  //     },
  //     {
  //       description: 'Éxodo',
  //       complete: true
  //     },
  //     {
  //       description: 'Libro del Apocalipsis',
  //       complete: true
  //     },
  // ]
  // })

  return NextResponse.json({
    message: 'Executed seed',
  })

}
