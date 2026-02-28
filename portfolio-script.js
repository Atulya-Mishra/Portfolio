document.addEventListener('DOMContentLoaded', () => {
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
// Cache DOM
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const contactButtons = document.querySelectorAll('.btn-box .btn');
const header = document.querySelector('header');
const footer = document.querySelector('footer');

// Menu toggle with ARIA
if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        const expanded = menuIcon.getAttribute('aria-expanded') === 'true';
        menuIcon.setAttribute('aria-expanded', String(!expanded));
        if (navbar) navbar.classList.toggle('active');
    });
}

// Smooth scroll for nav links and CTA buttons
function smoothAnchorLinks(selector) {
    document.querySelectorAll(selector).forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                    // close mobile nav
                    if (navbar && navbar.classList.contains('active')) {
                        navbar.classList.remove('active');
                        if (menuIcon) menuIcon.classList.remove('bx-x');
                        if (menuIcon) menuIcon.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });
}
smoothAnchorLinks('header nav a');
smoothAnchorLinks('.btn-box .btn');

// Scroll handler: set active nav link and animate sections
function onScroll() {
    const top = window.scrollY;
    sections.forEach(sec => {
        const offset = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const targetLink = document.querySelector('header nav a[href="#' + id + '"]');
            if (targetLink) targetLink.classList.add('active');
            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    });

    // Sticky header
    header.classList.toggle('sticky', window.scrollY > 100);

    // Footer animation toggle
    footer.classList.toggle('show-animate', window.innerHeight + window.scrollY >= document.scrollingElement.scrollHeight - 5);

    // ensure mobile menu closes on scroll
    if (navbar && navbar.classList.contains('active') && window.innerWidth <= 991) {
        navbar.classList.remove('active');
        if (menuIcon) menuIcon.classList.remove('bx-x');
        if (menuIcon) menuIcon.setAttribute('aria-expanded', 'false');
    }
}

window.addEventListener('scroll', onScroll, { passive: true });

// Initial call to set active section on load
onScroll();
 // contact form submission via mailto
 const contactForm = document.querySelector('#contact-form');
 if (contactForm) {
     contactForm.addEventListener('submit', function(e) {
         e.preventDefault();
         const fd = new FormData(contactForm);
         const name = fd.get('name') || '';
         const email = fd.get('email') || '';
         const phone = fd.get('phone') || '';
         const subject = fd.get('subject') || 'New message';
         const message = fd.get('message') || '';
         const bodyLines = [
             `Name: ${name}`,
             `Email: ${email}`,
             `Phone: ${phone}`,
             '',
             `${message}`
         ];
         const body = encodeURIComponent(bodyLines.join('\r\n'));
         const mailto = `mailto:atulyamishracodes@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
         window.location.href = mailto;
     });
 }});
