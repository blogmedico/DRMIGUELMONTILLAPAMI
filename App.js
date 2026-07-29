// =====================================
// EXPLORADOR MÉDICO V3
// APP.JS
// =====================================

let carpetaPacientes = null;
let pacientes = [];
let pacienteSeleccionado = null;

// ---------- Controles ----------

const btnCarpeta = document.getElementById("btnCarpeta");
const btnActualizar = document.getElementById("btnActualizar");
const txtBuscar = document.getElementById("txtBuscar");

const listaPacientes = document.getElementById("listaPacientes");
const listaArchivos = document.getElementById("listaArchivos");

const infoPaciente = document.getElementById("infoPaciente");

const contadorPacientes = document.getElementById("contadorPacientes");

// =====================================
// SELECCIONAR CARPETA
// =====================================

btnCarpeta.onclick = async ()=>{

    try{

        carpetaPacientes = await window.showDirectoryPicker();

        await cargarPacientes();

    }
    catch(error){

        console.log(error);

    }

};

// =====================================
// ACTUALIZAR
// =====================================

btnActualizar.onclick = async ()=>{

    if(!carpetaPacientes){

        alert("Seleccione primero la carpeta.");

        return;

    }

    await cargarPacientes();

};

// =====================================
// BUSCADOR
// =====================================

txtBuscar.oninput = ()=>{

    buscarPacientes(txtBuscar.value);

};