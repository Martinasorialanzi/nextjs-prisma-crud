import { prisma } from "@/libs/prisma";
import next from "next";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    
    const task=await prisma.task.findUnique({
        where: {
            id:Number(params.id)
        }
    })
    console.log(task)
    return NextResponse.json(task)
}

export async function PUT(request, {params}){
   const data = await request.json()
   const taskUpdated= await prisma.task.update({
    where:{
        id:Number(params.id)
    },
    data:data //pongo data:data para que actualice solo lo que se cambio en data=request.json
    })
    return NextResponse.json(taskUpdated)
}

export async function DELETE(request, {params}){
    try {
        const taskRemoved=await prisma.task.delete({
            where:{
                id:Number(params.id)
            }
        })
        console.log(taskRemoved)
        return NextResponse.json(taskRemoved)
    } catch (error) {
        return NextResponse.json(error.message)
    }

}

