const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const question = document.querySelector('.question');
const message = document.getElementById('message');
const container = document.querySelector('.container');
const buttonsContainer = document.querySelector('.buttons');

// Configuración del botón No para que se escape
function moveButton() {
    // Obtener dimensiones de la ventana y del botón
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calcular nueva posición aleatoria dentro de la ventana visible
    // Restamos el tamaño del botón para que no se salga
    const newX = Math.random() * (windowWidth - btnRect.width - 40) + 20;
    const newY = Math.random() * (windowHeight - btnRect.height - 40) + 20;

    // Aplicar posición fija para que se salga del flujo normal y se mueva por toda la pantalla
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
}

// Eventos para PC (mouse)
noBtn.addEventListener('mouseover', moveButton);

// Eventos para Móvil (touch)
// Usamos touchstart para que se mueva apenas el usuario intente tocarlo
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Evitar clic
    moveButton();
});

// Lógica del botón Sí
yesBtn.addEventListener('click', () => {
    // Lanzar confeti
    triggerConfetti();

    // Ocultar pregunta y botones
    question.style.display = 'none';
    buttonsContainer.style.display = 'none';

    // Mostrar mensaje
    message.classList.remove('hidden');
    
    // Cambiar imagen si lo deseas (opcional)
    // document.querySelector('.hero-image').src = "URL_DE_IMAGEN_FELIZ";
});

function triggerConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Confeti desde ambos lados
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}
