// Background Canvas Animation (Matching Theme Colors)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height, particles;

function initCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    particles = [];
    const particleCount = Math.floor(width / 20);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3
        });
    }
}

function animateCanvas() {
    ctx.clearRect(0, 0, width, height);
    
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const color = isLight ? '#00a86b' : '#00ff95';
    
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = color;
        ctx.globalAlpha = 0.15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        particles.forEach(p2 => {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
                ctx.strokeStyle = color;
                ctx.globalAlpha = (1 - (dist / 120)) * 0.1;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animateCanvas);
}

window.addEventListener('resize', initCanvas);
initCanvas();
animateCanvas();

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Optional: Force canvas color update if needed (already handled in animate loop but this is cleaner)
});

function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Mobile Menu
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if(navLinks.style.display === 'flex') {
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'var(--bg-color)';
            navLinks.style.flexDirection = 'column';
            navLinks.style.padding = '2rem';
            navLinks.style.borderBottom = '1px solid var(--border-color)';
        }
    });
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

gsap.from('.hero-content h3', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' });
gsap.from('.hero-content h1', { y: 30, opacity: 0, duration: 1.2, delay: 0.2, ease: 'power3.out' });
gsap.from('.hero-content p', { y: 20, opacity: 0, duration: 1, delay: 0.4, ease: 'power3.out' });
gsap.from('.hero-btns', { y: 20, opacity: 0, duration: 1, delay: 0.6, ease: 'power3.out' });
gsap.from('.profile-img-container', { x: 50, opacity: 0, duration: 1.5, delay: 0.3, ease: 'power3.out' });

gsap.utils.toArray('section h2').forEach(header => {
    gsap.from(header, {
        scrollTrigger: { trigger: header, start: 'top 85%' },
        y: 30, opacity: 0, duration: 1, ease: 'power3.out'
    });
});

gsap.utils.toArray('.glass-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 90%' },
        y: 40, opacity: 0, duration: 1, ease: 'power3.out'
    });
});

gsap.utils.toArray('.timeline-item').forEach(item => {
    gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 90%' },
        x: -30, opacity: 0, duration: 1, ease: 'power3.out'
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
            if (window.innerWidth <= 768) navLinks.style.display = 'none';
        }
    });
});

