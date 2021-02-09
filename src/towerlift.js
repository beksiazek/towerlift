var jugador;
var claseSeleccionada = null;
//Separar funciones!!
function nuevaPartida() {
    let id = document.getElementById("input-apodo").value;
    jugador = new Jugador(id);
    document.getElementById("empezarpartida-container").hidden = true;
    document.getElementById("player-name").innerHTML = id;
    document.getElementById("main-container").hidden = false;
}

function guardarPartida() {
    localStorage.setItem("jugador", JSON.stringify(jugador));
    alert("Su partida ha sido guardada!");
}

function cargarPartida() {
    if (localStorage.getItem("jugador") != null) {
        let datosDelJugador = JSON.parse(localStorage.getItem("jugador"));
        jugador = new Jugador(datosDelJugador.nombreJugador);
        jugador.cargarPersonajes(datosDelJugador.personajes);
        document.getElementById("empezarpartida-container").hidden = true;
        document.getElementById("player-name").innerHTML =
            jugador.nombreJugador;
        document.getElementById("main-container").hidden = false;
        mostrarPersonajes();
    } else {
        alert("No hay ninguna partida guardada!");
    }
}

function mostrarPersonajes() {
    let cards = ``;
    for (i = 0; i < jugador.personajes.length; i++) {
        cards += `
        <div class="col-6 col-md-3 col-lg-2">
            <div class="card shadow-2-strong hover-overlay">
                <div class="bg-image">
                    <span style='font-size:100px;'>${
                        jugador.personajes[i].clase == "ASESINO"
                            ? "&#127993;"
                            : jugador.personajes[i].clase == "DEMOLEDOR"
                            ? "&#128170;"
                            : "&#128302;"
                    }
                    </span>
                </div>
                <div class="card-body hover-overlay">
                    <h5 class="card-title">${
                        jugador.personajes[i].nombre
                    }</h5>   
                    <p class="card-text">
                    ${jugador.personajes[i].clase} nvl.${
            jugador.personajes[i].nivel
        }
                    </p>
                    <div
                        class="mask" 
                        style="background: linear-gradient(45deg, rgba(29, 236, 197, 0.1), rgba(0, 0, 0, 0.1) 100%);">
                        <div class="text-center">
                            <button class="btn btn-sm btn-outline-dark btn-rounded" data-mdb-ripple-color="dark" onclick='jugador.personajes[${i}].status()'>STATUS</button>
                            <button class="btn btn-sm btn-outline-dark btn-rounded" data-mdb-ripple-color="dark" onclick='jugador.eliminarPersonaje(${i})'>ELIMINAR</button>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("cards-personajes").innerHTML = cards;
}

function seleccionDeClase(clase) {
    console.log("funciona");
    if (claseSeleccionada) {
        document
            .getElementById("card-" + claseSeleccionada)
            .classList.remove("border", "border-dark");
    }
    claseSeleccionada = clase;
    document
        .getElementById("card-" + claseSeleccionada)
        .classList.add("border", "border-dark");
}

function hideModal(idModal){
    let auxiliarModal = document.getElementById(idModal);
    let modal = mdb.Modal.getInstance(auxiliarModal);
    modal.hide();
}

function handleModalNuevaPartidaEnter(event){
    if (event.which == 13){
        nuevaPartida();
        hideModal("modal-apodo");
    }
}
function handleModalCrearPersonajeEnter(event){
    if (event.which == 13){
        jugador.crearPersonaje();
        hideModal("modal-crearpersonaje");
    }
}
//new mdb.Modal(document.getElementById("modal-crearpersonaje")).show();

/*function SubirNivel (){
    jugador.listaDePersonajes[0].subirDeNivel();
}*/
