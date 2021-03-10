class Batalla {
    constructor(personaje1, personaje2){
        this.personaje = personaje1;
        this.clonPersonaje = [];
        
        let pjAsignAux = Object.assign({}, personaje1);
        this.clonPersonaje.push(pjAsignAux);
        
        pjAsignAux = Object.assign({}, personaje2);
        this.clonPersonaje.push(pjAsignAux);
        
        this.turn = Boolean(Date.now()%2);
    }

    ataque(){
        console.log(this.turn);

        let idPersonajeActivo = Number(this.turn);
        let idPersonajeEnEspera = Number(!this.turn);
        
        console.log("Turno del personaje " + (idPersonajeActivo+1));
        this.clonPersonaje[idPersonajeEnEspera].vidaActual = this.clonPersonaje[idPersonajeEnEspera].vidaActual -
         (this.clonPersonaje[idPersonajeActivo].ataque - this.clonPersonaje[idPersonajeEnEspera].defensa);
        playAnimacionDanio(idPersonajeEnEspera+1);

        if(this.clonPersonaje[idPersonajeEnEspera].vidaActual <= 0){
            document.getElementById('msg-ganadorbatalla').innerHTML = `<h4 class='text-center'>El ganador de la batalla es ${this.clonPersonaje[idPersonajeActivo].nombre}!</h4>`;
            document.getElementById('msg-ganadorbatalla').style.display = 'inline';
            document.getElementById('body-modal-batalla').style.display = 'none';
            document.getElementById('button-finalizarsimulacion').onclick= function () { batalla.resetModal(); batalla.personaje.aumentarExperiencia(); };
            
        }else{
            let actualizacionDeVida = `${this.clonPersonaje[idPersonajeEnEspera].vidaActual}/${this.clonPersonaje[idPersonajeEnEspera].vidaMaxima}`;
            let idActualizacionDeVida = 'p-vidaPj'+ (idPersonajeEnEspera+1);
            document.getElementById(idActualizacionDeVida).innerHTML = actualizacionDeVida;
        }

        this.turn = !this.turn;
    }

    ataqueEspecial() {
        console.log(this.turn);

        let idPersonajeActivo = Number(this.turn);
        let idPersonajeEnEspera = Number(!this.turn);
        
        console.log("Turno del personaje " + (idPersonajeActivo+1));

        let clase = this.clonPersonaje[idPersonajeActivo].clase;

        switch (clase) {
            case 'ASESINO':
                this.clonPersonaje[idPersonajeEnEspera].vidaActual = this.clonPersonaje[idPersonajeEnEspera].vidaActual -
                 (this.clonPersonaje[idPersonajeActivo].ataque * 1.5 - this.clonPersonaje[idPersonajeEnEspera].defensa);
                 playAnimacionLetal(idPersonajeActivo+1);
            break;
            
            case 'DEMOLEDOR':
                this.clonPersonaje[idPersonajeEnEspera].vidaActual = this.clonPersonaje[idPersonajeEnEspera].vidaActual -
                 (this.clonPersonaje[idPersonajeActivo].ataque - this.clonPersonaje[idPersonajeEnEspera].defensa);
                let plusDeVida = 5 * (1 + (this.clonPersonaje[idPersonajeActivo].nivel / 10));
                console.log(plusDeVida);
                console.log(this.clonPersonaje[idPersonajeActivo].vidaActual = this.clonPersonaje[idPersonajeActivo].vidaActual + plusDeVida);
                playAnimacionCura(idPersonajeActivo+1);    
            break;

            case 'MAGO':
                let danioMagico = this.clonPersonaje[idPersonajeActivo].poder * (1 + (this.clonPersonaje[idPersonajeActivo].nivel / 5));
                this.clonPersonaje[idPersonajeEnEspera].vidaActual = this.clonPersonaje[idPersonajeEnEspera].vidaActual -
                 (this.clonPersonaje[idPersonajeActivo].ataque + danioMagico - this.clonPersonaje[idPersonajeEnEspera].defensa);
                 playAnimacionMagia(idPersonajeActivo+1);
            break;     
        } 
            
        playAnimacionDanio(idPersonajeEnEspera+1);

        if(this.clonPersonaje[idPersonajeEnEspera].vidaActual <= 0){
            document.getElementById('msg-ganadorbatalla').innerHTML = `<h4 class='text-center'>El ganador de la batalla es ${this.clonPersonaje[idPersonajeActivo].nombre}!</h4>`;
            document.getElementById('msg-ganadorbatalla').style.display = 'inline';
            document.getElementById('body-modal-batalla').style.display = 'none';
            document.getElementById('button-finalizarsimulacion').onclick= function () { batalla.resetModal(); batalla.personaje.aumentarExperiencia(); };
            
        }else{
            for(let i = 0; i<=1; i++){
                let actualizacionDeVida = `${(this.clonPersonaje[i].vidaActual).toFixed(1)}/${this.clonPersonaje[i].vidaMaxima}`;
                let idActualizacionDeVida = 'p-vidaPj'+ (i+1);
                document.getElementById(idActualizacionDeVida).innerHTML = actualizacionDeVida;
            }
        }

        this.turn = !this.turn;
    }

    pasarTurno(){
        elementoAnimado.classList.remove('shake');
        this.turn = !this.turn;
    }

    resetModal(){
        document.getElementById('msg-ganadorbatalla').style.display = 'none';
        document.getElementById('body-modal-batalla').style.display = 'inline';
    }
}

