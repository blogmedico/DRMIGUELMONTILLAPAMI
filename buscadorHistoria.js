// =====================================
// BUSCADOR DE HISTORIA CLÍNICA
// =====================================

function crearBuscadorHistoria() {

    const contenedor = document.querySelector(".historia");

    if (!contenedor) return;

    // evitar duplicarlo
    if (document.getElementById("buscadorHistoria"))
        return;

    const barra = document.createElement("div");

    barra.id = "buscadorHistoria";

    barra.innerHTML = `
        <input id="txtBuscarHistoria"
               type="text"
               placeholder="Buscar en Historia Clínica...">

        <button id="btnBuscarHistoria">
            🔍 Buscar
        </button>

        <button id="btnLimpiarBusqueda">
            Limpiar
        </button>

        <span id="cantidadResultados"></span>
    `;

    contenedor.parentNode.insertBefore(barra, contenedor);

    document
        .getElementById("btnBuscarHistoria")
        .onclick = buscarHistoria;

    document
        .getElementById("btnLimpiarBusqueda")
        .onclick = limpiarBusqueda;

}



function buscarHistoria(){

    const texto =
    document.getElementById("txtBuscarHistoria").value.trim();

    if(texto==="") return;

    const historia =
    document.querySelector(".historia");

    if(!historia) return;

    limpiarBusqueda();

    const html = historia.innerHTML;

    const exp = new RegExp(texto,"gi");

    let cantidad = 0;

    historia.innerHTML =
    html.replace(exp,function(x){

        cantidad++;

        return `<mark class="resaltado">${x}</mark>`;

    });

    document.getElementById("cantidadResultados").innerHTML =
    "Coincidencias: "+cantidad;

}



function limpiarBusqueda(){

    const historia =
    document.querySelector(".historia");

    if(!historia) return;

    historia.innerHTML =
    historia.innerHTML.replaceAll(
        '<mark class="resaltado">',
        ''
    );

    historia.innerHTML =
    historia.innerHTML.replaceAll(
        '</mark>',
        ''
    );

    const c =
    document.getElementById("cantidadResultados");

    if(c)
        c.innerHTML="";
}