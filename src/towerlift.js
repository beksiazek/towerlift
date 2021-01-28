var jugador;

//Separar funciones!!
function nuevaPartida() {
    let id = prompt("Ingrese su apodo de jugador: ");
    jugador = new Jugador(id);
    document.getElementById("newgame-container").hidden = true;
    document.getElementById("player-name").innerHTML = id;
    document.getElementById("main-container").hidden = false;
}

function guardarJugador() {
    localStorage.setItem("jugador", JSON.stringify(jugador));
}

function cargarJugador() {
    if(localStorage.getItem("jugador") != null){
    let datosDelJugador = JSON.parse(localStorage.getItem("jugador"));
    jugador = new Jugador(datosDelJugador.nombreJugador);
    jugador.cargarPersonajes(datosDelJugador.listaDePersonajes);
    }else{
        alert("No hay ninguna partida guardada!");
    }
}

/*function SubirNivel (){
    jugador.listaDePersonajes[0].subirDeNivel();
}*/
