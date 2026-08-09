const animatedElements = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

animatedElements.forEach((element) => observer.observe(element));

const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slide-dot');
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const themeDots = document.querySelectorAll('.theme-dot');
let slideIndex = 0;
let slideTimer;

const setActiveSlide = (index) => {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  slideIndex = index;
};

const nextSlide = () => {
  const nextIndex = (slideIndex + 1) % slides.length;
  setActiveSlide(nextIndex);
};

const startSlider = () => {
  slideTimer = setInterval(nextSlide, 6500);
};

const stopSlider = () => {
  clearInterval(slideTimer);
};

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    stopSlider();
    setActiveSlide(Number(dot.getAttribute('data-slide')));
    startSlider();
  });
});

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
}

const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  themeDots.forEach((dot) => {
    dot.classList.toggle('active', dot.dataset.theme === theme);
  });
  localStorage.setItem('unshakableTheme', theme);
};

themeDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    setTheme(dot.dataset.theme);
  });
});

const savedTheme = localStorage.getItem('unshakableTheme') || 'default';
setTheme(savedTheme);

startSlider();
