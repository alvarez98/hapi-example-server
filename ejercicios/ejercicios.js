// mover el 10
setTimeout(function () {
    console.log("Hello");
}, 10);
console.log("World!");

"use strict";

function asyncSqrt(value, callback) {
    console.log('START execution with value =', value);
    setTimeout(function () {
        callback(value, value * value);
    }, 0 | Math.random() * 100);
}

asyncSqrt(2, function (value, result) {
    console.log('END execution with value =', value, 'and result =', result);
});
console.log('COMPLETED ?')

// callback
setTimeout(function () {
    console.log("Etapa 1 completada");
    setTimeout(function () {
        console.log("Etapa 2 completada");
        setTimeout(function () {
            console.log("Etapa 3 completada");
            setTimeout(function () {
                console.log("Etapa 4 completada");
                // Podríamos continuar hasta el infinito...
            }, 4000);
        }, 3000);
    }, 2000);
}, 1000);

// promesas

const checkServer = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => resolve(`Estado del Servidor: ${response.status === 200 ? "OK" : "NOT OK"}`))
            .catch(() => reject(`Error al localizar URL`));
    });
}

checkServer(document.URL.toString())
    .then(result => console.log(result))
    .catch(e => console.log(e));


// doble ejemplo
// LLamada asíncrona con callback puro.
setTimeout(() => console.log("1"), 0);

// LLamada asíncrona con promesa.
Promise.resolve().then(() => console.log("2"))

// El callback de la promesa (() => console.log("2")) tiene mayor prioridad que el callback del setTimeout gracias a la cola de microtareas, y por ello es procesado primero.

// async
function resolveAfter2Seconds(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 2000);
    });
}

async function f1() {
    var x = await resolveAfter2Seconds(10);
    console.log(x); // 10
}
f1();

// hoisting

var x = 5;

(function () {
    console.log("x:", x); // no obtenemos '5' sino 'undefined'
    var x = 10;
    console.log("x:", x); // 10
}())



// var let const

var x = 0 
function four5() {
    for (var i = 0; i < 5; i++) { 
        x = <iframe src="" frameborder="0"></iframe>
    }
}
four5();
console.log(x) 

//ES6

let y = 0;
function four6(){
    for (let i = 0; i < 5; i++) {
        y = i; // Esta y no ha sido declarada si quiera, el alcance de cada variable esta sujeta a los {}, as'i que es undefined
    }
}
four6();
console.log(y); // Retorna 0, el valor declarado en un principio, la variable y no entró en lafuncion four6(), asi que son y diferentes.

// var funcion scope--- let block scope

function padre() {
    var x = 'hola'
    hijo()
    function hijo(){
        console.log(x)        
    }
}

padre()

// event emiters
const EventEmiter = require('events')
const event = new EventEmiter()

event.on('start', () => {
    console.log('Evento')
})
event.on('error', () => {
    console.log('Error')
})
let num = 3
if (num % 2 === 0) event.emit('start')
else event.emit('error')