var jugador;
var claseSeleccionada = null;
var batalla;
var elementoAnimado = null;

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
    let porcentajeExperiencia;
    let cards = ``;
    for (i = 0; i < jugador.personajes.length; i++) {
        porcentajeExperiencia = 
        (jugador.personajes[i].experienciaActual/jugador.personajes[i].experienciaMaxima) * 100;
        cards += `
        <div class="col-6 col-md-3 col-lg-2">
            <div class="card shadow-2-strong hover-overlay">
                <a class='text-center' style='font-size:100px;'>${
                    jugador.personajes[i].clase == "ASESINO"
                        ? "&#127993;"
                        : jugador.personajes[i].clase == "DEMOLEDOR"
                        ? "&#128170;"
                        : "&#128302;"
                }
                </a>
                <div class="card-body hover-overlay text-center">
                    <h5 class="card-title">${
                        jugador.personajes[i].nombre
                    }</h5>   
                    <p class="card-text">
                    ${jugador.personajes[i].clase} nvl.${
            jugador.personajes[i].nivel
        }
                    </p>
                    <div class="progress" style='height: 15px'>
                        <div
                            id='progress-experiencia'
                            class="progress-bar"
                            role="progressbar"
                            style="width: ${porcentajeExperiencia}%"
                        >xp: ${jugador.personajes[i].experienciaActual}/${jugador.personajes[i].experienciaMaxima}</div>
                        </div>
                    <div
                        class="mask" 
                        style="background: linear-gradient(45deg, rgba(29, 236, 197, 0.1), rgba(0, 0, 0, 0.1) 100%);">
                        <div class="text-center">
                            <button class="btn btn-sm btn-outline-dark btn-rounded" data-mdb-ripple-color="dark">STATUS</button>
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

function mostrarPersonajesParaBatalla() {
    let cards = ``;
    for (i = 0; i < jugador.personajes.length; i++) {
        cards += `
        <div class="col-6 col-md-3 col-lg-2">
            <div class="card shadow-2-strong hover-overlay">
                <a class='text-center' style='font-size:100px;'>${
                    jugador.personajes[i].clase == "ASESINO"
                        ? "&#127993;"
                        : jugador.personajes[i].clase == "DEMOLEDOR"
                        ? "&#128170;"
                        : "&#128302;"
                }
                </a>
                <div class="card-body hover-overlay text-center">
                    <h5 class="card-title">${
                        jugador.personajes[i].nombre
                    }</h5>   
                    <p class="card-text">
                        ${jugador.personajes[i].clase} nvl.${
            jugador.personajes[i].nivel
        }
                    </p>
                    <div class="mask" 
                        style="background: linear-gradient(45deg, rgba(29, 236, 197, 0.1), rgba(0, 0, 0, 0.1) 100%);">
                        <div class="text-center">
                            <button class="btn btn-sm btn-outline-dark btn-rounded" data-mdb-ripple-color="dark" onclick='batallaVsIa(${i})'>BATALLA vs IA</button>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("cards-personajes-batalla").innerHTML = cards;
}

function seleccionDeClase(clase) {
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

function hideModal(idModal) {
    let auxiliarModal = document.getElementById(idModal);
    let modal = mdb.Modal.getInstance(auxiliarModal);
    modal.hide();
}

function showModal(idModal) {
    let modal = new mdb.Modal(document.getElementById(idModal)).show();
}

function handleModalNuevaPartidaEnter(event) {
    if (event.which == 13) {
        nuevaPartida();
        hideModal("modal-apodo");
    }
}
function handleModalCrearPersonajeEnter(event) {
    if (event.which == 13) {
        jugador.crearPersonaje();
        hideModal("modal-crearpersonaje");
    }
}

function playAnimacionDanio(idCard) {
    if(elementoAnimado != null){
        elementoAnimado.classList.remove('shake');
    }
    elementoAnimado = document.getElementById('card-personaje'+idCard);
    elementoAnimado.classList.add('shake');
  }

function validacionCrearPersonaje() {
    if (jugador.personajes.length < 4) {
        showModal("modal-crearpersonaje");
    } else {
        showModal("modal-limitedepersonajes");
    }
}

function crearAsesinoPruebaIa() {
    let nombre = "Asesino Virtual";
    let clase = "ASESINO";
    let personajeIa = jugador._crearPersonaje({ nombre, clase });
    return personajeIa;
}

function batallaVsIa(indicePersonaje) {
    let personajeIa = crearAsesinoPruebaIa();
    batalla = new Batalla(jugador.personajes[indicePersonaje], personajeIa);
    let card = `
    <div id="card-personaje1" class="card shadow-2-strong">
        <a class="text-center" style='font-size:100px;'>${
            batalla.clonPersonaje[0].clase == "ASESINO"
                ? "&#127993;"
                : batalla.clonPersonaje[0].clase == "DEMOLEDOR"
                ? "&#128170;"
                : "&#128302;"
        }</a>
        <div class="card-body text-center">
            <h5 class="card-title">${
                batalla.clonPersonaje[0].nombre
            }</h5>
            <p id='p-vidaPj1' class="card-text">
                ${batalla.clonPersonaje[0].vidaActual}/${
        batalla.clonPersonaje[0].vidaMaxima
    }
            </p>
        </div>
    </div>`;

    document.getElementById("container-personaje1").innerHTML = card;

    card = `
    <div id="card-personaje2" class="card shadow-2-strong">
        <a class="text-center" style='font-size:100px;'>${
            batalla.clonPersonaje[1].clase == "ASESINO"
                ? "&#127993;"
                : batalla.clonPersonaje[1].clase == "DEMOLEDOR"
                ? "&#128170;"
                : "&#128302;"
        }</a>
        <div class="card-body text-center">
            <h5 class="card-titl">${
                batalla.clonPersonaje[1].nombre
            }</h5>
            <p id='p-vidaPj2' class="card-text">
                ${batalla.clonPersonaje[1].vidaActual}/${
        batalla.clonPersonaje[1].vidaMaxima
    }
            </p>
        </div>
    </div>`;

    document.getElementById("container-personaje2").innerHTML = card;

    showModal("modal-batalla");
}

/*function SubirNivel (){
    jugador.listaDePersonajes[0].subirDeNivel();
}*/
