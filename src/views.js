import { loadRoute } from './router.js';
import { auth } from './auth.js';

export function showLogin() {
  const app = document.getElementById('app').innerHTML = `
  <link rel="stylesheet" href="./src/css/style-login.css">
  <div class="container-form sign-in">
        <div class="welcome-back">
            <div class="message">
                <h2  class="login-text" >Bienvenido de nuevo </h2>
                <button class="sign-up-btn">Iniciar Sesion</button>
            </div>
        </div>
        <form id="register-form" class="formulario">
            <h2 class="create-account">Crear una cuenta</h2>
            <div class="iconos">
                <div class="border-icon">
                    <i class='bx bxl-instagram'></i>
                </div>
                <div class="border-icon">
                    <i class='bx bxl-linkedin'></i>
                </div>
                <div class="border-icon">
                    <i class='bx bxl-facebook-circle'></i>
                </div>
            </div>
            <input type="text" id="register-name" placeholder="Nombre">
            <input type="email" id="register-email" placeholder="Email">
            <input type="password" id="register-password" placeholder="Contraseña">
            <button type="submit" class="sign-button" id="register">Registrarse</button>
        </form>
    </div>
    <div class="container-form sign-up">
        <form id="login-form" class="formulario">
            <h2 class="create-account">Iniciar Sesion</h2>
            <div class="iconos">
                <div class="border-icon">
                    <i class='bx bxl-instagram'></i>
                </div>
                <div class="border-icon">
                    <i class='bx bxl-linkedin'></i>
                </div>
                <div class="border-icon">
                    <i class='bx bxl-facebook-circle'></i>
                </div>
            </div>
            <input type="email" id="email" name="email" placeholder="Email">
            <input type="password" id="password" name="password" placeholder="Contraseña">
            <button type="submit" class="sign-button" id="login-button">Iniciar Sesion</button>
        </form>
        <div class="welcome-back">
            <div class="message">
                <div class="register-text">
                    <h2>Bienvenido a CalmApp</h2>
                    <p>Si aun no tienes una cuenta por favor registrese aqui</p>
                </div>
                <button class="sign-in-btn">Registrarse</button>
            </div>
        </div>
    </div>`

  const $btnSignIn = document.querySelector('.sign-in-btn'),
    $btnSignUp = document.querySelector('.sign-up-btn'),
    $signUp = document.querySelector('.sign-up'),
    $signIn = document.querySelector('.sign-in');

  document.addEventListener('click', e => {
    if (e.target === $btnSignIn || e.target === $btnSignUp) {
      $signIn.classList.toggle('active');
      $signUp.classList.toggle('active')
    }
  });
  // Agregar evento al botón de login
  document.getElementById('login-form').onsubmit = async e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      await auth.login(email, password);
      window.location.pathname = '/home';  // Cambiar a la ruta que desees después del login
      loadRoute();
    } catch (err) {
      console.log(err.message);
    };
  };

  document.getElementById('register-form').onsubmit = async e => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    try {
      await auth.register(name, email, password);
      loadRoute();
    } catch (err) {
      console.log('El usuario ya está registrado o hubo un error: ' + err.message);
    };
  };
};

