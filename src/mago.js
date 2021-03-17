class Mago extends Personaje {
    constructor({nombre, nivel, clase, ...stats}) {
        super(nombre, nivel);
        this.clase = 'MAGO';
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
            this.ataque = 2;
            this.poder = 20;
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
    }
    subirDeNivel() {
        super.subirDeNivel();
        this.poder = this.poder + 2;
        this.defensa = this.defensa + 0.5;
        this.agilidad = this.agilidad + 0.5;
        this.vidaMaxima = this.vidaMaxima + 6;
        this.vidaActual = this.vidaMaxima;
        this.manaMaximo = this.manaMaximo + 4;
        this.manaActual = this.manaMaximo;
        this.estaminaActual = this.estaminaMaxima;
    }
}