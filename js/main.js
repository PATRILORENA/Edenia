// Dividir el texto del título en caracteres y palabras con SplitType
const text = new SplitType('.hero-title', { types: "words, chars" });


// ============================
// ANIMACIÓN DEL LOGO
// ============================
gsap.from('.logo', {
  color: `rgb(${gsap.utils.random(0, 255)}, ${gsap.utils.random(0, 255)}, ${gsap.utils.random(0, 255)})`,
  backgroundColor: `rgb(${gsap.utils.random(0, 255)}, ${gsap.utils.random(0, 255)}, ${gsap.utils.random(0, 255)})`,
  x: -100,              // Mover desde la izquierda
  rotate: -360,         // Rotar desde -360 grados
  scale: 1,             // Escala inicial
  duration: 1,          // Duración de la animación
  ease: "back.out"      // Tipo de animación con rebote
});


// ============================
// ANIMACIÓN DEL MENÚ DE NAVEGACIÓN
// ============================
gsap.from('.menu-item', {
  y: -100,              // Entrar desde arriba
  ease: "power3.out",   // Animación suave hacia abajo
  duration: 1.5,

  
  stagger: {
    amount: 0.5,        // Espaciado entre elementos
    from: "start"
  },
});


// ============================
// ANIMACIÓN DE CADA CARACTER DEL TÍTULO
// ============================
text.chars.forEach((char, index) => {
  let charOriginalColor = window.getComputedStyle(char).color;

  let charsTl = gsap.timeline();

  // Animación de entrada de cada letra
  charsTl.from(char, {
    y: gsap.utils.random(-150, 150),      // Movimiento vertical aleatorio
    x: gsap.utils.random(-300, 300),      // Movimiento horizontal aleatorio
    rotate: gsap.utils.random(-360, 360), // Rotación aleatoria
    scale: gsap.utils.random(0, 2),       // Escala aleatoria
    opacity: 0,
    duration: .75,
    ease: "back.out",
    delay: index * 0.01                  // Pequeño retraso progresivo
  });

  // Cambio de color temporal al entrar
  charsTl.from(char, {
    color: `rgb(${gsap.utils.random(0, 255)}, ${gsap.utils.random(0, 255)}, ${gsap.utils.random(0, 255)})`,
    duration: 1,
  }, "-=.25");

  // ============================
  // EFECTO HOVER POR CADA LETRA
  // ============================
  function charsHover() {
    gsap.timeline()
      .to(char, {
        y: gsap.utils.random(-50, 50),
        x: gsap.utils.random(-50, 50),
        rotate: gsap.utils.random(-90, 90),
        scale: gsap.utils.random(0.5, 1.5),
        duration: .5,
        ease: "back.out",
        color: `rgb(${gsap.utils.random(0, 255)}, ${gsap.utils.random(0, 255)}, ${gsap.utils.random(0, 255)})`,
        onStart: () => char.removeEventListener("mouseenter", charsHover)
      })
      .to(char, {
        y: 0,
        x: 0,
        rotate: 0,
        scale: 1,
        color: charOriginalColor,
        delay: 1,
        duration: .5,
        ease: "back.out",
        onComplete: () => {
          setTimeout(() => {
            char.addEventListener("mouseenter", charsHover);
          }, 100);
        }
      });
  }

  // Activar evento hover
  char.addEventListener("mouseenter", charsHover);
});


// ============================
// ANIMACIÓN DEL PÁRRAFO DESCRIPTIVO DEL HERO
// ============================
gsap.from(".hero-text", {
  y: 50,                // Desplazamiento desde abajo
  opacity: 0,           // Aparece con fade
  duration: 1,
  delay: 0.6,             // Espera después del título
  ease: "power2.out"
});


// ============================
// ANIMACIÓN DE LOS BLOQUES DE ESTADÍSTICAS (FADE + SLIDE)
// ============================
gsap.from(".hero-stat", {
  opacity: 0,
  y: 30,                // Entrada desde abajo
  stagger: 0.2,         // Animación en cadena
  duration: 1,
  delay: 1.5,
  ease: "power2.out"
});

// Animación de la imagen del héroe: entra desde la izquierda con rebote
gsap.from(".hero-image img", {
    x: -200,             // Sale desde fuera a la izquierda
    opacity: 0,
    duration: 1.2,
    delay: 0.8,          // Se sincroniza con el resto de elementos
    ease: "back.out(1.7)" // Rebote suave al llegar
});
  
// ============================
// FUNCIÓN PARA ANIMAR NÚMEROS CONTADORES
// ============================
function animateNumber(selector, endValue, duration = 2) {
  const element = document.querySelector(selector);
  const obj = { val: 0 };

  gsap.to(obj, {
    val: endValue,
    duration: duration,
    ease: "power3.out",
    onUpdate: () => {
      // Mostrar con separadores de miles si es > 1000
      if (endValue >= 1000) {
        element.textContent = Math.floor(obj.val).toLocaleString("en-US");
      } else {
        element.textContent = Math.floor(obj.val);
      }
    }
  });
}

// Ejecutar contadores al cargar
animateNumber(".hero-stat:nth-child(1) .number", 18000, 2);    // Suscriptores
animateNumber(".hero-stat:nth-child(2) .number", 128, 3);      // Videos
animateNumber(".hero-stat:nth-child(3) .number", 100000, 4);  // Visualizaciones