// Lista de palabras con pistas y sinónimos posibles
const words = [
  { word: "sol", hint: "Astro que nos ilumina.", synonyms: ["astro", "estrella", "luz"] },
  { word: "luna", hint: "Satélite natural de la Tierra.", synonyms: ["satélite", "satélite natural"] },
  { word: "estrella", hint: "Brilla en el cielo nocturno.", synonyms: ["cuerpo celeste", "luz"] },
  { word: "mar", hint: "Gran extensión de agua salada.", synonyms: ["océano", "agua salada"] },
  { word: "montaña", hint: "Elevación natural del terreno.", synonyms: ["colina", "cerro", "altiplano"] },
  { word: "bosque", hint: "Conjunto de árboles y plantas.", synonyms: ["selva", "jungla", "matorral"] },
  { word: "cielo", hint: "Lo que vemos sobre nuestras cabezas durante el día.", synonyms: ["firmamento", "atmósfera", "aire"] },
  { word: "viento", hint: "Movimiento del aire.", synonyms: ["aire", "brisa"] },
  { word: "agua", hint: "Líquido esencial para la vida.", synonyms: ["líquido", "h2o"] },
  { word: "fuego", hint: "Elemento que produce calor y luz.", synonyms: ["llama", "incendio"] },
  { word: "nube", hint: "Vapor de agua suspendido en el cielo.", synonyms: ["vapor", "neblina"] },
  { word: "río", hint: "Corriente natural de agua.", synonyms: ["arroyo", "caudal", "corriente de agua"] },
  { word: "desierto", hint: "Extensión de tierra árida sin vegetación.", synonyms: ["desolación", "estepa"] },
  { word: "selva", hint: "Bosque tropical y denso.", synonyms: ["jungla", "bosque tropical"] },
  { word: "planeta", hint: "Cuerpo celeste que orbita una estrella.", synonyms: ["mundo", "astro"] },
  { word: "tierra", hint: "Nuestro hogar, el tercer planeta del sistema solar.", synonyms: ["planeta", "mundo"] },
  { word: "animal", hint: "Ser vivo que no es vegetal ni mineral.", synonyms: ["criatura", "bestia", "especie"] },
  { word: "vegetal", hint: "Ser vivo que realiza fotosíntesis.", synonyms: ["planta", "flora"] },
  { word: "hombre", hint: "Ser humano masculino.", synonyms: ["masculino", "varón", "chico"] },
  { word: "mujer", hint: "Ser humano femenino.", synonyms: ["femenina", "dama", "chica"] },
  { word: "niño", hint: "Persona de corta edad.", synonyms: ["infante", "chico", "muchacho"] },
  { word: "adulto", hint: "Persona de edad avanzada.", synonyms: ["maduro", "persona mayor", "anciano"] },
  { word: "fruta", hint: "Producto comestible proveniente de una planta.", synonyms: ["alimento", "comida", "baya"] },
  { word: "flor", hint: "Parte reproductiva de las plantas.", synonyms: ["planta", "botón floral"] },
  { word: "piedra", hint: "Objeto sólido y natural que se encuentra en la Tierra.", synonyms: ["roca", "piedrita", "guijarro"] },
  { word: "zapato", hint: "Calzado que cubre el pie.", synonyms: ["calzado", "botín", "bota"] },
  { word: "camisa", hint: "Prenda de ropa para la parte superior del cuerpo.", synonyms: ["blusa", "polera", "camiseta"] },
  { word: "pelota", hint: "Objeto redondo utilizado para jugar deportes.", synonyms: ["balón", "esférico", "pelotita"] },
  { word: "silla", hint: "Mueble utilizado para sentarse.", synonyms: ["asiento", "butaca", "banco"] },
  { word: "mesa", hint: "Mueble con superficie plana para trabajar o comer.", synonyms: ["escritorio", "superficie", "tablero"] },
  { word: "coche", hint: "Vehículo de motor utilizado para transportarse.", synonyms: ["automóvil", "carro", "vehículo"] },
  { word: "avión", hint: "Vehículo que vuela por el aire.", synonyms: ["aeronave", "avioneta", "jet"] },
  { word: "tren", hint: "Medio de transporte que circula por raíles.", synonyms: ["ferrocarril", "trenecito"] },
  { word: "bici", hint: "Vehículo de dos ruedas impulsado por pedales.", synonyms: ["bicicleta", "velocípedo"] },
  { word: "telefono", hint: "Dispositivo utilizado para realizar llamadas.", synonyms: ["celular", "móvil", "smartphone"] },
  { word: "computadora", hint: "Dispositivo electrónico utilizado para procesar información.", synonyms: ["ordenador", "PC", "laptop"] },
  { word: "television", hint: "Electrodoméstico utilizado para ver imágenes en movimiento.", synonyms: ["TV", "pantalla", "tele"] },
  { word: "radio", hint: "Dispositivo para recibir y reproducir sonidos de audio.", synonyms: ["transmisor", "receptor"] },
  { word: "internet", hint: "Red global de computadoras conectadas.", synonyms: ["web", "red", "ciberespacio"] }
];

