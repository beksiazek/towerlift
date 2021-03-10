var jugador = new Jugador('init');
var listaPersonajesIa = [];
var claseSeleccionada = null;
var batalla;
var elementoAnimado = [null, null];

fetch("https://api.jsonbin.io/b/603c7cbe81087a6a8b93205f/1")
    .then(response => response.json())
    .then(Ia => importarPersonajesIa(Ia));

function nuevaPartida() {
    let id = document.getElementById("input-apodo").value;
    if(id != ""){
        jugador = new Jugador(id);
        document.getElementById("empezarpartida-container").hidden = true;
        document.getElementById("player-name").innerHTML = id;
        document.getElementById("main-container").hidden = false;
    }else{
        document.getElementById('modal-confirmacion').innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <p>Ingrese un apodo de jugador!</p>
                </div>
                <div class='modal-footer'>
                    <button type="button" class="btn btn-light" data-mdb-dismiss="modal" onclick="showModal('modal-apodo')">
                        &#10060;
                    </button>
                </div>
            </div>
        </div>
        `;
        showModal('modal-confirmacion');
    }    
}

function guardarPartida() {
    localStorage.setItem("jugador", JSON.stringify(jugador));
    document.getElementById('modal-confirmacion').innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <p>La partida se ha guardado correctamente!</p>
                </div>
                <div class='modal-footer'>
                    <button type="button" class="btn btn-light" data-mdb-dismiss="modal">
                        &#10004;
                    </button>
                </div>
            </div>
        </div>
    `;
    showModal('modal-confirmacion');
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

        document.getElementById('modal-confirmacion').innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <p>La partida se ha cargado correctamente!</p>
                    </div>
                    <div class='modal-footer'>
                        <button type="button" class="btn btn-light" data-mdb-dismiss="modal">
                            &#10004;
                        </button>
                    </div>
                </div>
            </div>
        `;
        showModal('modal-confirmacion');
    } else {
        document.getElementById('modal-confirmacion').innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <p>No hay ninguna partida guardada!</p>
                    </div>
                    <div class='modal-footer'>
                        <button type="button" class="btn btn-light" data-mdb-dismiss="modal">
                            &#10060;
                        </button>
                    </div>
                </div>
            </div>
        `;
        showModal('modal-confirmacion');
    }
}

function importarPersonajesIa(personajes) {
    let personaje;
    for (let i = 0; i < personajes.length; i++) {
        personaje = jugador._crearPersonaje(personajes[i]);
        listaPersonajesIa.push(personaje);
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
                            <button class="btn btn-sm btn-outline-dark btn-rounded" data-mdb-ripple-color="dark" onclick='jugador.personajes[${i}].status()'>STATUS</button>
                            <button class="btn btn-sm btn-outline-dark btn-rounded" data-mdb-ripple-color="dark" onclick='validacionEliminarPersonaje(${i})'>ELIMINAR</button>
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
    if(elementoAnimado[idCard-1] != null){
        elementoAnimado[idCard-1].classList.remove('shake');
        elementoAnimado[idCard-1].classList.remove('greenflash');
        elementoAnimado[idCard-1].classList.remove('purpleflash');
        elementoAnimado[idCard-1].classList.remove('yellowflash');
        void elementoAnimado[idCard-1].offsetWidth;
    }
    elementoAnimado[idCard-1] = document.getElementById('card-personaje'+idCard);
    elementoAnimado[idCard-1].classList.add('shake');
}

function playAnimacionCura(idCard) {
    if(elementoAnimado[idCard-1] != null){
        elementoAnimado[idCard-1].classList.remove('greenflash');
        void elementoAnimado[idCard-1].offsetWidth;
    }
    elementoAnimado[idCard-1] = document.getElementById('card-personaje'+idCard);
    elementoAnimado[idCard-1].classList.add('greenflash');
}

function playAnimacionLetal(idCard) {
    if(elementoAnimado[idCard-1] != null){
        elementoAnimado[idCard-1].classList.remove('purpleflash');
        void elementoAnimado[idCard-1].offsetWidth;
    }
    elementoAnimado[idCard-1] = document.getElementById('card-personaje'+idCard);
    elementoAnimado[idCard-1].classList.add('purpleflash');
}

function playAnimacionMagia(idCard) {
    if(elementoAnimado[idCard-1] != null){
        elementoAnimado[idCard-1].classList.remove('yellowflash');
        void elementoAnimado[idCard-1].offsetWidth;
    }
    elementoAnimado[idCard-1] = document.getElementById('card-personaje'+idCard);
    elementoAnimado[idCard-1].classList.add('yellowflash');
}

function validacionCrearPersonaje() {
    if (jugador.personajes.length < 4) {
        showModal("modal-crearpersonaje");
    } else {
        showModal("modal-limitedepersonajes");
    }
}

function validacionEliminarPersonaje(indicePersonaje) {
    document.getElementById('modal-confirmacion').innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <p>Está seguro de que quiere eliminar a ${jugador.personajes[indicePersonaje].nombre}?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-mdb-dismiss="modal">
                        &#10060;
                    </button>
                    <button type="button" class="btn btn-danger" onclick="jugador.eliminarPersonaje(${indicePersonaje})"
                        data-mdb-dismiss="modal">ELIMINAR</button>
                </div>
            </div>
        </div>
    `;
    showModal('modal-confirmacion');
}

function validacionGuardarPartida() {
    document.getElementById('modal-confirmacion').innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class='modal-header'>
                <h5>Guardar partida</h5>
            </div>
            <div class="modal-body">
                <p>Está seguro de que quiere guardar la partida? Los datos de personajes guardados anteriormente se sobreescribirán.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-mdb-dismiss="modal">
                    &#10060;
                </button>
                <button type="button" class="btn btn-danger" onclick="guardarPartida()"
                    data-mdb-dismiss="modal">GUARDAR</button>
            </div>
        </div>
    </div>
    `;
    showModal('modal-confirmacion');
}

function validacionCargarPartida() {
    document.getElementById('modal-confirmacion').innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class='modal-header'>
                <h5>Cargar partida</h5>
            </div>
            <div class="modal-body">
                <p>Está seguro de que quiere cargar una partida? Los datos de personajes no guardados se perderán.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-mdb-dismiss="modal">
                    &#10060;
                </button>
                <button type="button" class="btn btn-danger" onclick="cargarPartida()"
                    data-mdb-dismiss="modal">CARGAR</button>
            </div>
        </div>
    </div>
    `;
    showModal('modal-confirmacion');
}

function mensajeExperienciaObtenida(nombre) {
    document.getElementById('msg-xpobtenida').innerHTML = `
        <p>${nombre} adquirió 25 pts. de experiencia!</p>
    `;
    showModal('modal-xpobtenida');
    document.getElementById('button-finalizarsimulacion').onclick=
        function () { batalla.resetModal(); };
}

function mensajeSubirDeNivel(nombre, nivel) {
    document.getElementById('msg-subirdenivel').innerHTML = `
        <p>${nombre} subió a nivel ${nivel}.</p>
    `;
    showModal('modal-subirdenivel');
    document.getElementById('button-dismissexperiencia').onclick = null;
}

function limpiarModalCreacionPersonaje() {
    document
        .getElementById("card-" + claseSeleccionada)
        .classList.remove("border", "border-dark");
    claseSeleccionada = null;
    document.getElementById("input-nombrepersonaje").value = "";
}


function batallaVsIa(indicePersonaje) {
    batalla = new Batalla(jugador.personajes[indicePersonaje], listaPersonajesIa[0]);
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

