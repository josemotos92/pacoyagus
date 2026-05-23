// Smooth scroll para navegación interna
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Animación de entrada para las tarjetas al hacer scroll
const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.15 }
);

document.querySelectorAll('.card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
  observer.observe(card);
});

// Animación de entrada para la sección de Paco
const pacoObserver = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      pacoObserver.unobserve(entry.target);
    }
  }),
  { threshold: 0.2 }
);
const pacoInner = document.querySelector('.paco-inner');
if (pacoInner) pacoObserver.observe(pacoInner);

// Manejo del formulario
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const feedback = document.getElementById('formFeedback');

  feedback.className = 'form-feedback';

  if (!name || !email || !message) {
    feedback.textContent = 'Por favor, rellena todos los campos.';
    feedback.classList.add('error');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    feedback.textContent = 'Introduce un email válido.';
    feedback.classList.add('error');
    return;
  }

  // Simula envío
  const btn = this.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Enviando…';

  setTimeout(() => {
    feedback.textContent = 'Mensaje enviado. Te escribiremos pronto.';
    this.reset();
    btn.disabled = false;
    btn.textContent = 'Enviar mensaje';
  }, 1200);
});