export function showHome() {
  const app = document.getElementById('app').innerHTML = `
    <link rel="stylesheet" href="./src/css/style-home.css">
    <div class="header">
      <h1>CalmApp</h1>
      <p>Encuentra calma, equilibrio y bienestar emocional.</p>
      <div id="logout-container">
        <button class="logout-button" id="logout">
          <img src="./src/img/right-from-bracket-solid-full.svg"></img>
        </button>  
      </div>
    </div>
    <div class="card-container">
      <a href="/citas">
        <div class="card">
        <div class="card-icon"><i class="fa-solid fa-envelope"></i></div>
        <h3>Agendar citas</h3>
        <p>Reunete con expertos, la salud mental es tan importante como la salud física.</p>
        </div>
      </a>

      <a href="/emociones">
        <div class="card">
        <div class="card-icon"><i class="fa-solid fa-hand-holding-heart"></i></div>
        <h3>Emociones</h3>
        <p>Aprende a gestionar tus emociones y mejora tu salud mental.</p>
      </div>
      </a>

      <a href="/informacion">
        <div class="card">
        <div class="card-icon"><i class="fa-solid fa-earth-americas"></i></div>
        <h3>Tips</h3>
        <p>Conecta con otros que también están en su camino.</p>
      </div></a>


      <a href="/musica"><div class="card">
        <div class="card-icon"><i class="fa-solid fa-headphones"></i></div>
        <h3>Musica</h3>
        <p>Encuentra musica para relajarte y liberar tensiones.</p>
        </div>
      </a>

      <a href="/desafios">
        <div class="card">
        <div class="card-icon"><i class="fa-solid fa-envelope"></i></div>
        <h3>Desafios</h3>
        <p>Participa en desafíos para mejorar tu bienestar emocional.</p>
        </div>
      </a>

      <a href="/foro">
        <div class="card">
        <div class="card-icon"><i class="fa-solid fa-comments"></i></div>
        <h3>Foro</h3>
        <p>Comparte tus experiencias y aprende de la comunidad.</p>
        </div>
      </a>
    </div>


    <div class="alma-bot">
      <img src="./src/img/tortuga.png" alt="Alma la tortuga" class="alma-float" id="alma-icon">
    <div class="chat-box" id="alma-chat">
    <p><strong>Alma:</strong> ¡Hola! ¿Cómo te sientes hoy?</p>
    <button class="almaresponse" >😊 Bien</button>
    <button class="almaresponse" >😔 No muy bien</button>
    </div>
    </div>
    <footer>
      © 2025 CalmApp. Todos los derechos reservados.
    </footer>
`;

  const logoutButton = document.getElementById('logout').addEventListener('click', (e) => {
    e.preventDefault();
    auth.logout();  // Redirige al login
  });
  const music = document.getElementById("musicaFondo");
  music.volume = 0.2;

  const iniciarMusica = () => {
    music.play().then(() => {
      console.log(" Música iniciada.");
    }).catch((error) => {
      console.log(" Error al reproducir música:", error);
    });

    // Eliminar ambos eventos después del primer intento
    document.removeEventListener('click', iniciarMusica);
    window.removeEventListener('scroll', iniciarMusica);
  };

  document.addEventListener('click', iniciarMusica);
  window.addEventListener('scroll', iniciarMusica);
  const almaIcon = document.getElementById('alma-icon');
  const almaChat = document.getElementById('alma-chat');

  almaIcon.addEventListener('click', () => {
    almaChat.style.display = almaChat.style.display === 'block' ? 'none' : 'block';
  });


  function almaResponder() {
    almaChat.innerHTML = `<p><strong>Alma:</strong> Recuerda que tu bienestar es lo más importante 🧘‍♂️✨</p>`;
  }

  const almaResponses = document.querySelectorAll('.almaresponse');
  almaResponses.forEach(response => {
    response.addEventListener('click', almaResponder);
  })
  
};

