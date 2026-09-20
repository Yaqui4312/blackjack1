let baraja = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

// Manejo del DOM
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

// small html
const puntosHtml = document.querySelectorAll("small")

//inicializamos div de jugador y computadora
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");
// Puntajes
let puntosJugador = 0, 
    puntosComputadora = 0;

// Funcion nueva baraja baraja
const crearBaraja = () => {
    // crea una baraja con las cartas del 2 al 10, de todos los
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            baraja.push(i + tipo);
        }
    }

    // Agregamos las cartas especiales
    for (let tipo of tipos){
        for (let especial of especiales){
            baraja.push(especial + tipo);
        }
    }

    // aleatoriamente mezclamos las cartas
    baraja = _.shuffle(baraja);

    console.log(baraja);
};

crearBaraja();

// funcion de pedir carta
const pedirCarta = () =>{
    console.log({ baraja})
    if(baraja.leading == 0){
        console.warn(("No hay cartas en la baraja"));
        throw "No hay cartas en la baraja";
    }

    const carta = baraja.pop();
    console.log(carta);
    return carta;
};

pedirCarta();

// funcion de valor carta
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    let puntos = 0;

    if (isNaN(valor)) {
        console.log('no es un numero')
        // J, Q, K = 10, A
        puntos = valor =="A" ? 11 : 10;
    } else {
        console.log('es un numero')
        puntos = valor*1;
    }

    return puntos;
}

// funcion de la computadora
const turnoComputadora = (puntosMinimos) => {

    do {
        const carta = pedirCarta();
        console.log({cartaComputadora: carta});

        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHtml[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }

    }while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    setTimeout(() => {
        if (puntosComputadora == puntosMinimos) {
            alert("Nadie gana");
        } else if (puntosMinimos > 21){
            alert("Computadora gana");
        } else if (puntosComputadora > 21) {
            alert("Jugador gana");
        } else {
            alert("Computadora gana");
        }
    },100)


};

// pedir carta del jugador
btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    // AC => 11, 4D => 4
    puntosJugador = puntosJugador + valorCarta(carta);
    // 14
    puntosHtml[0].innerText = puntosJugador;
    //crear y mostrar las cartas
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugador.append(imgCarta);

    if(puntosJugador > 21) {
        console.warn('persiste');
        btnPedir.disabled = true;
        btnDetener.disabled =true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador == 21) {
        console.warn('21, ganaste');
        btnPedir.disabled = true;
    }
});

btnDetener.addEventListener('click', () =>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
})

btnNuevo.addEventListener('click', () => {
    baraja = [];

    crearBaraja();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHtml[0].innerText = 0;
    puntosHtml[1].innerText = 0;

    divCartasJugador.innerHTML = "";
    divCartasComputadora.innerHTML = "";

    btnPedir.disabled = false;
    btnDetener.disabled = false;
})