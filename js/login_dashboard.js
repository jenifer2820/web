document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm'); // Main container for password reset forms

    // Specific password reset forms and success message
    const forgotPasswordEmailForm = document.getElementById('forgotPasswordEmailForm'); // The email input form
    const forgotPasswordMobileForm = document.getElementById('forgotPasswordMobileForm'); // The mobile input form
    const resetSuccessMessage = document.getElementById('resetSuccessMessage'); 

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.querySelector('.btn-login');

    const showRegisterButton = document.querySelector('.btn-register-show'); 
    const registerSubmitButton = document.querySelector('.btn-register-submit');
    const backToLoginButtons = document.querySelectorAll('.btn-back-to-login'); 

    const forgotPasswordLink = document.getElementById('forgotPasswordLink'); 

    // Elements within the email reset form
    const resetEmailInput = document.getElementById('reset_email');
    const resetPasswordEmailButton = document.getElementById('resetPasswordEmailButton'); // Specific button for email form
    const useMobileLink = document.getElementById('useMobileLink'); // Link to switch to mobile form

    // Elements within the mobile reset form
    const resetMobileInput = document.getElementById('reset_mobile');
    const resetPasswordMobileButton = document.getElementById('resetPasswordMobileButton'); // Specific button for mobile form
    const useEmailLink = document.getElementById('useEmailLink'); // Link to switch to email form

    // --- Original: Toggle password visibility elements (if you added them manually) ---
    // Si no tienes estos elementos en tu HTML original, estas líneas no harán nada.
    // Asumo que el objetivo era NO agregar HTML nuevo si ya existe.
    const togglePassword = document.getElementById('togglePassword');
    const toggleRegPassword = document.getElementById('toggleRegPassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');


    // --- Helper function to reset all password forms state ---
    const resetForgotPasswordForms = () => {
        if (forgotPasswordEmailForm) forgotPasswordEmailForm.classList.add('hidden');
        if (forgotPasswordMobileForm) forgotPasswordMobileForm.classList.add('hidden');
        if (resetSuccessMessage) resetSuccessMessage.classList.add('hidden');
        if (resetEmailInput) resetEmailInput.value = ''; // Clear email input
        if (resetMobileInput) resetMobileInput.value = ''; // Clear mobile input
    };


    // --- Functions to toggle forms ---
    function showLoginForm() {
        if (loginForm) loginForm.classList.remove('hidden');
        if (registerForm) registerForm.classList.add('hidden');
        if (forgotPasswordForm) forgotPasswordForm.classList.add('hidden'); 
        resetForgotPasswordForms(); // Reset state of password forms when navigating away

        if (document.getElementById('reg_nombre')) document.getElementById('reg_nombre').value = '';
        if (document.getElementById('reg_email')) document.getElementById('reg_email').value = '';
        if (document.getElementById('reg_password')) document.getElementById('reg_password').value = '';
        if (document.getElementById('reg_confirm_password')) document.getElementById('reg_confirm_password').value = '';

        // Clear login form inputs when switching back to it
        if (emailInput) emailInput.value = '';
        if (passwordInput) passwordInput.value = '';
    }

    function showRegisterForm() {
        if (loginForm) loginForm.classList.add('hidden');
        if (registerForm) registerForm.classList.remove('hidden');
        if (forgotPasswordForm) forgotPasswordForm.classList.add('hidden');
        resetForgotPasswordForms(); // Reset state of password forms when navigating away

        if (emailInput) emailInput.value = '';
        if (passwordInput) passwordInput.value = '';
    }

    function showForgotPasswordForm() {
        if (loginForm) loginForm.classList.add('hidden');
        if (registerForm) registerForm.classList.add('hidden');
        if (forgotPasswordForm) forgotPasswordForm.classList.remove('hidden');
        resetForgotPasswordForms(); // Always reset first to ensure clean state
        if (forgotPasswordEmailForm) forgotPasswordEmailForm.classList.remove('hidden'); // Default to showing email form first

        if (emailInput) emailInput.value = '';
        if (passwordInput) passwordInput.value = '';
    }

    // Functions to switch between email and mobile password reset forms
    function showForgotPasswordEmailForm() {
        if (forgotPasswordMobileForm) forgotPasswordMobileForm.classList.add('hidden');
        if (forgotPasswordEmailForm) forgotPasswordEmailForm.classList.remove('hidden');
        if (resetSuccessMessage) resetSuccessMessage.classList.add('hidden'); // Ensure success message is hidden
        if (resetEmailInput) resetEmailInput.value = ''; // Clear input when switching
        if (resetMobileInput) resetMobileInput.value = ''; // Clear input when switching
    }

    function showForgotPasswordMobileForm() {
        if (forgotPasswordEmailForm) forgotPasswordEmailForm.classList.add('hidden');
        if (forgotPasswordMobileForm) forgotPasswordMobileForm.classList.remove('hidden');
        if (resetSuccessMessage) resetSuccessMessage.classList.add('hidden'); // Ensure success message is hidden
        if (resetEmailInput) resetEmailInput.value = ''; // Clear input when switching
        if (resetMobileInput) resetMobileInput.value = ''; // Clear input when switching
    }


    // --- Event Listeners para alternar vistas ---
    if (showRegisterButton) {
        showRegisterButton.addEventListener('click', showRegisterForm);
    }

    backToLoginButtons.forEach(button => {
        button.addEventListener('click', showLoginForm);
    });
    
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (event) => {
            event.preventDefault(); 
            showForgotPasswordForm(); 
        });
    }

    // Event listeners for switching between email/mobile reset methods
    if (useMobileLink) {
        useMobileLink.addEventListener('click', (event) => {
            event.preventDefault();
            showForgotPasswordMobileForm(); 
        });
    }

    if (useEmailLink) {
        useEmailLink.addEventListener('click', (event) => {
            event.preventDefault();
            showForgotPasswordEmailForm(); 
        });
    }

    // --- Helper functions for user storage (simulated backend) ---
    const getUsers = () => {
        const usersJSON = localStorage.getItem('registeredUsers');
        return usersJSON ? JSON.parse(usersJSON) : [];
    };

    const saveUsers = (users) => {
        localStorage.setItem('registeredUsers', JSON.stringify(users));
    };

    // --- Original: Function to toggle password visibility ---
    const togglePasswordVisibility = (passwordField, toggleIcon) => {
        if (!passwordField || !toggleIcon) return; // Guard clause

        toggleIcon.addEventListener('click', () => {
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            // Toggle the eye icon
            toggleIcon.querySelector('i').classList.toggle('fa-eye');
            toggleIcon.querySelector('i').classList.toggle('fa-eye-slash');
        });
    };

    // Initialize toggle password functionality for all relevant fields (if elements exist)
    if (passwordInput && togglePassword) togglePasswordVisibility(passwordInput, togglePassword); // Login form password
    if (document.getElementById('reg_password') && toggleRegPassword) togglePasswordVisibility(document.getElementById('reg_password'), toggleRegPassword); // Register form password
    if (document.getElementById('reg_confirm_password') && toggleConfirmPassword) togglePasswordVisibility(document.getElementById('reg_confirm_password'), toggleConfirmPassword); // Register form confirm password


    // --- Funcionalidad del Formulario de Login ---
    if (loginButton) {
        loginButton.addEventListener('click', (event) => {
            event.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (email === '' || password === '') {
                alert('Por favor, ingresa tu correo electrónico y contraseña.');
                return;
            }

            console.log('Intentando iniciar sesión con:', { email, password });

            const users = getUsers();
            // Check if any registered user matches the entered credentials
            const foundUser = users.find(user => user.email === email && user.password === password);

            if (foundUser) {
                alert('¡Inicio de sesión exitoso!');
                
                // --- CAMBIO IMPORTANTE AQUÍ: Guardar la información del usuario en localStorage ---
                localStorage.setItem('currentUser', JSON.stringify({
                    name: foundUser.nombre, // 'nombre' debe coincidir con cómo lo guardas en el registro
                    email: foundUser.email
                }));
                // --- FIN CAMBIO ---

                window.location.href = 'inicio.html'; // Redirigir a perfil.html en inicio de sesión exitoso
            } else {
                // Display the error message if credentials don't match any registered user
                alert('Lo sentimos, no hemos reconocido el nombre del usuario ni la contraseña');
            }
        });
    }

    // --- Funcionalidad del Formulario de Registro (Crear Cuenta) ---
    if (registerSubmitButton) {
        registerSubmitButton.addEventListener('click', (event) => {
            event.preventDefault();

            const nombre = document.getElementById('reg_nombre').value.trim();
            const email = document.getElementById('reg_email').value.trim();
            const password = document.getElementById('reg_password').value.trim();
            const confirmPassword = document.getElementById('reg_confirm_password').value.trim();

            if (nombre === '' || email === '' || password === '' || confirmPassword === '') {
                alert('Por favor, completa todos los campos para registrarte.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden. Por favor, revísalas.');
                return;
            }

            const users = getUsers();
            // Check if email already exists
            const emailExists = users.some(user => user.email === email);

            if (emailExists) {
                alert('Este correo electrónico ya está registrado. Por favor, usa otro o inicia sesión.');
                return;
            }

            // Add new user to the array and save to localStorage
            users.push({ nombre, email, password }); // Note: Passwords should be hashed in real apps!
            saveUsers(users);

            console.log('Registrando nuevo usuario:', { nombre, email, password });
            alert('¡Registro exitoso! Ya puedes iniciar sesión con tu nueva cuenta.');
            
            showLoginForm(); // Go back to login form after successful registration
        });
    }

    // Funcionalidad del Formulario de Restablecer Contraseña (Email)
    if (resetPasswordEmailButton) {
        resetPasswordEmailButton.addEventListener('click', (event) => {
            event.preventDefault(); 

            const email = resetEmailInput.value.trim();

            if (email === '') {
                alert('Por favor, ingresa tu correo electrónico.');
                return;
            }

            // In a real app, you'd send an email with a reset link here
            console.log('Solicitando restablecimiento de contraseña para:', email);
            
            // Hide the email form and show the success message
            if (forgotPasswordEmailForm) forgotPasswordEmailForm.classList.add('hidden'); 
            if (resetSuccessMessage) resetSuccessMessage.classList.remove('hidden'); 

            // Optional: After a delay, you could navigate back to login
            // setTimeout(() => {
            //     showLoginForm();
            // }, 5000); 
        });
    }

    // Funcionalidad del Formulario de Restablecer Contraseña (Mobile)
    if (resetPasswordMobileButton) {
        resetPasswordMobileButton.addEventListener('click', (event) => {
            event.preventDefault();

            const countryCode = document.getElementById('country_code').value;
            const mobileNumber = resetMobileInput.value.trim();

            if (mobileNumber === '') {
                alert('Por favor, ingresa tu número de móvil.');
                return;
            }

            // In a real app, you'd send an SMS with a verification code here
            console.log('Solicitando restablecimiento de contraseña para móvil:', countryCode + mobileNumber);
            
            // Hide the mobile form and show the success message
            if (forgotPasswordMobileForm) forgotPasswordMobileForm.classList.add('hidden'); 
            if (resetSuccessMessage) resetSuccessMessage.classList.remove('hidden'); 

            // Optional: After a delay, you could navigate back to login
            // setTimeout(() => {
            //     showLoginForm();
            // }, 5000); 
        });
    }
});