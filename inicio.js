const productos = [
    { id: 1, nombre: "Resistencias de Filamento de Carbon 1", precio: 15, img: "img/resistencias-de-filamento-de-carbon-14w-1-valor-10-unidades.jpg" },
    { id: 2, nombre: "CABLE UTP", precio: 25, img: "https://via.placeholder.com/200" },
    { id: 3, nombre: "Fusible de Vidrio", precio: 77, img: "https://via.placeholder.com/200" },
    { id: 4, nombre: "Jumpers de Conexion", precio: 130, img: "https://via.placeholder.com/200" },
    { id: 5, nombre: "Diodos LED 5mm", precio: 5, img: "https://via.placeholder.com/200" },
    { id: 6, nombre: "Capacitores Electroliticos", precio: 77, img: "https://via.placeholder.com/200" },
    { id: 7, nombre: "Probador de cortocircuito ", precio: 340, img: "https://via.placeholder.com/200" },
    { id: 8, nombre: "Detector de cables bajo pared", precio: 700, img: "https://via.placeholder.com/200" },
    { id: 9, nombre: "FILAMENTO TPU ESUN", precio: 120, img: "https://via.placeholder.com/200" },
    { id: 10, nombre: "Resistencias 1 valor", precio: 15, img: "https://via.placeholder.com/200" },
    { id: 11, nombre: "Puerto USB tipo micro", precio: 69, img: "https://via.placeholder.com/200" },
    { id: 12, nombre: "Adpatador de energia AC macho y hembra", precio: 100, img: "https://via.placeholder.com/200" },
    { id: 13, nombre: "Mini motor con Encoder", precio: 120, img: "https://via.placeholder.com/200" },
    { id: 14, nombre: "Fusible termico de ceramica", precio: 20, img: "https://via.placeholder.com/200" },
    { id: 15, nombre: "Bateria recargable", precio: 260, img: "https://via.placeholder.com/200" },
    { id: 16, nombre: "Adpatador de energia AC macho y hembra", precio: 40, img: "https://via.placeholder.com/200" },
    { id: 16.2, nombre: "Conector separador BNC tres vías Hembra y Macho", precio: 15, img: "https://via.placeholder.com/200" },
    { id: 18, nombre: "Terminal de batería 9V", precio: 26, img: "https://via.placeholder.com/200" },
    { id: 19, nombre: "Cable de 2-3-4 Lineas", precio: 40, img: "https://via.placeholder.com/200" },
    { id: 20, nombre: "Impresora 3D", precio: 7000, img: "https://via.placeholder.com/200" },
    { id: 21, nombre: "Robot humanoide", precio: 3600, img: "https://via.placeholder.com/200" },
    { id: 22, nombre: "Kit amplificador de señal", precio: 400, img: "https://via.placeholder.com/200" },
    { id: 23, nombre: "Kit Impresora 3D MKS Robin STM32", precio: 500, img: "https://via.placeholder.com/200" },
    { id: 24, nombre: "Proyecto electronica", precio: 500, img: "https://via.placeholder.com/200" },
    { id: 25, nombre: "usb", precio: 40, img: "https://via.placeholder.com/200" },
    
    
    
];



function mostrarProductos(lista) {
    const contenedor = document.getElementById("productList");
    contenedor.innerHTML = "";
    lista.forEach(p => {
        contenedor.innerHTML += `
            <div class="producto">
                <img src="${p.img}" alt="${p.nombre}">
                <h4>${p.nombre}</h4>
                <p>L.${p.precio}</p>
                <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
            </div>
        `;
    });
}
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        let item = carrito.find(p => p.id === id);
        if (item) {
            item.cantidad += 1; // si ya está en el carrito, aumentar cantidad
        } else {
            carrito.push({ ...producto, cantidad: 1 }); // si no está, agregarlo
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    }
}

function mostrarCarrito() {
    let cartItems = document.getElementById("cartItems");
    let totalPrice = document.getElementById("totalPrice");
    let cartCount = document.getElementById("cartCount");

    cartItems.innerHTML = "";
    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach((item, index) => {
        let subtotal = item.precio * item.cantidad;
        let li = document.createElement("li");
        li.innerHTML = `
            <span>${item.nombre} - L.${item.precio} x ${item.cantidad} = L.${subtotal}</span>
            <button onclick="cambiarCantidad(${index}, -1)">➖</button>
            <button onclick="cambiarCantidad(${index}, 1)">➕</button>
            <button class="remove-btn" onclick="eliminarDelCarrito(${index})">❌</button>
        `;
        cartItems.appendChild(li);
        total += subtotal;
        cantidadTotal += item.cantidad;
    });

    totalPrice.textContent = total.toFixed(2);
    if (cartCount) cartCount.textContent = cantidadTotal;
}

function cambiarCantidad(index, cambio) {
    carrito[index].cantidad += cambio;
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function toggleCarrito() {
    document.getElementById("carritoFlotante").classList.toggle("abierto");
}

document.getElementById("searchBar").addEventListener("input", function() {
    const filtro = this.value.toLowerCase();
    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(filtro));
    mostrarProductos(filtrados);
});

let index = 0;
const slides = document.querySelector(".slides");
const totalSlides = slides.querySelectorAll("img").length;

setInterval(() => {
    index = (index + 1) % totalSlides;
    slides.style.marginLeft = `-${index * 100}%`;
}, 3000);

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos(productos);
    mostrarCarrito();
});
