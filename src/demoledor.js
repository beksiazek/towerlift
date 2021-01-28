class Demoledor extends Personaje {
    constructor({nombre, nivel, clase, ...stats}) {
        super(nombre, nivel);
        this.clase = 'DEMOLEDOR';
        if(Object.keys(stats).length != 0){
            this.ataque = stats.ataque;
            this.poder = stats.poder;
            this.defensa = stats.defensa;
            this.agilidad = stats.agilidad;
            this.vidaMaxima = stats.vidaMaxima;
            this.vidaActual = stats.vidaActual;
            this.estaminaMaxima = stats.estaminaMaxima;
            this.estaminaActual = stats.estaminaActual;
            this.manaMaximo = stats.manaMaximo;
            this.manaActual = stats.manaActual;
            this.experienciaMaxima = stats.experienciaMaxima;
            this.experienciaActual = stats.experienciaActual;
        }else{
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
    }
    subirDeNivel() {
        super.subirDeNivel();
        this.ataque = this.ataque + 1;
        this.defensa = this.defensa + 3;
        this.agilidad = this.agilidad + 0.5;
        this.vidaMaxima = this.vidaMaxima + 11;
        this.vidaActual = this.vidaMaxima;
        this.estamina = this.estamina + 3;
        this.estaminaActual = this.estaminaMaxima;
        this.manaActual = this.manaMaximo;
    }
}