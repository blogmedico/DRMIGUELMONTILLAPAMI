//=====================================
// ABRIR ARCHIVO
//=====================================

async function abrirArchivo(handle){

    try{

        const file = await handle.getFile();

        const url = URL.createObjectURL(file);

        window.open(url, "_blank");

        // Liberar memoria después de un minuto
        setTimeout(()=>{
            URL.revokeObjectURL(url);
        },60000);

    }
    catch(error){

        console.error(error);

        alert("No se pudo abrir el archivo.");

    }

}