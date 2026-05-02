interface Usuario {
    id: number ,
    name: string,
    email: string,
    phone: string
}

async function obtenerUsuarios(): Promise<Usuario[]> {

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        //response.ok devuelve true si no hay error
        if (!response.ok){
            //response.status devuelve el error
            throw new Error(`HTTP ${response.status}`);
        }

        //una opcion viable
        //const usuario: Usuario[] = await response.json();
        //return usuario

        //otra opcion
        return (await response.json()) as Usuario[];

    } catch(error){
        console.log(`error al obtener usuario:${error}`);
        return [];
    }
}

async function mostrarUsuarios(): Promise<void> { 
    const usuarios = await obtenerUsuarios();
    usuarios.forEach(usuario => {
        console.log(usuario.name, usuario.email)
    });
}
    mostrarUsuarios();

