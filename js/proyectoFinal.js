function toggleMenu() {
    const menuList = document.querySelector('.menu-list');
    menuList.classList.toggle('active');
  }

  const ctx = document.getElementById('grafico');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
      datasets: [{
        label: 'Ventas Mensuales',
        data: [500, 800, 650, 900, 750],
        backgroundColor: '#4e73df'
      }]
    }
  });

  // carrito
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(item => item.nombre === nombre);
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push({ nombre, precio, cantidad: 1 });
    }
    actualizarCarritoUI();
    guardarCarrito();
  }

  function actualizarCarritoUI() {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.getElementById('contadorCarrito').innerText = totalItems;
  }

  function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  // Mostrar cantidad al cargar la página
  document.addEventListener('DOMContentLoaded', actualizarCarritoUI);

  //función para añadir productos
  function agregarAlCarrito(nombre, precio) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const productoExistente = carrito.find(p => p.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  document.getElementById('contadorCarrito').textContent = totalItems;
}

// Llamar esta función al cargar la página
actualizarContadorCarrito();




