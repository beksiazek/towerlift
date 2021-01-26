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

            let nuevoPersonaje = this._crearPersonaje(nombre, clase);

            this.listaDePersonajes.push(nuevoPersonaje);

            console.log("Se ha creado un nuevo ente.");

            nuevoPersonaje.status();
        } else {
            alert(
                "Ya llegó al límite de creación de personajes! Descarte uno actual antes de intentar crear otro."
            );
        }
    }

    _crearPersonaje(nombrePersonaje, clasePersonaje) {
        switch (clasePersonaje) {
            case "ASESINO":
                return new Asesino(nombrePersonaje);

            case "DEMOLEDOR":
                return new Demoledor(nombrePersonaje);

            case "MAGO":
                return new Mago(nombrePersonaje);
        }
    }

    descartarPersonaje() {
        let nombrePersonaje = prompt("Qué personaje quiere descartar?");
        nombrePersonaje = nombrePersonaje.toUpperCase().trim();
        for (let i = 0; i < nuevoJugador.listaDePersonajes.length; i++) {
            if (
                nuevoJugador.listaDePersonajes[
                    i
                ].nombrePersonaje.toUpperCase() == nombrePersonaje
            ) {
                alert(
                    nuevoJugador.listaDePersonajes[i].nombrePersonaje +
                        " fue descartado."
                );
                nuevoJugador.listaDePersonajes.splice(i, 1);
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
        for (let i = 0; i < nuevoJugador.listaDePersonajes.length; i++) {
            if (
                nuevoJugador.listaDePersonajes[
                    i
                ].nombrePersonaje.toUpperCase() == nombrePersonaje
            ) {
                nuevoJugador.listaDePersonajes[i].status();
                var flag = 1;
            }
        }
        if (flag != 1) {
            alert("No existe ningún personaje con ese nombre.");
        }
    }
}

class Personaje {
    constructor(nombrePersonaje) {
        this.nombrePersonaje = nombrePersonaje;
        this.nivel = 1;
    }
    status() {
        document.getElementById("info").innerHTML = `
         <div>
         <h3>Estado del personaje:</h3>
         <h2>${this.nombrePersonaje}</h2>
         <p>${this.clase}</p>
         <p>Nvl. ${this.nivel}</p>
         <p>Exp. : ${this.experienciaActual} / ${this.experienciaMaxima}</p>
         <p>Vida:         ${this.vidaActual} / ${this.vidaMaxima}</p>
         <p>Maná:         ${this.manaActual} / ${this.manaMaximo}</p>
         <p>Estamina: ${this.estaminaActual} / ${this.estaminaMaxima}</p>
         <p>Ataque:      ${this.ataque}</p>
         <p>Poder:       ${this.poder}</p>
         <p>Defensa:     ${this.defensa}</p>
         <p>Agilidad:    ${this.agilidad}</p>
         </div>`;
    }
    subirDeNivel() {
        this.nivel = this.nivel + 1;
        this.experienciaActual = 0;
        this.experienciaMaxima = this.experienciaMaxima + 25;
    }
}

class Asesino extends Personaje {
    constructor(nombrePersonaje) {
        super(nombrePersonaje);
        this.ataque = 10;
        this.poder = 0;
        this.defensa = 5;
        this.agilidad = 10;
        this.vidaMaxima = 100;
        this.vidaActual = 100;
        this.estaminaMaxima = 50;
        this.estaminaActual = 50;
        this.manaMaximo = 0;
        this.manaActual = 0;
        this.experienciaMaxima = 50;
        this.experienciaActual = 0;
    }
    subirDeNivel() {
        super.subirDeNivel();
        this.ataque = this.ataque + 2;
        this.defensa = this.defensa + 1;
        this.agilidad = this.agilidad + 2;
        this.vidaMaxima = this.vidaMaxima + 8;
        this.estamina = this.estamina + 4;
    }
}

class Demoledor extends Personaje {
    constructor(nombrePersonaje) {
        super(nombrePersonaje);
        this.ataque = 5;
        this.poder = 0;
        this.defensa = 10;
        this.agilidad = 4;
        this.vidaMaxima = 140;
        this.vidaActual = 140;
        this.estaminaMaxima = 50;
        this.estaminaActual = 50;
        this.manaMaximo = 0;
        this.manaActual = 0;
        this.experienciaMaxima = 50;
        this.experienciaActual = 0;
    }
    subirDeNivel() {
        super.subirDeNivel();
        this.ataque = this.ataque + 1;
        this.defensa = this.defensa + 3;
        this.agilidad = this.agilidad + 0.5;
        this.vidaMaxima = this.vidaMaxima + 11;
        this.estamina = this.estamina + 3;
    }
}

class Mago extends Personaje {
    constructor(nombrePersonaje) {
        super(nombrePersonaje);
        this.ataque = 2;
        this.poder = 10;
        this.defensa = 5;
        this.agilidad = 5;
        this.vidaMaxima = 80;
        this.vidaActual = 80;
        this.estaminaMaxima = 0;
        this.estaminaActual = 0;
        this.manaMaximo = 50;
        this.manaActual = 50;
        this.experienciaMaxima = 50;
        this.experienciaActual = 0;
    }
    subirDeNivel() {
        super.subirDeNivel();
        this.poder = this.poder + 2;
        this.defensa = this.defensa + 0.5;
        this.agilidad = this.agilidad + 0.5;
        this.vidaMaxima = this.vidaMaxima + 6;
        this.manaMaximo = this.manaMaximo + 4;
    }
}

var nuevoJugador;
creaciónDeJugador();

function creaciónDeJugador() {
    let id = prompt("Ingrese su apodo de jugador: ");
    nuevoJugador = new Jugador(id);
}

/*function SubirNivel (){
    nuevoJugador.listaDePersonajes[0].subirDeNivel();
}*/
