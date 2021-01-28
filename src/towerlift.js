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
    }else{
        alert("No hay ninguna partida guardada!");
    }
}

/*function SubirNivel (){
    jugador.listaDePersonajes[0].subirDeNivel();
}*/