// Country Code Population with Length Validation
const countries = [
    { code: "93", name: "AF", len: 9 }, { code: "355", name: "AL", len: 9 }, { code: "213", name: "DZ", len: 9 }, { code: "1", name: "US", len: 10 },
    { code: "376", name: "AD", len: 6 }, { code: "244", name: "AO", len: 9 }, { code: "54", name: "AR", len: 10 }, { code: "374", name: "AM", len: 8 },
    { code: "61", name: "AU", len: 9 }, { code: "43", name: "AT", len: 10 }, { code: "994", name: "AZ", len: 9 }, { code: "973", name: "BH", len: 8 },
    { code: "880", name: "BD", len: 10 }, { code: "375", name: "BY", len: 9 }, { code: "32", name: "BE", len: 9 }, { code: "501", name: "BZ", len: 7 },
    { code: "229", name: "BJ", len: 8 }, { code: "975", name: "BT", len: 8 }, { code: "591", name: "BO", len: 8 }, { code: "387", name: "BA", len: 8 },
    { code: "267", name: "BW", len: 8 }, { code: "55", name: "BR", len: 11 }, { code: "359", name: "BG", len: 9 }, { code: "226", name: "BF", len: 8 },
    { code: "257", name: "BI", len: 8 }, { code: "855", name: "KH", len: 9 }, { code: "237", name: "CM", len: 9 }, { code: "238", name: "CV", len: 7 },
    { code: "236", name: "CF", len: 8 }, { code: "235", name: "TD", len: 8 }, { code: "56", name: "CL", len: 9 }, { code: "86", name: "CN", len: 11 },
    { code: "57", name: "CO", len: 10 }, { code: "269", name: "KM", len: 7 }, { code: "242", name: "CG", len: 9 }, { code: "506", name: "CR", len: 8 },
    { code: "385", name: "HR", len: 9 }, { code: "53", name: "CU", len: 8 }, { code: "357", name: "CY", len: 8 }, { code: "420", name: "CZ", len: 9 },
    { code: "45", name: "DK", len: 8 }, { code: "253", name: "DJ", len: 8 }, { code: "1", name: "DM", len: 10 }, { code: "1", name: "DO", len: 10 },
    { code: "593", name: "EC", len: 9 }, { code: "20", name: "EG", len: 10 }, { code: "503", name: "SV", len: 8 }, { code: "240", name: "GQ", len: 9 },
    { code: "291", name: "ER", len: 7 }, { code: "372", name: "EE", len: 7 }, { code: "251", name: "ET", len: 9 }, { code: "679", name: "FJ", len: 7 },
    { code: "358", name: "FI", len: 9 }, { code: "33", name: "FR", len: 9 }, { code: "241", name: "GA", len: 7 }, { code: "220", name: "GM", len: 7 },
    { code: "995", name: "GE", len: 9 }, { code: "49", name: "DE", len: 11 }, { code: "233", name: "GH", len: 9 }, { code: "30", name: "GR", len: 10 },
    { code: "502", name: "GT", len: 8 }, { code: "224", name: "GN", len: 9 }, { code: "245", name: "GW", len: 7 }, { code: "592", name: "GY", len: 7 },
    { code: "509", name: "HT", len: 8 }, { code: "504", name: "HN", len: 8 }, { code: "852", name: "HK", len: 8 }, { code: "36", name: "HU", len: 9 },
    { code: "354", name: "IS", len: 7 }, { code: "91", name: "IN", len: 10 }, { code: "62", name: "ID", len: 10 }, { code: "98", name: "IR", len: 10 },
    { code: "964", name: "IQ", len: 10 }, { code: "353", name: "IE", len: 9 }, { code: "972", name: "IL", len: 9 }, { code: "39", name: "IT", len: 10 },
    { code: "1", name: "JM", len: 10 }, { code: "81", name: "JP", len: 10 }, { code: "962", name: "JO", len: 9 }, { code: "7", name: "KZ", len: 10 },
    { code: "254", name: "KE", len: 9 }, { code: "686", name: "KI", len: 8 }, { code: "965", name: "KW", len: 8 }, { code: "996", name: "KG", len: 9 },
    { code: "856", name: "LA", len: 10 }, { code: "371", name: "LV", len: 8 }, { code: "961", name: "LB", len: 8 }, { code: "266", name: "LS", len: 8 },
    { code: "231", name: "LR", len: 7 }, { code: "218", name: "LY", len: 9 }, { code: "423", name: "LI", len: 7 }, { code: "370", name: "LT", len: 8 },
    { code: "352", name: "LU", len: 9 }, { code: "853", name: "MO", len: 8 }, { code: "389", name: "MK", len: 8 }, { code: "261", name: "MG", len: 9 },
    { code: "265", name: "MW", len: 9 }, { code: "60", name: "MY", len: 10 }, { code: "960", name: "MV", len: 7 }, { code: "223", name: "ML", len: 8 },
    { code: "356", name: "MT", len: 8 }, { code: "692", name: "MH", len: 7 }, { code: "222", name: "MR", len: 8 }, { code: "230", name: "MU", len: 7 },
    { code: "52", name: "MX", len: 10 }, { code: "691", name: "FM", len: 7 }, { code: "373", name: "MD", len: 8 }, { code: "377", name: "MC", len: 8 },
    { code: "976", name: "MN", len: 8 }, { code: "382", name: "ME", len: 8 }, { code: "212", name: "MA", len: 9 }, { code: "258", name: "MZ", len: 9 },
    { code: "95", name: "MM", len: 9 }, { code: "264", name: "NA", len: 9 }, { code: "674", name: "NR", len: 7 }, { code: "977", name: "NP", len: 10 },
    { code: "31", name: "NL", len: 9 }, { code: "64", name: "NZ", len: 9 }, { code: "505", name: "NI", len: 8 }, { code: "227", name: "NE", len: 8 },
    { code: "234", name: "NG", len: 10 }, { code: "850", name: "KP", len: 10 }, { code: "47", name: "NO", len: 8 }, { code: "968", name: "OM", len: 8 },
    { code: "92", name: "PK", len: 10 }, { code: "680", name: "PW", len: 7 }, { code: "507", name: "PA", len: 8 }, { code: "675", name: "PG", len: 8 },
    { code: "595", name: "PY", len: 9 }, { code: "51", name: "PE", len: 9 }, { code: "63", name: "PH", len: 10 }, { code: "48", name: "PL", len: 9 },
    { code: "351", name: "PT", len: 9 }, { code: "974", name: "QA", len: 8 }, { code: "40", name: "RO", len: 10 }, { code: "7", name: "RU", len: 10 },
    { code: "250", name: "RW", len: 9 }, { code: "685", name: "WS", len: 7 }, { code: "378", name: "SM", len: 10 }, { code: "966", name: "SA", len: 9 },
    { code: "221", name: "SN", len: 9 }, { code: "381", name: "RS", len: 9 }, { code: "248", name: "SC", len: 7 }, { code: "232", name: "SL", len: 8 },
    { code: "65", name: "SG", len: 8 }, { code: "421", name: "SK", len: 9 }, { code: "386", name: "SI", len: 8 }, { code: "677", name: "SB", len: 7 },
    { code: "252", name: "SO", len: 9 }, { code: "27", name: "ZA", len: 9 }, { code: "82", name: "KR", len: 10 }, { code: "211", name: "SS", len: 9 },
    { code: "34", name: "ES", len: 9 }, { code: "94", name: "LK", len: 9 }, { code: "249", name: "SD", len: 9 }, { code: "597", name: "SR", len: 7 },
    { code: "268", name: "SZ", len: 7 }, { code: "46", name: "SE", len: 10 }, { code: "41", name: "CH", len: 9 }, { code: "963", name: "SY", len: 9 },
    { code: "886", name: "TW", len: 9 }, { code: "992", name: "TJ", len: 9 }, { code: "255", name: "TZ", len: 9 }, { code: "66", name: "TH", len: 9 },
    { code: "670", name: "TL", len: 7 }, { code: "228", name: "TG", len: 8 }, { code: "676", name: "TO", len: 7 }, { code: "1", name: "TT", len: 10 },
    { code: "216", name: "TN", len: 8 }, { code: "90", name: "TR", len: 10 }, { code: "993", name: "TM", len: 8 }, { code: "688", name: "TV", len: 5 },
    { code: "256", name: "UG", len: 9 }, { code: "380", name: "UA", len: 9 }, { code: "971", name: "AE", len: 9 }, { code: "44", name: "GB", len: 10 },
    { code: "598", name: "UY", len: 8 }, { code: "998", name: "UZ", len: 9 }, { code: "678", name: "VU", len: 7 }, { code: "58", name: "VE", len: 10 },
    { code: "84", name: "VN", len: 9 }, { code: "967", name: "YE", len: 9 }, { code: "260", name: "ZM", len: 9 }, { code: "263", name: "ZW", len: 9 }
];

