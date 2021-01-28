class Jugador {
    constructor(id) {
        this.nombreJugador = id;
        this.listaDePersonajes = [];
    }

    crearPersonaje() {
        if (this.listaDePersonajes.length < 4) {
            let nombre = prompt("Ingrese el nombre de su personaje: ");
            nombre = nombre.trim();
            let clase;

            while (
                clase != "ASESINO" &&
                clase != "DEMOLEDOR" &&
                clase != "MAGO"
            ) {
                clase = prompt("Será un asesino, un demoledor o un mago?");
                clase = clase.toUpperCase();
            }

            let nuevoPersonaje = this._crearPersonaje({nombrePersonaje, clase});

            this.listaDePersonajes.push(nuevoPersonaje);

            console.log("Se ha creado un nuevo ente.");

            nuevoPersonaje.status();
        } else {
            alert(
                "Ya llegó al límite de creación de personajes! Descarte uno actual antes de intentar crear otro."
            );
        }
    }

    _crearPersonaje(personaje) {
        switch (personaje.clase.toUpperCase()) {
            case "ASESINO":
                return new Asesino(personaje);

            case "DEMOLEDOR":
                return new Demoledor(personaje);

            case "MAGO":
                return new Mago(personaje);
        }
    }

    cargarPersonajes(personajes) {
        let personaje;
        for(let i=0; i<personajes.length; i++){
            personaje = this._crearPersonaje(personajes[i]);
            jugador.listaDePersonajes.push(personaje);
        }
    }

    eliminarPersonaje() {
        let nombrePersonaje = prompt("Qué personaje quiere descartar?");
        nombrePersonaje = nombrePersonaje.toUpperCase().trim();
        for (let i = 0; i < jugador.listaDePersonajes.length; i++) {
            if (
                jugador.listaDePersonajes[i].nombrePersonaje.toUpperCase() ==
                nombrePersonaje
            ) {
                alert(
                    jugador.listaDePersonajes[i].nombrePersonaje +
                        " fue descartado."
                );
                jugador.listaDePersonajes.splice(i, 1);
                var flag = 1;
            }
        }
        if (flag != 1) {
            alert("No existe ningún personaje con ese nombre.");
        }
    }
    mostrarStatus() {
        let nombrePersonaje = prompt("Qué personaje quiere visualizar?");
        nombrePersonaje = nombrePersonaje.toUpperCase().trim();
        for (let i = 0; i < jugador.listaDePersonajes.length; i++) {
            if (
                jugador.listaDePersonajes[i].nombrePersonaje.toUpperCase() ==
                nombrePersonaje
            ) {
                jugador.listaDePersonajes[i].status();
                var flag = 1;
            }
        }
        if (flag != 1) {
            alert("No existe ningún personaje con ese nombre.");
        }
    }
}
