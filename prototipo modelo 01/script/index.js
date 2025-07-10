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

