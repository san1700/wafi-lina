// ==========================================
// 0. PRE-LOADER
// ==========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800);
    }

    // Initialize Particles.js on Cover Page
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#d4af37" }, // Gold color
                "shape": {
                    "type": "circle"
                },
                "opacity": { "value": 0.8, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": false },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "top",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true }
            },
            "retina_detect": true
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 0.1 DYNAMIC GUEST NAME (FROM URL)
    // ==========================================
    const urlParams = new URLSearchParams(window.location.search);
    const guestNameParam = urlParams.get('to');
    
    if (guestNameParam) {
        // Decode the URL parameter and escape HTML to prevent XSS (basic)
        const guestName = decodeURIComponent(guestNameParam).replace(/</g, "&lt;").replace(/>/g, "&gt;");
        
        // Update the cover page
        const guestNameDisplay = document.getElementById('guest-name-display');
        if (guestNameDisplay) {
            guestNameDisplay.innerHTML = guestName;
        }

        // Auto-fill the RSVP form "Nama Anda" input
        const rsvpNameInput = document.getElementById('rsvp-name');
        if (rsvpNameInput) {
            rsvpNameInput.value = guestName;
        }
    }

    // ==========================================
    // 1. COVER PAGE & MUSIC LOGIC
    // ==========================================
    const btnOpen = document.getElementById('btn-open-invitation');
    const coverPage = document.getElementById('cover-page');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-control');
    const bottomNav = document.querySelector('.bottom-nav');
    let isMusicPlaying = false;

    btnOpen.addEventListener('click', () => {
        const envelope = document.getElementById('envelope');
        // Trigger envelope animation
        envelope.classList.add('open');

        // Play music immediately on click to avoid browser autoplay restrictions
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicBtn.classList.add('rotating');
        }).catch(err => {
            console.log("Audio autoplay prevented by browser:", err);
        });

        // Wait for envelope animation to finish
        setTimeout(() => {
            // Slide up the cover
            coverPage.classList.add('open');
            document.body.classList.remove('noscroll'); // Allow scrolling

            // Initialize main particles
            if (typeof particlesJS !== 'undefined') {
                particlesJS('particles-main', {
                    "particles": {
                        "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
                        "color": { "value": "#d4af37" }, // Gold fireflies
                        "shape": {
                            "type": "circle"
                        },
                        "opacity": { "value": 0.7, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                        "size": { "value": 4, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
                        "line_linked": { "enable": false },
                        "move": {
                            "enable": true,
                            "speed": 2,
                            "direction": "none",
                            "random": true,
                            "straight": false,
                            "out_mode": "out",
                            "bounce": false
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "repulse" }, "resize": true },
                        "modes": {
                            "bubble": { "distance": 200, "size": 6, "duration": 2, "opacity": 0.8 },
                            "repulse": { "distance": 200, "duration": 0.4 }
                        }
                    },
                    "retina_detect": true
                });
            }

            // Show floating controls
            musicBtn.classList.add('visible');
            bottomNav.classList.add('visible');
        }, 5000); // Wait 5 seconds for user to read text
    });

    // Toggle Music
    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('rotating');
            musicBtn.style.opacity = '0.5';
        } else {
            bgMusic.play();
            musicBtn.classList.add('rotating');
            musicBtn.style.opacity = '1';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // ==========================================
    // 2. SCROLL ANIMATIONS
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.ticket-section, .timeline-item, .welcome-section, .gallery-section, .gift-section, .profile-card, .card-gift-premium, .quote-section, .closing-section, .creative-footer');
    animatedElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // ==========================================
    // 3. COUNTDOWN TIMER
    // ==========================================
    const countDownDate = new Date("Oct 06, 2026 12:00:00").getTime();
    const timerElement = document.getElementById('countdown-timer');

    if (timerElement) {
        const timerInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            timerElement.innerHTML = `
                <div class="time-box"><span>${days}</span><small>Days</small></div>
                <div class="time-box"><span>${hours}</span><small>Hours</small></div>
                <div class="time-box"><span>${minutes}</span><small>Mins</small></div>
                <div class="time-box"><span>${seconds}</span><small>Secs</small></div>
            `;

            if (distance < 0) {
                clearInterval(timerInterval);
                timerElement.innerHTML = "TODAY IS THE DAY!";
            }
        }, 1000);
    }

    // ==========================================
    // 4. GALLERY LIGHTBOX
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    const galleryImages = document.querySelectorAll('.gallery-img');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.classList.add('show');
            lightboxImg.src = img.src;
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('show');
    });
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.remove('show');
    });

    // ==========================================
    // 5. RSVP FORM (Send to WhatsApp & Live Wishes)
    // ==========================================
    const rsvpForm = document.getElementById('rsvp-form');
    const wishesFeed = document.getElementById('wishes-feed');

    // Load saved wishes from LocalStorage on page load
    loadWishes();

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('rsvp-name').value;
            const attendance = document.getElementById('rsvp-attendance').value;
            const message = document.getElementById('rsvp-message').value;

            // 1. Add to Live Wishes locally
            addWishToFeed(name, attendance, message);
            saveWish(name, attendance, message);

            // 2. Open WhatsApp
            const whatsappNumber = "6282245455504"; // Ganti dengan nomor asli
            
            // Format the text properly
            const rawText = `Halo, saya ${name}.\n\nSaya konfirmasi: *${attendance}*.\n\nPesan & Doa: ${message}`;
            const waText = encodeURIComponent(rawText);
            
            // Copy to clipboard as a fallback
            navigator.clipboard.writeText(rawText).catch(err => console.log('Clipboard copy failed', err));

            // Clear form
            rsvpForm.reset();

            // Open WhatsApp with pre-filled text
            window.open(`https://wa.me/${whatsappNumber}?text=${waText}`, '_blank');
        });
    }

    // ==========================================
    // 5.1 MESSAGE TEMPLATES LOGIC
    // ==========================================
    const templateBadges = document.querySelectorAll('.badge-btn');
    const messageTextarea = document.getElementById('rsvp-message');

    if (templateBadges && messageTextarea) {
        templateBadges.forEach(badge => {
            badge.addEventListener('click', function() {
                // Remove the emojis at the end for the actual message, or keep them. Let's keep them.
                messageTextarea.value = this.innerText;
                
                // Add a small animation to textarea to show it updated
                messageTextarea.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    messageTextarea.style.transform = 'scale(1)';
                }, 200);
            });
        });
    }

    function addWishToFeed(name, attendance, message) {
        const wishCard = document.createElement('div');
        wishCard.classList.add('wish-card');

        const badgeClass = attendance.toLowerCase().includes('tidak') ? 'absent' : 'present';
        
        wishCard.innerHTML = `
            <h5>${name}</h5>
            <span class="wish-badge ${badgeClass}">${attendance}</span>
            <p>"${message}"</p>
        `;
        // Insert at the top of the feed
        if (wishesFeed.firstChild) {
            wishesFeed.insertBefore(wishCard, wishesFeed.firstChild);
        } else {
            wishesFeed.appendChild(wishCard);
        }
    }

    function saveWish(name, attendance, message) {
        let wishes = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
        wishes.unshift({ name, attendance, message });
        localStorage.setItem('wedding_wishes', JSON.stringify(wishes));
    }

    function loadWishes() {
        let wishes = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
        wishes.reverse().forEach(w => {
            addWishToFeed(w.name, w.attendance, w.message);
        });
    }

    // ==========================================
    // 6. ADD TO CALENDAR BUTTON
    // ==========================================
    const btnCalendar = document.getElementById('btn-calendar');
    if (btnCalendar) {
        btnCalendar.addEventListener('click', () => {
            const eventName = encodeURIComponent("Pernikahan Wafi & Lina");
            const eventDetails = encodeURIComponent("Acara pernikahan Khairul Wafi dan Lina Agustina. Mohon doa restunya!");
            const eventLocation = encodeURIComponent("Dusun Co'gunung Barat, Kec. Waru, Pamekasan");
            
            // Format for Google Calendar: YYYYMMDDTHHmmssZ
            // Date: Oct 6, 2026 08:00 to 14:00 (Local time = GMT+7 roughly, but we can send local string)
            const startDate = "20261006T080000";
            const endDate = "20261006T140000";

            const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventName}&dates=${startDate}/${endDate}&details=${eventDetails}&location=${eventLocation}`;
            window.open(googleCalUrl, '_blank');
        });
    }

});

// ==========================================
// 6. COPY TO CLIPBOARD FUNCTION
// ==========================================
window.copyRekening = function (elementId) {
    const textToCopy = document.getElementById(elementId).innerText;
    // Copy logic
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Show toast
        const toast = document.getElementById('toast');
        toast.innerText = "Nomor Rekening Berhasil Disalin!";
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
