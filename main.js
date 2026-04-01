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
    dragon: '#b1d2d6'
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
    dragon: './sources/Dragon.png'
};

var contenedor = document.getElementById('card-container');
var inputBuscador = document.getElementById('buscador-input');
var typeFilterList = document.getElementById('type-filter-list');
var resultsCopy = document.getElementById('results-copy');
var totalCount = document.getElementById('total-count');
var typeCount = document.getElementById('type-count');
var emptyState = document.getElementById('empty-state');
var modalRoot = document.getElementById('modal-root');
var searchButton = document.getElementById('search-btn');
var clearSearchButton = document.getElementById('clear-search-btn');
var showAllButton = document.getElementById('show-all-btn');

var activeType = 'all';
var currentQuery = '';
var tiposUnicos = obtenerTiposUnicos();

function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function limpiarDescripcion(descripcion) {
    if (!descripcion) {
        return 'Sin descripcion disponible.';
    }

    var oraciones = descripcion
        .split('. ')
        .map(function (parte) {
            return parte.trim();
        })
        .filter(Boolean);

    var unicas = [];

    for (var i = 0; i < oraciones.length; i++) {
        if (unicas.indexOf(oraciones[i]) === -1) {
            unicas.push(oraciones[i]);
        }
    }

    return unicas.join('. ').replace(/\.*$/, '') + '.';
}

function resumirDescripcion(descripcion, limite) {
    var texto = limpiarDescripcion(descripcion);

    if (texto.length <= limite) {
        return texto;
    }

    return texto.slice(0, limite).replace(/[ .,;:!?-]+$/, '') + '...';
}

function obtenerTiposUnicos() {
    var mapaTipos = {};
    var tipos = [];

    for (var i = 0; i < pokemonList.length; i++) {
        for (var j = 0; j < pokemonList[i].types.length; j++) {
            var tipo = pokemonList[i].types[j];
            if (!mapaTipos[tipo]) {
                mapaTipos[tipo] = true;
                tipos.push(tipo);
            }
        }
    }

    return tipos.sort();
}

function crearTypePills(types) {
    var contenido = '';

    for (var i = 0; i < types.length; i++) {
        var tipo = types[i];
        contenido +=
            '<span class="type-pill">' +
            '<img src="' + imgTipos[tipo] + '" class="img-pokemon-tipo" alt="' + tipo + '" />' +
            '<span>' + capitalizar(tipo) + '</span>' +
            '</span>';
    }

    return contenido;
}

function crearGradiente(types) {
    if (types.length === 2) {
        return 'linear-gradient(135deg, ' + coloresTipos[types[0]] + ' 0%, ' + coloresTipos[types[1]] + ' 100%)';
    }

    return coloresTipos[types[0]];
}

function crearCard(pokemon) {
    var card = document.createElement('article');
    card.className = 'card card-pokemon';
    card.id = pokemon._id;
    card.style.background = crearGradiente(pokemon.types);

    card.innerHTML =
        '<div class="card-top">' +
        '<span class="pokemon-number">#' + pokemon.pkdx_id.toString().padStart(3, '0') + '</span>' +
        '<span class="pokemon-type-label">' + capitalizar(pokemon.types[0]) + '</span>' +
        '</div>' +
        '<div class="contenedor-img text-center">' +
        '<img src="' + pokemon.art_url + '" class="img-pokemon" alt="' + pokemon.name + '" loading="lazy" />' +
        '</div>' +
        '<h2 class="pokemon-name">' + pokemon.name + '</h2>' +
        '<div class="type-badges">' + crearTypePills(pokemon.types) + '</div>' +
        '<p class="card-copy">' + resumirDescripcion(pokemon.description, 128) + '</p>' +
        '<div class="contenedor-info">' +
        '<button type="button" class="btn portfolio-card-btn" data-toggle="modal" data-target="#Modal-' + pokemon._id + '">' +
        '<img src="./sources/pokeball.png" alt="" class="pokeball-btn" /> Ver detalle' +
        '</button>' +
        '</div>';

    return card;
}

