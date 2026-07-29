// =====================================
// ARCHIVOS.JS
// Explorador Médico V3.2
// =====================================


// =====================================
// SELECCIONAR PACIENTE
// =====================================

async function seleccionarPaciente(p){

    pacienteSeleccionado = p;

    listaArchivos.innerHTML = "Cargando archivos...";

    infoPaciente.innerHTML = `
        <h2>👤 ${p.nombre}</h2>
        <p>🆔 DNI: ${p.dni}</p>
        <p>⏳ Leyendo archivos...</p>
    `;

    let archivos=[];

    for await(const item of p.carpeta.values()){

        if(item.kind==="file"){

            archivos.push(item);

        }

    }

    mostrarArchivos(archivos);

    mostrarInfoPaciente(p,archivos);

    // NUEVO
    // Si existe buscadorHistoria.js
    // leer automáticamente Historia.html

    if(typeof cargarHistoria==="function"){

        cargarHistoria(archivos);

    }

}



// =====================================
// MOSTRAR ARCHIVOS
// =====================================

function mostrarArchivos(lista){

    listaArchivos.innerHTML="";

    if(lista.length===0){

        listaArchivos.innerHTML="<p>No hay archivos</p>";

        return;

    }

    lista.sort((a,b)=>{

        let na=a.name.toLowerCase();

        let nb=b.name.toLowerCase();

        if(na.endsWith(".pdf") && !nb.endsWith(".pdf"))
            return -1;

        if(nb.endsWith(".pdf") && !na.endsWith(".pdf"))
            return 1;

        return na.localeCompare(nb);

    });


    lista.forEach(a=>{

        let nombre=a.name.toLowerCase();

        let icono="📄";

        if(nombre.endsWith(".pdf"))
            icono="📑";

        else if(
            nombre.endsWith(".jpg") ||
            nombre.endsWith(".jpeg") ||
            nombre.endsWith(".png") ||
            nombre.endsWith(".webp")
        )
            icono="🖼";

        else if(nombre.endsWith(".html"))
            icono="🌐";


        let div=document.createElement("div");

        div.className="archivo";

        div.innerHTML=icono+" "+a.name;

        div.onclick=()=>{

            abrirArchivo(a);

        };

        listaArchivos.appendChild(div);

    });

}



// =====================================
// FICHA PACIENTE
// =====================================

function mostrarInfoPaciente(p,archivos){

    let pdf=0;

    let imagen=0;

    let historia=false;

    archivos.forEach(a=>{

        let nombre=a.name.toLowerCase();

        if(nombre.endsWith(".pdf"))
            pdf++;

        if(
            nombre.endsWith(".jpg") ||
            nombre.endsWith(".jpeg") ||
            nombre.endsWith(".png") ||
            nombre.endsWith(".webp")
        )
            imagen++;

        if(nombre==="historia.html")
            historia=true;

    });


    infoPaciente.innerHTML=`

        <h2>👤 ${p.nombre}</h2>

        <hr>

        <p><b>DNI:</b> ${p.dni}</p>

        <p>📂 Archivos: ${archivos.length}</p>

        <p>📑 PDF: ${pdf}</p>

        <p>🖼 Imágenes: ${imagen}</p>

        <p>🌐 Historia:
        ${historia ? "✅ Disponible" : "❌ No encontrada"}
        </p>

        <hr>

        <div id="panelHistoria"></div>

    `;

}