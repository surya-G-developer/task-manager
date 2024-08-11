import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

export async function GET(request) {
    const id = request.nextUrl.searchParams.get("id");
    const prisma = new PrismaClient();
    let value = []
    const Tasks = await prisma.tasks.findMany({
        where: {
          assign_to:Number(id)
        },
     })
    return NextResponse.json({ data: Tasks }, { status: 200 });
}

export async function PUT(request) {
    const { id } = await request.json();
    const prisma = new PrismaClient();
    
    const updateTask = await prisma.tasks.update({
        where: {
          id: Number(id),
        },
        data: {
            status: 'closed',
        },
      })
    return NextResponse.json({ msg: "Task Status Updated" }, { status: 200 });
}

export async function POST(request) {
    const { id, estimate, comments } = await request.json();
    const prisma = new PrismaClient();
    console.log({
        estimation_time: estimate,
        tsk_comments: comments,
        status:"inProgress",
    })
    if(id){
        const result = await prisma.tasks.update({
            where: {
              id: Number(id),
            },
            data: {
                estimation_time: estimate,
                comments: comments,
                status:"inProgress",
            },
          })

    } 
    return NextResponse.json({ msg: "Task Status Updated" }, { status: 200 });
}