function crearModal(pokemon) {
    var modalWrapper = document.createElement('div');

    modalWrapper.innerHTML = (
        '<div class="modal fade" id="Modal-' + pokemon._id + '" tabindex="-1" aria-labelledby="modal-title-' + pokemon._id + '" aria-hidden="true">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content negro">' +
        '<button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '<div class="modal-body d-flex justify-content-center negro">' +
        '<div class="rojo pokeball-s-contenedor">' +
        '<div class="d-flex align-items-start mb-4 top-part">' +
        '<div class="d-flex justify-content-center align-items-center circulo-1 gris borde-negro-circulo">' +
        '<div class="borde-negro-circulo"></div>' +
        '</div>' +
        '<div class="d-flex flex-row">' +
        '<div class="circulo-m rojo borde-negro-circulo"></div>' +
        '<div class="circulo-m amarillo borde-negro-circulo"></div>' +
        '<div class="circulo-m verde borde-negro-circulo"></div>' +
        '</div>' +
        '</div>' +
        '<div class="negro info-div-container ml-auto mr-auto mb-4">' +
        '<div class="gris info-div-container-2 d-flex flex-column align-items-center">' +
        '<div class="d-flex flex-row justify-content-center">' +
        '<div class="circulo-s rojo borde-negro-circulo mr-1"></div>' +
        '<div class="circulo-s rojo borde-negro-circulo"></div>' +
        '</div>' +
        '<div class="blanco info-div borde-negro mt-2 mb-2 p-1 overflow-auto">' +
        '<div class="d-flex flex-column justify-content-around align-items-center">' +
        '<div class="d-flex flex-row justify-content-around align-items-center">' +
        '<h5 class="text-center" id="modal-title-' + pokemon._id + '">' + pokemon.name + '</h5>' +
        '<img src="' + pokemon.art_url + '" alt="' + pokemon.name + '" class="img-pokedex" />' +
        '</div>' +
        '</div>' +
        '<div><p class="h6">' + limpiarDescripcion(pokemon.description) + '</p></div>' +
        '<div class="mt-3">' + crearTypePills(pokemon.types) + '</div>' +
        '</div>' +
        '<div class="d-flex flex-row justify-content-around w-100 ">' +
        '<div class="circulo-l rojo borde-negro-circulo"></div>' +
        '<div class="d-flex flex-column justify-content-between">' +
        '<div class="linea-negra negro"></div>' +
        '<div class="linea-negra negro"></div>' +
        '<div class="linea-negra negro"></div>' +
        '<div class="linea-negra negro"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="middle-part">' +
        '<div class="gris borde-negro d-flex justify-content-center">' +
        '<div class="blanco info-div borde-negro mt-2 mb-2 p-1 overflow-auto">' +
        '<div class="d-flex flex-column justify-content-around align-items-center">' +
        '<h3 class="text-center">' + pokemon.name + '</h3>' +
        '<img src="' + pokemon.art_url + '" alt="' + pokemon.name + '" class="img-pokedex" />' +
        '</div>' +
        '<div><p>' + limpiarDescripcion(pokemon.description) + '</p></div>' +
        '<div class="mt-3">' + crearTypePills(pokemon.types) + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="d-flex flex-row button-part">' +
        '<div>' +
        '<div class="d-flex flex-row align-items-center">' +
        '<div class="azul borde-negro-circulo circulo-xl"></div>' +
        '<div class="verde rectangulo-s borde-negro"></div>' +
        '<div class="naranja rectangulo-s borde-negro"></div>' +
        '</div>' +
        '<div class="amarillo rectangulo-l"></div>' +
        '</div>' +
        '<div class="negro cruz">' +
        '<div class="verde-azulado cruz-1"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
    );

    return modalWrapper.firstElementChild;
}

function actualizarResumen(lista) {
    var total = pokemonList.length;
    var cantidad = lista.length;

    totalCount.textContent = total;
    typeCount.textContent = tiposUnicos.length;

    if (cantidad === total && activeType === 'all' && currentQuery === '') {
        resultsCopy.textContent = 'Mostrando los ' + total + ' Pokemon originales.';
        return;
    }

    var partes = ['Mostrando ' + cantidad + ' resultado' + (cantidad === 1 ? '' : 's')];

    if (currentQuery) {
        partes.push('para "' + currentQuery + '"');
    }

    if (activeType !== 'all') {
        partes.push('en tipo ' + capitalizar(activeType));
    }

    resultsCopy.textContent = partes.join(' ');
}

function renderizarCards(lista) {
    contenedor.innerHTML = '';
    modalRoot.innerHTML = '';

    var fragmento = document.createDocumentFragment();
    var fragmentoModales = document.createDocumentFragment();

    for (var i = 0; i < lista.length; i++) {
        fragmento.appendChild(crearCard(lista[i]));
        fragmentoModales.appendChild(crearModal(lista[i]));
    }

    contenedor.appendChild(fragmento);
    modalRoot.appendChild(fragmentoModales);
    emptyState.classList.toggle('d-none', lista.length > 0);
    actualizarResumen(lista);
}

function renderizarFiltros() {
    var botones = [
        '<button type="button" class="type-filter is-active" data-type="all">Todos</button>'
    ];

    for (var i = 0; i < tiposUnicos.length; i++) {
        botones.push(
            '<button type="button" class="type-filter" data-type="' + tiposUnicos[i] + '">' +
            capitalizar(tiposUnicos[i]) +
            '</button>'
        );
    }

    typeFilterList.innerHTML = botones.join('');
}

function actualizarFiltroActivo() {
    var botones = typeFilterList.querySelectorAll('.type-filter');

    for (var i = 0; i < botones.length; i++) {
        botones[i].classList.toggle('is-active', botones[i].getAttribute('data-type') === activeType);
    }
}

function aplicarFiltros() {
    var query = currentQuery.trim().toLowerCase();
    var filtrados = [];

    for (var i = 0; i < pokemonList.length; i++) {
        var pokemon = pokemonList[i];
        var coincideTipo = activeType === 'all' || pokemon.types.indexOf(activeType) !== -1;
        var coincideTexto =
            query === '' ||
            pokemon.name.toLowerCase().indexOf(query) !== -1 ||
            pokemon.pkdx_id.toString() === query ||
            pokemon.types.join(' ').toLowerCase().indexOf(query) !== -1;

        if (coincideTipo && coincideTexto) {
            filtrados.push(pokemon);
        }
    }

    renderizarCards(filtrados);
}

function buscador() {
    currentQuery = inputBuscador.value;
    aplicarFiltros();
}

function mostrarTodos() {
    currentQuery = '';
    activeType = 'all';
    inputBuscador.value = '';
    actualizarFiltroActivo();
    aplicarFiltros();
}

searchButton.addEventListener('click', buscador);
clearSearchButton.addEventListener('click', mostrarTodos);
showAllButton.addEventListener('click', mostrarTodos);

inputBuscador.addEventListener('input', function () {
    currentQuery = inputBuscador.value;
    aplicarFiltros();
});

inputBuscador.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        buscador();
    }
});

typeFilterList.addEventListener('click', function (event) {
    if (!event.target.matches('.type-filter')) {
        return;
    }

    activeType = event.target.getAttribute('data-type');
    actualizarFiltroActivo();
    aplicarFiltros();
});

renderizarFiltros();
mostrarTodos();
