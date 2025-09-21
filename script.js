
document.addEventListener('DOMContentLoaded', function() {
    const botonMenu = document.querySelector('.boton-menu');
    const menuLista = document.querySelector('.menu-lista');
    const enlacesMenu = document.querySelectorAll('.menu-lista a');

    botonMenu.addEventListener('click', function() {
        botonMenu.classList.toggle('active');
        menuLista.classList.toggle('active');
    });

    enlacesMenu.forEach(function(enlace) {
        enlace.addEventListener('click', function() {
            botonMenu.classList.remove('active');
            menuLista.classList.remove('active');
        });
    });

    document.addEventListener('click', function(evento) {
        if (!botonMenu.contains(evento.target) && !menuLista.contains(evento.target)) {
            botonMenu.classList.remove('active');
            menuLista.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const enlacesMenu = document.querySelectorAll('.menu-lista a');
    const secciones = document.querySelectorAll('section[id]');

    function activarEnlaceMenu() {
        let seccionActual = '';
        
        secciones.forEach(function(seccion) {
            const posicionSeccion = seccion.offsetTop;
            const alturaSeccion = seccion.clientHeight;
            
            if (window.scrollY >= (posicionSeccion - 200)) {
                seccionActual = seccion.getAttribute('id');
            }
        });

        enlacesMenu.forEach(function(enlace) {
            enlace.classList.remove('active');
            if (enlace.getAttribute('href') === '#' + seccionActual) {
                enlace.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', activarEnlaceMenu);

    enlacesMenu.forEach(function(enlace) {
        enlace.addEventListener('click', function(evento) {
            evento.preventDefault();
            
            const idSeccion = this.getAttribute('href');
            const seccionObjetivo = document.querySelector(idSeccion);
            
            if (seccionObjetivo) {
                const posicionObjetivo = seccionObjetivo.offsetTop - 70;
                
                window.scrollTo({
                    top: posicionObjetivo,
                    behavior: 'smooth'
                });
            }
        });
    });
});

window.addEventListener('scroll', function() {
    const menu = document.querySelector('.menu');
    
    if (window.scrollY > 100) {
        menu.style.background = 'rgba(18, 18, 18, 0.98)';
        menu.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        menu.style.background = 'rgba(18, 18, 18, 0.95)';
        menu.style.boxShadow = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('.formulario-contacto');
    
    if (formulario) {
        formulario.addEventListener('submit', function(evento) {
            evento.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value;
            
            if (!nombre || !email || !asunto || !mensaje) {
                mostrarNotificacion('Por favor, completa todos los campos', 'error');
                return;
            }
            
            if (!validarEmail(email)) {
                mostrarNotificacion('Por favor, ingresa un email válido', 'error');
                return;
            }
            
            const botonEnviar = this.querySelector('button[type="submit"]');
            const textoOriginal = botonEnviar.textContent;
            
            botonEnviar.textContent = 'Enviando...';
            botonEnviar.disabled = true;
            
            setTimeout(function() {
                mostrarNotificacion('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
                formulario.reset();
                botonEnviar.textContent = textoOriginal;
                botonEnviar.disabled = false;
            }, 2000);
        });
    }
});

function validarEmail(email) {
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patronEmail.test(email);
}

function mostrarNotificacion(mensaje, tipo) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion notificacion-' + tipo;
    notificacion.textContent = mensaje;
    
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
    
    document.body.appendChild(notificacion);
    
    setTimeout(function() {
        notificacion.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(function() {
        notificacion.style.transform = 'translateX(100%)';
        setTimeout(function() {
            if (notificacion.parentNode) {
                notificacion.parentNode.removeChild(notificacion);
            }
        }, 300);
    }, 5000);
}

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

document.addEventListener('DOMContentLoaded', function() {
    const elementosEmail = document.querySelectorAll('.item-contacto span');
    
    elementosEmail.forEach(function(elemento) {
        if (elemento.textContent.includes('@')) {
            elemento.style.cursor = 'pointer';
            elemento.title = 'Hacer clic para copiar';
            
            elemento.addEventListener('click', function() {
                navigator.clipboard.writeText(this.textContent).then(function() {
                    mostrarNotificacion('Email copiado al portapapeles', 'success');
                }).catch(function() {
                    mostrarNotificacion('No se pudo copiar el email', 'error');
                });
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
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
        
        botonArriba.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        botonArriba.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        botonArriba.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        document.body.appendChild(botonArriba);
    }
});

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

document.addEventListener('DOMContentLoaded', function() {
    function esVisible(elemento) {
        const rect = elemento.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function animarElementos() {
        const elementos = document.querySelectorAll('.categoria-conocimiento, .tarjeta-proyecto, .estadistica, .enlace-red');
        
        elementos.forEach(function(elemento) {
            if (esVisible(elemento) && !elemento.classList.contains('animado')) {
                elemento.classList.add('fade-in-up');
                elemento.classList.add('animado');
            }
        });
    }
    
    animarElementos();
    window.addEventListener('scroll', animarElementos);
});

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

function actualizarAñosExperiencia() {
    const fechaInicio = new Date('2024-01-01T00:00:00');
    const hoy = new Date();
    
    const añosCompletos = hoy.getFullYear() - fechaInicio.getFullYear();
    
    const elementoExperiencia = document.getElementById('años-experiencia');
    if (elementoExperiencia) {
        elementoExperiencia.textContent = añosCompletos + '+';
    }
    
    const elementoTexto = document.getElementById('años-texto');
    if (elementoTexto) {
        elementoTexto.textContent = añosCompletos;
    }
}

function abrirModalImagen(srcImagen) {
    const modal = document.getElementById('modal-imagen');
    const imagenModal = document.getElementById('imagen-modal');
    
    imagenModal.src = srcImagen;
    modal.style.display = 'block';
}

function cerrarModalImagen() {
    const modal = document.getElementById('modal-imagen');
    modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const imagenesProyecto = document.querySelectorAll('.imagen-proyecto img');
    
    imagenesProyecto.forEach(function(imagen) {
        imagen.addEventListener('click', function() {
            abrirModalImagen(this.src);
        });
    });
    
    const cerrarModal = document.querySelector('.cerrar-modal');
    if (cerrarModal) {
        cerrarModal.addEventListener('click', cerrarModalImagen);
    }
    
    const modal = document.getElementById('modal-imagen');
    if (modal) {
        modal.addEventListener('click', function(evento) {
            if (evento.target === modal) {
                cerrarModalImagen();
            }
        });
    }
    
    document.addEventListener('keydown', function(evento) {
        if (evento.key === 'Escape') {
            cerrarModalImagen();
        }
    });
});

window.addEventListener('load', function() {
    actualizarAñosExperiencia();
});