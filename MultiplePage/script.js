document.addEventListener('DOMContentLoaded', function() {

    // --- Seleksi Elemen ---
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const pageContent = document.querySelector('.page-content');
    const logoTypingEl = document.getElementById('logo-typing-text');
    const heroTypingEl = document.getElementById('hero-typing-text');

    // --- Fungsionalitas Menu Mobile & Efek Blur ---
    if (menuBtn && navMenu && pageContent) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            pageContent.classList.toggle('content-blurred');
        });
    }

    // --- Fungsi Animasi Ketik (Typewriter) ---
    class Typewriter {
        constructor(el, words, { wait = 3000, speed = 150, loop = false } = {}) {
            this.el = el;
            this.words = words;
            this.wait = parseInt(wait, 10);
            this.speed = parseInt(speed, 10);
            this.loop = loop;
            this.txt = '';
            this.wordIndex = 0;
            this.type();
            this.isDeleting = false;
        }

        type() {
            const current = this.wordIndex % this.words.length;
            const fullTxt = this.words[current];
            let typeSpeed = this.speed;

            if (this.isDeleting) {
                typeSpeed /= 2;
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

            if (!this.isDeleting && this.txt === fullTxt) {
                if (this.loop || this.words.length > 1) {
                    typeSpeed = this.wait;
                    this.isDeleting = true;
                } else {
                    this.el.querySelector('.wrap').style.animation = 'none';
                    this.el.querySelector('.wrap').style.border = 'none';
                    return;
                }
            } else if (this.isDeleting) {
                if (this.loop && this.txt.length === 1) {
                    this.isDeleting = false;
                    typeSpeed = 500;
                } else if (this.txt === '') {
                    this.isDeleting = false;
                    this.wordIndex++;
                    typeSpeed = 500;
                }
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    // --- Inisialisasi Animasi Ketik ---
    if (logoTypingEl) {
        new Typewriter(logoTypingEl, ['Nadir.'], { speed: 250, wait: 2000, loop: true });
    }
    if (heroTypingEl) {
        const words = ["Hi, I'm Muhammad Nadir", "A Web Enthusiast", "A Future Developer"];
        new Typewriter(heroTypingEl, words, { wait: 3000, speed: 150 });
    }

    // --- Logika transisi halaman sudah dihapus ---

    // --- ANIMASI: Logika Scroll-triggered (Diperbarui) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // PERUBAHAN DI SINI:
            // Jika elemen terlihat, tambahkan kelas. Jika tidak, hapus kelas.
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Picu animasi saat 10% elemen terlihat
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

});