export function showInformacion() {
  const app = document.getElementById('app').innerHTML = `
  <link rel="stylesheet" href="./src/css/style-tips.css">
  <header class="header">
    <div class="container">
      <h1>CalmApp</h1>
      <p>Tu espacio seguro para cuidar tu salud mental</p>
    </div>
  </header>

  <main class="main-content">
  <section class="section">
  <a class="home" href="/home"><i class="fa-solid fa-house-chimney"></i></a>
      <h2>¿Qué son los sentimientos?</h2>
      <div class="video-container">
        <iframe src="https://www.youtube.com/embed/-vxXBmdcfFU?si=n5xUY5NOY_E8zlHu" title="Sentimientos" frameborder="0" allowfullscreen></iframe>
      </div>
      <p>
        Los sentimientos son la experiencia mental y privada de una emoción. Se dan cuando el cerebro procesa la emoción y somos conscientes de nuestro estado de ánimo.
      </p>
    </section>

    <section class="section">
      <h2>¿Cómo gestionar lo que sentimos?</h2>
      <div class="tips-container" id="tip-container">Cargando tip...</div>
    </section>

    <section class="section">
      <h2>¿Qué son las emociones?</h2>
      <div class="video-container">
        <iframe src="https://www.youtube.com/embed/OvgbMajFhmE?si=K5IeiSGo9L022EDN" title="Emociones" frameborder="0" allowfullscreen></iframe>
      </div>
      <p>
        Las emociones son reacciones naturales que todos experimentamos. Son respuestas físicas y mentales ante situaciones cotidianas. <strong>No son buenas ni malas</strong>: son señales que nos ayudan a entendernos mejor.
      </p>
    </section>

    <section class="section">
      <h2>¿Cómo pilotear nuestras emociones?</h2>
      <div class="tips-container" id="tip-container2">Cargando tip...</div>
    </section>

    <section class="emergency">
      <p>⚠️ En crisis: llama al <strong>192, opción 4</strong> o busca ayuda profesional en tu ciudad.</p>
    </section>

    <section class="cita">
      <a href="/cita" class="appointment-btn">Agendar una cita</a>
    </section>
  </main>

  <footer class="footer">
    <p>© 2025 CalmApp | Desarrollado con empatía 💙</p>
  </footer>

  `;

  const tips2 = [
    "Respira profundamente y enfócate en tu respiración por unos segundos.",
    "Identifica lo que estás sintiendo y nómbralo sin juzgar.",
    "Da un pequeño paseo para despejar la mente.",
    "Escribe en una libreta cómo te sientes ahora mismo.",
    "Escucha una canción que te tranquilice o te levante el ánimo.",
    "Habla con alguien de confianza sobre lo que estás viviendo.",
    "Haz una pausa de redes sociales por unos minutos.",
    "Estira tu cuerpo suavemente para liberar tensión.",
    "Recuérdate que está bien sentirse así, no es permanente.",
    "Repite una frase que te calme, como “Todo está bien por ahora.”"
  ];

  let tipIndex2 = 0;
  const tipContainer2 = document.getElementById("tip-container2");

  function mostrarTip2() {
    tipContainer2.style.opacity = 0;
    setTimeout(() => {
      tipContainer2.textContent = tips2[tipIndex2];
      tipContainer2.style.opacity = 1;
      tipIndex2 = (tipIndex2 + 1) % tips2.length;
    }, 400);
  }

  // Mostrar el primer tip al cargar
  mostrarTip2();

  // Cambiar tip cada 6 segundos
  setInterval(mostrarTip2, 6000);

  const tips = [
    "Aprende a escuchar tus emociones y a identificarlas.",
    "Las emociones no son buenas ni malas, no las juzgues, más bien pregúntate qué están diciéndote.",
    "Pedir ayuda es normal: todos pasamos por momentos difíciles.",
    "Todos pasamos en algún momento por alguna de las emociones y a veces estas nos sobrepasan, es normal pedir ayuda.",
    "Respira profundo: una pausa puede darte claridad en momentos intensos.",
    "Habla con alguien de confianza sobre lo que sientes.",
    "Haz una pausa digital: desconectarte por un rato puede ayudarte a reconectar contigo.",
    "Escribir acerca de lo sentimos o de cómo percibimos los sentimientos y las emociones, hace que aclaremos lo que tenemos en nuestra cabeza e incluso empiece a tener más sentido eso que estamos viviendo.  "
  ];

  let tipIndex = 0;
  const tipContainer = document.getElementById("tip-container");

  function mostrarTip() {
    tipContainer.style.opacity = 0;
    setTimeout(() => {
      tipContainer.textContent = tips[tipIndex];
      tipContainer.style.opacity = 1;
      tipIndex = (tipIndex + 1) % tips.length;
    }, 400);
  }

  // Mostrar el primer tip al cargar
  mostrarTip();

  // Cambiar tip cada 6 segundos
  setInterval(mostrarTip, 6000);

};

