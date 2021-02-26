class Jugador {
    constructor(id) {
        this.nombreJugador = id;
        this.personajes = [];
    }

    crearPersonaje() {
        if (this.personajes.length < 4) {
            let nombre = document.getElementById("input-nombrepersonaje").value;
            let clase = claseSeleccionada;
            let nuevoPersonaje = this._crearPersonaje({ nombre, clase });

            this.personajes.push(nuevoPersonaje);

            console.log("Se ha creado un nuevo ente.");
            mostrarPersonajes();

            document
                .getElementById("card-" + claseSeleccionada)
                .classList.remove("border", "border-dark");
            document.getElementById("input-nombrepersonaje").value = "";
        } else {
            document
                .getElementById("card-" + claseSeleccionada)
                .classList.remove("border", "border-dark");
            document.getElementById("input-nombrepersonaje").value = "";
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
        for (let i = 0; i < personajes.length; i++) {
            personaje = this._crearPersonaje(personajes[i]);
            jugador.personajes.push(personaje);
        }
    }

    eliminarPersonaje(i) {
        alert(jugador.personajes[i].nombre + " fue descartado.");
        jugador.personajes.splice(i, 1);
        mostrarPersonajes();
    }
}
