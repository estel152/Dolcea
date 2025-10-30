// SOLUCIÓ DEFINITIVA - Bloquejar qualsevol anchor automàtic
(function() {
    'use strict';
    
    console.log("🔧 Fixing anchor problem...");
    
    // 1. Scroll immediat al top
    window.scrollTo(0, 0);
    
    // 2. Eliminar hash de la URL sense recarregar
    if (window.location.hash) {
        console.log("🗑️ Removing hash:", window.location.hash);
        history.replaceState(null, null, window.location.pathname + window.location.search);
    }
    
    // 3. Forçar scroll al top quan es carregui la pàgina
    document.addEventListener('DOMContentLoaded', function() {
        window.scrollTo(0, 0);
    });
    
    window.addEventListener('load', function() {
        window.scrollTo(0, 0);
        // Doble assegurança
        setTimeout(() => window.scrollTo(0, 0), 100);
    });
    
    // 4. Bloquejar hashchange
    window.addEventListener('hashchange', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        window.scrollTo(0, 0);
        return false;
    });
    
})();

// ANIMACIONS DOLCEA - Codi principal d'animacions

// Funció principal que s'executa quan la pàgina està carregada
function iniciarAnimacions() {
    console.log("Iniciant animacions Dolcea...");
    
    animarBarraMovil();
    animarCards();
    animarBotons();
    animarNavegacio();
    animarScroll();
    animarElementsAlScroll();
    inicialitzarAccordions();
    inicialitzarFiltresGaleria();
    inicialitzarPersonalitzacio();
    inicialitzarValors();
    
    // Millores d'accessibilitat
    millorarAccessibilitat();
}

// ANIMACIÓ DE LA BARRA MÒBIL
function animarBarraMovil() {
    const textMovil = document.querySelector('.texto-movil');
    if (!textMovil) return;
    
    const textOriginal = textMovil.innerHTML;
    
    // Dupliquem el text per crear l'efecte continu
    textMovil.innerHTML = textOriginal + ' ' + textOriginal;
    
    let posicio = 0;
    const velocitat = 1;
    
    function moureText() {
        posicio -= velocitat;
        const ampladaText = textMovil.scrollWidth / 2;
        
        if (posicio < -ampladaText) {
            posicio = 0;
        }
        
        textMovil.style.transform = 'translateX(' + posicio + 'px)';
        requestAnimationFrame(moureText);
    }
    
    moureText();
}

// ANIMACIÓ DE LES TARGETES
function animarCards() {
    const cards = document.querySelectorAll('.card, .proposit-card, .dolcos-item, .gallery-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s';
        });
        
        card.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Millora: afegir focus per a accessibilitat
        card.addEventListener('focus', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s';
        });
        
        card.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// ANIMACIÓ DELS BOTONS
function animarBotons() {
    const botons = document.querySelectorAll('.btn-primary, .btn-light, .btn-outline-primary, .hero-btn, .btn-comanda, .cta-btn');
    
    botons.forEach(boto => {
        boto.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'all 0.3s';
        });
        
        boto.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
        
        boto.addEventListener('click', function(e) {
            // Prevenir comportament per defecte si és un enllaç
            if (this.tagName === 'A') {
                e.preventDefault();
            }
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Efecte de ripple per a botons (opcional)
        boto.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ANIMACIÓ DE LA NAVEGACIÓ
function animarNavegacio() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Efecte scroll a la navegació
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Animació dels enllaços de navegació
    navLinks.forEach(link => {
        link.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
        
        link.addEventListener('focus', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('blur', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Activar enllaç actual a la navegació
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    });
}

// ANIMACIÓ D'ELEMENTS QUAN APAREIXEN AL SCROLL
function animarElementsAlScroll() {
    const elements = document.querySelectorAll('.proposit-card, .dolcos-item, .gallery-item, .benefit-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// ANIMACIÓ DEL SCROLL SUAU
function animarScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// INICIALITZACIÓ D'ACCORDIONS
function inicialitzarAccordions() {
    const accordionItems = document.querySelectorAll('.nivell-accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.nivell-accordion-header');
        
        header.addEventListener('click', function(e) {
            e.preventDefault();
            const isActive = item.classList.contains('active');
            
            // Tanca tots els accordions
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Obre l'accordion actual si no estava actiu
            if (!isActive) {
                item.classList.add('active');
                
                // Enfocar el contingut obert per a accessibilitat
                const content = item.querySelector('.nivell-accordion-content');
                setTimeout(() => {
                    content.focus();
                }, 300);
            }
        });
        
        // Suport per a teclat
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
            }
        });
    });
    
    // Tots els accordions comencen tancats per defecte
    accordionItems.forEach(item => {
        item.classList.remove('active');
    });
}

// INICIALITZACIÓ DE FILTRES DE GALERIA
function inicialitzarFiltresGaleria() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Funció per filtrar
    function filterGallery(category) {
        galleryItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.display = 'block';
                }, 50);
                
                // Animació CSS per als elements que es mostren
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                    item.style.transition = 'all 0.5s ease';
                }, 50);
            } else {
                item.classList.add('hidden');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 400);
            }
        });
    }

    // Event listeners per als botons de filtre
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Eliminar classe active de tots els botons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Afegir classe active al botó clicat
            this.classList.add('active');
            // Filtrar galeria
            filterGallery(this.dataset.filter);
        });
        
        // Suport per a teclat
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Efecte d'aparició al carregar
    setTimeout(() => {
        galleryItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, index * 100);
        });
    }, 500);
}

