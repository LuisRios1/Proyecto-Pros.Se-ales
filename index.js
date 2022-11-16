// Import the functions you need from the SDKs you need
import "./plotly-2.16.1.min.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getDatabase, ref, onValue, get, child} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEd-jCmo7e1MfjjH18ueHPOWK473rHqdw",
  authDomain: "procesamiento-de-senales.firebaseapp.com",
  databaseURL: "https://procesamiento-de-senales-default-rtdb.firebaseio.com",
  projectId: "procesamiento-de-senales",
  storageBucket: "procesamiento-de-senales.appspot.com",
  messagingSenderId: "1050728887069",
  appId: "1:1050728887069:web:43e8ef61d75729ddd967f4",
  measurementId: "G-4WXZ647R75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// Llamar a los Sensores en el HTML
//var Hum = document.getElementById("Humedad");

var Pre = document.getElementById("Presion");

var Tem = document.getElementById("Temperatura");

var PreS = document.getElementById("PresionS");

var TemS = document.getElementById("TemperaturaS");

// Llamar Ubicacion Sensores Firebase
//const HumedadRef = ref(db, "Humedal/Sensores/Humedad");
const TemperaturaRef = ref(db, "Humedal/Sensores/Temperatura");
const PresionRef = ref(db, "Humedal/Sensores/Presion");
const PresionRefS = ref(db, "Humedal/Sensores/PresionSuave");
const TemperaturaRefS = ref(db, "Humedal/Sensores/TemperaturaSuave");

var Temperatura = [], Presion = [], PresionS = [], TemperaturaS = [];
const seal1 = [0.1, 0.1 ,0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1], seal2 = [1, -1];

var CS = 0, CS1 = 0, CS2 = 0;

// Real Time Database
onValue(TemperaturaRef, (snapshot) => {
    Tem.innerText = snapshot.key + ": " + snapshot.val();
    Temperatura.push(snapshot.val());
    });

/*onValue(HumedadRef, (snapshot) => {
    Hum.innerText = snapshot.key + ": " + snapshot.val();
    Humedad.push(snapshot.val());
    //console.log(Humedad);
    });*/

onValue(PresionRef, (snapshot) => {
    Pre.innerText = snapshot.key + ": " + snapshot.val();
    Presion.push(snapshot.val());
    //console.log(Presion);
    });

onValue(PresionRefS, (snapshot) => {
    PreS.innerText = snapshot.key + ": " + snapshot.val();
    PresionS.push(snapshot.val());
    //console.log(Presion);
    });

onValue(TemperaturaRefS, (snapshot) => {
    TemS.innerText = snapshot.key + ": " + snapshot.val();
    TemperaturaS.push(snapshot.val());
    //console.log(Presion);
    });
  

//-----------------------------------------------------------------------------------//

