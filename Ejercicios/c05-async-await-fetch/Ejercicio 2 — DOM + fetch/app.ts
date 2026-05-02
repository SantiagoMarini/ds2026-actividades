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

const contenedor = document.getElementById("app") as HTMLElement;
const lista = document.getElementById("lista") as HTMLUListElement;
async function mostrarUsuarios(): Promise<void> {
    lista.innerHTML = ""
    contenedor.innerHTML = "<p>Cargando…</p>";
    const usuarios = await obtenerUsuarios();
    usuarios.forEach(usuario => {
        lista.innerHTML += `<li>
        <h3>${usuario.name}</h3>
        <p>${usuario.email}</p>
        </li>`;
    });
    contenedor.innerHTML = "";
}
    mostrarUsuarios();