// INICIALITZACIÓ DE PERSONALITZACIÓ DE PASTISSOS
function inicialitzarPersonalitzacio() {
    // Elementos del DOM
    const baseImg = document.getElementById('base-img');
    const toppingImg = document.getElementById('topping-img');
    const baseOptions = document.querySelectorAll('.ingredient-option[data-base]');
    const toppingOptions = document.querySelectorAll('.ingredient-option[data-topping]');
    const btnComanda = document.getElementById('btn-comanda');

    // Arrays de bases i toppings
    const bases = [
        { img: 'img/base nata.png', name: 'Nata' },
        { img: 'img/base 3 xocos.png', name: '3 Xocolates' },
        { img: 'img/base bizcocho.png', name: 'Bizcocho' },
        { img: 'img/base caramel xoco.png', name: 'Caramel Xocolata' }
    ];

    const toppings = [
        { img: 'img/maduixa nabiu.png', name: 'Maduixa & Nabiu' },
        { img: 'img/maduixa nata.png', name: 'Maduixa & Nata' },
        { img: 'img/nueces.png', name: 'Nueces' }
    ];

    let currentBaseIndex = 0;
    let currentToppingIndex = 0;

    // Funció per actualitzar la base
    function updateBase(index) {
        currentBaseIndex = index;
        const base = bases[index];
        baseImg.src = base.img;
        baseImg.alt = `Base ${base.name}`;
        
        // Animació de transició
        baseImg.style.opacity = '0';
        baseImg.style.transform = 'scale(0.8)';
        setTimeout(() => {
            baseImg.style.opacity = '1';
            baseImg.style.transform = 'scale(1)';
            baseImg.style.transition = 'all 0.5s ease';
        }, 150);
        
        // Actualitzar opcions actives
        baseOptions.forEach((option, i) => {
            option.classList.toggle('active', i === index);
        });
        
        // Scroll suau a l'opció seleccionada
        if (baseOptions[index]) {
            baseOptions[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    // Funció per actualitzar el topping
    function updateTopping(index) {
        currentToppingIndex = index;
        const topping = toppings[index];
        toppingImg.src = topping.img;
        toppingImg.alt = `Topping ${topping.name}`;
        
        // Animació de transició
        toppingImg.style.opacity = '0';
        toppingImg.style.transform = 'scale(0.8)';
        setTimeout(() => {
            toppingImg.style.opacity = '1';
            toppingImg.style.transform = 'scale(1)';
            toppingImg.style.transition = 'all 0.5s ease';
        }, 150);
        
        // Actualitzar opcions actives
        toppingOptions.forEach((option, i) => {
            option.classList.toggle('active', i === index);
        });
        
        // Scroll suau a l'opció seleccionada
        if (toppingOptions[index]) {
            toppingOptions[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    // Event listeners per a selecció directa de bases
    baseOptions.forEach((option, index) => {
        option.addEventListener('click', () => {
            updateBase(index);
        });
        
        option.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                updateBase(index);
            }
        });
        
        // Efecte hover millorat
        option.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(0.98)';
            }
        });
        
        option.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(0.95)';
            }
        });
    });

    // Event listeners per a selecció directa de toppings
    toppingOptions.forEach((option, index) => {
        option.addEventListener('click', () => {
            updateTopping(index);
        });
        
        option.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                updateTopping(index);
            }
        });
        
        // Efecte hover millorat
        option.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(0.98)';
            }
        });
        
        option.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(0.95)';
            }
        });
    });

    // Event listener per al botó de comanda
    btnComanda.addEventListener('click', function() {
        const baseSeleccionada = bases[currentBaseIndex].name;
        const toppingSeleccionado = toppings[currentToppingIndex].name;
        
        // Efecte visual del botó
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Mostrar missatge de confirmació
        const mensaje = `Has seleccionat:\nBase: ${baseSeleccionada}\nTopping: ${toppingSeleccionado}\n\nRedirigint a la comanda...`;
        
        // Crear modal de confirmació personalitzat
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        `;
        
        modalContent.innerHTML = `
            <h3 style="font-family: 'Bebas Neue', sans-serif; color: #731421; margin-bottom: 20px; font-size: 1.8rem;">Pastís Personalitzat</h3>
            <div style="margin-bottom: 25px;">
                <p style="margin-bottom: 8px; font-size: 1.1rem; font-weight: 600;">Base seleccionada:</p>
                <p style="color: #731421; font-size: 1.2rem; margin-bottom: 15px;">${baseSeleccionada}</p>
                <p style="margin-bottom: 8px; font-size: 1.1rem; font-weight: 600;">Topping seleccionat:</p>
                <p style="color: #731421; font-size: 1.2rem;">${toppingSeleccionado}</p>
            </div>
            <button id="confirmar-comanda" style="
                background: #731421;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 25px;
                font-family: 'Bebas Neue', sans-serif;
                font-size: 1.2rem;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-bottom: 10px;
            ">Confirmar Comanda</button>
            <br>
            <button id="cancelar-comanda" style="
                background: transparent;
                color: #731421;
                border: 1px solid #731421;
                padding: 10px 25px;
                border-radius: 25px;
                font-family: 'Poppins', sans-serif;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
            ">Cancel·lar</button>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Enfocar el primer botó del modal
        setTimeout(() => {
            document.getElementById('confirmar-comanda').focus();
        }, 100);
        
        // Event listener per al botó de confirmar
        document.getElementById('confirmar-comanda').addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                modal.remove();
                // Redirigir a la secció de compra
                window.location.href = '#compra';
                // ✅ VERSIÓ CORREGIDA - SOLAMENT TANCA EL MODAL
document.getElementById('confirmar-comanda').addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        modal.remove();
        // 🚫 NO FER RES MÉS - només tancar el modal
    }, 200);
});
            }, 200);
        });
        
        // Event listener per al botó de cancel·lar
        document.getElementById('cancelar-comanda').addEventListener('click', function() {
            modal.remove();
            // Retornar el focus al botó de comanda
            btnComanda.focus();
        });
        
        // Tancar modal al fer clic fora
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
                btnComanda.focus();
            }
        });
        
        // Tancar modal amb tecla Escape
        document.addEventListener('keydown', function closeModal(e) {
            if (e.key === 'Escape') {
                modal.remove();
                btnComanda.focus();
                document.removeEventListener('keydown', closeModal);
            }
        });
    });

    // Inicialitzar amb animació
    setTimeout(() => {
        updateBase(0);
        updateTopping(0);
    }, 500);
}