export function showEmotions() {
  const app = document.getElementById('app').innerHTML = `
  <link rel="stylesheet" href="./src/css/style-emociones.css">
  <header>
    <h1>CalmApp</h1>
    <p>Tu espacio seguro para cuidar tu salud mental</p>
  </header>

  <main>
    <a class="home" href="/home"><i class="fa-solid fa-house-chimney"></i></a>
    <h2>Emociones</h2>
    <div class="emotions-container">
      <div class="emotion-item">
        <button class="emotion-btn infeliz" data-dialog-prompt="¿Por qué te sientes infeliz?"></button>
        <span>Infeliz</span>

        <dialog id="dialog-emotion" class="emotion-dialog">
          <form method="dialog">
            <p id="dialog-title">Cuéntame más</p>z
            <textarea id="response" rows="3" ></textarea>
            <menu>
              <p>¿Quieres agendar cita con alguno de nuestros expertos o prefieres desahogarte escribiendo cómo te sientes?</p>
              <button id="btn-ok">Agendar cita</button>
              <button id="btn-cancel">Ir a mi diario</button>
            </menu>
          </form>
        </dialog>

      </div>
      <div class="emotion-item">
        <button class="emotion-btn descontento" data-dialog-prompt="¿Qué te hace sentir descontento?"></button>
        <span>Descontento</span>

        <dialog id="dialog-emotion" class="emotion-dialog">
          <form method="dialog">
            <p id="dialog-title">Cuéntame más</p>
            <textarea id="response" rows="3" ></textarea>
            <menu>
              <p>¿Quieres agendar cita con alguno de nuestros expertos o prefieres desahogarte escribiendo cómo te sientes?</p>
              <button id="btn-ok">Agendar cita</button>
              <button id="btn-cancel">Ir a mi diario</button>
            </menu>
          </form>
        </dialog>

      </div>
      <div class="emotion-item">
        <button class="emotion-btn neutral" data-dialog-prompt="¿Qué piensas en un día neutral?"></button>
        <span>Neutral</span>
        
        <dialog id="dialog-emotion" class="emotion-dialog">
          <form method="dialog">
            <p id="dialog-title">Cuéntame más</p>
            <textarea id="response" rows="3" ></textarea>
            <menu>
              <p>¿Quieres agendar cita con alguno de nuestros expertos o prefieres desahogarte escribiendo cómo te sientes?</p>
              <button id="btn-ok">Agendar cita</button>
              <button id="btn-cancel">Ir a mi diario</button>
            </menu>
          </form>
        </dialog>

      </div>
      <div class="emotion-item">
        <button class="emotion-btn bien" data-dialog-prompt="¿Qué te hace sentir bien?"></button>
        <span>Bien</span>

        <dialog id="dialog-emotion" class="emotion-dialog">
          <form method="dialog">
            <p id="dialog-title">Cuéntame más</p>
            <textarea id="response" rows="3" ></textarea>
            <menu>
              <p>¿Quieres agendar cita con alguno de nuestros expertos o prefieres desahogarte escribiendo cómo te sientes?</p>
              <button id="btn-ok">Agendar cita</button>
              <button id="btn-cancel">Ir a mi diario</button>
            </menu>
          </form>
        </dialog>

      </div>
      <div class="emotion-item">
        <button class="emotion-btn genial" data-dialog-prompt="¿Qué te hace sentir genial?"></button>
        <span>Genial</span>

        <dialog id="dialog-emotion" class="emotion-dialog">
          <form method="dialog">
            <p id="dialog-title">Cuéntame más</p>
            <textarea id="response" rows="3" ></textarea>
            <menu>
              <p>¿Quieres agendar cita con alguno de nuestros expertos o prefieres desahogarte escribiendo cómo te sientes?</p>
              <button id="btn-ok"><a href="/cita">Agendar cita</a></button>
              <button id="btn-cancel">Ir a mi diario</button>
            </menu>
          </form>
        </dialog>

      </div>
    </div>
  </main>

  <div id="notes-section">
  <h2>Mis notas</h2>
  <label for="">Elige alguna emoción :</label>
  <select name="emotions" id="emotion-select"> 
    <option value="Infeliz"  >Infeliz</option>
    <option value="Descontento"  >Descontento</option>
    <option value="Neutral"  >Neutral</option>
    <option value="Bien"  >Bien</option>
    <option value="Genial"  >Genial</option>
  </select>
  <textarea id="note-text" placeholder="Escribe tu nota aquí..." resi ></textarea> 
  <button id="save-note">Guardar Nota</button>
  
  <div id="notes-list"></div>
  </div>

  <footer>
    ©️ 2025 CalmApp | Desarrollado con empatía 💙
  </footer>
  `;
    const dialog = document.getElementById('dialog-emotion');
    const titleEl = document.getElementById('dialog-title');
    const responseEl = document.getElementById('response');
  
    document.querySelectorAll('.emotion-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const promptText = btn.getAttribute('data-dialog-prompt');
        titleEl.innerHTML = `Cuéntame más: <br>${promptText}`;
        responseEl.value = '';
        dialog.showModal();
      });
    });
  
    dialog.addEventListener('close', () => {
      if (dialog.returnValue === 'btn-ok') {
        console.log('Respuesta:', responseEl.value);
      }
    });
  
    const saveButton = document.getElementById('save-note');
    const noteText = document.getElementById('note-text');
    const emotionSelect = document.getElementById('emotion-select');
    const notesList = document.getElementById('notes-list');
  
    // Guardar la nota
    saveButton.addEventListener('click', () => {
      const noteContent = noteText.value.trim();
      const selectedEmotion = emotionSelect.value;
      if (noteContent) {
        const date = new Date();
        const noteDate = date.toLocaleString();
  
        const newNote = {
          content: noteContent,
          date: noteDate,
          emotion: selectedEmotion,
        };
  
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        savedNotes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(savedNotes));
        noteText.value = '';
        emotionSelect.selectedIndex = 0;
        displayNotes();
      }
    });
  
    // Mostrar notas
    function displayNotes() {
      notesList.innerHTML = '';
      const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
  
      savedNotes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note-item', note.emotion.toLowerCase()); // ← aquí aplica la clase de emoción
  
        noteElement.innerHTML = `
          <div class="note-title">
            <span class="emotion-bubble"></span> 
            Emoción: ${capitalizeFirstLetter(note.emotion)}
          </div>
          <p>${note.content}</p>
          <div class="note-date">Guardada el: ${note.date}</div>
        `;
  
        notesList.appendChild(noteElement);
      });
    }
  
    displayNotes();
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
};

