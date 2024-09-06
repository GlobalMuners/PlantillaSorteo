const boton_sorteo = document.getElementById("boton_sorteo");

class bloque {
    constructor(id, nombre_imagen){
        this.id = id;
        this.img = nombre_imagen;
        this.paisesComites = [];
    }
    getID (){
        return this.id
    }

}
class handler {
    constructor() {
        //EDITABLE: Hacer una lista para pegar dentro de los brackets []
        //          Formato de lista: "Nombre1", "Nombre 2", "Nombre 3"
        //          Todo texto debe ir DENTRO de las comillas, o marcará error
        // this.instituciones = ["Prepa 01.", "Prepa 02.", "Prepa O3."]
        this.instituciones = [
                            ];
        this.bloques = [];
        this.etapa = 0;
        this.bloques_sorteados = 0;

    }
    revolver(array) {
        let indice_actual = array.length,  indice_aleatorio;
        while (indice_actual != 0) {
            indice_aleatorio = Math.floor(Math.random() * indice_actual);
            indice_actual--;

            [array[indice_actual], array[indice_aleatorio]] = [
                array[indice_aleatorio], array[indice_actual]
            ];
        }

        return array;
    }

    sorteo() {
        console.log("La etapa es: "+  this.etapa);
        switch (this.etapa) {
            case 0:
                this.instituciones.forEach(institucion => {
                    gmHandler.crearFila(institucion);
                });
                boton_sorteo.innerHTML = "Sorteo de turnos";
                this.etapa++;
                break;
            case 1:
                this.instituciones = this.revolver(this.instituciones);
                this.borrarFilas();
                this.instituciones.forEach(institucion => {
                    gmHandler.crearFila(institucion);
                });
                boton_sorteo.innerHTML = "Rifar bloque";
                this.bloques = this.revolver(this.bloques);
                this.etapa++;
                break;
            case 2:
                this.borrarFilas();
                    this.bloques_sorteados++;
                    
                    for (let i = 0; i < this.bloques_sorteados; i++) {
                        this.crearFila(
                            this.instituciones[i],
                            this.bloques[i].id,
                            this.bloques[i].img
                        );
                    }
                    for (let i = this.bloques_sorteados; i < this.instituciones.length; i++) {
                        this.crearFila(
                            this.instituciones[i]
                        );
                    }
                    if (this.bloques_sorteados == this.instituciones.length){
                        boton_sorteo.innerHTML = "Fin del sorteo";
                        this.bloques_sorteados++;;
                        
                    }
                    break;
            default:
                boton_sorteo.innerHTML = "Fin del sorteo";
                
        }
    }

    // EDITABLE: Cambiar el formato de las imagenes en las comillas que encapsulan a ".jpg"
    // Ejemplo: Si se quiere subir las imagenes en .png => new bloque(index, "img" + index + ".png")
    //En la carpeta donde se suben las imágenes (que debe estar dentro de la carpeta del sorteo con los demás documentos)
    //Debe seguirse el mismo formato de nombrado, ej: "img1.jpg", "img2.jpg"
    //El orden de las imágenes debe coincidir con el número de bloque/estado miembro
    crearBloques() {
        for (let index = 1; index < this.instituciones.length + 1; index++) {
            this.bloques.push(new bloque(index, "img" + index + ".jpg"));
        }
    }

    crearFila(institucion, bloque, img_filename) {
        let tabla = document.getElementById("tabla-sorteo")
        let fila = document.createElement("tr");
        let dato1 = document.createElement("td");
        dato1.innerHTML = institucion;
        let dato2 = document.createElement('td');

        if (bloque != undefined || img_filename != undefined){
            let link = document.createElement('a');
            link.href = "./img/" + img_filename;
            link.target = "_blank";
            link.innerHTML = bloque;
            dato2.appendChild(link)
        }

        fila.appendChild(dato1);
        fila.appendChild(dato2);
        tabla.appendChild(fila);
    }

    borrarFilas (){
        let tabla = document.getElementById("tabla-sorteo");
        while (tabla.firstChild) {
            tabla.removeChild(tabla.firstChild);
        }
    }


}

let gmHandler = new handler();
gmHandler.crearBloques();
