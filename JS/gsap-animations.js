// FLIP EFFECT PER A LA GALERIA "MOMENTS DOLCEA"
function inicialitzarFlipGaleria() {
    console.log("🔧 Iniciant FLIP gallery...");
    
    // Verificar que GSAP i Flip estan carregats
    if (typeof gsap === 'undefined' || typeof Flip === 'undefined') {
        console.error('❌ GSAP o Flip no carregats');
        return;
    }
    
    const galleryItems = gsap.utils.toArray(".gallery-item");
    console.log("📸 Gallery items trobats:", galleryItems.length);
    
    if (!galleryItems.length) {
        console.warn('⚠️ No es troben .gallery-item');
        return;
    }
    
    // CREAR OVERLAY si no existeix
    let detailContainer = document.querySelector('.detail-container');
    if (!detailContainer) {
        detailContainer = document.createElement('div');
        detailContainer.className = 'detail-container';
        detailContainer.innerHTML = `
            <div class="detail-overlay">
                <div class="detail-content">
                    <img class="detail-img" src="" alt="">
                    <div class="detail-text">
                        <span class="detail-category"></span>
                        <h3 class="detail-title"></h3>
                        <p class="detail-desc"></p>
                        <button class="detail-close">Tancar</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(detailContainer);
        console.log("✅ Overlay creat");
    }
    
    const detailOverlayEl = detailContainer.querySelector('.detail-overlay');
    const detailImg = detailContainer.querySelector('.detail-img');
    const detailCategory = detailContainer.querySelector('.detail-category');
    const detailTitle = detailContainer.querySelector('.detail-title');
    const detailDesc = detailContainer.querySelector('.detail-desc');
    const detailClose = detailContainer.querySelector('.detail-close');
    
    let activeItem = null;
    
    function showDetails(item) {
        console.log("🖱️ Clic a gallery item");
        if (activeItem) return hideDetails();
        
        activeItem = item;
        const img = item.querySelector('.gallery-img');
        const category = item.querySelector('.gallery-category');
        const title = item.querySelector('.gallery-title');
        const desc = item.querySelector('.gallery-desc');
        
        // Configurar contingut
        detailImg.src = img.src;
        detailImg.alt = img.alt;
        detailCategory.textContent = category?.textContent || 'Categoria';
        detailTitle.textContent = title?.textContent || 'Títol';
        detailDesc.textContent = desc?.textContent || 'Descripció';
        
        // Animació: difuminar altres elements
        gsap.to(galleryItems, {
            opacity: 0.3,
            duration: 0.3,
            stagger: 0.05
        });
        
        // Mostrar overlay
        gsap.set(detailContainer, { display: 'block' });
        gsap.fromTo(detailOverlayEl, 
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
        
        document.body.style.overflow = 'hidden';
    }
    
    function hideDetails() {
        if (!activeItem) return;
        
        gsap.to(detailOverlayEl, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            onComplete: () => {
                gsap.set(detailContainer, { display: 'none' });
                activeItem = null;
            }
        });
        
        gsap.to(galleryItems, {
            opacity: 1,
            duration: 0.3
        });
        
        document.body.style.overflow = '';
    }
    
    // Event listeners
    galleryItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => showDetails(item));
    });
    
    detailClose.addEventListener('click', hideDetails);
    detailOverlayEl.addEventListener('click', (e) => {
        if (e.target === detailOverlayEl) hideDetails();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') hideDetails();
    });
    
    console.log("✅ FLIP gallery inicialitzat!");
}

// INICIALITZACIÓ PRINCIPAL GSAP
function inicialitzarGSAPAnimations() {
    console.log("🎬 Iniciant GSAP animations...");
    
    if (typeof gsap === 'undefined') {
        console.error('❌ GSAP no carregat');
        return;
    }
    
    // Registrar plugins
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
    if (typeof Flip !== 'undefined') gsap.registerPlugin(Flip);
    
    // INICIALITZAR FLIP GALLERY
    inicialitzarFlipGaleria();
    
    console.log("✅ TOTES les animacions GSAP iniciades");
}

// INICIAR QUAN EL DOCUMENT ESTÀ LLEST
document.addEventListener('DOMContentLoaded', function() {
    console.log("📄 DOM carregat - iniciant GSAP...");
    setTimeout(() => {
        inicialitzarGSAPAnimations();
    }, 1000);
});
