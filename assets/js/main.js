/* OFFCANVAS */
const offcanvasElementList = document.querySelectorAll('.offcanvas');
[...offcanvasElementList].map(
    offcanvasEl => new bootstrap.Offcanvas(offcanvasEl)
);


/* LLAMAR A PRODUCTOS.JSON */
async function obtenerProductos() {
    try {
        const req = await fetch("../productos.json");
        const data = await req.json();
        return data;
    } catch (error) {
        console.error("Error cargando productos:", error);
        return [];
    }
}


/* FUNCIONES PARA CARGAR PRODUCTOS */
async function cargarProductos() {

    const productos = await obtenerProductos();
    if (!productos.length) return;

    /* =========================
       PRODUCTOS DESTACADOS
       ========================= */
    const carouselDestacados = document.querySelector(".carousel-destacados");
    if (carouselDestacados) {

        const destacados = productos.filter(p => p.destacados === true);

        for (let i = 0; i < destacados.length; i += 4) {
            const grupo = destacados.slice(i, i + 4);

            const slide = document.createElement("div");
            slide.classList.add("carousel-item");
            if (i === 0) slide.classList.add("active");

            slide.innerHTML = `
                <div class="d-flex justify-content-center gap-4 py-4 flex-wrap">
                    ${grupo.map(producto => `
                        <div class="card" style="width: 18rem;">
                            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${producto.id}</h5>
                                <p class="card-text">${producto.descripcion}</p>
                                <p class="fw-bold">$${producto.precio}</p>
                                <a href="#" class="btn btn-primary">Agregar</a>
                            </div>
                        </div>
                    `).join("")}
                </div>
            `;

            carouselDestacados.append(slide);
        }
    }

    /*PRODUCTOS NOVEDOSOS*/
    const cargaNovedades = document.querySelector(".lista-productos-novedosos");
    if (cargaNovedades) {

        const productosNovedosos = productos.filter(p => p.novedosos === true);

        productosNovedosos.forEach((p, index) => {

            const card = document.createElement("div");
            card.classList.add("producto-novedoso", "d-flex", "justify-content-center");

            // Primer producto e impares → layout original
            const esProductoPar = index % 2 !== 0;

            card.innerHTML = esProductoPar
                ? `
                    <div class="card mb-3" style="max-width: 60rem;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${p.imagen}" class="img-fluid rounded-start" alt="${p.nombre}">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${p.nombre}</h5>
                                    <p class="card-text">${p.descripcion}</p>
                                    <p class="fw-bold">$${p.precio}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                : `
                    <div class="card mb-3" style="max-width: 60rem;">
                        <div class="row g-0">
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${p.nombre}</h5>
                                    <p class="card-text">${p.descripcion}</p>
                                    <p class="fw-bold">$${p.precio}</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <img src="${p.imagen}" class="img-fluid rounded-end" alt="${p.nombre}">
                            </div>
                        </div>
                    </div>
                `;

            cargaNovedades.append(card);
        });
    }

    /*CARDS PAGINA AGENDAS*/

    const cargaAgendas = document.querySelector(".carga-agendas");

    if (cargaAgendas) {

        const categoriaAgendas = productos.filter(
            producto => producto.categoria === "agendas"
        );

        const divAgendas = document.createElement("div");
        divAgendas.classList.add(
            "d-flex",
            "justify-content-center",
            "gap-4",
            "py-4",
            "flex-wrap"
        );

        categoriaAgendas.forEach(producto => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.style.width = "18rem";

            card.innerHTML = `
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="fw-bold">$${producto.precio}</p>
                    <a href="#" class="btn btn-primary">Agregar</a>
                </div>
            `;

            divAgendas.append(card);
        });

        cargaAgendas.append(divAgendas);
    }

    /*CARDS PAGINA PAPELERIA*/

    const cargaPapeleria = document.querySelector(".carga-papeleria");

    if (cargaPapeleria) {

        const categoriaPapeleria = productos.filter(
            producto => producto.categoria === "papeleria"
        );

        const divPapeleria = document.createElement("div");
        divPapeleria.classList.add("d-flex", "justify-content-center","gap-4","py-4","flex-wrap");

        categoriaPapeleria.forEach(producto => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.style.width = "18rem";

            card.innerHTML = `
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="fw-bold">$${producto.precio}</p>
                    <a href="#" class="btn btn-primary">Agregar</a>
                </div>
            `;

            divPapeleria.append(card);
        });

        cargaPapeleria.append(divPapeleria);
    }
    
    /*CARDS PAGINA TODOS LOS PRODUCTOS*/

    const cargaTodoProductos = document.querySelector(".carga-todo-productos");

    if (cargaTodoProductos) {

        const divTodo = document.createElement("div");
        divTodo.classList.add(
            "d-flex",
            "justify-content-center",
            "gap-4",
            "py-4",
            "flex-wrap"
        );

        productos.forEach(producto => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.style.width = "18rem";

            card.innerHTML = `
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="fw-bold">$${producto.precio}</p>
                    <a href="#" class="btn btn-primary">Agregar</a>
                </div>
            `;

            divTodo.append(card);
        });

        cargaTodoProductos.append(divTodo);
    }    

}

cargarProductos();
