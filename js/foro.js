document.addEventListener('DOMContentLoaded', function() {
    // Lógica para resaltar el enlace activo en la barra lateral
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        const currentPathname = window.location.pathname;
        const normalizedLinkHref = linkHref ? linkHref.replace(/^\/|\/$/g, '') : '';
        const normalizedCurrentPathname = currentPathname.replace(/^\/|\/$/g, '');

        if (normalizedCurrentPathname === normalizedLinkHref || 
            normalizedCurrentPathname.includes(normalizedLinkHref) ||
            // Considera 'inicio.html' o 'index.html' como la página de inicio si el pathname es vacío
            (normalizedCurrentPathname === '' && (normalizedLinkHref === 'inicio.html' || normalizedLinkHref === 'index.html'))) {
            link.classList.add('active');
        }
    });

    // Referencias a elementos del DOM
    const publishButton = document.querySelector('.new-post-card .publish-button');
    const newPostInput = document.getElementById('new-post-text');
    const questionsList = document.getElementById('questions-list');
    const totalPublicacionesSpan = document.getElementById('total-publicaciones');
    
    const startRecordingBtn = document.getElementById('start-recording-btn');
    const stopRecordingBtn = document.getElementById('stop-recording-btn');
    const audioPreview = document.getElementById('audio-preview');
    const clearAudioBtn = document.getElementById('clear-audio-btn');
    const newPostInputSearchIcon = document.querySelector('.new-post-input .fa-search');

    // --- Get the logged-in user's name from localStorage ---
    let currentUserName = "Usuario Anónimo"; // Default value
    const currentUserJSON = localStorage.getItem('currentUser');
    if (currentUserJSON) {
        try {
            const currentUser = JSON.parse(currentUserJSON);
            if (currentUser && currentUser.name) {
                currentUserName = currentUser.name; // Assign the logged-in user's name
            }
        } catch (e) {
            console.error("Error parsing currentUser from localStorage:", e);
        }
    }

    let mediaRecorder;
    let audioChunks = [];
    let audioBlob = null; // Store the recorded audio blob

    // --- Local Storage Key ---
    const FORUM_POSTS_KEY = 'forumPosts';

    // --- Functions to manage posts in LocalStorage ---
    function getStoredPosts() {
        const postsJSON = localStorage.getItem(FORUM_POSTS_KEY);
        return postsJSON ? JSON.parse(postsJSON) : [];
    }

    function savePosts(posts) {
        localStorage.setItem(FORUM_POSTS_KEY, JSON.stringify(posts));
    }
    
     // Function to render a single post item (for both text and audio)
    function renderPost(post) {
        const newQuestionItem = document.createElement('div');
        newQuestionItem.classList.add('question-item');
        // Add a unique ID for deletion
        newQuestionItem.dataset.id = post.id;

        const userIcon = document.createElement('i');
        userIcon.classList.add('fas', 'fa-user-circle');
        newQuestionItem.appendChild(userIcon);

        const questionDetails = document.createElement('div');
        questionDetails.classList.add('question-details');

        if (post.type === 'text' && post.content) {
            const questionP = document.createElement('p');
            questionP.textContent = post.content;
            questionDetails.appendChild(questionP);
        } else if (post.type === 'audio' && post.audioData) {
            // Convert Base64 back to Blob and create URL
            const audioBlobFromBase64 = base64ToBlob(post.audioData, post.audioType);
            const audioEl = document.createElement('audio');
            audioEl.controls = true;
            audioEl.src = URL.createObjectURL(audioBlobFromBase64);
            questionDetails.appendChild(audioEl);
        }

        const userNameSpan = document.createElement('span');
        userNameSpan.textContent = post.userName;
        questionDetails.appendChild(userNameSpan);

        newQuestionItem.appendChild(questionDetails);

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-post-btn');
        deleteButton.setAttribute('aria-label', 'Eliminar publicación');
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash-alt');
        deleteButton.appendChild(deleteIcon);
        newQuestionItem.appendChild(deleteButton);

        questionsList.prepend(newQuestionItem); // Add to the top
    }

    // --- Utility functions for Base64 conversion ---
    function blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]); // Get only the Base64 part
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    function base64ToBlob(base64, mimeType) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    }

     // Function to update the publications counter
    function updatePublicacionesCount() {
        if (totalPublicacionesSpan && questionsList) {
            const currentCount = questionsList.querySelectorAll('.question-item').length;
            totalPublicacionesSpan.textContent = currentCount;
        }
    }

    // Function to handle deleting a publication
    function handleDeletePost(event) {
        const deleteButton = event.target.closest('.delete-post-btn');

        if (deleteButton) {
            const questionItem = deleteButton.closest('.question-item');
            if (questionItem) {
                if (confirm('¿Estás seguro de que quieres eliminar tu publicación?')) {
                    const postIdToDelete = questionItem.dataset.id;
                    let storedPosts = getStoredPosts();
                    storedPosts = storedPosts.filter(post => post.id !== postIdToDelete);
                    savePosts(storedPosts); // Save updated array to localStorage

                    questionItem.remove(); // Remove from DOM
                    updatePublicacionesCount();
                }
            }
        }
    }

    // Add listener for deletion via event delegation.
    if (questionsList) {
        questionsList.addEventListener('click', handleDeletePost);
    }

    // --- Load existing posts from localStorage on page load ---
    function loadAndDisplayPosts() {
        const storedPosts = getStoredPosts();
        // Clear current displayed posts (except for initial static ones, if any)
        questionsList.innerHTML = `
            <div class="question-item">
                <i class="fas fa-user-circle"></i>
                <div class="question-details">
                    <p>¿Cómo se forma el presente simple en inglés?</p>
                    <span>Elmer</span>
                </div>
            </div>
            <div class="question-item">
                <i class="fas fa-user-circle"></i>
                <div class="question-details">
                    <p>¿Cuándo se usa el artículo definido en español?</p>
                    <span>Julieta</span>
                </div>
            </div>
        `; // Re-add your initial static posts here or manage them dynamically too

        // Render stored posts
        // Iterate in reverse to add them to the top using prepend
        for (let i = storedPosts.length - 1; i >= 0; i--) {
            renderPost(storedPosts[i]);
        }
        updatePublicacionesCount();
    }

    loadAndDisplayPosts(); // Call on DOMContentLoaded

     // Functionalidad para publicar una nueva duda
    if (publishButton && newPostInput && questionsList) {
        publishButton.addEventListener('click', async function() { // Made async for blobToBase64
            const postText = newPostInput.value.trim();
            let newPost = null;

            if (postText !== '') {
                newPost = {
                    id: Date.now().toString(), // Simple unique ID
                    type: 'text',
                    content: postText,
                    userName: currentUserName
                };
            } else if (audioBlob) {
                // Convert audioBlob to Base64 string for storage
                const audioBase64 = await blobToBase64(audioBlob);
                newPost = {
                    id: Date.now().toString(),
                    type: 'audio',
                    audioData: audioBase64,
                    audioType: audioBlob.type,
                    userName: currentUserName
                };
            }

            if (newPost) {
                // Add new post to stored posts and save
                const storedPosts = getStoredPosts();
                storedPosts.push(newPost);
                savePosts(storedPosts);

                // Clear current display and re-render all to maintain order
                questionsList.innerHTML = `
                    <div class="question-item">
                        <i class="fas fa-user-circle"></i>
                        <div class="question-details">
                            <p>¿Cómo se forma el presente simple en inglés?</p>
                            <span>Elmer</span>
                        </div>
                    </div>
                    <div class="question-item">
                        <i class="fas fa-user-circle"></i>
                        <div class="question-details">
                            <p>¿Cuándo se usa el artículo definido en español?</p>
                            <span>Julieta</span>
                        </div>
                    </div>
                `;
                for (let i = storedPosts.length - 1; i >= 0; i--) {
                    renderPost(storedPosts[i]);
                }

                // --- Reset inputs and audio controls after publishing ---
                newPostInput.value = ''; // Limpiar el input de texto
                newPostInput.classList.remove('hidden'); // Ensure text input is visible
                newPostInput.placeholder = 'Escribe tu duda o graba un mensaje...'; // Reset placeholder
                newPostInput.disabled = false; // Enable text input

                if (newPostInputSearchIcon) {
                    newPostInputSearchIcon.classList.remove('hidden'); // Ensure search icon is visible
                }

                audioPreview.src = '';
                audioPreview.classList.add('hidden'); // Hide audio player
                clearAudioBtn.classList.add('hidden'); // Hide clear audio button
                startRecordingBtn.classList.remove('hidden'); // Show microphone button again
                stopRecordingBtn.classList.add('hidden'); // Hide stop recording button
                audioBlob = null; // Clear the stored audio blob
                publishButton.disabled = false; // Enable publish button


                updatePublicacionesCount(); // Actualizar el contador de publicaciones
                alert('¡Duda publicada con éxito!');
            } else {
                alert('Por favor, escribe tu duda o graba un mensaje antes de publicar.');
            }
        });
    }

    // --- Audio Recording Functionality ---
    if (startRecordingBtn && stopRecordingBtn && audioPreview && clearAudioBtn && newPostInput && publishButton && newPostInputSearchIcon) {
        startRecordingBtn.addEventListener('click', async () => {
            try {
                // Request microphone access
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder = new MediaRecorder(stream);
                audioChunks = []; // Clear previous recordings

                // Collect audio data
                mediaRecorder.ondataavailable = event => {
                    audioChunks.push(event.data);
                };

                // When recording stops, create a Blob and update the audio preview
                mediaRecorder.onstop = () => {
                    audioBlob = new Blob(audioChunks, { type: 'audio/webm' }); // Use webm for broader compatibility
                    const audioUrl = URL.createObjectURL(audioBlob);
                    audioPreview.src = audioUrl;
                    audioPreview.classList.remove('hidden');
                    clearAudioBtn.classList.remove('hidden');

                    // Stop all tracks in the stream to release microphone
                    stream.getTracks().forEach(track => track.stop());

                    // Hide text input and its search icon when audio is recorded
                    newPostInput.classList.add('hidden');
                    newPostInputSearchIcon.classList.add('hidden');
                };

                // Start recording
                mediaRecorder.start();
                startRecordingBtn.classList.add('hidden');
                stopRecordingBtn.classList.remove('hidden');
                newPostInput.placeholder = 'Grabando mensaje...';
                newPostInput.disabled = true; // Disable text input while recording
                publishButton.disabled = true; // Disable publish button while recording
            } catch (err) {
                console.error('Error accessing microphone:', err);
                alert('No se pudo acceder al micrófono. Asegúrate de dar permisos.');
            }
        });

        stopRecordingBtn.addEventListener('click', () => {
            if (mediaRecorder && mediaRecorder.state === 'recording') {
                mediaRecorder.stop();
                stopRecordingBtn.classList.add('hidden');
                startRecordingBtn.classList.remove('hidden');
                newPostInput.placeholder = 'Escribe tu duda o graba un mensaje...';
                newPostInput.disabled = false; // Enable text input after recording
                publishButton.disabled = false; // Enable publish button after recording
            }
        });

        clearAudioBtn.addEventListener('click', () => {
            audioPreview.src = '';
            audioPreview.classList.add('hidden');
            clearAudioBtn.classList.add('hidden');
            audioBlob = null; // Clear the stored audio blob

            // Show text input and its search icon again
            newPostInput.classList.remove('hidden');
            newPostInput.value = ''; // Also clear the text input
            newPostInputSearchIcon.classList.remove('hidden');
            startRecordingBtn.classList.remove('hidden'); // Show microphone button
        });

        // Event listener for the text input itself to manage visibility of audio controls
        newPostInput.addEventListener('input', () => {
            if (newPostInput.value.trim() !== '') {
                // If user starts typing, hide audio controls and clear any existing audio
                startRecordingBtn.classList.add('hidden');
                stopRecordingBtn.classList.add('hidden');
                audioPreview.src = ''; // Clear audio src
                audioPreview.classList.add('hidden');
                clearAudioBtn.classList.add('hidden');
                audioBlob = null; // Clear the stored audio blob
            } else if (audioBlob === null) { // Only show record button if input is empty AND no audio exists
                // If input is empty and no audio, show record button
                startRecordingBtn.classList.remove('hidden');
            }
        });
    }

    // Simulate online users and rewards
    const updateOnlineStatus = () => {
        const userItems = document.querySelectorAll('.participation-card .user-item .status.online');
        const percentageSpan = document.querySelector('.participation-card .percentage');
        if (userItems.length > 0 && percentageSpan) {
            // Simple simulation: vary the percentage slightly
            const currentPercentage = parseFloat(percentageSpan.textContent);
            const newPercentage = (Math.random() * 5 + 8).toFixed(1); // Between 8.0% and 13.0%
            percentageSpan.textContent = `${newPercentage}%`;
        }
    };
    setInterval(updateOnlineStatus, 5000); // Update every 5 seconds

    // Animate reward progress bars on load
    const progressBars = document.querySelectorAll('.reward-progress-bar .progress');
    progressBars.forEach(bar => {
        const width = bar.style.width; // Get the initial width set in CSS
        bar.style.width = '0%'; // Reset to 0 for animation effect
        setTimeout(() => {
            bar.style.width = width; // Animate to original width
        }, 100);
    });

    // Mobile menu icon functionality (if you choose to add CSS for .sidebar.active)
    const menuIcon = document.querySelector('.menu-icon');
    const sidebar = document.querySelector('.sidebar');
    if (menuIcon && sidebar) {
        menuIcon.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
});
   
    

   