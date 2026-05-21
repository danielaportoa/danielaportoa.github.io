document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos todas las secciones estructuradas con la clase de animación
    const elementosAnimados = document.querySelectorAll('.fade-in-section');

    // Configuramos el observador de scroll para optimizar el rendimiento de la carga dinámica
    const observadorDeScroll = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            // Cuando la sección entra al umbral de visibilidad, gatilla los estilos CSS
            if (entrada.isIntersecting) {
                entrada.target.classList.add('is-visible');
                observador.unobserve(entrada.target); // Desconecta el observador para que anime solo una vez
            }
        });
    }, {
        threshold: 0.1, // Dispara la animación cuando el 10% del elemento sea visible
        rootMargin: "0px 0px -50px 0px" // Ajuste de margen inferior para fluidez visual
    });

    // Inicializamos el seguimiento en cada elemento
    elementosAnimados.forEach(elemento => {
        observadorDeScroll.observe(elemento);
    });
});

// ==========================================
    // LÓGICA DEL CARRUSEL DE LA CABECERA
    // ==========================================
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const btnPrev = document.querySelector('.carousel-btn.prev');
    const btnNext = document.querySelector('.carousel-btn.next');
    
    let slideActual = 0;
    let intervaloCarrusel;

    // Función principal para cambiar de slide
    function mostrarSlide(indice) {
        // Quitar la clase 'active' de todos
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Lógica de bucle (si pasa del último, vuelve al primero y viceversa)
        if (indice >= slides.length) slideActual = 0;
        if (indice < 0) slideActual = slides.length - 1;

        // Mostrar el slide correspondiente
        slides[slideActual].classList.add('active');
        dots[slideActual].classList.add('active');
    }

    function siguienteSlide() {
        slideActual++;
        mostrarSlide(slideActual);
    }

    function anteriorSlide() {
        slideActual--;
        mostrarSlide(slideActual);
    }

    // Autoplay automático cada 5 segundos
    function iniciarAutoplay() {
        intervaloCarrusel = setInterval(siguienteSlide, 5000); 
    }

    // Reiniciar el contador si el usuario hace clic manualmente
    function reiniciarAutoplay() {
        clearInterval(intervaloCarrusel);
        iniciarAutoplay();
    }

    // Escuchadores de eventos para los botones
    if(btnNext && btnPrev) {
        btnNext.addEventListener('click', () => {
            siguienteSlide();
            reiniciarAutoplay();
        });

        btnPrev.addEventListener('click', () => {
            anteriorSlide();
            reiniciarAutoplay();
        });
    }

    // Escuchadores para los puntitos indicadores
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slideActual = index;
            mostrarSlide(slideActual);
            reiniciarAutoplay();
        });
    });

    // Iniciar el carrusel al cargar la página
    if(slides.length > 0) {
        iniciarAutoplay();
    }