//Actualizacion en tiempo real
function temp() {
    var j = 0;
    Temperatura.forEach(function(dato){
      j = dato;
    })
      return j;
  }

  function pres() {
    var j = 0;
    Presion.forEach(function(dato){
        j = dato;
    })
      return j;
  }

  function tempS() {
    var j = 0;
    TemperaturaS.forEach(function(dato){
      j = dato;
    })
      return j;
  }

  function presS() {
    var j = 0;
    PresionS.forEach(function(dato){
        j = dato;
    })
      return j;
  }


 /* function Hume() {
    var j = 0;
    Humedad.forEach(function(dato){
      j = dato;
    })
       return j;
  }*/
  //----------------------------------------------------------------//
    //Calculo de Convoluciones señal 1
  
  function convolucionS1Pres(){
    const kernel = seal1;
    let des = 0;
    var convVec = [];
    var k = 0;
    
    if(Presion.length> 10)
    {
      for (let i = 9; i < Presion.length; i++) {

          if (des + i !== convVec.length) {
            convVec[i] =
              Presion[i] * kernel[0] + Presion[i-1] * kernel[1] + Presion[i-2] * kernel[2] + Presion[i-3] * kernel[3] + Presion[i-4] * kernel[4] + Presion[i-5] * kernel[5] + Presion[i-6] * kernel[6] + Presion[i-7] * kernel[7] + Presion[i-8] * kernel[8] + Presion[i-9] * kernel[9];
          } else {
            convVec.push(Presion[i] * kernel[i]);
          }
          convVec.forEach(function(dato){
            k = dato;
            })
        des++;
        console.log("Convec : " + convVec);
        //console.log("Hum : " + Presion);
      }
    }
      return k;
  }
  
  function convolucionS1Temp(){
    const kernel = seal1;
    let des = 0;
    var convVec = [];
    var k = 0;
    
    if(Temperatura.length> 10)
    {
      for (let i = 9; i < Temperatura.length; i++) {

          if (des + i !== convVec.length) {
            convVec[i] =
              Temperatura[i] * kernel[0] + Temperatura[i-1] * kernel[1] + Temperatura[i-2] * kernel[2] + Temperatura[i-3] * kernel[3] + Temperatura[i-4] * kernel[4] + Temperatura[i-5] * kernel[5] + Temperatura[i-6] * kernel[6] + Temperatura[i-7] * kernel[7] + Temperatura[i-8] * kernel[8] + Temperatura[i-9] * kernel[9];
          } else {
            convVec.push(Temperatura[i] * kernel[i]);
          }
          convVec.forEach(function(dato){
            k = dato;
            })
        des++;
        //console.log("Convec : " + convVec);
        //console.log("Hum : " + Temperatura);
      }
    }
      return k;
  }


 //-----------------------------------------------------------------------------------// 

  //Calculo de convoluciones señal 2
  function convolucionTemp(){
    const kernel = seal2;
    let des = 0;
    var convVec = [];
    var k = 0;
    
    
    if(Temperatura.length>2)
    {
      for (let i = 0; i < Temperatura.length; i++) {
          if (des + i !== convVec.length) {
            convVec[i] =
              Temperatura[i] * kernel[0] + Temperatura[i-1] * kernel[1];
          } else {
            convVec.push(Temperatura[i] * kernel[i]);
          }

          convVec.forEach(function(dato){
            k = dato;
            })
        des++;
        //console.log("Convec : " + convVec);
       //console.log("Tem : " + Temperatura);
      }
    }
      return k;
  }
  
  function convolucionPres(){
    const kernel = seal2;
    let des = 0;
    var convVec = [];
    var k = 0;
    
    
    if(Presion.length>2)
    {
      for (let i = 0; i < Presion.length; i++) {
          if (des + i !== convVec.length) {
            convVec[i] =
            Presion[i] * kernel[0] + Presion[i-1] * kernel[1];
          } else {
            convVec.push(Presion[i] * kernel[i]);
          }     
          convVec.forEach(function(dato){
            k = dato;
            })
        des++;
      }
    }
      return k;
  }
  

//-----------------------------------------------------------------------------------//
  
  //Graficacion de las lineas calculadas

  var time = new Date();
  
  var temperatura = {
    x: [],
    y: [],
    name: 'Temperatura',
    mode: 'lines',
    line: {
      color: '#80CAF6',
    }
  }

  var presion = {
    x: [],
    y: [],
    name: 'Presion',
    mode: 'lines',
    line: {color: '#008000'}
  };

  var presionS = {
    x: [],
    y: [],
    name: 'Presion Filtro',
    mode: 'lines',
    line: {color: '#F7FF00'}
  };

  var temperaturaS = {
    x: [],
    y: [],
    name: 'Temperatura Filtro',
    mode: 'lines',
    line: {
      color: '#FF0000',
    }
  }
  
  var convoT = {
    x: [],
    y: [],
    name: 'C. Temperatura S2',
    mode: 'lines',
    line: {
      color: '#FF0097',
    }
  }

  var convoP = {
    x: [],
    y: [],
    name: 'C. Presion S2',
    mode: 'lines',
    line: {
      color: '#1700FF',
    }
  }


  var convoT1 = {
    x: [],
    y: [],
    name: 'C. Temperatura S1',
    mode: 'lines',
    line: {
      color: '#FF7800',
    }
  }

  var convoP1 = {
    x: [],
    y: [],
    name: 'C. Presion S1',
    mode: 'lines',
    line: {
      color: '#9E00FF',
    }
  }



  var data = [temperatura, presion, presionS, temperaturaS, convoT, convoP, convoT1, convoP1];
  
  Plotly.newPlot('myDiv', data);
  
  var cnt = 0;
  
  var interval = setInterval(function() {
  
    var time = new Date();
  
    var update = {
      x: [[time], [time], [time],[time],[time],[time],[time],[time]],
      y: [[temp()], [pres()], [presS()], [tempS()],[convolucionTemp()], [convolucionPres()],[convolucionS1Temp()], [convolucionS1Pres()]]
    }
  
    var olderTime = time.setMinutes(time.getMinutes() - 1);
    var futureTime = time.setMinutes(time.getMinutes() + 1);
  
    var minuteView = {
          xaxis: {
            type: 'date',
            range: [olderTime,futureTime]
          }
        };
  
    Plotly.relayout('myDiv', minuteView);
    Plotly.extendTraces('myDiv', update, [0,1,2,3,4,5,6,7])
  
    if(++cnt === 86400) clearInterval(interval);
  }, 1000);

  //-----------------------------------------------------------------------------------//
