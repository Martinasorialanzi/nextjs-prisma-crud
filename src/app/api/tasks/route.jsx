import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function  GET(){

   const tasks= await prisma.task.findMany() //esto es com que esta conectando la base de datos con la tabla que cree que se llama task para poder hacer acciones como buscar, eliminar, crear etc
    return NextResponse.json(tasks)
}
export async function POST(request){   //request es un objeto que se tiene que convertir en un json
    const {title,description}= await request.json()

  const newTask= await prisma.task.create({
    data:{
        title,
        description
    }})
    return NextResponse.json(newTask)
}