class Demoledor extends Personaje {
    constructor(nombrePersonaje, nivel) {
        super(nombrePersonaje, nivel);
        this.clase = 'Demoledor';
        
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