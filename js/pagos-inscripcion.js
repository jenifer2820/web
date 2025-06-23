
 document.addEventListener('DOMContentLoaded', function() {
    // Lógica para resaltar el enlace activo en la barra lateral (sin cambios)
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        const linkFileName = linkHref.split('/').pop().split('?')[0]; 
        const currentPathname = window.location.pathname;
        const currentFileName = currentPathname.split('/').pop().split('?')[0];

        if (currentFileName === linkFileName || 
            (currentFileName === '' && (linkFileName === 'inicio.html' || linkFileName === 'index.html'))) {
            link.classList.add('active');
        }
    });

    // --- Lógica de selección de planes de pago ---
    const planCards = document.querySelectorAll('.plan-card');
    const selectedPlanText = document.getElementById('selected-plan-text');
    const totalPriceText = document.getElementById('total-price-text');
    const proceedToCheckoutBtn = document.getElementById('proceed-to-checkout');
    const paymentFormSection = document.querySelector('.payment-form-section');
    const paymentForm = document.getElementById('payment-form');
    const cancelPaymentBtn = document.getElementById('cancel-payment');
    const submitPaymentButton = document.getElementById('submit-payment-button'); // Nuevo botón de submit general

    let currentSelectedPlan = null;
    let selectedPaymentMethod = 'card'; // Por defecto: 'card'

    // Elementos del selector de métodos de pago
    const methodCards = document.querySelectorAll('.method-card');
    const cardDetails = document.getElementById('card-payment-details');
    const paypalDetails = document.getElementById('paypal-payment-details');
    const yapeDetails = document.getElementById('yape-payment-details');
    const yapeQrAmount = document.getElementById('yape-qr-amount');
    const yapeConfirmAmount = document.getElementById('yape-confirm-amount');
    const paypalRedirectBtn = document.querySelector('.paypal-redirect-btn'); // Botón de PayPal

    // Función para actualizar la UI del plan seleccionado (ligeramente modificada)
    function updateSelectedPlanUI(selectedCard) {
        planCards.forEach(card => {
            card.classList.remove('selected');
            const btn = card.querySelector('.select-plan-btn');
            if (card.classList.contains('free-plan')) {
                btn.textContent = 'Seleccionar Plan';
                btn.classList.remove('disabled', 'selected-btn');
            } else {
                btn.textContent = 'Seleccionar Plan';
                btn.classList.remove('selected-btn', 'disabled');
            }
        });

        if (selectedCard) {
            selectedCard.classList.add('selected');
            const planName = selectedCard.querySelector('h3').textContent;
            const isFreePlan = selectedCard.classList.contains('free-plan');

            selectedPlanText.textContent = planName;

            const btn = selectedCard.querySelector('.select-plan-btn');
            if (isFreePlan) {
                totalPriceText.textContent = 'Gratis';
                proceedToCheckoutBtn.textContent = 'Comenzar a Aprender';
                proceedToCheckoutBtn.classList.remove('primary-action-btn');
                proceedToCheckoutBtn.classList.add('secondary-action-btn');
                btn.textContent = 'Seleccionado';
                btn.classList.add('disabled', 'selected-btn'); 
                paymentFormSection.style.display = 'none';
                proceedToCheckoutBtn.style.display = 'block'; // Asegura que el botón de proceder es visible para el gratis
            } else {
                const priceValue = parseFloat(selectedCard.dataset.price).toFixed(2);
                totalPriceText.textContent = `S/ ${priceValue}`;
                // Actualiza el monto en Yape QR
                if (yapeQrAmount) yapeQrAmount.textContent = `S/ ${priceValue}`;
                if (yapeConfirmAmount) yapeConfirmAmount.textContent = `S/ ${priceValue}`;

                proceedToCheckoutBtn.textContent = 'Proceder al Pago';
                proceedToCheckoutBtn.classList.add('primary-action-btn');
                proceedToCheckoutBtn.classList.remove('secondary-action-btn');
                if (btn) {
                    btn.textContent = 'Seleccionado';
                    btn.classList.add('selected-btn');
                    btn.classList.remove('disabled');
                }
                proceedToCheckoutBtn.style.display = 'block'; // Asegura que el botón de proceder es visible
            }
            currentSelectedPlan = selectedCard;
        } else {
            selectedPlanText.textContent = 'Ninguno';
            totalPriceText.textContent = 'S/ 0.00';
            proceedToCheckoutBtn.style.display = 'none';
            currentSelectedPlan = null;
        }
    }

    // Función para mostrar el método de pago correcto
    function showPaymentDetails(method) {
        cardDetails.style.display = 'none';
        paypalDetails.style.display = 'none';
        yapeDetails.style.display = 'none';
        submitPaymentButton.style.display = 'none'; // Oculta el botón general por defecto

        if (method === 'card') {
            cardDetails.style.display = 'block';
            submitPaymentButton.style.display = 'block'; // Muestra el botón para tarjeta
        } else if (method === 'paypal') {
            paypalDetails.style.display = 'block';
            // PayPal tendrá su propio botón dentro de su sección, no el general 'Confirmar Pago'
        } else if (method === 'yape') {
            yapeDetails.style.display = 'block';
            submitPaymentButton.style.display = 'block'; // Muestra el botón para Yape
        }
        selectedPaymentMethod = method;
    }

    // Listener para seleccionar un plan (sin cambios funcionales importantes aquí)
    planCards.forEach(card => {
        card.addEventListener('click', function() {
            updateSelectedPlanUI(this);
        });
        const selectBtn = card.querySelector('.select-plan-btn');
        if (selectBtn) {
            selectBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                updateSelectedPlanUI(card);
            });
        }
    });

    // Inicializar con el plan "Premium" como seleccionado por defecto
    const defaultSelectedPlan = document.querySelector('.plan-card.premium-plan');
    updateSelectedPlanUI(defaultSelectedPlan);

    // --- Lógica para mostrar/ocultar el formulario de pago ---
    if (proceedToCheckoutBtn) {
        proceedToCheckoutBtn.addEventListener('click', function() {
            if (!currentSelectedPlan) {
                alert('Por favor, selecciona un plan antes de proceder.');
                return;
            }

            if (currentSelectedPlan.classList.contains('free-plan')) {
                alert('¡Felicidades! Has comenzado tu aprendizaje con el Plan Básico. ¡A practicar!');
                // window.location.href = 'lecciones.html';
            } else {
                paymentFormSection.style.display = 'block'; // Muestra el formulario
                proceedToCheckoutBtn.style.display = 'none'; // Oculta el botón "Proceder al Pago"
                showPaymentDetails(selectedPaymentMethod); // Muestra el método de pago por defecto (Tarjeta)
                paymentFormSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    if (cancelPaymentBtn) {
        cancelPaymentBtn.addEventListener('click', function() {
            paymentFormSection.style.display = 'none';
            proceedToCheckoutBtn.style.display = 'block';
            paymentForm.reset();
            updateSelectedPlanUI(currentSelectedPlan); // Vuelve a la selección de planes
        });
    }

    // --- Manejo de la selección de métodos de pago ---
    methodCards.forEach(card => {
        card.addEventListener('click', function() {
            methodCards.forEach(mc => mc.classList.remove('selected-method')); // Quita la selección de todos
            this.classList.add('selected-method'); // Agrega la selección al clicado
            const method = this.dataset.method;
            showPaymentDetails(method); // Muestra los detalles del método seleccionado
        });
    });

    // --- Lógica específica para el botón de PayPal ---
    if (paypalRedirectBtn) {
        paypalRedirectBtn.addEventListener('click', function() {
            alert('Redirigiendo a PayPal para completar el pago...');
            // Aquí iría la lógica para iniciar la redirección a PayPal
            // Por ejemplo: window.location.href = 'https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&amount=' + currentSelectedPlan.dataset.price + '...';
        });
    }

    // --- Validación básica del formulario de pago (modificado para métodos) ---
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;
            let errorMessage = '';

            // Validación específica según el método de pago seleccionado
            if (selectedPaymentMethod === 'card') {
                const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
                const cardName = document.getElementById('card-name').value.trim();
                const expiryMonth = document.getElementById('expiry-month').value.trim();
                const expiryYear = document.getElementById('expiry-year').value.trim();
                const cvc = document.getElementById('cvc').value.trim();

                if (!/^\d{13,19}$/.test(cardNumber)) {
                    isValid = false;
                    errorMessage += 'Número de tarjeta inválido.\n';
                }
                if (cardName.length < 3) {
                    isValid = false;
                    errorMessage += 'Nombre en la tarjeta muy corto.\n';
                }
                if (!/^(0[1-9]|1[0-2])$/.test(expiryMonth) || !/^\d{2}$/.test(expiryYear)) {
                    isValid = false;
                    errorMessage += 'Fecha de vencimiento inválida (MM/AA).\n';
                } else {
                    const currentYear = new Date().getFullYear() % 100;
                    const currentMonth = new Date().getMonth() + 1;
                    const inputYear = parseInt(expiryYear, 10);
                    const inputMonth = parseInt(expiryMonth, 10);

                    if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
                        isValid = false;
                        errorMessage += 'La tarjeta ha caducado.\n';
                    }
                }
                if (!/^\d{3,4}$/.test(cvc)) {
                    isValid = false;
                    errorMessage += 'CVC inválido (3 o 4 dígitos).\n';
                }
                // Aquí podrías agregar más validaciones de tarjeta realistas si fuera un sitio en producción
            } else if (selectedPaymentMethod === 'yape') {
                const yapeConfirmationCode = document.getElementById('yape-confirmation-code').value.trim();
                // En un escenario real de Yape, probablemente solo necesitarías que el usuario haya escaneado y enviado el pago.
                // Este campo de confirmación es opcional o para casos específicos.
                // Aquí podrías validar si se escaneó el QR o si hay una API de confirmación.
                // Por ahora, lo dejamos simple.
                console.log('Pago con Yape intentado. Código de confirmación (si hay):', yapeConfirmationCode);
            }
            // Si hay campos comunes (como país o código promocional) que siempre se validan:
            const country = document.getElementById('country').value;
            if (country === '') {
                isValid = false;
                errorMessage += 'Por favor, selecciona tu país.\n';
            }


            if (isValid) {
                alert(`¡Pago con ${selectedPaymentMethod.toUpperCase()} Confirmado! Gracias por tu inscripción al ` + currentSelectedPlan.querySelector('h3').textContent + '.');
                // Aquí iría la lógica para enviar los datos a un servidor
                // fetch('/api/process-payment', { method: 'POST', body: JSON.stringify({ plan: currentSelectedPlan.dataset.plan, method: selectedPaymentMethod, ...datosDelFormulario }) });
                paymentForm.reset();
                paymentFormSection.style.display = 'none';
                proceedToCheckoutBtn.style.display = 'block';
                // Restablecer la selección del método de pago a tarjeta por defecto después de un pago
                methodCards.forEach(mc => mc.classList.remove('selected-method'));
                document.querySelector('.method-card[data-method="card"]').classList.add('selected-method');
                showPaymentDetails('card');

            } else {
                alert('Por favor, corrige los siguientes errores:\n' + errorMessage);
            }
        });
    }
}); 