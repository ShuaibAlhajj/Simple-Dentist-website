// Main JavaScript for BrightSmile Dental Clinic

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAppointmentForm();
    initContactForm();
    initScrollAnimations();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const nav = document.querySelector('nav');
    const mobileMenuBtn = nav.querySelector('button.md\\:hidden');
    
    // Simple scroll effect for nav
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.classList.add('shadow-lg', 'bg-white/95');
        } else {
            nav.classList.remove('shadow-lg', 'bg-white/95');
        }
    });

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // In a real app, we'd toggle a mobile menu overlay here
            console.log('Mobile menu clicked');
            alert('Mobile menu functionality would open here.');
        });
    }
}

/**
 * Appointment Form Handling
 */
function initAppointmentForm() {
    const form = document.getElementById('appointmentForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic Validation
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required]');
        
        inputs.forEach(input => {
            const errorMsg = form.querySelector(`[data-error-for="${input.id}"]`);
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('border-red-500', 'ring-red-100');
                if (errorMsg) errorMsg.classList.remove('hidden');
            } else {
                input.classList.remove('border-red-500', 'ring-red-100');
                if (errorMsg) errorMsg.classList.add('hidden');
            }
        });

        if (isValid) {
            // Show loading state on button
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending Request...';

            // Simulate API call
            setTimeout(() => {
                showSuccessModal();
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
            }, 1500);
        }
    });
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    const content = document.getElementById('modalContent');
    if (!modal || !content) return;

    modal.classList.remove('hidden');
    // Force reflow for transition
    void modal.offsetWidth;
    content.classList.remove('scale-95', 'opacity-0');
    content.classList.add('scale-100', 'opacity-100');
}

window.closeModal = function() {
    const modal = document.getElementById('successModal');
    const content = document.getElementById('modalContent');
    if (!modal || !content) return;

    content.classList.add('scale-95', 'opacity-0');
    content.classList.remove('scale-100', 'opacity-100');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
};

/**
 * Contact Form Handling
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';

        setTimeout(() => {
            alert('Thank you! Your message has been sent. We will get back to you soon.');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
        }, 1200);
    });
}

/**
 * Simple Scroll Animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);

    // Apply to elements with 'reveal' class
    document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
        observer.observe(el);
    });
}
