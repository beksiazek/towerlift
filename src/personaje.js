class Personaje {
    constructor(nombre, nivel = 1) {
        this.nombre = nombre;
        this.nivel = nivel;
    }
    status() {
        document.getElementById("status").innerHTML = `
         <div>
         <h3>Estado del personaje:</h3>
         <h2>${this.nombre}</h2>
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

