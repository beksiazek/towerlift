class Mago extends Personaje {
    constructor(nombrePersonaje, nivel) {
        super(nombrePersonaje, nivel);
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