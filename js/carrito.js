// Obtener los productos guardados en localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const listaCarrito = document.getElementById('lista-carrito');
const totalElemento = document.getElementById('total');

// Función para renderizar productos
function renderizarCarrito() {
  listaCarrito.innerHTML = '';

  if (carrito.length === 0) {
    listaCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
    totalElemento.textContent = '0€';
    return;
  }

  let total = 0;

  carrito.forEach((producto, index) => {
    const item = document.createElement('div');
    item.className = 'item-carrito';

    item.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Precio unitario: ${producto.precio}€</p>
      <p>Cantidad: <input type="number" min="1" value="${producto.cantidad}" data-index="${index}" class="cantidad-input"></p>
      <p>Subtotal: ${producto.precio * producto.cantidad}€</p>
      <button data-index="${index}" class="eliminar-btn">Eliminar</button>
    `;

    listaCarrito.appendChild(item);

    total += producto.precio * producto.cantidad;
  });

  totalElemento.textContent = `${total}€`;
}

// Cambiar cantidades
listaCarrito.addEventListener('input', (e) => {
  if (e.target.classList.contains('cantidad-input')) {
    const index = e.target.dataset.index;
    const nuevaCantidad = parseInt(e.target.value);
    if (nuevaCantidad > 0) {
      carrito[index].cantidad = nuevaCantidad;
      guardarCarrito();
      renderizarCarrito();
    }
  }
});

// Eliminar producto
listaCarrito.addEventListener('click', (e) => {
  if (e.target.classList.contains('eliminar-btn')) {
    const index = e.target.dataset.index;
    carrito.splice(index, 1);
    guardarCarrito();
    renderizarCarrito();
  }
});

// Guardar cambios en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Inicializa
renderizarCarrito();

// Botón: Vaciar carrito
document.getElementById('vaciarCarrito').addEventListener('click', () => {
  if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
    carrito = [];
    guardarCarrito();
    renderizarCarrito();
  }
});

// Botón: Finalizar compra
document.getElementById('finalizarCompra').addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  alert(`Gracias por tu compra. Total: ${total}€`);

  // Limpia el carrito
  carrito = [];
  guardarCarrito();
  renderizarCarrito();
});

