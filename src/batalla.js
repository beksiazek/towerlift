class Batalla {
    constructor(personaje1, personaje2){
        this.clonPersonaje = [];
        
        let pjAsignAux = Object.assign({}, personaje1);
        this.clonPersonaje.push(pjAsignAux);
        
        pjAsignAux = Object.assign({}, personaje2);
        this.clonPersonaje.push(pjAsignAux);
        
        this.turn = false;
    }

    ataque(){
        console.log(this.turn);

        let idPersonajeActivo = Number(this.turn);
        let idPersonajeEnEspera = Number(!this.turn);
        
        console.log("Turno del personaje " + (idPersonajeActivo+1));
        this.clonPersonaje[idPersonajeEnEspera].vidaActual = this.clonPersonaje[idPersonajeEnEspera].vidaActual - this.clonPersonaje[idPersonajeActivo].ataque;
        
        if(this.clonPersonaje[idPersonajeEnEspera].vidaActual <= 0){
            document.getElementById('msg-ganadorbatalla').innerHTML = `<h4 class='text-center'>El ganador de la batalla es ${this.clonPersonaje[idPersonajeActivo].nombre}!</h4>`;
            document.getElementById('msg-ganadorbatalla').style.display = 'inline';
            document.getElementById('body-modal-batalla').style.display = 'none';
            
        }else{
            let actualizacionDeVida = `${this.clonPersonaje[idPersonajeEnEspera].vidaActual}/${this.clonPersonaje[idPersonajeEnEspera].vidaMaxima}`;
            let idActualizacionDeVida = 'p-vidaPj'+ (idPersonajeEnEspera+1);
            document.getElementById(idActualizacionDeVida).innerHTML = actualizacionDeVida;
        }

        this.turn = !this.turn;
    }

    resetModal(){
        document.getElementById('msg-ganadorbatalla').style.display = 'none';
        document.getElementById('body-modal-batalla').style.display = 'inline';
    }
}

