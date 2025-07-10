// JavaScript para o carrossel
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentSlide = 0;

    function updateCarousel() {
        // Atualizar posição do track
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Atualizar slides ativos
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        // Atualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    // Botão anterior
    prevBtn.addEventListener('click', function() {
        currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
        updateCarousel();
    });

    // Botão próximo
    nextBtn.addEventListener('click', function() {
        currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
        updateCarousel();
    });

    // Indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Auto-play (opcional)
    setInterval(function() {
        currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
        updateCarousel();
    }, 5000);

    // JavaScript para o botão "Saiba Mais"
    const learnMoreBtn = document.getElementById('learn-more-btn');
    const expandedContent = document.getElementById('expanded-content');
    const chevronIcon = learnMoreBtn.querySelector('.fa-chevron-down');

    learnMoreBtn.addEventListener('click', function() {
        const isExpanded = expandedContent.classList.contains('expanded');
        
        if (isExpanded) {
            // Recolher
            expandedContent.classList.remove('expanded');
            chevronIcon.style.transform = 'rotate(0deg)';
            learnMoreBtn.querySelector('i').className = 'fas fa-chevron-down';
        } else {
            // Expandir
            expandedContent.classList.add('expanded');
            chevronIcon.style.transform = 'rotate(180deg)';
            learnMoreBtn.querySelector('i').className = 'fas fa-chevron-up';
        }
    });

    // JavaScript para o seletor de quantidade e atualização de preço
    const quantityDisplay = document.getElementById('quantity-display');
    const quantityMinus = document.getElementById('quantity-minus');
    const quantityPlus = document.getElementById('quantity-plus');
    const addToCartBtn = document.getElementById('add-to-cart');
    const priceValue = document.getElementById('price-value');
    
    // Preço unitário do serviço (valor base)
    const unitPrice = 45.00;
    let quantity = 1;
    
    // Função para carregar carrinho do localStorage
    function loadCartFromStorage() {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    }
    
    // Função para salvar carrinho no localStorage
    function saveCartToStorage(cartItems) {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    
    // Função para atualizar o preço total
    function updatePrice() {
        const totalPrice = unitPrice * quantity;
        priceValue.textContent = totalPrice.toFixed(2).replace('.', ',');
    }
    
    // Função para atualizar a exibição da quantidade
    function updateQuantityDisplay() {
        quantityDisplay.textContent = quantity;
        quantityMinus.disabled = quantity <= 1;
        
        if (quantity <= 1) {
            quantityMinus.style.opacity = '0.5';
            quantityMinus.style.cursor = 'not-allowed';
        } else {
            quantityMinus.style.opacity = '1';
            quantityMinus.style.cursor = 'pointer';
        }
        
        // Atualizar o preço sempre que a quantidade mudar
        updatePrice();
    }
    
    // Diminuir quantidade
    quantityMinus.addEventListener('click', function() {
        if (quantity > 1) {
            quantity--;
            updateQuantityDisplay();
            
            // Feedback visual para diminuição
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });
    
    // Aumentar quantidade
    quantityPlus.addEventListener('click', function() {
        quantity++;
        updateQuantityDisplay();
        
        // Feedback visual para aumento
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
    
    // Adicionar ao carrinho
    addToCartBtn.addEventListener('click', function() {
        // Carregar carrinho atual do localStorage
        let cartItems = loadCartFromStorage();
        
        // Dados do serviço a ser adicionado
        const serviceData = {
            id: Date.now(), // ID único baseado no timestamp
            name: 'Corte Masculino Premium',
            price: unitPrice,
            quantity: quantity,
            image: 'green',
            icon: 'fas fa-spa'
        };
        
        // Verificar se o serviço já existe no carrinho
        const existingItemIndex = cartItems.findIndex(item => item.name === serviceData.name);
        
        if (existingItemIndex !== -1) {
            // Se já existe, atualizar a quantidade
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            // Se não existe, adicionar novo item
            cartItems.push(serviceData);
        }
        
        // Salvar carrinho atualizado no localStorage
        saveCartToStorage(cartItems);
        
        // Feedback visual
        addToCartBtn.style.transform = 'scale(0.95)';
        addToCartBtn.textContent = 'ADICIONADO!';
        addToCartBtn.style.background = 'linear-gradient(to right, #38A169, #2F855A)';
        
        setTimeout(() => {
            addToCartBtn.style.transform = '';
            addToCartBtn.textContent = 'ADICIONAR';
            addToCartBtn.style.background = '';
        }, 1000);
        
        console.log(`Adicionado ${quantity} item(s) ao carrinho - Total: R$ ${(unitPrice * quantity).toFixed(2)}`);
        console.log('Carrinho atualizado:', cartItems);
        
        // Opcional: Redirecionar para a página principal após adicionar
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });
    
    // Inicializar quantidade e preço
    updateQuantityDisplay();
});

