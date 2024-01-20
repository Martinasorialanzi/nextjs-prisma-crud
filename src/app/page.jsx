import { prisma } from "@/libs/prisma";

import TaskCards from "../components/TaskCards";

const loadTask = async () => {
  //hay dos formas de hacerlo: (las dos formas son las mismas pero por lo general si el front esta junto con el back podemos usar desde la primera pero si lo vas a separar mejor que sea con la segunda forma)

  //obteniendo directamente de la base de datos:aca me comunico directamnete con la base de datos

  return await prisma.task.findMany()


  //haciendo una peticion HTTP /api/task  : aca me comunico con el propio backend (no necesito un use client)

  // const res = await fetch("http://localhost:3000/api/tasks"); //ver video para entender porque tengo que poner la direccion completa hhttp...
  // const data = await res.json();
  // console.log(data);
};

const HomePage = async() => {
  const tasks= await loadTask()
  
  return (
    
    <section className="container mx-auto">
    <div  className="grid grid-cols-3 gap-3 mt-10">
      {tasks.map((task)=>(

        <TaskCards task={task} key={task.id} />
        
      )
      )}
      </div>
      </section>
    
  );
};

export default HomePage;
