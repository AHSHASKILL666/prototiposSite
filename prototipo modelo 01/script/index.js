// JavaScript para controlar a animação do dropdown e carrinho
// Variável global para o carrinho
let cartItems = [];

document.addEventListener('DOMContentLoaded', function() {
    const filtrosBtn = document.getElementById('filtros-btn');
    const dropdownContainer = document.getElementById('dropdown-container');
    const chevronIcon = filtrosBtn.querySelector('.chevron-icon');
    
    filtrosBtn.addEventListener('click', function() {
        const isOpen = dropdownContainer.classList.contains('open');
        
        if (isOpen) {
            // Fechar dropdown
            dropdownContainer.classList.remove('open');
            chevronIcon.style.transform = 'rotate(0deg)';
        } else {
            // Abrir dropdown
            dropdownContainer.classList.add('open');
            chevronIcon.style.transform = 'rotate(180deg)';
        }
    });

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function(event) {
        if (!filtrosBtn.contains(event.target) && !dropdownContainer.contains(event.target)) {
            dropdownContainer.classList.remove('open');
            chevronIcon.style.transform = 'rotate(0deg)';
        }
    });

    // Adicionar funcionalidade aos botões de categoria
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active de todos os botões
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Adiciona active ao botão clicado
            this.classList.add('active');
            
            // Opcional: fechar dropdown após seleção
            dropdownContainer.classList.remove('open');
            chevronIcon.style.transform = 'rotate(0deg)';
        });
    });

    // JavaScript para o carrinho de compras
    const cartContainer = document.getElementById('cart-container');
    const cartModal = document.getElementById('cart-modal');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartClose = document.getElementById('cart-close');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    // Função para carregar carrinho do localStorage
    function loadCartFromStorage() {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    }
    
    // Função para salvar carrinho no localStorage
    function saveCartToStorage(cartItems) {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Função para abrir o carrinho
    function openCart() {
        cartModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    // Função para fechar o carrinho
    function closeCart() {
        cartModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Função para atualizar o contador do carrinho
    function updateCartCount() {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Função para atualizar o total do carrinho
    function updateCartTotal() {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    // Função para renderizar os itens do carrinho
    function renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center; color: #718096; padding: 20px;">Carrinho vazio</p>';
        } else {
            cartItems.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.setAttribute('data-id', item.id);
                
                cartItemElement.innerHTML = `
                    <div class="cart-item-image ${item.image}">
                        <i class="${item.icon}"></i>
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn minus" data-action="decrease" data-id="${item.id}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-action="increase" data-id="${item.id}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                
                cartItemsContainer.appendChild(cartItemElement);
            });
        }

        // Adicionar eventos aos botões de quantidade e remoção
        addCartItemEvents();
        updateCartCount();
        updateCartTotal();
        
        // Salvar no localStorage sempre que renderizar
        saveCartToStorage(cartItems);
    }

    // Função para adicionar eventos aos itens do carrinho
    function addCartItemEvents() {
        // Botões de quantidade
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                const itemId = parseInt(this.getAttribute('data-id'));
                
                const item = cartItems.find(item => item.id === itemId);
                if (item) {
                    if (action === 'increase') {
                        item.quantity++;
                    } else if (action === 'decrease' && item.quantity > 1) {
                        item.quantity--;
                    }
                    renderCartItems();
                }
            });
        });

        // Botões de remoção
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                cartItems = cartItems.filter(item => item.id !== itemId);
                renderCartItems();
            });
        });
    }

    // Eventos do carrinho
    cartContainer.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Fechar carrinho com ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeCart();
        }
    });

    // Carregar carrinho do localStorage ao inicializar a página
    cartItems = loadCartFromStorage();
    renderCartItems();

    // Adicionar funcionalidade aos botões "+" dos serviços
    document.querySelectorAll('.add-button').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            // Simular adição de item ao carrinho
            const serviceNames = ['Corte Masculino Premium', 'Barba Completa', 'Hidratação Capilar'];
            const servicePrices = [45.00, 35.00, 60.00];
            const serviceImages = ['green', 'orange', 'purple'];
            const serviceIcons = ['fas fa-spa', 'fas fa-cut', 'fas fa-air-freshener'];
            
            const existingItem = cartItems.find(item => item.name === serviceNames[index]);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                const newId = Date.now() + index; // ID único
                cartItems.push({
                    id: newId,
                    name: serviceNames[index],
                    price: servicePrices[index],
                    quantity: 1,
                    image: serviceImages[index],
                    icon: serviceIcons[index]
                });
            }
            
            renderCartItems();
            
            // Feedback visual
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
});

function visualizar(){
    window.location.href = "infor_servi.html"
}

function finalizar(){
    // Verificar se há pelo menos um item no carrinho
    if(cartItems.length >= 1){
        window.location.href = "agendamento.html";
    } else {
        // Exibir mensagem de alerta se o carrinho estiver vazio
        alert("Por favor, selecione pelo menos um serviço antes de finalizar o agendamento.");
    }
}
/**
 * Animação São Paulo - JavaScript
 * 
 * Este script controla as animações de hover e transição de página
 * para o texto "São Paulo"
 */

// ========================================
// CONFIGURAÇÃO - ALTERE AQUI A URL DE DESTINO
// ========================================
const REDIRECT_CONFIG = {
    url: '../html/localizacao.html', // ← ALTERE ESTA URL para onde deseja redirecionar
    delay: 2000, // Tempo em milissegundos antes do redirecionamento
    enableParticles: true, // Ativar/desativar partículas no clique
    enableSound: false // Ativar/desativar som (se disponível)
};

// ========================================
// CLASSE PRINCIPAL DA ANIMAÇÃO
// ========================================
class SaoPauloAnimation {
    constructor(textElement, overlayElement) {
        this.textElement = textElement;
        this.overlayElement = overlayElement;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        if (!this.textElement) {
            console.error('Elemento de texto "São Paulo" não encontrado');
            return;
        }
        
        this.setupEventListeners();
        this.prepareLetters();
    }
    
    // Preparar letras individuais para animação
    prepareLetters() {
        const text = this.textElement.textContent;
        this.textElement.innerHTML = '';
        
        for (let i = 0; i < text.length; i++) {
            const letter = document.createElement('span');
            letter.className = 'letter';
            letter.textContent = text[i];
            this.textElement.appendChild(letter);
        }
    }
    
    // Configurar event listeners
    setupEventListeners() {
        // Hover effects
        this.textElement.addEventListener('mouseenter', () => this.onMouseEnter());
        this.textElement.addEventListener('mouseleave', () => this.onMouseLeave());
        
        // Click effect
        this.textElement.addEventListener('click', (e) => this.onClick(e));
        
        // Keyboard accessibility
        this.textElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.onClick(e);
            }
        });
        
        // Tornar focável para acessibilidade
        this.textElement.setAttribute('tabindex', '0');
        this.textElement.setAttribute('role', 'button');
        this.textElement.setAttribute("aria-label", "Clique para navegar para Breves, Pará, PA");
    }
    
    // Evento de mouse enter
    onMouseEnter() {
        const letters = this.textElement.querySelectorAll('.letter');
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.animationDelay = `${index * 0.1}s`;
            }, index * 50);
        });
    }
    
    // Evento de mouse leave
    onMouseLeave() {
        const letters = this.textElement.querySelectorAll('.letter');
        letters.forEach(letter => {
            letter.style.animationDelay = '0s';
        });
    }
    
    // Evento de clique
    onClick(event) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Criar partículas se habilitado
        if (REDIRECT_CONFIG.enableParticles) {
            this.createClickParticles(event.clientX, event.clientY);
        }
        
        // Reproduzir som se habilitado
        if (REDIRECT_CONFIG.enableSound) {
            this.playClickSound();
        }
        
        // Iniciar transição
        this.startPageTransition();
    }
    
    // Criar partículas no clique
    createClickParticles(x, y) {
        const particleCount = 8;
        const colors = ['#4CAF50', '#66BB6A', '#81C784', '#A5D6A7'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'click-particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            document.body.appendChild(particle);
            
            // Animar partícula
            this.animateParticle(particle, i, particleCount);
        }
    }
    
    // Animar uma partícula individual
    animateParticle(particle, index, total) {
        const angle = (index / total) * Math.PI * 2;
        const velocity = 150 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = parseFloat(particle.style.left);
        let posY = parseFloat(particle.style.top);
        let opacity = 1;
        let scale = 1;
        
        const animate = () => {
            posX += vx * 0.016;
            posY += vy * 0.016 + 2; // Gravidade
            opacity -= 0.025;
            scale -= 0.02;
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;
            particle.style.transform = `scale(${scale})`;
            
            if (opacity > 0 && scale > 0) {
                requestAnimationFrame(animate);
            } else {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    // Reproduzir som do clique (opcional)
    playClickSound() {
        // Criar um tom sintético simples
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const audioContext = new (AudioContext || webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    }
    
    // Iniciar transição de página
    startPageTransition() {
        if (!this.overlayElement) {
            // Se não há overlay, redirecionar diretamente
            setTimeout(() => {
                this.redirect();
            }, 500);
            return;
        }
        
        // Ativar overlay
        this.overlayElement.classList.add('active');
        
        // Redirecionar após o delay configurado
        setTimeout(() => {
            this.redirect();
        }, REDIRECT_CONFIG.delay);
    }
    
    // Executar redirecionamento
    redirect() {
        if (REDIRECT_CONFIG.url && REDIRECT_CONFIG.url !== 'https://exemplo.com/destino') {
            window.location.href = REDIRECT_CONFIG.url;
        } else {
            console.log('Redirecionamento simulado para:', REDIRECT_CONFIG.url);
            alert('Configure a URL de destino no arquivo JavaScript!');
            this.isTransitioning = false;
            if (this.overlayElement) {
                this.overlayElement.classList.remove('active');
            }
        }
    }
}

// ========================================
// FUNÇÕES UTILITÁRIAS
// ========================================

// Função para integrar com o projeto existente
function integrateSaoPauloAnimation(selector = '.location .text') {
    const textElement = document.querySelector(selector);
    
    if (!textElement) {
        console.error(`Elemento não encontrado: ${selector}`);
        return null;
    }
    
    // Adicionar classes necessárias
    textElement.classList.add('sao-paulo-text');
    
    // Criar overlay se não existir
    let overlayElement = document.getElementById('page-transition-overlay');
    if (!overlayElement) {
        overlayElement = createTransitionOverlay();
    }
    
    // Inicializar animação
    return new SaoPauloAnimation(textElement, overlayElement);
}

// Criar overlay de transição
function createTransitionOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'page-transition-overlay';
    overlay.className = 'page-transition-overlay';
    
    overlay.innerHTML = `
        <div class="transition-text">Redirecionando para Breves, Pará, PA...</div>
        <div class="loading-spinner"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
    `;
    
    document.body.appendChild(overlay);
    return overlay;
}

// Função para configurar URL de destino dinamicamente
function setSaoPauloRedirectUrl(url, delay = 2000) {
    REDIRECT_CONFIG.url = url;
    REDIRECT_CONFIG.delay = delay;
}

// Função para ativar/desativar partículas
function setSaoPauloParticles(enabled) {
    REDIRECT_CONFIG.enableParticles = enabled;
}

// Função para ativar/desativar som
function setSaoPauloSound(enabled) {
    REDIRECT_CONFIG.enableSound = enabled;
}

// ========================================
// INICIALIZAÇÃO AUTOMÁTICA
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Tentar integração automática com o projeto existente
    const existingLocationText = document.querySelector('.location .text');
    
    if (existingLocationText && (existingLocationText.textContent.toLowerCase().includes('são paulo') || existingLocationText.textContent.toLowerCase().includes('breves, pará, pa'))) {
        console.log('Integrando animação São Paulo automaticamente...');
        integrateSaoPauloAnimation('.location .text');
    }
    
    // Também procurar por elementos com ID ou classe específica
    const saoPauloElements = document.querySelectorAll('#sao-paulo-text, .sao-paulo-text');
    saoPauloElements.forEach(element => {
        const overlay = document.getElementById('page-transition-overlay');
        new SaoPauloAnimation(element, overlay);
    });
});

// ========================================
// EXPORTAR PARA USO GLOBAL
// ========================================
window.SaoPauloAnimation = SaoPauloAnimation;
window.integrateSaoPauloAnimation = integrateSaoPauloAnimation;
window.setSaoPauloRedirectUrl = setSaoPauloRedirectUrl;
window.setSaoPauloParticles = setSaoPauloParticles;
window.setSaoPauloSound = setSaoPauloSound;
