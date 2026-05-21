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