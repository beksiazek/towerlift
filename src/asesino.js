class Asesino extends Personaje {
    constructor({nombre, nivel, clase, ...stats}) {
        super(nombre, nivel);
        this.clase = 'ASESINO';
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
            this.ataque = 25;
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
    }

    subirDeNivel() {
        super.subirDeNivel();
        this.ataque = this.ataque + 2;
        this.defensa = this.defensa + 1;
        this.agilidad = this.agilidad + 2;
        this.vidaMaxima = this.vidaMaxima + 8;
        this.vidaActual = this.vidaMaxima;
        this.estaminaMaxima = this.estaminaMaxima + 4;
        this.estaminaActual = this.estaminaMaxima;
        this.manaActual = this.manaMaximo;
    }
}