function populateCountryCodes() {
    const select = document.getElementById('wa-country-code');
    const phoneInput = document.getElementById('wa-phone');
    if (!select || !phoneInput) return;
    
    countries.sort((a, b) => a.name.localeCompare(b.name)).forEach(c => {
        const option = document.createElement('option');
        option.value = c.code;
        option.dataset.len = c.len;
        option.textContent = `+${c.code} (${c.name})`;
        if (c.code === "91" && c.name === "IN") {
            option.selected = true;
            phoneInput.setAttribute('pattern', `[0-9]{${c.len}}`);
            phoneInput.setAttribute('title', `Please enter a ${c.len}-digit phone number`);
        }
        select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const len = selectedOption.dataset.len;
        phoneInput.setAttribute('pattern', `[0-9]{${len}}`);
        phoneInput.setAttribute('title', `Please enter a ${len}-digit phone number`);
        // Trigger validation if there's already input
        if (phoneInput.value) {
            validatePhone();
        }
    });
}

function validatePhone() {
    const select = document.getElementById('wa-country-code');
    const phoneInput = document.getElementById('wa-phone');
    const selectedOption = select.options[select.selectedIndex];
    const len = parseInt(selectedOption.dataset.len);
    
    let val = phoneInput.value.replace(/[^0-9]/g, '');
    if (val.length > len) {
        val = val.slice(0, len);
    }
    phoneInput.value = val;
}

document.addEventListener('DOMContentLoaded', populateCountryCodes);

// WhatsApp Form Submission
const whatsappForm = document.getElementById('whatsapp-form');
if (whatsappForm) {
    whatsappForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('wa-name').value;
        const email = document.getElementById('wa-email').value;
        const countryCode = document.getElementById('wa-country-code').value;
        const phone = document.getElementById('wa-phone').value;
        const subject = document.getElementById('wa-subject').value;
        const description = document.getElementById('wa-description').value;
        
        // Full phone number with country code
        const fullPhoneNumber = countryCode + phone;
        const phoneNumber = "918778867265"; // Your WhatsApp Number
        
        const message = `Hello, I am ${name}.%0A%0A*Details:*%0A- Email: ${email}%0A- Phone: +${countryCode} ${phone}%0A- Subject: ${subject}%0A%0A*Message:*%0A${description}`;
        
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });
}

// Phone Number Limit and Validation (Dynamic)
const phoneInputEl = document.getElementById('wa-phone');
if (phoneInputEl) {
    phoneInputEl.addEventListener('input', validatePhone);
}
// Page Loader Logic (Lottie)
const loaderContainer = document.getElementById('lottie-loader');
if (loaderContainer) {
    lottie.loadAnimation({
        container: loaderContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'images/animation-original.json'
    });
}

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
    }, 1500); // Increased to 1.5s to let animation play
});
