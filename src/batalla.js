class Batalla {
    constructor(personaje1, personaje2){
        this.clonPersonaje1 = Object.assign({}, personaje1);
        this.clonPersonaje2 = Object.assign({}, personaje2);
        this.turn = true;
    }
    ataque(){
        console.log(this.turn);
        let actualizacionDeVida;
        switch(this.turn){
            case true:
                console.log("entró true, turno pj1");
                this.clonPersonaje2.vidaActual = this.clonPersonaje2.vidaActual - this.clonPersonaje1.ataque;
                actualizacionDeVida = `${this.clonPersonaje2.vidaActual}/${this.clonPersonaje2.vidaMaxima}`;
                document.getElementById('p-vidaPj2').innerHTML=actualizacionDeVida;
                break;
            
            case false:
                console.log("entró false, turno pj2");
                this.clonPersonaje1.vidaActual = this.clonPersonaje1.vidaActual - this.clonPersonaje2.ataque;
                actualizacionDeVida = `${this.clonPersonaje1.vidaActual}/${this.clonPersonaje1.vidaMaxima}`;
                document.getElementById('p-vidaPj1').innerHTML=actualizacionDeVida;
                break;
        }

        this.turn = !this.turn;
    }
}

