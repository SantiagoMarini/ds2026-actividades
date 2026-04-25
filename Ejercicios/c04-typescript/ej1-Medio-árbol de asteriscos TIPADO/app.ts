function generar(): void {
    let valor: number = Number((document.getElementById("altura") as HTMLInputElement).value);
    let resultado: any = document.getElementById("resultado");

    // valido que no esté vacío y que sea mayor a 1
    if (valor < 1 || valor == null) {
        resultado.textContent = "Error: ingresá un número mayor a 1";
        return;
    }

    let arbol: string = "";

    for (let i: number = 1; i<= valor; i++){
        for (let j: number = 1; j<= i; j++){
            arbol = arbol + "*";
        }
        arbol = arbol + "\n";
    }

    resultado.textContent = arbol;
}
