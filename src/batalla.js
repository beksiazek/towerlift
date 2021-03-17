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

        setButtonsBatallaDisabled(true);

        let idPersonajeActivo = Number(this.turn);
        let idPersonajeEnEspera = Number(!this.turn);

        let ataquePjActivo = this.clonPersonaje[idPersonajeActivo].ataque;
        let defensaPjEnEspera = this.clonPersonaje[idPersonajeEnEspera].defensa; 
        let dañoRecibido = ataquePjActivo - defensaPjEnEspera;   

        playAnimacionDanio(idPersonajeEnEspera);

        if(dañoRecibido > 0){
            this.clonPersonaje[idPersonajeEnEspera].vidaActual -= dañoRecibido;

            if(this.clonPersonaje[idPersonajeEnEspera].vidaActual <= 0){
                document.getElementById("title-modalbatalla").innerHTML="BATALLA";
                document.getElementById('msg-ganadorbatalla').innerHTML = `<h4 class='text-center'>El ganador de la batalla es ${this.clonPersonaje[idPersonajeActivo].nombre}!</h4>`;
                document.getElementById('msg-ganadorbatalla').style.display = 'inline';
                document.getElementById('body-modal-batalla').style.display = 'none';
                document.getElementById('button-finalizarsimulacion').onclick= function () { batalla.resetModal(); batalla.personaje.aumentarExperiencia(); }; 
            }else{
                let actualizacionDeVida = `${this.clonPersonaje[idPersonajeEnEspera].vidaActual}/${this.clonPersonaje[idPersonajeEnEspera].vidaMaxima}`;
                let idActualizacionDeVida = 'p-vidaPj'+ (idPersonajeEnEspera+1);
                document.getElementById(idActualizacionDeVida).innerHTML = actualizacionDeVida;
                setTimeout(function(){batalla.pasarTurno()}, 1000);
            }
        }
    }

    ataqueEspecial() {
        
        setButtonsBatallaDisabled(true);

        let idPersonajeActivo = Number(this.turn);
        let idPersonajeEnEspera = Number(!this.turn);

        let clase = this.clonPersonaje[idPersonajeActivo].clase;

        let ataquePjActivo;
        let defensaPjEnEspera = this.clonPersonaje[idPersonajeEnEspera].defensa; 
        let dañoRecibido; 

        switch (clase) {
            case 'ASESINO':
                ataquePjActivo = this.clonPersonaje[idPersonajeActivo].ataque * 1.5;
                dañoRecibido = ataquePjActivo - defensaPjEnEspera;

                 playAnimacionLetal(idPersonajeActivo);
            break;
            
            case 'DEMOLEDOR':
                ataquePjActivo = this.clonPersonaje[idPersonajeActivo].ataque;
                dañoRecibido = ataquePjActivo - defensaPjEnEspera;    

                let plusDeVida = 5 * (1 + (this.clonPersonaje[idPersonajeActivo].nivel / 10));
                console.log(plusDeVida);
                this.clonPersonaje[idPersonajeActivo].vidaActual += plusDeVida;
              
                playAnimacionCura(idPersonajeActivo);    
            break;

            case 'MAGO':
                let danioMagico = this.clonPersonaje[idPersonajeActivo].poder * (1 + (this.clonPersonaje[idPersonajeActivo].nivel / 5));
                ataquePjActivo = this.clonPersonaje[idPersonajeActivo].ataque + danioMagico;
                dañoRecibido = ataquePjActivo - defensaPjEnEspera;
               
                 playAnimacionMagia(idPersonajeActivo);
            break;     
        } 

        playAnimacionDanio(idPersonajeEnEspera);
        
        if(dañoRecibido > 0){
            this.clonPersonaje[idPersonajeEnEspera].vidaActual -= dañoRecibido;

            if(this.clonPersonaje[idPersonajeEnEspera].vidaActual <= 0){
                document.getElementById("title-modalbatalla").innerHTML="BATALLA";
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
                setTimeout(function(){batalla.pasarTurno()}, 1500);
            }
        }
    }

    pasarTurno(){
        this.turn = !this.turn;

        let idPersonajeActivo = Number(this.turn);
        let idPersonajeEnEspera = Number(!this.turn);

        console.log(this.turn + " (Turno del personaje " + (idPersonajeActivo+1) + ")");

        document.getElementById("title-modalbatalla").innerHTML="BATALLA - Turno del Personaje "+(idPersonajeActivo+1);

        playAnimacionTurnoActual(idPersonajeActivo);
        stopAnimacionTurnoActual(idPersonajeEnEspera);
        
        if(idPersonajeActivo == 1){
            setTimeout(function(){batalla.accionIa()}, 1500);
        }else{
            setButtonsBatallaDisabled(false);
        }
        var clase = batalla.clonPersonaje[idPersonajeActivo].clase;
        
        switch(clase){
            case "ASESINO":
                document.getElementById("button-atespecial").title="El asesino carga un ataque letal que realiza un 150% de su daño de ataque básico.";
                break;
            
            case "DEMOLEDOR":
                document.getElementById("button-atespecial").title="El demoledor realiza un ataque especial que además de dañar al enemigo, lo cura en una cantidad determinada según su nivel.";
                break;

            case "MAGO":
                document.getElementById("button-atespecial").title="El mago desata su verdadero poder en un ataque de daño mágico que escala con su nivel.";
                break;
        }
    }

    accionIa(){
        let eleccion = Math.random() * (3 - 0) + 0.3;
        eleccion = Math.round(eleccion);


        switch(eleccion){
            case 0:
                console.log("La IA pasó el turno.");
                batalla.pasarTurno();
                break;
            
            case 1:
                console.log("La IA realizó un ataque básico.");
                batalla.ataque();
                break;
            
            case 2:
                console.log("La IA realizó un ataque básico.");
                batalla.ataque();
                break;

            case 3:
                console.log("La IA realizó un ataque especial.");
                batalla.ataqueEspecial();
                break;
        }
    }

    resetModal(){
        document.getElementById('msg-ganadorbatalla').style.display = 'none';
        document.getElementById('body-modal-batalla').style.display = 'inline';
    }
}