// INICIALITZACIÓ DE LA SECCIÓ VALORS
function inicialitzarValors() {
    const quotes = [
        {
            text: "All the world is birthday cake, so take a piece, but not too much.",
            author: "George Harrison"
        },
        {
            text: "La vida és com un pastís: cal gaudir-la mos a mos.",
            author: "Anònim"
        },
        {
            text: "El dolçor més gran és compartir un bon moment amb els teus.",
            author: "Dolcea"
        },
        {
            text: "Cada pastís conta una història, nosaltres t'ajudem a escriure-la.",
            author: "Equip Dolcea"
        }
    ];

    let currentQuoteIndex = 0;
    const quoteElement = document.getElementById('current-quote');
    const authorElement = document.getElementById('current-author');
    const prevButton = document.getElementById('prev-quote');
    const nextButton = document.getElementById('next-quote');

    function updateQuote(index) {
        currentQuoteIndex = index;
        const quote = quotes[index];
        
        // Animació de transició
        quoteElement.style.opacity = '0';
        quoteElement.style.transform = 'translateY(-10px)';
        authorElement.style.opacity = '0';
        
        setTimeout(() => {
            quoteElement.textContent = quote.text;
            authorElement.textContent = `— ${quote.author}`;
            
            quoteElement.style.opacity = '1';
            quoteElement.style.transform = 'translateY(0)';
            authorElement.style.opacity = '1';
            quoteElement.style.transition = 'all 0.3s ease';
            authorElement.style.transition = 'all 0.3s ease';
        }, 300);
    }

    // Event listeners per als botons de navegació
    prevButton.addEventListener('click', () => {
        let newIndex = currentQuoteIndex - 1;
        if (newIndex < 0) newIndex = quotes.length - 1;
        updateQuote(newIndex);
    });

    nextButton.addEventListener('click', () => {
        let newIndex = currentQuoteIndex + 1;
        if (newIndex >= quotes.length) newIndex = 0;
        updateQuote(newIndex);
    });

    // Suport per a teclat
    prevButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            prevButton.click();
        }
    });

    nextButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            nextButton.click();
        }
    });

    // Canvi automàtic de cites cada 10 segons
    setInterval(() => {
        let newIndex = currentQuoteIndex + 1;
        if (newIndex >= quotes.length) newIndex = 0;
        updateQuote(newIndex);
    }, 10000);
}

