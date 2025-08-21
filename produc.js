
const productos = {
    componentesElectronicos: [
        { nombre: "Resistencia SMD 1%", precio: 0.5, img: "img_procducto/resistencia-smd-1-18w-0805-01ohm-10mohm-5-unidades.jpg" },
        { nombre: "Resistencias de Filamento de Carbon ", precio: 0.7, img: "img_procducto/resistencias-de-filamento-de-carbon-1w-5-1-valor-10-unidades.jpg" },
        { nombre: "Resistencias con 30 valores 1", precio: 0.3, img: "img_procducto/resistencias-con-30-valores-14w-600-unidades.jpg" }
    ],
    placasDesarrollo: [
        { nombre: "Tarjeta de Desarrollo Arduino UNO R3", precio: 25, img: "img_procducto/tarjeta-de-desarrollo-arduino-uno-r3-original.jpg" },
        { nombre: "Tarjeta de Desarrollo Mega 2560", precio: 70, img: "img_procducto/tarjeta-de-desarrollo-mega-2560-compatible-con-arduino.jpg" },
         { nombre: "Microcontrolador compatible con Arduino Nano", precio: 25, img: "img_procducto/microcontrolador-compatible-con-arduino-nano.jpg" }
    ],
    tecnologiaEducativa: [
        { nombre: "Carrito Robot", precio: 15, img: "img_procducto/carrito-robot-chasis-4wd-4-ruedas-estructura.jpg" },
        { nombre: "Barco solar", precio: 15, img: "img_procducto/barco-solar-diy-hazlo-tu-mismo.jpg" },
        { nombre: "Grillo Robot", precio: 15, img: "img_procducto/grillo-robot-con-panel-solar.jpg" }
    ],
    motoresBombas: [
        { nombre: "Motor paso a paso", precio: 120, img: "img_procducto/motor-paso-a-paso-nema-17-tipo-planetario.jpg" },
         { nombre: "Mini motor con caja plástica de engranajes", precio: 120, img: "img_procducto/mini-motor-con-caja-plastica-de-engranajes.jpg" },
          { nombre: "Motor 12VDC alto torque con polea", precio: 120, img: "img_procducto/motor-12vdc-alto-torque-con-polea.jpg" }
    ],
    placasElectronicas: [
        { nombre: "Contador de frecuencia ", precio: 8, img: "img_procducto/contador-de-frecuencia-1-50mhz-diy.jpg" },
         { nombre: "Convertidor frecuencia PWM a voltaje", precio: 8, img: "img_procducto/convertidor-frecuencia-pwm-a-voltaje.jpg" },
         { nombre: "Estabilizador/ regulador Ascendente de voltaje", precio: 8, img: "img_procducto/estabilizador-regulador-ascendente-de-voltaje-dc-dc-mt3608-boost-1a.jpg" }
         
    ],
    conectoresInterruptores: [
        { nombre: "Interruptor de 3 pines ", precio: 1.2, img: "img_procducto/interruptor-de-3-pines-2-posiciones-con-luz.jpg" },
        { nombre: "Botón de emergencia", precio: 1.2, img: "img_procducto/boton-tipo-hongo-parada-de-emergencia.jpg" },
        { nombre: "Interruptor de palanca", precio: 1.2, img: "img_procducto/interruptor-de-palanca-xd2pa22cr-con-bloqueo-sin-bloqueo.jpg" }
    ],
    cajasVentiladores: [
        { nombre: "Ventilador plastico de capa 12V", precio: 5, img: "img_procducto/ventilador-plastico-de-capa-12v24v-dos-lineas-.jpg" },
        { nombre: "Aspas", precio: 5, img: "img_procducto/aspas-helice-40mm-par.jpg" },
        { nombre: "Modulo ventilador 5V", precio: 5, img: "img_procducto/modulo-ventilador-5v.jpg" }
    ],
    fuentesEnergia: [
        { nombre: "Fuente de alimentacion para Lilypad", precio: 15, img: "img_procducto/fuente-de-alimentacion-para-lilypad.jpg" },
        { nombre: "Fuente de alimentacion USB", precio: 15, img: "img_procducto/fuente-de-alimentacion-usb-de-5v-a-33v-9v-12v.jpg" },
        { nombre: "Transformador Toroidal ", precio: 15, img: "img_procducto/transformador-toroidal-unisian-110v-ac-a-12-28v-200w.jpg" }
    ]
};



function mostrarProductos(categoria) {
    const contenedor = document.getElementById("productosContainer");
    const titulo = document.getElementById("tituloCategoria");

    contenedor.innerHTML = "";
    titulo.textContent = categoria.replace(/([A-Z])/g, ' $1').trim();

    productos[categoria].forEach(prod => {
        contenedor.innerHTML += `
            <div class="producto">
                <img src="${prod.img}" alt="${prod.nombre}">
                <h4>${prod.nombre}</h4>
                <p>$${prod.precio}</p>
                <button onclick="agregarAlCarrito('${prod.nombre}', ${prod.precio}, '${prod.img}')">Agregar al carrito</button>
            </div>
        `;
    });
}



function mostrarProductos(categoria) {
    const contenedor = document.getElementById("productosContainer");
    const titulo = document.getElementById("tituloCategoria");

    contenedor.innerHTML = "";
    titulo.textContent = categoria.replace(/([A-Z])/g, ' $1').trim();

    productos[categoria].forEach(prod => {
        contenedor.innerHTML += `
            <div class="producto">
                <img src="${prod.img}" alt="${prod.nombre}">
                <h4>${prod.nombre}</h4>
                <p>L.${prod.precio}</p>
                <button onclick="agregarAlCarrito('${prod.nombre}', ${prod.precio}, '${prod.img}')">Agregar al carrito</button>
            </div>
        `;
    });
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Agregar al carrito con cantidades
function agregarAlCarrito(nombre, precio, img) {
    
    let item = carrito.find(p => p.nombre === nombre);
    if (item) {
        item.cantidad += 1; // aumentar cantidad
    } else {
        carrito.push({ nombre, precio, img, cantidad: 1 });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Mostrar carrito
function mostrarCarrito() {
    let cartItems = document.getElementById("cartItems");
    let totalPrice = document.getElementById("totalPrice");
    let cartCount = document.getElementById("cartCount");

    cartItems.innerHTML = "";
    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach((item, index) => {
        let subtotal = item.precio * item.cantidad;
        cartItems.innerHTML += `
            <li>
                <span>${item.nombre} - L.${item.precio} x ${item.cantidad} = L.${subtotal}</span>
                <button onclick="cambiarCantidad(${index}, -1)">➖</button>
                <button onclick="cambiarCantidad(${index}, 1)">➕</button>
                <button onclick="eliminarDelCarrito(${index})">❌</button>
            </li>
        `;
        total += subtotal;
        cantidadTotal += item.cantidad;
    });

    totalPrice.textContent = total.toFixed(2);
    if (cartCount) cartCount.textContent = cantidadTotal;
}

// Cambiar cantidad
function cambiarCantidad(index, cambio) {
    carrito[index].cantidad += cambio;
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Eliminar producto
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Vaciar todo
function vaciarCarrito() {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Toggle carrito flotante
function toggleCarrito() {
    document.getElementById("carritoFlotante").classList.toggle("abierto");
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();
});

// Cargar una categoría por defecto
mostrarProductos("componentesElectronicos");
