import {type Autor} from "../types/autor.types.ts"

    const autores: Autor[] = [
    {
        id: 1,
        nombre: "Gabriel García Márquez",
        nacionalidad: "Colombiana"
    },
    {
        id: 2,
        nombre: "Umberto Eco",
        nacionalidad: "Italiana"
    },
    {
        id: 3,
        nombre: "George Orwell",
        nacionalidad: "Británica"
    },
    {
        id: 4,
        nombre: "Julio Cortázar",
        nacionalidad: "Argentina"
    },
    {
        id: 5,
        nombre: "Antoine de Saint-Exupéry",
        nacionalidad: "Francesa"
    },
    {
        id: 6,
        nombre: "Jorge Luis Borges",
        nacionalidad: "Argentina"
    }
];

let contId: number = 6;

export function findAll(): Autor[]{
    return autores;
}

export function findId( id: number ): Autor[] | undefined {
    return autores.find( autor => autor.id === id );
} 

export function create(datos: Omit<Autor, "id">): Autor {
    const newAutor: Autor = { id: contId++, ...datos};
    autores.push(newAutor);
    return newAutor;
}

export function remove(id: number): boolean {
    const i:number = autores.findIndex(autor => autor.id === id); //para buscar el indice en el que se encuentra el autor con ese id
    if (i === -1){ return false;} // devuelve -1 si no encuentra el id
    autores.splice(i,1); //a partir del indice i, borra 1
    return true;
}

export function update(id: number, datos: Partial<Omit<Autor, "id">>): Autor | undefined {
    const i: number = autores.findIndex(autor => autor.id === id);
    if (i === -1){return;}
    autores[i] = {...autores[i], ...datos};
++    return autores[i];
}