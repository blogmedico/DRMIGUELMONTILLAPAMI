//=====================================
// PACIENTES
//=====================================

async function cargarPacientes(){

    pacientes=[];

    contadorPacientes.textContent="Cargando...";

    for await(const item of carpetaPacientes.values()){

        if(item.kind!="directory")
            continue;

        let dni="";
        let nombre=item.name;

        let partes=item.name.trim().split(/\s+/);

        if(partes.length>0 && /^\d+$/.test(partes[0])){

            dni=partes[0];

        }

        pacientes.push({

            nombre:nombre,
            dni:dni,
            carpeta:item

        });

    }

    pacientes.sort((a,b)=>a.nombre.localeCompare(b.nombre));

    mostrarPacientes(pacientes);

    contadorPacientes.textContent=pacientes.length;

}
function buscarPacientes(texto){

    texto=texto.toLowerCase().trim();

    if(texto===""){

        mostrarPacientes(pacientes);

        return;

    }

    let lista=pacientes.filter(p=>

        p.nombre.toLowerCase().includes(texto)
        ||
        p.dni.includes(texto)

    );

    mostrarPacientes(lista);

}
function mostrarPacientes(lista){

    listaPacientes.innerHTML="";

    lista.forEach(p=>{

        let div=document.createElement("div");

        div.className="paciente";

        div.innerHTML=`
            <b>${p.nombre}</b><br>
            DNI: ${p.dni}
        `;

        div.onclick=()=>{

            seleccionarPaciente(p);

        };

        listaPacientes.appendChild(div);

    });

}