


  // Import the functions you need from the SDKs you need
  import "./plotly-2.16.1.min.js";
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getDatabase,ref,onValue } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCvodZdVP4H5PKA4qQd_TRcj3OXaljvaDI",
    authDomain: "proyecto-edbb2.firebaseapp.com",
    databaseURL: "https://proyecto-edbb2-default-rtdb.firebaseio.com",
    projectId: "proyecto-edbb2",
    storageBucket: "proyecto-edbb2.appspot.com",
    messagingSenderId: "723826485151",
    appId: "1:723826485151:web:0af94452add64f787abfaa",
    measurementId: "G-CEW4M2P5NP"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);


var tdsValue = document.getElementById("Conductividad"); 
var Ph2 = document.getElementById("Ph"); 

const tdsValueRef = ref(db, "Proyecto_humedal_artificial/Sensores/Conductividad"); 
const PhRef = ref(db, "Proyecto_humedal_artificial/Sensores/Ph"); 

var Conductividad = [], Ph = []; 


onValue(tdsValueRef,(snapshot) => {
    tdsValue.innerText=snapshot.key + ": " + snapshot.val();
    Conductividad.push(snapshot.val());
});
onValue(PhRef,(snapshot) => {
    Ph2.innerText=snapshot.key + ": " + snapshot.val();
    Ph.push(snapshot.val());
});

function condu(){
    var j=0;
    Conductividad.forEach(function(dato)
    { j = dato; })
    return j;
}

function ph(){
    var j=0;
    Ph.forEach(function(dato)
    { j = dato; })
    return j;
}

var time = Date();
var conductividad = {
    x:[],
    y:[],
    name: 'Conductividad',
    mode:'lines',
    line:{color:'#0F56F1'}
}

var ph1 = {
    x:[],
    y:[],
    name: 'Ph',
    mode:'lines',
    line:{color:'#008000'}
}

var data =[conductividad,ph1];
Plotly.newPlot('myDiv',data);
var cnt=0;
var interval = setInterval(function(){ 
    var time = new Date();
    var update = {
        x:[[time],[time]],
        y:[[condu()],[ph()]]
    }
    var olderTime = time.setMinutes(time.getMinutes()-1);
    var futureTime = time.setMinutes(time.getMinutes()+1);

    var minuteView = {
        xaxis:{
            type: 'date',
            range: [olderTime,futureTime]
        }
    };

    Plotly.relayout('myDiv',minuteView);
    Plotly.extendTraces('myDiv',update,[0,1]);

    if(++cnt===1000) clearInterval(interval);

},1000);


