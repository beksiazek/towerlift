class Batalla {
    constructor(personaje1, personaje2){
        this.clonPersonaje1 = Object.assign({}, personaje1);
        this.clonPersonaje2 = Object.assign({}, personaje2);
        this.turn = true;
    }
    ataque(){
        console.log(this.turn);
        switch(this.turn){
            case true:
                console.log("entró true");
                this.clonPersonaje2.vidaActual = this.clonPersonaje2.vidaActual - this.clonPersonaje1.ataque;
                this.turn = !this.turn;
                break;
            
            case false:
                console.log("entró false");
                this.clonPersonaje1.vidaActual = this.clonPersonaje1.vidaActual - this.clonPersonaje2.ataque;
                this.turn = !this.turn;
                break;
        }
    }
}

