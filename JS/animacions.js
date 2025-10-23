// ANIMACIONS 

// Funció principal que s'executa quan la pàgina està carregada
function iniciarAnimacions() {
    animarBarraMovil();
    animarCards();
    animarBotons();
}

// Animació de la barra mòbil (moviment horitzontal cap a l'esquerra)
function animarBarraMovil() {
    const textMovil = document.querySelector('.texto-movil');
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

// Animació de les targetes
function animarCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s';
        });
        
        card.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Animació dels botons
function animarBotons() {
    const botons = document.querySelectorAll('.btn-primary');
    
    botons.forEach(boto => {
        boto.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'all 0.3s';
        });
        
        boto.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
        
        boto.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Iniciem les animacions quan el document està carregat
document.addEventListener('DOMContentLoaded', iniciarAnimacions);