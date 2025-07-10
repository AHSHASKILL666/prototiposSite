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

            // JavaScript para o seletor de quantidade
            const quantityDisplay = document.getElementById('quantity-display');
            const quantityMinus = document.getElementById('quantity-minus');
            const quantityPlus = document.getElementById('quantity-plus');
            const addToCartBtn = document.getElementById('add-to-cart');
            
            let quantity = 1;
            
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
            }
            
            // Diminuir quantidade
            quantityMinus.addEventListener('click', function() {
                if (quantity > 1) {
                    quantity--;
                    updateQuantityDisplay();
                }
            });
            
            // Aumentar quantidade
            quantityPlus.addEventListener('click', function() {
                quantity++;
                updateQuantityDisplay();
            });
            
            // Adicionar ao carrinho
            addToCartBtn.addEventListener('click', function() {
                // Feedback visual
                addToCartBtn.style.transform = 'scale(0.95)';
                addToCartBtn.textContent = 'ADICIONADO!';
                addToCartBtn.style.background = 'linear-gradient(to right, #38A169, #2F855A)';
                
                setTimeout(() => {
                    addToCartBtn.style.transform = '';
                    addToCartBtn.textContent = 'ADICIONAR';
                    addToCartBtn.style.background = '';
                }, 1000);
                
                console.log(`Adicionado ${quantity} item(s) ao carrinho`);
            });
            
            // Inicializar quantidade
            updateQuantityDisplay();
        });