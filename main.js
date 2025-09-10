const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const form = document.getElementById('formAgregarProducto');
const inputProducto = document.getElementById('inputProducto');
const listaProductos = document.getElementById('listaProductos');
const totalProductos = document.getElementById('totalProductos');
const btnFinalizar = document.getElementById('btnFinalizar');
const mensaje = document.getElementById('mensaje');

function actualizarCarrito() {
    
    listaProductos.innerHTML = '';

    
    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.textContent = producto;
        listaProductos.appendChild(li);
    });

    totalProductos.textContent = `Total de productos: ${carrito.length}`;

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarMensaje(texto, duracion = 3000) {
    mensaje.textContent = texto;
    setTimeout(() => {
        mensaje.textContent = '';
    }, duracion);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const producto = inputProducto.value.trim();

    if (producto.length === 0) {
        mostrarMensaje('Por favor, ingresa un nombre válido.');
        return;
    }

    carrito.push(producto);
    actualizarCarrito();
    mostrarMensaje(`Agregaste: ${producto}`);
    inputProducto.value = '';
    inputProducto.focus();
});

btnFinalizar.addEventListener('click', () => {
    if (carrito.length === 0) {
        mostrarMensaje('El carrito está vacío. No hay nada que finalizar.');
        return;
    }

    carrito.length = 0; 
    actualizarCarrito();
    mostrarMensaje('Gracias por usar el simulador. ¡Hasta la próxima!');
});

actualizarCarrito();