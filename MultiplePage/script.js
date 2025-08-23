document.addEventListener('DOMContentLoaded', function() {

    // --- Seleksi Elemen ---
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const pageContent = document.querySelector('.page-content');
    const headerTypingEl = document.getElementById('header-typing-text');
    const heroTypingEl = document.getElementById('hero-typing-text');

    // --- Fungsionalitas Menu Mobile & Efek Blur ---
    if (menuBtn && navMenu && pageContent) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            pageContent.classList.toggle('content-blurred'); // Tambah/hapus kelas blur
        });
    }

    // --- Fungsi Animasi Ketik (Typewriter) ---
    class Typewriter {
        constructor(el, words, wait = 2000) {
            this.el = el;
            this.words = words;
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.isDeleting = false;
        }

        type() {
            const current = this.wordIndex % this.words.length;
            const fullTxt = this.words[current];
            let typeSpeed = 200;

            if (this.isDeleting) {
                // Kurangi kecepatan saat menghapus
                typeSpeed /= 2;
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            // Tampilkan teks ke elemen
            this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

            // Logika ganti teks
            if (!this.isDeleting && this.txt === fullTxt) {
                // Jeda setelah selesai mengetik
                typeSpeed = this.wait;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.wordIndex++;
                typeSpeed = 500; // Jeda sebelum mulai mengetik kata baru
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    // --- Inisialisasi Animasi Ketik ---
    // 1. Untuk Header (di semua halaman)
    if (headerTypingEl) {
        new Typewriter(headerTypingEl, ['Welcome To My Website']);
    }

    // 2. Untuk Hero (hanya di halaman utama)
    if (heroTypingEl) {
        const words = [
            "Welcome To My Website",
            "Halo, Saya Muhammad Nadir",
            "Seorang Web Developer"
        ];
        new Typewriter(heroTypingEl, words);
    }
    
    // Kode untuk render ikon Lucide sudah dihapus

});