export function showMusica() {
  const app = document.getElementById('app').innerHTML = `
  <link rel="stylesheet" href="./src/css/style-musica.css">
    <header>
    <h1>CalmApp</h1>
    <p>Tu espacio seguro para cuidar tu salud mental</p>
  </header>

  <div class="main-content">
  <a class="home" href="/home"><i class="fa-solid fa-house-chimney"></i></a>
    <section class="embed-section">
      <div class="controls">
        <button onclick="loadContent('songs')">Canciones</button>
        <button onclick="loadContent('podcast')">Podcast</button>
        <button onclick="loadContent('melodias')">Melodías</button>
      </div>
      <div class="embed-container" id="embedContainer">
      </div>
    </section>
  </div>
  
  <footer>
    ©️ 2025 CalmApp | Desarrollado con empatía 💙
  </footer>
  `;
  const embedContainer = document.getElementById("embedContainer");

const embeds = {
  songs: [
    `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/6kkwzB6hXLIONkEk9JciA6?utm_source=generator" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/2q7AEvIwBCaVOa1blpPJyt?utm_source=generator" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/1zwMYTA5nlNjZxYrvBB2pV?utm_source=generator" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/2dphvmoLEXdk8hOYxmHlI3?utm_source=generator" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/0lRnbYaPtv0A5OezVahO8e?utm_source=generator" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/6ZLGthToczpvnL5Eoy6yrY?utm_source=generator" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/2WyMUbRbYvNWXg83ugIgzi?utm_source=generator" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/3ui3UHjpXpWiQjoLwuENB8?utm_source=generator" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/1kyiUCr4yxaE5lfXRzfcT1?utm_source=generator" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/4vOQ55pOMyE6bQJJzm3kei?utm_source=generator" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
  ],
  podcast: [
    `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/7uBNpRc8gdsbeLs8Y8ztwI?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
  ],
  melodias: [
    `<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX3Ogo9pFvBkY?utm_source=generator" height="352" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/0vJ9HXWnVVW2hTNoF5xbG1?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
  ]
};

function loadContent(type) {
  embedContainer.innerHTML = embeds[type].join('');
}

// Cargar canciones por defecto
loadContent('songs');
};

export function showForo() {
  const app = document.getElementById('app').innerHTML = `
  <link rel="stylesheet" href="./src/css/style-foro.css">
  <header>
    <div class="header-left">
      <a href="/home" class="home-link"><i class="fas fa-house"></i></a>
      <span class="header-title">Comunidad</span>
    </div>
    <div class="search-box">
      <input type="text" placeholder="Buscar..." />
      <i class="fas fa-search"></i>
    </div>
  </header>

  <main>
    <section class="channels">
      <h2>Explorar canales</h2>
      <div class="channel-buttons">
        <button onclick="selectChannel('Ansiedad', this)"><i class="fas fa-heartbeat"></i> Ansiedad</button>
        <button onclick="selectChannel('Mindfulness', this)"><i class="fas fa-spa"></i> Mindfulness</button>
        <button onclick="selectChannel('Autoestima', this)"><i class="fas fa-sun"></i> Autoestima</button>
        <button onclick="selectChannel('Jóvenes', this)"><i class="fas fa-graduation-cap"></i> Jóvenes</button>
        <button onclick="selectChannel('Superación', this)"><i class="fas fa-dumbbell"></i> Superación</button>
      </div>
    </section>

    <section class="featured">
      <h2><i class="fas fa-star"></i> Destacados hoy</h2>
      <div class="highlight">
        <p>"Hoy pude salir de casa. Gracias por el apoyo 🙏"</p>
        <span>— @usuario123</span>
        <div class="actions">
          <i class="fas fa-heart"></i> 56
          <i class="fas fa-comment"></i> 14
        </div>
      </div>
    </section>

    <section class="feed">
      <div id="posts-container"></div>
    </section>
  </main>

  <button class="fab" onclick="togglePostBox()"><i class="fas fa-plus"></i></button>

  <div id="post-modal" class="post-modal hidden" onclick="closeModal(event)">
    <div class="modal-content">
      <textarea id="post-content" placeholder="¿Qué quieres compartir?"></textarea>
      <select id="channel-select">
        <option value="" disabled selected>Selecciona un canal</option>
        <option value="Ansiedad">Ansiedad</option>
        <option value="Mindfulness">Mindfulness</option>
        <option value="Autoestima">Autoestima</option>
        <option value="Jóvenes">Jóvenes</option>
        <option value="Superación">Superación</option>
      </select>
      <button onclick="createPost()">Publicar</button>
    </div>
  </div>
  `;
  const postsData = {
  Ansiedad: [],
  Mindfulness: [],
  Autoestima: [],
  Jóvenes: [],
  Superación: []
};

let currentChannel = 'Ansiedad';

function selectChannel(channel, button) {
  currentChannel = channel;
  renderPosts();

  document.querySelectorAll('.channel-buttons button').forEach(btn =>
    btn.classList.remove('active')
  );
  button.classList.add('active');
}

function renderPosts() {
  const container = document.getElementById('posts-container');
  container.innerHTML = '';

  const posts = postsData[currentChannel];

  if (!posts.length) {
    container.innerHTML = `<p style="text-align:center;color:gray;">No hay publicaciones en #${currentChannel}</p>`;
    return;
  }

  posts.forEach((post, idx) => {
    const el = document.createElement('div');
    el.className = 'post';
    el.innerHTML = `
      <strong>Anónimo</strong><br/>
      <p>${sanitize(post.content)}</p>
      <div class="post-actions">
        <button onclick="likePost(${idx})">
          <i class="fas fa-heart"></i> ${post.likes}
        </button>
        <button onclick="toggleComments(${idx})">
          <i class="fas fa-comment"></i> ${post.comments.length}
        </button>
      </div>
      <div class="comments" id="comments-${idx}" style="display:none;">
        ${post.comments.map(c => `<div class="comment">${sanitize(c)}</div>`).join('')}
        <input type="text" id="comment-input-${idx}" placeholder="Escribe un comentario..."/>
        <button onclick="addComment(${idx})">
          <i class="fas fa-paper-plane"></i> Enviar
        </button>
      </div>
    `;
    container.appendChild(el);
  });
}

function createPost() {
  const content = document.getElementById('post-content').value.trim();
  const channel = document.getElementById('channel-select').value;

  if (!content || !channel) {
    alert('Completa el contenido y selecciona un canal');
    return;
  }

  postsData[channel].unshift({
    content,
    likes: 0,
    comments: []
  });

  document.getElementById('post-content').value = '';
  document.getElementById('channel-select').value = '';
  togglePostBox();

  if (channel === currentChannel) {
    renderPosts();
  }
}

function likePost(idx) {
  postsData[currentChannel][idx].likes++;
  renderPosts();
}

function toggleComments(idx) {
  const comments = document.getElementById(`comments-${idx}`);
  if (comments) {
    comments.style.display = comments.style.display === 'none' ? 'block' : 'none';
  }
}

function addComment(idx) {
  const input = document.getElementById(`comment-input-${idx}`);
  const text = input.value.trim();
  if (!text) return;

  postsData[currentChannel][idx].comments.push(text);
  input.value = '';
  renderPosts();
  toggleComments(idx); 
}

function togglePostBox() {
  const modal = document.getElementById('post-modal');
  modal.classList.toggle('hidden');
}

function closeModal(e) {
  const modal = document.getElementById('post-modal');
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
}

function sanitize(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
}

export function showDesafios() {
  const app = document.getElementById('app').innerHTML = `
  <link rel="stylesheet" href="./src/css/style-desafios.css">
  <header>
    <div class="header-left">
      <a href="/home" class="home-link"><i class="fas fa-house"></i></a>
      <span class="header-title">Desafíos de bienestar</span>
    </div>
  </header>

  <main>
    <section class="challenges-section">
      <h2>Desafío semanal</h2>

      <div id="challenges-list" class="challenges-list"></div>

      <div class="progress-container">
        <span>Progreso: <strong id="progress-text">0 / 5</strong></span>
        <div class="progress-bar">
          <div id="progress-bar-fill" class="progress-bar-fill"></div>
        </div>
      </div>

      <div id="badge" class="badge hidden">
        <i class="fas fa-medal"></i> ¡Felicidades! Has desbloqueado una insignia
      </div>

      <button id="reset-btn" class="reset-btn">Reiniciar desafíos</button>
    </section>
  </main>

  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>`;

  const challenges = [
  { id: 1, text: "Meditar 5 minutos", completed: false },
  { id: 2, text: "Escribir en tu diario", completed: false },
  { id: 3, text: "Dar un paseo corto", completed: false },
  { id: 4, text: "Practicar respiración consciente", completed: false },
  { id: 5, text: "Realizar estiramientos", completed: false },
  ];

  const STORAGE_KEY = 'wellnessChallengesStatus';

  const challengesList = document.getElementById('challenges-list');
  const progressText = document.getElementById('progress-text');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const badge = document.getElementById('badge');
  const resetBtn = document.getElementById('reset-btn');

  // Cargar el estado guardado al iniciar
  function loadStatus() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const savedStatus = JSON.parse(saved);
        challenges.forEach(ch => {
          if (savedStatus[ch.id] !== undefined) {
            ch.completed = savedStatus[ch.id];
          }
        });
      } catch (e) {
        console.error('Error al cargar estado de desafíos:', e);
      }
    }
  }

  // Guardar estado actual
  function saveStatus() {
    const statusToSave = {};
    challenges.forEach(ch => {
      statusToSave[ch.id] = ch.completed;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statusToSave));
  }

  function renderChallenges() {
    challengesList.innerHTML = '';
    challenges.forEach((challenge, index) => {
      const card = document.createElement('div');
      card.className = 'challenge-card' + (challenge.completed ? ' completed' : '');

      const text = document.createElement('div');
      text.className = 'challenge-text';
      text.textContent = challenge.text;

      const action = document.createElement('div');
      action.className = 'challenge-action';
      const btn = document.createElement('button');
      btn.textContent = challenge.completed ? 'Completado' : 'Marcar como completado';
      btn.disabled = challenge.completed;
      btn.onclick = () => completeChallenge(challenge.id);
      action.appendChild(btn);

      card.appendChild(text);
      card.appendChild(action);
      challengesList.appendChild(card);

      // Animación de entrada
      setTimeout(() => {
        card.style.opacity = 1;
        card.style.transform = 'translateY(0)';
      }, index * 80);
    });

    updateProgress();
  }

  function completeChallenge(id) {
    const challenge = challenges.find(c => c.id === id);
    if (!challenge.completed) {
      challenge.completed = true;
      saveStatus();
      renderChallenges();
      checkBadge();
    }
  }

  function updateProgress() {
    const completedCount = challenges.filter(c => c.completed).length;
    progressText.textContent = `${completedCount} / ${challenges.length}`;
    const percent = (completedCount / challenges.length) * 100;
    progressBarFill.style.width = percent + '%';
  }

  function checkBadge() {
    const allCompleted = challenges.every(c => c.completed);
    if (allCompleted) {
      badge.classList.remove('hidden');
      badge.animate([
        { transform: 'scale(0.7)', opacity: 0 },
        { transform: 'scale(1.1)', opacity: 1 },
        { transform: 'scale(1)', opacity: 1 }
      ], { duration: 800, easing: 'ease-out' });

      // 🎉 Confeti
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
}

function resetChallenges() {
  challenges.forEach(c => c.completed = false);
  localStorage.removeItem(STORAGE_KEY);
  badge.classList.add('hidden');
  renderChallenges();
}

// Iniciar app
loadStatus();
renderChallenges();
checkBadge();

resetBtn.addEventListener('click', resetChallenges);

};

