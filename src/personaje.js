class Personaje {
    constructor(nombre, nivel = 1) {
        this.nombre = nombre;
        this.nivel = nivel;
    }
    status() {
        document.getElementById("body-modal-status").innerHTML = `
         <div class='text-center'>
            <h2>${this.nombre}</h2>
            <p>${this.clase}</p>
            <p>Nvl. ${this.nivel}</p>
            <div class='row'>
                <div class='col' style='font-size:25px;'>
                    <p data-bs-toggle="tooltip" title="Experiencia">&#128218; ${this.experienciaActual} / ${this.experienciaMaxima}</p>
                    <p data-bs-toggle="tooltip" title="Vida">&#129505; ${this.vidaActual} / ${this.vidaMaxima}</p>
                    <p data-bs-toggle="tooltip" title="Maná">&#128167; ${this.manaActual} / ${this.manaMaximo}</p>
                    <p data-bs-toggle="tooltip" title="Estamina">&#9889; ${this.estaminaActual} / ${this.estaminaMaxima}</p>
                </div>
                <div class='col' style='font-size:25px;'>
                    <p data-bs-toggle="tooltip" title="Ataque">&#128165; ${this.ataque}</p>
                    <p data-bs-toggle="tooltip" title="Poder arcano">&#127879; ${this.poder}</p>
                    <p data-bs-toggle="tooltip" title="Defensa">&#128304; ${this.defensa}</p>
                    <p data-bs-toggle="tooltip" title="Agilidad">&#127935; ${this.agilidad}</p>
                </div>
            </div>    
         </div>`;
        
        let listaTriggerTooltip = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        let listaTooltip = listaTriggerTooltip.map(function (elementTriggerTooltip) {
            return new mdb.Tooltip(elementTriggerTooltip)
        })
        showModal('modal-status');
    }

    aumentarExperiencia() { 
        this.experienciaActual += 25;
        if(this.experienciaActual >= this.experienciaMaxima){
            this.subirDeNivel();
        }
    }
    
    subirDeNivel() {
        this.nivel = this.nivel + 1;
        this.experienciaActual = 0;
        this.experienciaMaxima = this.experienciaMaxima + 25;
        mensajeSubirDeNivel(this.nombre, this.nivel);
    }
}

