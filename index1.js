//Importamos la librería Plotly para graficar
//import "./plotly-2.16.1.min.js"; 
//Importamos las funciones que necesitan los SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
//TODO: Agregamos los SDK para los datos de Firebase que deseamos usar
//https://firebase.google.com/docs/web/setup#available-libraries

//La configuración de Firebase de nuestra aplicación web
//Para Firebase JS SDK v7.20.0 y versiones posteriores, el ID de medición es opcional
const firebaseConfig = {
apiKey: "AIzaSyDFsXZVT00aq6inLSs8uG1fu7t_-7RSifE",
authDomain: "humedal-e7264.firebaseapp.com",
databaseURL: "https://humedal-e7264-default-rtdb.firebaseio.com",
projectId: "humedal-e7264",
storageBucket: "humedal-e7264.appspot.com",
messagingSenderId: "237382410752",
appId: "1:237382410752:web:38639ae77314eed65ceee5",
measurementId: "G-JH4LPL74B1"
};

//Inicializamos Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//Creamos las variables según los ID's del HTML
var P = document.getElementById("PH");
var PF = document.getElementById("PH_Filtrado");

//Traemos la información desde la base de datos
const PHRef = ref(db, "Humedal/PH");
const PH_FiltradoRef = ref(db, "Humedal/PH_Filtrado");

//Creamos los vectores que almacenan la información ya convolucionada
var PH = [], PH_Filtrado = [];

//Traemos los datos actualizados desde firebase
onValue(PHRef, (snapshot) => {
    P.innerText = snapshot.key + ": " + snapshot.val();
    PH.push(snapshot.val());
});
onValue(PH_FiltradoRef, (snapshot) => {
    PF.innerText = snapshot.key + ": " + snapshot.val();
    PH_Filtrado.push(snapshot.val());
});

//Guardamos los valores de firebase
function p() {
    var j = 0;
    PH.forEach(function(dato){
        j = dato;
    })
    return j;
}
function pf() {
    var j = 0;
    PH_Filtrado.forEach(function(dato){
        j = dato;
    })
    return j;
}

/*
//Graficamos los datos con la librería Plotly.js
var time = new Date();

var ph = {
    x: [],
    y: [],
    name: 'PH',
    mode: 'lines',
    line: {
        color: '#000000',
    }
}
var ph_filtrado = {
    x: [],
    y: [],
    name: 'PH Filtrado',
    mode: 'lines',
    line: {
        color: '#000000',
    }
}

//Llamo las variables que quiero graficar
var data = [ph, ph_filtrado];
Plotly.newPlot('myDiv', data);
var cnt = 0;

var interval = setInterval(function() {
    var time = new Date();
    //Realizamos las actualizaciones de todos los valores que se van retornando
    var update = {
        x: [[time], [time], [time], [time], [time], [time], [time], [time], [time]],
        y: [[p()], [pf()]]
    }

    var olderTime = time.setMinutes(time.getMinutes() - 1);
    var futureTime = time.setMinutes(time.getMinutes() + 1);

    var minuteView = {
        xaxis: {
            type: 'date',
            range: [olderTime, futureTime]
        }
    };

    Plotly. relayaout('myDiv', minuteView);
    Plotly.extendTraces('myDiv', update, [0, 1, 2, 3, 4, 5, 6, 7, 8])

    if (++cnt === 100) clearInterval(interval);
}, 1000);
*/