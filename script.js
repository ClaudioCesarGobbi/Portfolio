// JavaScript básico para el portfolio - Versión simplificada
// Este archivo contiene las funcionalidades principales del sitio web

// ===== FUNCIONALIDAD DEL MENÚ HAMBURGUESA =====
// Esta función se ejecuta cuando la página termina de cargar
document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del menú móvil
    const botonMenu = document.querySelector('.boton-menu');
    const menuLista = document.querySelector('.menu-lista');
    const enlacesMenu = document.querySelectorAll('.menu-lista a');

    // Mostrar/ocultar menú al hacer clic en el botón hamburguesa
    botonMenu.addEventListener('click', function() {
        // Alternar la clase 'active' en el botón y el menú
        botonMenu.classList.toggle('active');
        menuLista.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en cualquier enlace
    enlacesMenu.forEach(function(enlace) {
        enlace.addEventListener('click', function() {
            botonMenu.classList.remove('active');
            menuLista.classList.remove('active');
        });
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(evento) {
        // Si el clic no fue en el botón ni en el menú, cerrar el menú
        if (!botonMenu.contains(evento.target) && !menuLista.contains(evento.target)) {
            botonMenu.classList.remove('active');
            menuLista.classList.remove('active');
        }
    });
});

// ===== NAVEGACIÓN SUAVE =====
// Esta función hace que al hacer clic en un enlace del menú, la página se desplace suavemente
document.addEventListener('DOMContentLoaded', function() {
    const enlacesMenu = document.querySelectorAll('.menu-lista a');
    const secciones = document.querySelectorAll('section[id]');

    // Función para activar el enlace correspondiente a la sección visible
    function activarEnlaceMenu() {
        let seccionActual = '';
        
        // Revisar cada sección para ver cuál está visible
        secciones.forEach(function(seccion) {
            const posicionSeccion = seccion.offsetTop;
            const alturaSeccion = seccion.clientHeight;
            
            // Si el scroll está cerca de esta sección, marcarla como actual
            if (window.scrollY >= (posicionSeccion - 200)) {
                seccionActual = seccion.getAttribute('id');
            }
        });

        // Activar el enlace correspondiente a la sección actual
        enlacesMenu.forEach(function(enlace) {
            enlace.classList.remove('active');
            if (enlace.getAttribute('href') === '#' + seccionActual) {
                enlace.classList.add('active');
            }
        });
    }

    // Escuchar el scroll para activar enlaces
    window.addEventListener('scroll', activarEnlaceMenu);

    // Navegación suave para enlaces internos
    enlacesMenu.forEach(function(enlace) {
        enlace.addEventListener('click', function(evento) {
            evento.preventDefault(); // Prevenir comportamiento por defecto
            
            const idSeccion = this.getAttribute('href');
            const seccionObjetivo = document.querySelector(idSeccion);
            
            if (seccionObjetivo) {
                // Calcular posición considerando la altura del menú
                const posicionObjetivo = seccionObjetivo.offsetTop - 70;
                
                // Desplazarse suavemente a la sección
                window.scrollTo({
                    top: posicionObjetivo,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===== EFECTO EN EL MENÚ AL HACER SCROLL =====
// Cambiar el estilo del menú cuando se hace scroll
window.addEventListener('scroll', function() {
    const menu = document.querySelector('.menu');
    
    if (window.scrollY > 100) {
        // Si se ha hecho scroll, cambiar el fondo del menú
        menu.style.background = 'rgba(18, 18, 18, 0.98)';
        menu.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        // Si está en la parte superior, restaurar el fondo original
        menu.style.background = 'rgba(18, 18, 18, 0.95)';
        menu.style.boxShadow = 'none';
    }
});

// ===== FORMULARIO DE CONTACTO =====
// Manejar el envío del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('.formulario-contacto');
    
    if (formulario) {
        formulario.addEventListener('submit', function(evento) {
            evento.preventDefault(); // Prevenir envío por defecto
            
            // Obtener los datos del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Validación básica
            if (!nombre || !email || !asunto || !mensaje) {
                mostrarNotificacion('Por favor, completa todos los campos', 'error');
                return;
            }
            
            if (!validarEmail(email)) {
                mostrarNotificacion('Por favor, ingresa un email válido', 'error');
                return;
            }
            
            // Simular envío del formulario
            const botonEnviar = this.querySelector('button[type="submit"]');
            const textoOriginal = botonEnviar.textContent;
            
            botonEnviar.textContent = 'Enviando...';
            botonEnviar.disabled = true;
            
            // Simular delay de envío (2 segundos)
            setTimeout(function() {
                mostrarNotificacion('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
                formulario.reset(); // Limpiar formulario
                botonEnviar.textContent = textoOriginal;
                botonEnviar.disabled = false;
            }, 2000);
        });
    }
});

// ===== FUNCIÓN PARA VALIDAR EMAIL =====
function validarEmail(email) {
    // Expresión regular simple para validar email
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patronEmail.test(email);
}

// ===== FUNCIÓN PARA MOSTRAR NOTIFICACIONES =====
function mostrarNotificacion(mensaje, tipo) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion notificacion-' + tipo;
    notificacion.textContent = mensaje;
    
    // Estilos para la notificación
    let colorFondo;
    if (tipo === 'success') {
        colorFondo = '#10b981';
    } else if (tipo === 'error') {
        colorFondo = '#ef4444';
    } else {
        colorFondo = '#6366f1';
    }
    
    notificacion.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colorFondo};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    // Agregar notificación al cuerpo del documento
    document.body.appendChild(notificacion);
    
    // Animar entrada
    setTimeout(function() {
        notificacion.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 5 segundos
    setTimeout(function() {
        notificacion.style.transform = 'translateX(100%)';
        setTimeout(function() {
            if (notificacion.parentNode) {
                notificacion.parentNode.removeChild(notificacion);
            }
        }, 300);
    }, 5000);
}

// ===== EFECTO HOVER EN TARJETAS DE PROYECTO =====
// Mejorar el efecto hover en las tarjetas de proyecto
document.addEventListener('DOMContentLoaded', function() {
    const tarjetasProyecto = document.querySelectorAll('.tarjeta-proyecto');
    
    tarjetasProyecto.forEach(function(tarjeta) {
        tarjeta.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        tarjeta.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ===== FUNCIÓN PARA COPIAR EMAIL =====
// Permitir copiar el email al hacer clic en él
document.addEventListener('DOMContentLoaded', function() {
    const elementosEmail = document.querySelectorAll('.item-contacto span');
    
    elementosEmail.forEach(function(elemento) {
        if (elemento.textContent.includes('@')) {
            elemento.style.cursor = 'pointer';
            elemento.title = 'Hacer clic para copiar';
            
            elemento.addEventListener('click', function() {
                // Intentar copiar al portapapeles
                navigator.clipboard.writeText(this.textContent).then(function() {
                    mostrarNotificacion('Email copiado al portapapeles', 'success');
                }).catch(function() {
                    mostrarNotificacion('No se pudo copiar el email', 'error');
                });
            });
        }
    });
});

// ===== BOTÓN PARA VOLVER ARRIBA =====
// Crear y manejar botón para volver al inicio de la página
document.addEventListener('DOMContentLoaded', function() {
    // Crear botón si no existe
    if (!document.querySelector('.boton-arriba')) {
        const botonArriba = document.createElement('button');
        botonArriba.className = 'boton-arriba';
        botonArriba.innerHTML = '<i class="fas fa-arrow-up"></i>';
        botonArriba.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: #6b8e23;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
        `;
        
        // Agregar funcionalidad al botón
        botonArriba.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Efectos hover
        botonArriba.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        botonArriba.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        document.body.appendChild(botonArriba);
    }
});

// Mostrar/ocultar botón según el scroll
window.addEventListener('scroll', function() {
    const botonArriba = document.querySelector('.boton-arriba');
    if (botonArriba) {
        if (window.scrollY > 300) {
            botonArriba.style.display = 'block';
        } else {
            botonArriba.style.display = 'none';
        }
    }
});

// ===== ANIMACIONES SIMPLES =====
// Agregar animaciones cuando los elementos aparecen en pantalla
document.addEventListener('DOMContentLoaded', function() {
    // Función para verificar si un elemento está visible
    function esVisible(elemento) {
        const rect = elemento.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Función para agregar animación a elementos visibles
    function animarElementos() {
        const elementos = document.querySelectorAll('.categoria-conocimiento, .tarjeta-proyecto, .estadistica, .enlace-red');
        
        elementos.forEach(function(elemento) {
            if (esVisible(elemento) && !elemento.classList.contains('animado')) {
                elemento.classList.add('fade-in-up');
                elemento.classList.add('animado');
            }
        });
    }
    
    // Ejecutar al cargar y al hacer scroll
    animarElementos();
    window.addEventListener('scroll', animarElementos);
});

// ===== PREVENIR ZOOM EN INPUTS EN MÓVILES =====
// Evitar que se haga zoom al tocar inputs en dispositivos móviles
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(function(input) {
        input.addEventListener('focus', function() {
            if (window.innerWidth <= 768) {
                const viewport = document.querySelector('meta[name="viewport"]');
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            }
        });
        
        input.addEventListener('blur', function() {
            if (window.innerWidth <= 768) {
                const viewport = document.querySelector('meta[name="viewport"]');
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
            }
        });
    });
});

// ===== CALCULAR AUTOMÁTICO DE AÑOS DE EXPERIENCIA =====
// Función para calcular y actualizar los años de experiencia automáticamente
function actualizarAñosExperiencia() {
    // Fecha de inicio: 1 de enero de 2024
    const fechaInicio = new Date('2024-01-01T00:00:00');
    const hoy = new Date();
    
    // Calcular años completos transcurridos
    const añosCompletos = hoy.getFullYear() - fechaInicio.getFullYear();
    
    // Actualizar la tarjeta de estadísticas
    const elementoExperiencia = document.getElementById('años-experiencia');
    if (elementoExperiencia) {
        elementoExperiencia.textContent = añosCompletos + '+';
    }
    
    // Actualizar el texto descriptivo
    const elementoTexto = document.getElementById('años-texto');
    if (elementoTexto) {
        elementoTexto.textContent = añosCompletos;
    }
}

// ===== MODAL PARA IMÁGENES DE PROYECTOS =====
// Función para abrir el modal con la imagen ampliada
function abrirModalImagen(srcImagen) {
    const modal = document.getElementById('modal-imagen');
    const imagenModal = document.getElementById('imagen-modal');
    
    imagenModal.src = srcImagen;
    modal.style.display = 'block';
}

// Función para cerrar el modal
function cerrarModalImagen() {
    const modal = document.getElementById('modal-imagen');
    modal.style.display = 'none';
}

// Agregar funcionalidad a las imágenes de proyectos
document.addEventListener('DOMContentLoaded', function() {
    const imagenesProyecto = document.querySelectorAll('.imagen-proyecto img');
    
    imagenesProyecto.forEach(function(imagen) {
        imagen.addEventListener('click', function() {
            abrirModalImagen(this.src);
        });
    });
    
    // Cerrar modal al hacer clic en la X
    const cerrarModal = document.querySelector('.cerrar-modal');
    if (cerrarModal) {
        cerrarModal.addEventListener('click', cerrarModalImagen);
    }
    
    // Cerrar modal al hacer clic fuera de la imagen
    const modal = document.getElementById('modal-imagen');
    if (modal) {
        modal.addEventListener('click', function(evento) {
            if (evento.target === modal) {
                cerrarModalImagen();
            }
        });
    }
    
    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(evento) {
        if (evento.key === 'Escape') {
            cerrarModalImagen();
        }
    });
});

// ===== INICIALIZACIÓN =====
// Ejecutar funciones cuando la página se carga completamente
window.addEventListener('load', function() {
    // Actualizar años de experiencia al cargar la página
    actualizarAñosExperiencia();
});