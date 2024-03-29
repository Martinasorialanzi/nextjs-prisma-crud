"use client";
import { useRouter } from "next/navigation";
import { React, useEffect, useState } from "react";

const NewPage = ({ params }) => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (params.id) {
      fetch(`/api/tasks/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setDescription(data.description);
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (params.id) {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": "application/json", //esto tiene que ir si o si para que el backend lo entienda como json
        },
      });
      const data = await res.json();
    } else {
      const res = await fetch(`/api/tasks`, {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": "application/json", //esto tiene que ir si o si para que el backend lo entienda como json
        },
      });
      const data = await res.json();
    }

    router.push("/");
    router.refresh()
  };
  return (
    <>
      <div>Formulario de tareas</div>
      <div className="h-scrren flex justify-center item-center">
        <form className="bg-slate-800 p-10" onSubmit={handleSubmit}>
          <label htmlFor="title" className="font-bold text-sm">
            Titulo
          </label>
          <input
            id="title"
            type="text"
            className="border border-gray-400 -p-2 mb-4 w-full text-black"
            placeholder="Titulo"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label htmlFor="title" className="font-bold text-sm">
            Descripción de la tarea
          </label>

          <textarea
            id="description"
            rows="3"
            className="border border-gray-400 -p-2 mb-4 w-full text-black"
            placeholder="Descripción tarea"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
          {params.id ? (
            <div>
              <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Editar
              </button>

              <button 
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-10"
              type="button"//sirve para indicar que este bton aunque este adentro del fromulario no va a realizar la funcion de submit. va a tener otra funcion.              >
              onClick={async()=>{
                const res = await fetch (`/api/tasks/${params.id}`,{
                  method:"DELETE"
                })
                const data = await res.json()
                // alert (`tarea ${params.id} eliminada :${data.title}`)
                router.push("/");
                router.refresh()
              }}
              
              >  
              Eliminar
              </button>
            </div>
          ) : (
            <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Crear
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default NewPage;
