// ================= INISIALISASI AOS ANIMATION =================
AOS.init();

// ================= LOGIKA NAVBAR (SCROLL & MOBILE) =================
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const dropdown = document.querySelector('.dropdown');
const dropbtn = document.querySelector('.dropbtn');

// Efek Scroll Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Toggle Hamburger Menu
mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    // Tutup dropdown jika menu mobile ditutup
    if (!navLinks.classList.contains('active')) {
        dropdown.classList.remove('active');
    }
});

// Toggle Dropdown khusus Mobile (Klik)
if (dropbtn) {
    dropbtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
}

// Menutup menu mobile & dropdown saat link diklik
const allLinks = document.querySelectorAll('.nav-links a:not(.dropbtn)');
allLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        dropdown.classList.remove('active');
    });
});

// ================= LOGIKA CAROUSEL / SLIDER =================
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
let slideInterval;

function showSlide(n) {
    // Sembunyikan semua slide dan hapus active dari dots
    slides.forEach(slide => {
        slide.classList.remove('active');
        // Me-reset animasi teks agar berulang saat slide muncul lagi
        const contents = slide.querySelectorAll('.slide-title, .slide-subtitle, .slide-desc, .visi-misi-text');
        contents.forEach(content => {
            content.style.animation = 'none';
            content.offsetHeight; /* Trigger reflow */
            content.style.animation = null; 
        });
    });
    dots.forEach(dot => dot.classList.remove('active'));

    // Tampilkan slide yang diminta
    slideIndex = n;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;

    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

function nextSlide() { 
    showSlide(slideIndex + 1); 
    resetInterval(); 
}

function prevSlide() { 
    showSlide(slideIndex - 1); 
    resetInterval(); 
}

function currentSlide(n) { 
    showSlide(n); 
    resetInterval(); 
}

// Fungsi agar carousel berjalan otomatis setiap 6 detik
function startInterval() {
    slideInterval = setInterval(nextSlide, 6000);
}

// Reset waktu jika user mengklik tombol secara manual
function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
}

// Mulai carousel otomatis saat web diload
startInterval();