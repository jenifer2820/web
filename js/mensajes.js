document.addEventListener('DOMContentLoaded', () => {
    const chatTypeButtons = document.querySelectorAll('.chat-type-btn');
    const chatBox = document.getElementById('chat-box');
    const mensajeInput = document.getElementById('mensaje-texto');
    const enviarMensajeBtn = document.getElementById('enviar-mensaje');

    const newCommunityMessageBtn = document.getElementById('new-community-message');
    const viewCourseMessagesBtn = document.getElementById('view-course-messages');
    const createNewMessageBtn = document.getElementById('create-new-message');

    // Modales y sus elementos
    const communityMessageModal = document.getElementById('communityMessageModal');
    const createMessageModal = document.getElementById('createMessageModal');
    const closeButtons = document.querySelectorAll('.modal .close-button'); // Botones de cierre para ambos modales

    const sendCommunityMessageBtn = document.getElementById('send-community-message-btn');
    const communityMessageText = document.getElementById('community-message-text');

    const recipientSelect = document.getElementById('recipient-select');
    const privateMessageText = document.getElementById('private-message-text');
    const sendPrivateMessageBtn = document.getElementById('send-private-message-btn');


    // --- Simulación de datos de chat ---
    const chatHistories = {
        'usuarios': {
            'usuario1': [ // Este es Lucas
                { sender: 'received', text: '¡Hola! ¿Cómo estás? Soy Lucas.' }, // Cambiado de "Usuario 1"
                { sender: 'sent', text: '¡Hola! Estoy muy bien, gracias. ¿Y tú?' },
                { sender: 'received', text: 'Todo excelente por aquí. ¿Necesitas algo?' }
            ],
            'usuario2': [ // Este es Brenda
                { sender: 'received', text: '¡Qué tal! Necesito ayuda con la lección de gramática, soy Brenda.' }, // Cambiado de "Usuario 2"
                { sender: 'sent', text: 'Claro, dime en qué puedo ayudarte. ¿Qué tema es?' }
            ]
        },
        'tutores': {
            'tutor1': [
                { sender: 'received', text: 'Hola, soy el Tutor Juan. ¿En qué puedo asistirte hoy?' },
                { sender: 'sent', text: 'Hola Juan, tengo una duda sobre el ejercicio 5 del Módulo 3.' }
            ],
            'tutor2': [
                { sender: 'received', text: 'Saludos, soy la Tutora María. Aquí para tus consultas.' },
                { sender: 'sent', text: 'Hola María, me gustaría programar una sesión de speaking.' }
            ]
        },
        'chatbot': {
            'bot1': [
                { sender: 'received', text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?' },
                { sender: 'sent', text: 'Quisiera saber más sobre el curso de inglés.' },
                { sender: 'received', text: 'Claro, nuestro curso de inglés ofrece niveles desde A1 hasta C2, con lecciones interactivas y tutores nativos.' }
            ]
        }
    };

    // Simulate contacts for each chat type
    const contactLists = {
        'usuarios': [
            { id: 'usuario1', name: 'Lucas', avatar: 'recursos/avatar1.png' }, // Usuario 1 es Lucas
            { id: 'usuario2', name: 'Brenda', avatar: 'recursos/avatar2.png' } // Usuario 2 es Brenda
            // Agrega más usuarios
        ],
        'tutores': [
            { id: 'tutor1', name: 'Tutor Juan', avatar: 'recursos/avatar3.png' }, // Hombre (avatar3)
            { id: 'tutor2', name: 'Tutor María', avatar: 'recursos/avatar4.png' }  // Mujer (avatar4)
            // Agrega más tutores si es necesario
        ],
        'chatbot': [
            { id: 'bot1', name: 'Chatbot', avatar: 'recursos/avatar-chatbot.png' }
        ]
    };

    let currentChatType = 'usuarios'; // Default active chat type
    let activeContactId = null; // To keep track of the currently active contact

    // --- Funciones para la interfaz de chat ---

    // Función para cargar la lista de contactos según el tipo de chat
    function loadContactList(chatType) {
        const listaConversacionesDiv = document.querySelector('.lista-conversaciones');
        listaConversacionesDiv.innerHTML = ''; // Clear current contacts

        const contacts = contactLists[chatType] || [];
        contacts.forEach(contact => {
            const contactoDiv = document.createElement('div');
            contactoDiv.classList.add('contacto');
            contactoDiv.dataset.user = contact.id;

            const img = document.createElement('img');
            img.src = contact.avatar;
            img.alt = contact.name;
            contactoDiv.appendChild(img);

            const span = document.createElement('span');
            span.textContent = contact.name;
            contactoDiv.appendChild(span);

            listaConversacionesDiv.appendChild(contactoDiv);
        });

        // Re-attach event listeners to new contacts
        document.querySelectorAll('.lista-conversaciones .contacto').forEach(contacto => {
            contacto.addEventListener('click', () => {
                selectContact(contacto.dataset.user);
            });
        });

        // Select the first contact in the new list, or clear chat if no contacts
        if (contacts.length > 0) {
            selectContact(contacts[0].id);
        } else {
            chatBox.innerHTML = '<p style="text-align: center; color: #888;">No hay conversaciones para este tipo de chat.</p>';
            activeContactId = null;
        }
    }

    // Función para seleccionar un contacto y cargar su chat
    function selectContact(contactId) {
        // Remove 'active' class from previously active contact
        const currentActiveContact = document.querySelector('.lista-conversaciones .contacto.active');
        if (currentActiveContact) {
            currentActiveContact.classList.remove('active');
        }

        // Add 'active' class to the newly selected contact
        const newActiveContact = document.querySelector(`.lista-conversaciones .contacto[data-user="${contactId}"]`);
        if (newActiveContact) {
            newActiveContact.classList.add('active');
        }

        activeContactId = contactId;
        loadChatHistory(currentChatType, contactId);
    }

    // Función para cargar el historial de chat para un usuario específico y tipo de chat
    function loadChatHistory(chatType, contactId) {
        chatBox.innerHTML = ''; // Clear current chat
        const history = chatHistories[chatType]?.[contactId] || [];
        history.forEach(message => {
            appendMessage(message.text, message.sender);
        });
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
    }

    // Función para añadir un nuevo mensaje al chat
    function appendMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender); // 'sent' or 'received'

        const messageText = document.createElement('p');
        messageText.textContent = text;
        messageDiv.appendChild(messageText);

        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Keep scrolled to bottom
    }

    // Función para generar respuestas dinámicas (simuladas)
    function generateReply(userMessage, chatType) {
        const lowerCaseMessage = userMessage.toLowerCase();
        let reply = "";

        if (chatType === 'usuarios' || chatType === 'tutores') {
            if (lowerCaseMessage.includes('hola') || lowerCaseMessage.includes('qué tal') || lowerCaseMessage.includes('buenos días')) {
                const greetings = ["¡Hola!", "¡Saludos!", "¿Qué tal?", "¡Hola! ¿Cómo estás?"];
                reply = greetings[Math.floor(Math.random() * greetings.length)];
            } else if (lowerCaseMessage.includes('qué haces') || lowerCaseMessage.includes('que haces') || lowerCaseMessage.includes('cómo estás') || lowerCaseMessage.includes('como estas')) {
                const statusReplies = ["Aquí ando, listo para chatear.", "Todo bien por aquí, ¿y tú?", "Trabajando en mejorar.", "Aquí, ¿necesitas algo?"];
                reply = statusReplies[Math.floor(Math.random() * statusReplies.length)];
            } else if (lowerCaseMessage.includes('gracias') || lowerCaseMessage.includes('muchas gracias')) {
                reply = "De nada.";
            } else {
                const generalReplies = [
                    "Dime, ¿en qué puedo ayudarte?",
                    "Cuéntame más.",
                    "Interesante. ¿Algo más?",
                    "Entendido.",
                    "Estoy aquí para escucharte."
                ];
                reply = generalReplies[Math.floor(Math.random() * generalReplies.length)];
            }
        } else if (chatType === 'chatbot') {
            if (lowerCaseMessage.includes('hola') || lowerCaseMessage.includes('qué tal')) {
                reply = "¡Hola! Soy tu asistente virtual. ¿Cómo puedo ayudarte hoy?";
            } else if (lowerCaseMessage.includes('curso de inglés') || lowerCaseMessage.includes('clases de inglés')) {
                reply = "Claro, nuestro curso de inglés ofrece niveles desde A1 hasta C2, con lecciones interactivas y tutores nativos.";
            } else if (lowerCaseMessage.includes('horario') || lowerCaseMessage.includes('horas')) {
                reply = "Puedes acceder a las lecciones en cualquier momento. Las sesiones en vivo tienen horarios flexibles que puedes consultar en la sección de 'Lecciones'.";
            } else if (lowerCaseMessage.includes('precio') || lowerCaseMessage.includes('costo') || lowerCaseMessage.includes('pagos')) {
                reply = "Para información detallada sobre precios y planes de pago, por favor visita la sección 'Pagos de Inscripción' en el menú principal.";
            } else if (lowerCaseMessage.includes('qué haces') || lowerCaseMessage.includes('que haces')) {
                reply = "Soy un asistente virtual diseñado para ayudarte con información sobre el curso y resolver tus dudas.";
            } else if (lowerCaseMessage.includes('gracias')) {
                reply = "De nada, estoy para servirte.";
            }
            else {
                reply = "Lo siento, no entendí tu pregunta. ¿Podrías ser más específico o preguntar sobre otro tema?";
            }
        }
        return reply;
    }


    // Función para enviar un mensaje (usa la nueva función generateReply)
    function sendMessage() {
        const messageText = mensajeInput.value.trim();
        if (messageText === '' || !activeContactId) {
            return; // No enviar mensaje vacío o sin destinatario
        }

        appendMessage(messageText, 'sent');
        // Add to chat history (for persistent simulation)
        if (!chatHistories[currentChatType][activeContactId]) {
            chatHistories[currentChatType][activeContactId] = [];
        }
        chatHistories[currentChatType][activeContactId].push({ sender: 'sent', text: messageText });
        mensajeInput.value = ''; // Clear input field

        // Simulate a received reply after a short delay
        setTimeout(() => {
            const reply = generateReply(messageText, currentChatType);
            
            if (reply) { // Only append if there's a reply
                appendMessage(reply, 'received');
                chatHistories[currentChatType][activeContactId].push({ sender: 'received', text: reply });
            }
        }, 1000); // Reply after 1 second
    }

    // --- Funciones para Modales ---

    function openModal(modalElement) {
        modalElement.style.display = 'flex'; // Usar flex para centrado
    }

    function closeModal(modalElement) {
        modalElement.style.display = 'none';
    }

    // Llenar el selector de destinatarios en el modal de "Crear Nuevo Mensaje"
    function populateRecipientSelect() {
        recipientSelect.innerHTML = ''; // Limpiar opciones anteriores
        
        // Añadir una opción predeterminada
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Selecciona un destinatario';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        recipientSelect.appendChild(defaultOption);

        // Agrupar contactos
        const contactGroups = [
            { label: 'Usuarios', type: 'usuarios' },
            { label: 'Tutores', type: 'tutores' },
            { label: 'Chatbot', type: 'chatbot' }
        ];

        contactGroups.forEach(group => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = group.label;
            const contactsInGroup = contactLists[group.type] || [];
            contactsInGroup.forEach(contact => {
                const option = document.createElement('option');
                option.value = `${group.type}:${contact.id}`; // Formato: tipo:id
                option.textContent = contact.name;
                optgroup.appendChild(option); // Corregido: append option to optgroup
            });
            recipientSelect.appendChild(optgroup);
        });
    }

    // --- Event Listeners ---

    // Manejar el cambio de tipo de chat (Usuarios, Tutores, Chatbot)
    chatTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            chatTypeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            currentChatType = button.dataset.chatType;
            loadContactList(currentChatType);
        });
    });

    // Event listener for sending messages in chat area
    enviarMensajeBtn.addEventListener('click', sendMessage);
    mensajeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // --- Funcionalidad de las opciones principales de Mensajes ---

    newCommunityMessageBtn.addEventListener('click', () => {
        communityMessageText.value = ''; // Limpiar textarea al abrir
        openModal(communityMessageModal);
    });

    sendCommunityMessageBtn.addEventListener('click', () => {
        const message = communityMessageText.value.trim();
        if (message) {
            alert('Mensaje para la comunidad enviado: "' + message + '" (Simulado)');
            closeModal(communityMessageModal);
        } else {
            alert('Por favor, escribe un mensaje para la comunidad.');
        }
    });

    viewCourseMessagesBtn.addEventListener('click', () => {
        // Redirige a una página de mensajes del curso (asegúrate de que mensajes_curso.html existe)
        window.location.href = 'mensajes_curso.html';
    });

    createNewMessageBtn.addEventListener('click', () => {
        populateRecipientSelect(); // Llenar el selector cada vez que se abre el modal
        privateMessageText.value = ''; // Limpiar textarea
        recipientSelect.value = ''; // Resetear selección
        openModal(createMessageModal);
    });

    sendPrivateMessageBtn.addEventListener('click', () => {
        const selectedValue = recipientSelect.value;
        const message = privateMessageText.value.trim();

        if (selectedValue && message) {
            // Dividir el valor para obtener el tipo y el id del contacto
            const [recipientType, recipientId] = selectedValue.split(':');
            const selectedContact = contactLists[recipientType]?.find(c => c.id === recipientId);

            if (selectedContact) {
                alert(`Mensaje privado enviado a ${selectedContact.name} (${recipientType}): "${message}" (Simulado)`);
                // Aquí podrías agregar la lógica para añadir este mensaje al historial de chat
                // del destinatario específico si es necesario para la simulación
                closeModal(createMessageModal);
            } else {
                 alert('Error: Destinatario no encontrado.');
            }
        } else {
            alert('Por favor, selecciona un destinatario y escribe un mensaje.');
        }
    });

    // Cerrar modales con los botones 'x'
    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const modalToClose = event.target.closest('.modal');
            if (modalToClose) {
                closeModal(modalToClose);
            }
        });
    });

    // Cerrar modales haciendo clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === communityMessageModal) {
            closeModal(communityMessageModal);
        }
        if (event.target === createMessageModal) {
            closeModal(createMessageModal);
        }
    });


    // --- Initial load ---
    loadContactList(currentChatType); // Load initial contacts (usuarios by default)
});