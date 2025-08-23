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
                typeSpeed /= 2; // Menghapus lebih cepat
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

            // Kondisi saat selesai mengetik
            if (!this.isDeleting && this.txt === fullTxt) {
                // Jika looping atau ada banyak kata, mulai hapus setelah jeda
                if (this.loop || this.words.length > 1) {
                    typeSpeed = this.wait;
                    this.isDeleting = true;
                } else {
                    // Hentikan animasi untuk kata tunggal yang tidak looping
                    this.el.querySelector('.wrap').style.animation = 'none';
                    this.el.querySelector('.wrap').style.border = 'none';
                    return;
                }
            } 
            // Kondisi saat sedang menghapus
            else if (this.isDeleting) {
                // PERUBAHAN DI SINI: Logika looping khusus untuk logo
                // Berhenti menghapus jika hanya tersisa 1 karakter
                if (this.loop && this.txt.length === 1) {
                    this.isDeleting = false;
                    typeSpeed = 500; // Jeda sebelum mulai mengetik lagi
                } 
                // Logika original untuk teks hero (hapus sampai habis)
                else if (this.txt === '') {
                    this.isDeleting = false;
                    this.wordIndex++;
                    typeSpeed = 500;
                }
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    // --- Inisialisasi Animasi Ketik ---
    // 1. Untuk Logo
    if (logoTypingEl) {
        // PERUBAHAN DI SINI:
        // Menambahkan 'loop: true' dan 'wait' agar animasi berulang
        new Typewriter(logoTypingEl, ['Home'], { speed: 350, wait: 3000, loop: true });
    }

    // 2. Untuk Hero
    if (heroTypingEl) {
        const words = [
            "Hi, I'm Muhammad Nadir",
            "A Web Enthusiast",
            "A Future Developer"
        ];
        // Animasi hero tetap sama, hanya berputar antar kata
        new Typewriter(heroTypingEl, words, { wait: 3000, speed: 150 });
    }

});