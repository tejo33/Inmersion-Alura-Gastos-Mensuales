//define variable array
let Ngastos =[];
let Vgastos =[];
let Dgastos =[];

//funcion para insertar gasto
function insertarGasto() {
    const nombre = document.getElementById('nombreGasto').value.toUpperCase();
    const valor = Number(document.getElementById('valorGasto').value);
    const descripcion = document.getElementById('descripcionGasto').value.toUpperCase();
    if (valor >= 150) {
        alert("Este gasto es mayor a US$ 150 ");
        limpiar();
        return;
    }
    Ngastos.push(nombre);
    Vgastos.push(valor);
    Dgastos.push(descripcion);
    Mostrar();
}
//funcion para mostrar la lista
function Mostrar() {
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;
    Ngastos.forEach((elemento,posicion)=>{
        const valorGasto = Vgastos[posicion];
        htmlLista += `<li> 
                <strong>${elemento}</strong>US$. ${valorGasto.toFixed(2)} 
                <p> ${Dgastos[posicion]}</p> 
                <button id="btnGasto" onclick="editarGasto(${posicion});">Editar</button>
                <button onclick="eliminarGasto(${posicion});">Eliminar</button>
            </li>`;
        totalGastos += Number(valorGasto);
    });
    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
}
// Función para eliminar un gasto
function eliminarGasto(indice) {
    Ngastos.splice(indice, 1);
    Vgastos.splice(indice, 1);
    Mostrar();
}
//funcion para limpiar los campos
function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcionGasto').value = '';
}
// Función para editar un gasto
function editarGasto(indice) {
    //deshabilitar el boton de agregar gasto
    document.getElementById('botonFormulario').disabled = true;
    // Obtener el gasto actual basado en el índice
    const nombreActual = Ngastos[indice];
    const valorActual = Vgastos[indice];
    const descripcionActual = Dgastos[indice];

    // Colocar los valores actuales en los campos del formulario
    document.getElementById('nombreGasto').value = nombreActual;
    document.getElementById('valorGasto').value = valorActual;
    document.getElementById('descripcionGasto').value = descripcionActual;

    // Cambiar el botón de 'Insertar' a 'Guardar Cambios'
    const boton = document.getElementById('btnGasto');
    boton.innerHTML = 'Guardar Cambios';
    
    // Asignar una nueva función temporal para guardar los cambios
    boton.onclick = function() {
        guardarCambios(indice);
    };
}
function guardarCambios(indice) {
    const nombreEditado = document.getElementById('nombreGasto').value.toUpperCase();
    const valorEditado = Number(document.getElementById('valorGasto').value);
    const descripcionEditada = document.getElementById('descripcionGasto').value.toUpperCase();

    // Validación del valor
    if (valorEditado > 150) {
        alert("Este gasto es mayor a US$ 150 ");
        limpiar();
        return;
    }

    // Actualizar los valores en los arrays
    Ngastos[indice] = nombreEditado;
    Vgastos[indice] = valorEditado;
    Dgastos[indice] = descripcionEditada;

    // Volver a cambiar el botón a 'Insertar' y limpiar el formulario
    const boton = document.getElementById('btnGasto');
    boton.innerHTML = 'Insertar Gasto';
    boton.onclick = insertarGasto;
    
    // Mostrar la lista actualizada
    Mostrar();
    limpiar();
    //habilitar el boton de agregar gasto
    document.getElementById('botonFormulario').disabled = false;
}