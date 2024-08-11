import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

export async function GET() {
    const prisma = new PrismaClient();
    let value = []
    const Data = await prisma.user.findMany({
        where: {
          role: 'USER'
        },
     })
     Data.map((val) =>{
        value.push(val.id+'_'+val.name)
     })
    return NextResponse.json({ data: value }, { status: 200 });
}