let currentWord = {};
let wordAttempts = 5;

// Inicializa el juego
function initWordGame() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordAttempts = 5;

  document.getElementById("word-hint").textContent = currentWord.hint;
  document.getElementById("word-attempts").textContent = wordAttempts;
  document.getElementById("word-message").textContent = "";
  document.getElementById("word-guess").value = "";
  document.getElementById("word-guess").disabled = false;
  document.getElementById("word-check-btn").disabled = false;
}

// Función para verificar la respuesta
function checkWordGuess() {
  let guess = document.getElementById("word-guess").value.trim().toLowerCase();

  // Eliminar artículos y normalizar palabra
  guess = removeArticlesAndNormalize(guess);

  // Crear un array con la palabra original y sus sinónimos
  const validAnswers = [
    currentWord.word, 
    currentWord.word.toUpperCase(), 
    removeAccents(currentWord.word),
    currentWord.word + "s",  // Plural
    currentWord.word + "es", // Otra forma plural
    ...currentWord.synonyms.map(synonym => removeAccents(synonym.toLowerCase()))
  ];

  if (validAnswers.includes(guess)) {
    flashWordMessage(`¡🎉 Correcto! La palabra era "${currentWord.word}".`, "winner");
    disableWordInput();
  } else {
    wordAttempts--;
    document.getElementById("word-attempts").textContent = wordAttempts;

    if (wordAttempts === 0) {
      flashWordMessage(`😢 Perdiste. La palabra era "${currentWord.word}".`, "loser");
      disableWordInput();
    } else {
      flashWordMessage(`❌ Incorrecto. Intenta nuevamente.`, "loser");
    }
  }
}

// Función para eliminar artículos como "el", "la", "los", "las" y convertir la palabra en singular
function removeArticlesAndNormalize(word) {
  const articles = ["el", "la", "los", "las"];
  let normalizedWord = word;

  // Eliminar artículos al principio de la palabra
  for (let article of articles) {
    if (normalizedWord.startsWith(article + " ")) {
      normalizedWord = normalizedWord.substring(article.length).trim(); // Elimina el artículo
    }
  }

  // Normaliza la palabra eliminando acentos
  normalizedWord = removeAccents(normalizedWord);

  return normalizedWord;
}

// Función para eliminar acentos de las respuestas
function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Función para mostrar mensajes dinámicos
function flashWordMessage(text, className) {
  const message = document.getElementById("word-message");
  message.textContent = text;
  message.className = `message ${className}`;
}

// Desactivar los inputs después de una respuesta correcta o cuando se pierda
function disableWordInput() {
  document.getElementById("word-guess").disabled = true;
  document.getElementById("word-check-btn").disabled = true;
}

// Reiniciar el juego
function resetWordGame() {
  initWordGame();
}

// Inicializar el juego al cargar la página
document.addEventListener("DOMContentLoaded", initWordGame);