import { loadRoute } from './router.js';
import { auth } from './auth.js';

export function showLogin() {
  const app = document.getElementById('app').innerHTML = `
  <link rel="stylesheet" href="./src/css/style-login.css">
  <div class="container-form sign-in">
        <div class="welcome-back">
            <div class="message">
                <h2 class="login-text">Bienvenido a CalmApp</h2>
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
                    <h2>Bienvenido de nuevo</h2>
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
      <a href="citas.html" class="appointment-btn">Agendar una cita</a>
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

export function showEmociones() {
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
              <button id="btn-ok">Agendar cita</button>
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
  <textarea id="note-text" placeholder="Escribe tu nota aquí..."></textarea>
  <button id="save-note">Guardar Nota</button>
  
  <div id="notes-list"></div>
  </div>

  <footer>
    ©️ 2025 CalmApp | Desarrollado con empatía 💙
  </footer>
  `;
  document.addEventListener('DOMContentLoaded', () => {
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
  });
  
  document.addEventListener('DOMContentLoaded', () => {
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
  });
  
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

export function showAmigo() {
  const app = document.getElementById('app').innerHTML = `
      <div class="main-container">
        <div class="sidebar">
            <h2>Menu</h2>
            <button>Home</button>
            <button>About us</button>
            <button>Contact</button>
            <button>Return</button>
        </div>

        <div class="chat-container">
            <div class="chat-header">
                <button id="toggleDarkMode"></button>
                <h2>Bot de Apoyo</h2>
            </div>

            <div class="chat-messages" id="chatMessages"></div>

            <div class="chat-input">
                <input type="text" id="userInput" placeholder="Escribe cómo te sientes..." />
                <button id="sendBtn">Enviar</button>
            </div>
        </div>
    </div>
  `;
  const sendBtn = document.getElementById("sendBtn");
  const userInput = document.getElementById("userInput");
  const chatMessages = document.getElementById("chatMessages");

  window.addEventListener("DOMContentLoaded", () => {
      mostrarMensajeBot("Hola, estoy aquí para ayudarte. ¿Cómo te sientes hoy?");
  });
  sendBtn.addEventListener("click", () => {
      const mensaje = userInput.value.trim();
      if (mensaje !== "") {
          mostrarMensajeUsuario(mensaje);
          responderComoBot(mensaje.toLowerCase());
          userInput.value = "";
      }
  });

  function mostrarMensajeUsuario(texto) {
      const div = document.createElement("div");
      div.className = "message user-message";
      div.textContent = texto;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      scrollToBottom();
  }

  function mostrarMensajeBot(texto) {
      const div = document.createElement("div");
      div.className = "message bot-message";
      div.textContent = texto;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      scrollToBottom();

      if (texto.toLowerCase().includes("agendar una cita")) {
          mostrarOpcionesCita();
      }
  }

  function mostrarOpcionesCita() {
      const chatMessages = document.getElementById("chatMessages");

      const contenedorOpciones = document.createElement("div");
      contenedorOpciones.classList.add("cita-opciones");

      const btnSi = document.createElement("button");
      btnSi.innerText = "Si";
      btnSi.classList.add("boton-cita");
      btnSi.onclick = () => {
          mostrarMensajeUsuario("Si");
          mostrarMensajeBot("Perfecto, tu cita ha sido agendada");
          contenedorOpciones.remove();
      };

      const btnNo = document.createElement("button");
      btnNo.innerText = "No";
      btnNo.classList.add("boton-cita");
      btnNo.onclick = () => {
          mostrarMensajeUsuario("No");
          mostrarMensajeBot("De acuerdo, si cambias de opinión, estaré aquí.");
          contenedorOpciones.remove()
      };

      contenedorOpciones.appendChild(btnSi);
      contenedorOpciones.appendChild(btnNo);
      chatMessages.appendChild(contenedorOpciones);

      scrollToBottom();
  }



  function elegirAleatoria(lista) {
      return lista[Math.floor(Math.random() * lista.length)];
  }

  function responderComoBot(texto) {

      texto = texto.toLowerCase();

      const respuestas = {
          hola: ["¡Hola! Bienvenido a tu espacio seguro. ¿Cómo estás hoy? 🌈",
          ],

          charla: ["Cuéntame en qué estás pensando. Estoy contigo. 💭",
          ],

          triste: [`Siento mucho que te sientas así. Recuerda que está bien no estar bien todo el tiempo.
          ¿Te gustaría escribir en tu diario emocional o escuchar una playlist para reconectar contigo?
          También te dejo una frase para hoy:
          Incluso las tormentas más fuertes pasan. Tú también lo harás.
          
          ¿Te gustaría agendar una cita con uno de nuestros profesionales?
          `
          ],

          feliz: ["¡Qué lindo escucharlo! Atesora esos momentos. 💛"
          ],

          ansioso: [`Respira conmigo: inhala… 3, 2, 1. Exhala… La ansiedad puede ser abrumadora, pero no estás solo  
          ¿Te gustaría hacer un ejercicio de respiración guiada o recibir un tip para calmar tu mente? 
          (Escribeme tu respuesta con si) 
          si deseas el tip. Espero tu respuesta.`,
          ],

          tip: [`Sé que en este momento todo puede sentirse abrumador, como si tu mente no pudiera descansar.
               Quiero que sepas que no estás solo. Respira lento… inhala profundamente por 4 segundos, 
               mantén el aire por 4, y exhala suavemente por 6. 
               Cada respiración consciente que haces es una forma de recordarle a tu cuerpo que está a salvo. A veces, no necesitamos tener todas las respuestas, 
               solo darnos permiso para hacer una pausa. Estás haciendo lo mejor que puedes, y eso ya es suficiente. 💛 `
          ],

          continuar: ["¿Que mas puedo hacer por ti? ❤",
          ],

          solo: ["Aunque te sientas solo, yo estoy aquí. Puedes hablarme cuando lo necesites."
          ],

          enojado: ["La ira es válida. ¿Qué te hizo sentir así? Puedes contármelo. 💢"
          ],

          miedo: ["El miedo nos protege, pero también nos limita. Háblame de eso. Estoy para apoyarte. 🌌",
          ],

          culpa: ["La culpa pesa, pero tú mereces perdón y comprensión. ¿Quieres hablar de eso?",
          ],

          autoestima: ["Eres más fuerte de lo que crees. No te compares. Tú eres único.",
          ],

          agotado: ["Descansar también es avanzar. Tu cuerpo y mente merecen pausas. 💤",
          ],

          motivacion: ["Cada paso, aunque pequeño, te acerca a tu meta. No te rindas. 🚀",
          ],

          default: ["Estoy aquí para ti. Puedes hablarme sin miedo. ¿Qué te gustaría contarme?"
          ]
      };

      let respuestaFinal = "";

      // Detección basada en palabras clave
      if (texto.includes("hola") || texto.includes("buenas") || texto.includes("buenos dias")) {
          respuestaFinal = elegirAleatoria(respuestas.hola);
      } else if (
          texto.includes("pienso") || texto.includes("reflexiono") || texto.includes("quiero") || texto.includes("charla")
      ) {
          respuestaFinal = elegirAleatoria(respuestas.charla);
      } else if (
          texto.includes("triste") || texto.includes("llorar") || texto.includes("deprimido")
      ) {
          respuestaFinal = elegirAleatoria(respuestas.triste);
      }
      else if (
          texto.includes("feliz") || texto.includes("contento") || texto.includes("alegre")
      ) {
          respuestaFinal = elegirAleatoria(respuestas.feliz);
      } else if (
          texto.includes("ansioso") || texto.includes("nervioso") || texto.includes("estresado")
      ) {
          respuestaFinal = elegirAleatoria(respuestas.ansioso);
      } else if (
          texto.includes("si") || texto.includes("sí") || texto.includes("hazlo") || texto.includes("dame un tip")
      ) {
          respuestaFinal = elegirAleatoria(respuestas.tip)
      } else if (texto.includes("seguir") || texto.includes("continuar")) {
          respuestaFinal = elegirAleatoria(respuestas.continuar)
      }
      else if (
          texto.includes("solo") || texto.includes("sola") || texto.includes("nadie") || texto.includes("soledad")
      ) {
          respuestaFinal = elegirAleatoria(respuestas.solo);
      } else if (
          texto.includes("enojado") || texto.includes("molesto") || texto.includes("furioso") || texto.includes("agresivo")
      ) {
          respuestaFinal = elegirAleatoria(respuestas.enojado);
      } else if (
          texto.includes("miedo") || texto.includes("temor") || texto.includes("panico") || texto.includes("asustado")
      ) {
          respuestaFinal = elegirAleatoria(respuestas.miedo);
      } else if (
          texto.includes("culpa") || texto.includes("culpable")
      ) {
          respuestaFinal = elegirAleatoria(respuestas.culpa);
      } else if (
          texto.includes("valgo") || texto.includes("autoestima") || texto.includes("soy feo")
      ) {
          respuestaFinal = elegirAleatoria(respuestas.autoestima);
      } else if (
          texto.includes("cansado") || texto.includes("agotado") || texto.includes("sin energía")
      ) {
          respuestaFinal = elegirAleatoria(respuestas.agotado);
      } else if (
          texto.includes("motivado") || texto.includes("lograr") || texto.includes("meta") || texto.includes("progreso")
      ) {
          respuestaFinal = elegirAleatoria(respuestas.motivacion);
      } else {
          respuestaFinal = elegirAleatoria(respuestas.default);
      }

      setTimeout(() => {
          mostrarMensajeBot(respuestaFinal);
      }, 600);
  }

    // Activar Enter para enviar el mensaje
    userInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendBtn.click();
        }
    });

    function scrollToBottom() {
        const chatMessages = document.getElementById("chatMessages");
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: "smooth"
        });
    }

    document.getElementById("toggleDarkMode").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
    }

export function show404() {
  return `
    <section>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
    </section>`;
};