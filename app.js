// =====================================
// EXPLORADOR MEDICO
// APP.JS VERSION 1
// =====================================


let carpetaPacientes = null;

let pacientes = [];

let pacienteSeleccionado = null;


// ELEMENTOS HTML

const btnCarpeta =
document.getElementById("btnCarpeta");

const btnActualizar =
document.getElementById("btnActualizar");

const busqueda =
document.getElementById("busqueda");

const listaPacientes =
document.getElementById("listaPacientes");

const listaArchivos =
document.getElementById("listaArchivos");

const visorContenido =
document.getElementById("visorContenido");

const contador =
document.getElementById("contador");



// =====================================
// SELECCIONAR CARPETA
// =====================================


btnCarpeta.onclick = async ()=>{


try{


carpetaPacientes =
await window.showDirectoryPicker();


pacientes=[];


await leerCarpeta(carpetaPacientes);


mostrarPacientes(pacientes);


contador.innerHTML =
pacientes.length+" pacientes";


}
catch(error){


console.log(error);


alert("No se seleccionó carpeta");


}


};




// =====================================
// LEER CARPETAS DE PACIENTES
// =====================================


async function leerCarpeta(carpeta){


for await (const item of carpeta.values()){



if(item.kind==="directory"){


let paciente={};


paciente.nombre=item.name;


paciente.carpeta=item;


paciente.archivos=[];



// separar DNI

let partes=item.name.split(" ");


if(!isNaN(partes[0])){

paciente.dni=partes[0];

}
else{

paciente.dni="";

}



// leer archivos internos

for await(const archivo of item.values()){


if(archivo.kind==="file"){


paciente.archivos.push(archivo);


}


}



pacientes.push(paciente);



}



}


}



// =====================================
// MOSTRAR PACIENTES
// =====================================


function mostrarPacientes(lista){


listaPacientes.innerHTML="";


lista.forEach(p=>{


let div=document.createElement("div");


div.className="paciente";


div.innerHTML=`

👤 <b>${p.nombre}</b><br>

DNI: ${p.dni}

`;



div.onclick=()=>{


seleccionarPaciente(p,div);


};



listaPacientes.appendChild(div);



});


}




// =====================================
// BUSCADOR EN VIVO
// =====================================


busqueda.oninput=()=>{


let texto=
busqueda.value.toLowerCase();



let filtrados =
pacientes.filter(p=>{


return (

p.nombre
.toLowerCase()
.includes(texto)

||

p.dni
.includes(texto)

);


});



mostrarPacientes(filtrados);


};




// =====================================
// SELECCIONAR PACIENTE
// =====================================


function seleccionarPaciente(p,elemento){


pacienteSeleccionado=p;


document
.querySelectorAll(".paciente")
.forEach(e=>{

e.classList.remove("activo");

});


elemento.classList.add("activo");



mostrarArchivos(p);


mostrarDatos(p);



}




// =====================================
// MOSTRAR ARCHIVOS
// =====================================


function mostrarArchivos(p){


listaArchivos.innerHTML="";


if(p.archivos.length===0){


listaArchivos.innerHTML=

"<p class='vacio'>Sin archivos</p>";

return;

}



p.archivos.forEach(a=>{


let div=document.createElement("div");


div.className="archivo";


let icono="📄";


if(a.name.endsWith(".pdf"))

icono="📑";


if(
a.name.endsWith(".jpg")
||
a.name.endsWith(".png")
)

icono="🖼";


if(a.name.endsWith(".html"))

icono="🌐";



div.innerHTML=

icono+" "+a.name;

div.onclick = () => {

mostrarArchivo(a);

};

listaArchivos.appendChild(div);



});



}




// =====================================
// DATOS PACIENTE
// =====================================


function mostrarDatos(p){

visorContenido.innerHTML=`

<div class="dato">

<strong>Paciente</strong><br>

${p.nombre}

</div>

<div class="dato">

<strong>DNI</strong><br>

${p.dni}

</div>

<div class="dato">

<strong>Archivos</strong><br>

${p.archivos.length}

</div>

<hr>

<p>

Seleccione un archivo para visualizar.

</p>

`;

}
// =====================================
// ACTUALIZAR
// =====================================


btnActualizar.onclick=async()=>{


if(!carpetaPacientes){

alert("Seleccione primero la carpeta");

return;

}


pacientes=[];


await leerCarpeta(carpetaPacientes);


mostrarPacientes(pacientes);


contador.innerHTML =
pacientes.length+" pacientes";


alert("Índice actualizado");


};
// =====================================
// VERSION 2
// APERTURA DE ARCHIVOS
// =====================================


const btnAbrirHistoria =
document.getElementById("btnAbrirHistoria");


const btnAbrirCarpeta =
document.getElementById("btnAbrirCarpeta");





// ABRIR CARPETA DEL PACIENTE

btnAbrirCarpeta.onclick=async()=>{


if(!pacienteSeleccionado){

alert("Seleccione un paciente");

return;

}


let url =
URL.createObjectURL(
new Blob(
[
pacienteSeleccionado.carpeta.name
]
)
);


alert(
"En la próxima versión habilitamos apertura directa de carpeta."
);


};





// ABRIR HISTORIA HTML


btnAbrirHistoria.onclick=async()=>{


if(!pacienteSeleccionado){

alert("Seleccione un paciente");

return;

}



let historia =
pacienteSeleccionado.archivos.find(a=>

a.name.toLowerCase()
==="historia.html"

);



if(!historia){


alert(
"No existe Historia.html para este paciente"
);


return;

}



let url =
URL.createObjectURL(historia);



window.open(url,"_blank");


};
async function mostrarArchivo(archivo){

const file = await archivo.getFile();

const nombre = archivo.name.toLowerCase();


// IMÁGENES

if(
nombre.endsWith(".jpg") ||
nombre.endsWith(".jpeg") ||
nombre.endsWith(".png")
){

const url = URL.createObjectURL(file);

visorContenido.innerHTML =

`<img src="${url}">`;

return;

}



// PDF

if(nombre.endsWith(".pdf")){

const url = URL.createObjectURL(file);

visorContenido.innerHTML =

`<iframe src="${url}"></iframe>`;

return;

}



// HTML

if(nombre.endsWith(".html")){

const texto = await file.text();

visorContenido.innerHTML = texto;

return;

}



// TEXTO

if(nombre.endsWith(".txt")){

const texto = await file.text();

visorContenido.innerHTML =

`<pre>${texto}</pre>`;

return;

}



visorContenido.innerHTML =

"<h2>No puedo mostrar este tipo de archivo.</h2>";

}
