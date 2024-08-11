
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

export async function GET() {
    const prisma = new PrismaClient();
    const Tasks = await prisma.tasks.findMany();
    return NextResponse.json({ data: Tasks }, { status: 200 });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    const prisma = new PrismaClient();
    // const deleteUser = await prisma.tasks.delete({
    //     where: {
    //       id:Number(id),
    //     },
    //   })
    return NextResponse.json({ msg: "Task Deleted" }, { status: 200 });
}


export async function POST(request) {
    const { title, desc, assign } = await request.json();
    console.log(title, desc, assign)
    const spltData = assign.split('_')
    const prisma = new PrismaClient();
    const user = await prisma.tasks.create({
        data: {
            title: title,
            desc: desc,
            assign_to: Number(spltData[0]),
            assign_name: spltData[1],
            status:"open"
        },
    })
      
    return NextResponse.json({ msg: "Task Created" }, { status: 201 });
}
 