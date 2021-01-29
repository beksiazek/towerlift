var jugador;

//Separar funciones!!
function nuevaPartida() {
    let id = prompt("Ingrese su apodo de jugador: ");
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
    if(localStorage.getItem("jugador") != null){
    let datosDelJugador = JSON.parse(localStorage.getItem("jugador"));
    jugador = new Jugador(datosDelJugador.nombreJugador);
    jugador.cargarPersonajes(datosDelJugador.personajes);
    document.getElementById("empezarpartida-container").hidden = true;
    document.getElementById("player-name").innerHTML = jugador.nombreJugador;
    document.getElementById("main-container").hidden = false;
    mostrarPersonajes();
    }else{
        alert("No hay ninguna partida guardada!");
    }
}

function mostrarPersonajes() {
    let cards = ``;
    for(i = 0; i<jugador.personajes.length; i++){
        cards += `
        <div class="col-6 col-md-3 col-lg-2">
            <div class="card hover-shadow">
                <div class="bg-image">
                    <span style='font-size:100px;'>${
                    jugador.personajes[i].clase == 'ASESINO' ? "&#127993;" : 
                    jugador.personajes[i].clase == 'DEMOLEDOR' ? "&#128170;" :
                    "&#128302;"}
                    </span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${jugador.personajes[i].nombre}</h5>   
                    <p class="card-text">
                    ${jugador.personajes[i].clase} nvl.${jugador.personajes[i].nivel}
                    </p>
                    <div class="text-center">
                        <a class="btn btn-primary" onclick='jugador.personajes[${i}].status()'>STATUS</a>
                        <a class="btn btn-primary" onclick='jugador.eliminarPersonaje(${i})'>ELIMINAR</a>
                    </div>    
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("cards-personajes").innerHTML = cards;
}

/*function SubirNivel (){
    jugador.listaDePersonajes[0].subirDeNivel();
}*/
