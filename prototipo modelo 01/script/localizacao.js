// JavaScript para a página de localização
document.addEventListener('DOMContentLoaded', function() {
    
    // Função para abrir o Google Maps
    function openGoogleMaps() {
        // Coordenadas do estabelecimento (exemplo: São Paulo, SP)
        const latitude = -23.5505;
        const longitude = -46.6333;
        const address = "Rua das Flores, 123, Centro, São Paulo, SP";
        
        // URL do Google Maps
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        
        // Abrir em nova aba
        window.open(googleMapsUrl, '_blank');
    }
    
    // Função para fazer ligação
    function makeCall() {
        const phoneNumber = "11999999999";
        window.location.href = `tel:+55${phoneNumber}`;
    }
    
    // Função para abrir WhatsApp
    function openWhatsApp() {
        const phoneNumber = "5511999999999";
        const message = "Olá! Gostaria de agendar um serviço.";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Abrir em nova aba
        window.open(whatsappUrl, '_blank');
    }
    
    // Adicionar eventos aos elementos
    const googleLocationBtn = document.querySelector('.google-location');
    const callBtn = document.querySelector('.call-btn');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    
    if (googleLocationBtn) {
        googleLocationBtn.addEventListener('click', openGoogleMaps);
    }
    
    if (callBtn) {
        callBtn.addEventListener('click', makeCall);
    }
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', openWhatsApp);
    }
    
    // Adicionar efeito de hover na foto do salão
    const salonPhoto = document.querySelector('.salon-photo');
    if (salonPhoto) {
        salonPhoto.addEventListener('click', function() {
            // Aqui você pode adicionar funcionalidade para visualizar fotos do salão
            alert('Funcionalidade de galeria de fotos será implementada em breve!');
        });
    }
    
    // Animação de entrada dos elementos
    const animatedElements = document.querySelectorAll('.logo-circle, .salon-photo, .google-location, .address-info, .contact-info, .action-buttons');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Tornar as funções globais para uso no HTML
window.openGoogleMaps = function() {
    const address = "Rua das Flores, 123, Centro, São Paulo, SP";
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, '_blank');
};

window.makeCall = function() {
    const phoneNumber = "11999999999";
    window.location.href = `tel:+55${phoneNumber}`;
};

window.openWhatsApp = function() {
    const phoneNumber = "5511999999999";
    const message = "Olá! Gostaria de agendar um serviço.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};

