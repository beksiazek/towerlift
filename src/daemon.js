fetch("https://api.jsonbin.io/b/603c7cbe81087a6a8b93205f")
    .then(response => response.json())
    .then(npcs => npcs.filter(npc => npc.nivel < 5))
    .then(npcs => crearNPC(npcs[0]))

    


[1, 2, 3].filter(unNumero => unNumero > 1) // --> [2, 3]


// const func = function (response) {
//     return response.json()
// }

// const func2 = (reponse) => response.json()


// patron builder

// builder tiene un estado igual a la entidad que quiere construir

// const buildNPC = (personaje) =>
//     new NPCBuilder()
//         .withClass(clase)
//         .withName(nombre)
//         .withLevel(nivel)
//         .withStats(stats)
//         .build()


// withStats({ vida }) {
//     vidaMaxima = vida;
//     vidaActual = vida;
// }

// build() {
//     return new Asesino(this)
// }

// const wangnan = buildNPC(wangnanJSON);