// MILLORES D'ACCESSIBILITAT
function millorarAccessibilitat() {
    // Afegir atributs ARIA als formularis
    const forms = document.querySelectorAll('form');
    forms.forEach((form, index) => {
        if (!form.getAttribute('aria-label')) {
            form.setAttribute('aria-label', `Formulari ${index + 1}`);
        }
    });
    
    // Millorar els botons del carousel
    const carouselButtons = document.querySelectorAll('.carousel-control-prev, .carousel-control-next');
    carouselButtons.forEach(button => {
        button.setAttribute('tabindex', '0');
    });
    
    // Afegir descripcions als iframes dels mapes
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        if (!iframe.getAttribute('title')) {
            iframe.setAttribute('title', 'Mapa de localització');
        }
    });
    
    // Millorar la navegació per teclat
    document.addEventListener('keydown', function(e) {
        // Saltar al contingut principal amb tecla Tab
        if (e.key === 'Tab' && !e.shiftKey) {
            const skipLink = document.querySelector('.skip-link');
            if (skipLink) {
                skipLink.focus();
            }
        }
    });
    
    // Crear enllaç per saltar al contingut principal (si no existeix)
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link sr-only';
        skipLink.textContent = 'Saltar al contingut principal';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Afegir id al contingut principal si no existeix
        const mainContent = document.querySelector('main') || document.querySelector('.container') || document.body;
        if (!mainContent.id) {
            mainContent.id = 'main-content';
        }
    }
    
    // Millorar accessibilitat dels sliders
    const sliders = document.querySelectorAll('.dolcos-slider, .bases-slider, .toppings-slider');
    sliders.forEach(slider => {
        slider.setAttribute('role', 'list');
        slider.setAttribute('aria-label', 'Llista d\'elements desplaçable');
    });
}

// INICIALITZACIÓ QUAN EL DOCUMENT ESTÀ LLEST
document.addEventListener('DOMContentLoaded', function() {
    console.log("Document carregat, iniciant animacions...");
    iniciarAnimacions();
});

// GESTIÓ D'ERRORS
window.addEventListener('error', function(e) {
    console.error('Error en les animacions:', e.error);
});

// COMPATIBILITAT AMB REDUCCIÓ DE MOVIMENT
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Desactivar animacions si l'usuari prefereix reduir el moviment
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
} 
