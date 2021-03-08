class Jugador {
    constructor(id) {
        this.nombreJugador = id;
        this.personajes = [];
    }

    crearPersonaje() {
        let nombre = document.getElementById("input-nombrepersonaje").value;

        if (nombre != "") {
            let clase = claseSeleccionada;
            if (clase != null) {
                let nuevoPersonaje = this._crearPersonaje({ nombre, clase });

                this.personajes.push(nuevoPersonaje);

                console.log("Se ha creado un nuevo ente.");
                nuevoPersonaje.status();
                mostrarPersonajes();
                limpiarModalCreacionPersonaje();
            } else {
                document.getElementById("modal-confirmacion").innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <p>Seleccione una clase!</p>
                        </div>
                        <div class='modal-footer'>
                            <button type="button" class="btn btn-light" data-mdb-dismiss="modal" onclick="showModal('modal-crearpersonaje')">
                                &#10060;
                            </button>
                        </div>
                    </div>
                </div>
                `;
                showModal("modal-confirmacion");
            }
        } else {
            document.getElementById("modal-confirmacion").innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <p>Ingrese un nombre para el personaje!</p>
                    </div>
                    <div class='modal-footer'>
                        <button type="button" class="btn btn-light" data-mdb-dismiss="modal" onclick="showModal('modal-crearpersonaje')">
                            &#10060;
                        </button>
                    </div>
                </div>
            </div>
            `;
            showModal("modal-confirmacion");
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
        document.getElementById("modal-confirmacion").innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <p>${jugador.personajes[i].nombre} ha sido descartado.</p>
                    </div>
                    <div class='modal-footer'>
                        <button type="button" class="btn btn-light" data-mdb-dismiss="modal">
                            &#10004;
                        </button>
                    </div>
                </div>
            </div>
        `;
        showModal("modal-confirmacion");
        jugador.personajes.splice(i, 1);
        mostrarPersonajes();
    }
}
