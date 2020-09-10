var tipos = []
var coloresTipos = {
    poison: '#ccb8d9',
    grass: '#beecb0',
    fire: '#f8b6bc',
    flying: '#acbdc8',
    water: '#a0bff8',
    bug: '#b6d8b7',
    normal: '#efd8de',
    electric: '#f5f5bb',
    ground: '#e2c9b0',
    fairy: '#f8b6c6',
    fighting: '#f9bfb4',
    psychic: '#f6a7cc',
    rock: '#d5b0a7',
    steel: '#b9e6d2',
    ice: '#c7effd',
    ghost: '#b2b2c9',
    dragon: '#b1d2d6',
};

var imgTipos = {
    poison: './sources/Poison.png',
    grass: './sources/Grass.png',
    fire: './sources/Fire.png',
    flying: './sources/Flying.png',
    water: './sources/Water.png',
    bug: './sources/Bug.png',
    normal: './sources/Normal.png',
    electric: './sources/Electric.png',
    ground: './sources/Ground.png',
    fairy: './sources/Fairy.png',
    fighting: './sources/Fighting.png',
    psychic: './sources/Psychic.png',
    rock: './sources/Rock.png',
    steel: './sources/Steel.png',
    ice: './sources/Ice.png',
    ghost: './sources/Ghost.png',
    dragon: './sources/Dragon.png',
};

var cards = []


var contenedor = document.getElementById('card-container')
var card

//CREAR CARD

function crearCard(pokemon) {

    // CARD
    card = document.createElement('div')
    card.className = 'card card-pokemon'
    card.id = pokemon._id

    // FONDO DE COLOR DE CARD
    if (pokemon.types.length === 2) {
        card.style.background = 'linear-gradient(90deg, ' + coloresTipos[pokemon.types[0]] + ' 0%, ' + coloresTipos[pokemon.types[1]] + ' 100%)'
    } else {
        card.style.background = coloresTipos[pokemon.types[0]]
    }

    // CONTENEDOR PRINCIPAL 
    contenedor.appendChild(card)

    // CONTENEDOR IMAGEN POKEMON
    var contenedorImg = document.createElement('div')
    contenedorImg.className = 'contenedor-img text-center'

    // IMAGEN POKEMON
    var imgPokemon = document.createElement('img')
    imgPokemon.src = pokemon.art_url
    imgPokemon.className = 'img-pokemon'
    imgPokemon.alt = pokemon.name
    contenedorImg.appendChild(imgPokemon)
    card.appendChild(contenedorImg)

    // NOMBRE POKEMON
    var nombre = document.createElement('h2')
    nombre.className = 'card-title text-center pt-3'
    nombre.innerHTML = pokemon.name
    card.appendChild(nombre)

    // CONTENEDOR TIPO POKEMON
    var contenedorTipo = document.createElement('div')
    contenedorTipo.className = 'contenedor-tipo d-flex justify-content-around'
    card.appendChild(contenedorTipo)

    // TIPO POKEMON 
    // var tipoPokemon = document.createElement('h2')
    // tipoPokemon.className = 'card-title text-center'
    // tipoPokemon.innerHTML = pokemon.types
    // card.appendChild(tipoPokemon)

    // TIPO POKEMON IMAGEN
    if (pokemon.types.length === 2) {
        var tipoPokemon1 = document.createElement('img')
        tipoPokemon1.src = imgTipos[pokemon.types[0]]
        tipoPokemon1.className = 'img-pokemon-tipo'
        tipoPokemon1.alt = pokemon.types[0]
        contenedorTipo.appendChild(tipoPokemon1)
        var tipoPokemon2 = document.createElement('img')
        tipoPokemon2.src = imgTipos[pokemon.types[1]]
        tipoPokemon2.className = 'img-pokemon-tipo'
        tipoPokemon2.alt = pokemon.types[1]
        contenedorTipo.appendChild(tipoPokemon2)
    } else {
        var tipoPokemon1 = document.createElement('img')
        tipoPokemon1.src = imgTipos[pokemon.types[0]]
        tipoPokemon1.className = 'img-pokemon-tipo'
        tipoPokemon1.alt = pokemon.types[0]
        contenedorTipo.appendChild(tipoPokemon1)
    }


    //MODAL

    // BOTON MAS INFO CONTENEDOR
    var contenedorInfo = document.createElement('div')
    contenedorInfo.className = 'contenedor-info d-flex justify-content-around text-gray pt-1'
    card.appendChild(contenedorInfo)

    // BOTON MAS INFO 
    var btnInfo =
        ` 
        <button type="button" class="btn" data-toggle="modal" data-target="#Modal-${pokemon._id}">
        <img src="./sources/pokeball.png" alt="pokeball" class="pokeball-btn" />
        </button>
        
        <div class="modal fade" id="Modal-${pokemon._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
          <div class="modal-content negro">
          <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          <div class="modal-body d-flex justify-content-center negro">
     
          <div class="rojo pokeball-s-contenedor">
          <div class="d-flex align-items-start mb-4 top-part">
            <div
              class="d-flex justify-content-center align-items-center circulo-1 gris borde-negro-circulo"
            >
              <div class="borde-negro-circulo"></div>
            </div>
            <div class="d-flex flex-row">
              <div class="circulo-m rojo borde-negro-circulo"></div>
              <div class="circulo-m amarillo borde-negro-circulo"></div>
              <div class="circulo-m verde borde-negro-circulo"></div>
            </div>
          </div>
    
          <div class="negro info-div-container ml-auto mr-auto mb-4">
          <div
          class="gris info-div-container-2 d-flex flex-column align-items-center"
          >
          <div class="d-flex flex-row justify-content-center">
          <div class="circulo-s rojo borde-negro-circulo mr-1"></div>
          <div class="circulo-s rojo borde-negro-circulo"></div>
        </div>
        <div class="blanco info-div borde-negro mt-2 mb-2 p-1 overflow-auto">
        <div class="d-flex flex-column justify-content-around align-items-center">

        <div class="d-flex flex-row justify-content-around align-items-center">
        <h5 class="text-center">${pokemon.name}</h5>
        <img src="${pokemon.art_url}" alt="${pokemon.name}" class="img-pokedex" />
        </div>
        </div>
        <div>
            <p class="h6">${pokemon.description}</p>
        </div>
        </div >
    
        <div class="d-flex flex-row justify-content-around w-100 ">
          <div class="circulo-l rojo borde-negro-circulo"></div>
          <div class="d-flex flex-column justify-content-between">
            <div class="linea-negra negro"></div>
            <div class="linea-negra negro"></div>
            <div class="linea-negra negro"></div>
            <div class="linea-negra negro"></div>
          </div>
        </div>
          </div>
          </div>
          <div class="middle-part">
          <div class=" gris borde-negro d-flex justify-content-center">
            <div class="blanco info-div borde-negro mt-2 mb-2 p-1">
                <div class="d-flex flex-column justify-content-around align-items-center">
                    <h3 class="text-center">${pokemon.name}</h3>
                    <img src="${pokemon.art_url}" alt="${pokemon.name}" class="img-pokedex" />
                </div>
                <div>
                    <p>${pokemon.description}</p>
                </div>
            </div>
          </div>
          </div>
          <div class="d-flex flex-row button-part">
            <div>
              <div class="d-flex flex-row align-items-center">
                <div class="azul borde-negro-circulo circulo-xl"></div>
                <div class="verde rectangulo-s borde-negro"></div>
                <div class="naranja rectangulo-s borde-negro"></div>
              </div>
              <div class="amarillo rectangulo-l"></div>
            </div>
            <div class="negro cruz">
              <div class="verde-azulado cruz-1"></div>
            </div>
        
        </div>
  `

    contenedorInfo.innerHTML = btnInfo

}



