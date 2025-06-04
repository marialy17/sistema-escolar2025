"use client";

import { useQuery } from "convex/react";
import {api} from "@/convex/_generated/api"

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TablaPrueba() {
  const datos = useQuery(api.prueba.obtenerDatos);

  if (datos === undefined) {
    return <div>Cargando datos...</div>;
  }



  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Lista de los datos</h2>
     
      </div>
      
      <Table>
        <TableCaption>Lista de datos registrados</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Apodo</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Correo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {datos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No hay datos registrados
              </TableCell>
            </TableRow>
          ) : (
            datos.map((dato) => (
              <TableRow 
                key={dato._id}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell className="font-medium">
                  {dato.apodo}
                </TableCell>
                <TableCell>{dato.nombre}</TableCell>
                <TableCell>{dato.correo}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}