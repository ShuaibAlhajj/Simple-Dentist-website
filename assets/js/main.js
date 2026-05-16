document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navMenu = document.querySelector('[data-nav-menu]');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('hidden');
      if (navMenu.classList.contains('hidden')) {
        navMenu.classList.remove('flex');
      } else {
        navMenu.classList.add('flex');
      }
    });
  }

  const setActiveNav = () => {
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#site-nav a[href$=".html"]').forEach((a) => {
      const href = a.getAttribute('href') || '';
      const isActive = href.endsWith(current) || (current === '' && href.endsWith('index.html'));
      if (isActive) {
        a.setAttribute('aria-current', 'page');
        a.classList.add('text-primary', 'font-semibold');
      } else {
        a.removeAttribute('aria-current');
        a.classList.remove('text-primary', 'font-semibold');
      }
    });
  };
  setActiveNav();

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href')?.slice(1);
      const target = targetId ? document.getElementById(targetId) : null;
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const slotsContainer = document.getElementById('timeSlots');
  const hiddenTime = document.getElementById('time');
  if (slotsContainer && hiddenTime) {
    slotsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-time]');
      if (!btn) return;
      slotsContainer.querySelectorAll('button[data-time]').forEach((b) => {
        b.classList.remove('border-primary', 'bg-sky-50', 'text-primary');
        b.classList.add('border-gray-300');
      });
      btn.classList.remove('border-gray-300');
      btn.classList.add('border-primary', 'bg-sky-50', 'text-primary');
      hiddenTime.value = btn.getAttribute('data-time') || '';
    });
  }

  const form = document.getElementById('appointmentForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const service = document.getElementById('service');
      const date = document.getElementById('date');
      const time = document.getElementById('time');
      const firstName = document.getElementById('firstName');
      const lastName = document.getElementById('lastName');
      const phone = document.getElementById('phone');
      const email = document.getElementById('email');

      const errors = [];
      const setError = (fieldId, hasError) => {
        const msg = document.querySelector(`[data-error-for="${fieldId}"]`);
        if (!msg) return;
        msg.classList.toggle('hidden', !hasError);
        const input = document.getElementById(fieldId);
        if (input) {
          input.classList.toggle('border-red-500', hasError);
          input.classList.toggle('ring-red-100', hasError);
        }
      };

      const phoneValid = phone && /^\+?\d{7,15}$/.test(phone.value.trim());
      const emailValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

      setError('service', !service || !service.value);
      setError('date', !date || !date.value);
      setError('time', !time || !time.value);
      setError('firstName', !firstName || firstName.value.trim().length < 2);
      setError('lastName', !lastName || lastName.value.trim().length < 2);
      setError('phone', !phoneValid);
      setError('email', !emailValid);

      if (!service || !service.value) errors.push('service');
      if (!date || !date.value) errors.push('date');
      if (!time || !time.value) errors.push('time');
      if (!firstName || firstName.value.trim().length < 2) errors.push('firstName');
      if (!lastName || lastName.value.trim().length < 2) errors.push('lastName');
      if (!phoneValid) errors.push('phone');
      if (!emailValid) errors.push('email');

      if (errors.length === 0) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sending...
        `;

        setTimeout(() => {
          const modal = document.getElementById('successModal');
          const modalContent = document.getElementById('modalContent');
          if (modal && modalContent) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            // Trigger transition
            setTimeout(() => {
              modalContent.classList.remove('scale-95', 'opacity-0');
              modalContent.classList.add('scale-100', 'opacity-100');
            }, 10);

            const closeBtn = modal.querySelector('button');
            const closeHandler = () => {
              modalContent.classList.add('scale-95', 'opacity-0');
              modalContent.classList.remove('scale-100', 'opacity-100');
              setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
              }, 300);
            };
            closeBtn?.addEventListener('click', closeHandler, { once: true });
            modal.addEventListener('click', (ev) => {
              if (ev.target === modal) closeHandler();
            }, { once: true });
          } else {
            alert('Appointment confirmed. Thank you!');
          }

          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          form.reset();
          if (hiddenTime) hiddenTime.value = '';
          slotsContainer?.querySelectorAll('button[data-time]').forEach((b) => {
            b.classList.remove('border-primary', 'bg-sky-50', 'text-primary');
            b.classList.add('border-gray-300');
          });
        }, 1000);
      } else {
        const firstErrorField = document.getElementById(errors[0]);
        firstErrorField?.focus();
      }
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cname = document.getElementById('cname');
      const cemail = document.getElementById('cemail');
      const cmessage = document.getElementById('cmessage');
      const emailValid = cemail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cemail.value.trim());
      if (cname && cname.value.trim().length >= 2 && emailValid && cmessage && cmessage.value.trim().length >= 5) {
        alert('Thank you for reaching out. We will get back to you soon.');
        contactForm.reset();
      } else {
        alert('Please fill in your name, a valid email, and a short message.');
      }
    });
  }
});