for (var i = 0; i < pokemonList.length; i++) {
    crearCard(pokemonList[i]);
}





//BUSCADOR

var inputBuscador = document.getElementById("buscador-input")

function buscador() {

    var valueBuscar = inputBuscador.value.toUpperCase()

    // ELIMINAR CARDS DEL DOM 

    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }

    // MOSTRAR ELEMENTOS BUSCADOS

    for (var i = 0; i < pokemonList.length; i++) {


        var valorABuscar = pokemonList[i]["name"].toUpperCase()
        var buscando = valorABuscar.includes(valueBuscar)

        if (buscando === true) {
            crearCard(pokemonList[i])
        }
    }


}

// MOSTRAR TODOS LOS ELEMENTOS

function mostrarTodos() {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }

    for (var i = 0; i < pokemonList.length; i++) {
        crearCard(pokemonList[i]);
    }

}




//OBTENER LISTA DE TIPOS DE POKEMON 

function listaTipos() {
    for (var i = 0; i < pokemonList.length; i++) {
        var obtener1 = tipos.push(pokemonList[i]["types"][0])
        var obtener2 = pokemonList[i]["types"][1]

        if (obtener2 != undefined) {
            tipos.push(obtener2)
        }
    }
    tipos = [new Set(tipos)]
    tipos22 = Array.from(tipos)
    console.log("2", tipos)
    console.log("2mm", tipos[0])
    console.log(tipos22)
    return tipos
}

// listaTipos()