export function showCita() {
  const app = document.getElementById('app').innerHTML = `
  <link rel="stylesheet" href="./src/css/style-citas.css">
  <header class="header">
        <div class="container">
        <h1>CalmApp</h1>
        <p>Agenda tu cita con uno de nuestros psicologos para cuidar tu bienestar emocional</p>
        </div>
    </header>
    

    <main class="container">
        <section class="form-section">
            <a class="home" href="/home"><i class="fa-solid fa-house-chimney"></i></a>

        <h2>Agendar Cita</h2>
        <form id="form" novalidate>
            <div class="form-group">
            <label for="nombre">Nombre completo</label>
            <input type="text" id="nombre" name="nombre" placeholder="Tu nombre completo" required />
            </div>

            <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input type="email" id="email" name="email" placeholder="tucorreo@correo.com" required />
            </div>

            <div class="form-row">
            <div class="form-group">
                <label for="fecha">Fecha de la cita</label>
                <input type="date" id="fecha" name="fecha" required />
            </div>

            <div class="form-group">
                <label for="hora">Hora de la cita</label>
                <input type="time" id="hora" name="hora" required />
            </div>
            </div>

            <button type="submit" class="btn-submit" id="button">Agendar cita <i class="fa-solid fa-calendar-check"></i></button>

        </form>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
        © 2025 CalmApp. Todos los derechos reservados.
        </div>
    </footer>
    
  `;
  
  const form = document.getElementById('form');
  const btn = document.getElementById('button');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const fechaInput = document.getElementById("fecha");
    const hoy = new Date().toISOString().split("T")[0];
    fechaInput.setAttribute("min", hoy);

    function convertirHora(hora24) {
      const [hora, minutos] = hora24.split(':');
      const h = parseInt(hora);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const hora12 = h % 12 || 12;
      return `${hora12}:${minutos} ${ampm}`;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    btn.value = 'Enviando...';

    const horaAMPM = convertirHora(form.hora.value);

    const serviceID = 'default_service';
    const templateID = 'template_rw6fb23';

    emailjs.send(serviceID, templateID, {
      nombre: form.nombre.value,
      email: form.email.value,
      fecha: form.fecha.value,
      hora: horaAMPM
    })
    .then(() => {
      btn.value = 'Agendar cita';

      Swal.fire({
        title: '¡Cita agendada!',
        text: `${form.nombre.value}, tu cita quedó agendada para el ${form.fecha.value} a las ${horaAMPM}.`,
        icon: 'success',
        confirmButtonColor: '#6C4AB6',
      });

      form.reset();
    }, (err) => {
      btn.value = 'Agendar cita';
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al enviar la cita. Intenta nuevamente.',
        icon: 'error',
      });
      console.error(err);
    });
  });
};


export function show404() {
  return `
    <section>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
    </section>`;
};