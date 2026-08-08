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

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.add('hidden');
        navMenu.classList.remove('flex');
      });
    });
  }

  const setActiveNav = () => {
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('header a[href$=".html"], nav a[href$=".html"]').forEach((a) => {
      const href = a.getAttribute('href') || '';
      const isActive = href === current || (current === 'index.html' && href === 'index.html');

      // Clear all possible active/inactive classes to ensure consistent state
      a.classList.remove('text-brand-500', 'text-brand-600', 'text-brand-700', 'font-bold', 'font-medium');

      if (isActive) {
        a.setAttribute('aria-current', 'page');
        a.classList.add('text-brand-600', 'font-bold');
      } else {
        a.removeAttribute('aria-current');
        // Re-apply default styling if needed, or let CSS handle it
        // Most nav links have text-brand-700 and font-medium by default
        if (!a.classList.contains('bg-brand-500') && !a.classList.contains('bg-brand-900')) {
          a.classList.add('text-brand-700', 'font-medium');
        }
      }
    });
  };

  const faqAccordion = document.querySelector('[data-faq-accordion]');
  if (faqAccordion) {
    faqAccordion.addEventListener('click', (e) => {
      const trigger = e.target.closest('button[aria-controls]');
      if (!trigger) return;

      const contentId = trigger.getAttribute('aria-controls');
      const content = document.getElementById(contentId);
      const item = trigger.closest('[data-faq-item]');
      const icon = trigger.querySelector('svg');
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close other items
      faqAccordion.querySelectorAll('[data-faq-item]').forEach((otherItem) => {
        if (otherItem === item) return;
        const otherTrigger = otherItem.querySelector('button[aria-controls]');
        const otherContent = document.getElementById(otherTrigger.getAttribute('aria-controls'));
        const otherIcon = otherTrigger.querySelector('svg');

        otherTrigger.setAttribute('aria-expanded', 'false');
        otherContent.classList.remove('grid-rows-[1fr]');
        otherContent.classList.add('grid-rows-[0fr]');
        if (otherIcon) otherIcon.classList.remove('rotate-180');
        otherItem.classList.remove('border-brand-500', 'shadow-lg', 'shadow-brand-500/10');
        otherItem.classList.add('border-transparent', 'shadow-sm');
      });

      // Toggle current item
      trigger.setAttribute('aria-expanded', String(!isExpanded));
      if (!isExpanded) {
        content.classList.remove('grid-rows-[0fr]');
        content.classList.add('grid-rows-[1fr]');
        if (icon) icon.classList.add('rotate-180');
        item.classList.remove('border-transparent', 'shadow-sm');
        item.classList.add('border-brand-500', 'shadow-lg', 'shadow-brand-500/10');
      } else {
        content.classList.remove('grid-rows-[1fr]');
        content.classList.add('grid-rows-[0fr]');
        if (icon) icon.classList.remove('rotate-180');
        item.classList.remove('border-brand-500', 'shadow-lg', 'shadow-brand-500/10');
        item.classList.add('border-transparent', 'shadow-sm');
      }
    });
  }
  setActiveNav();

  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  const prefillService = () => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    const serviceSelect = document.getElementById('service');
    if (service && serviceSelect) {
      serviceSelect.value = service;
    }
  };
  prefillService();

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
        b.classList.remove('border-brand-500', 'bg-brand-50', 'text-brand-500');
        b.classList.add('border-brand-100');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.remove('border-brand-100');
      btn.classList.add('border-brand-500', 'bg-brand-50', 'text-brand-500');
      btn.setAttribute('aria-pressed', 'true');
      hiddenTime.value = btn.getAttribute('data-time') || '';
    });
  }

  const setError = (fieldId, hasError) => {
    const msg = document.querySelector(`[data-error-for="${fieldId}"]`);
    if (!msg) return;
    msg.classList.toggle('hidden', !hasError);
    const input = document.getElementById(fieldId);
    if (input) {
      input.classList.toggle('border-red-500', hasError);
      input.classList.toggle('ring-red-100', hasError);
      if (hasError) {
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', `error-${fieldId}`);
      } else {
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedby');
      }
    }
  };

  const showSuccessModal = (title, message, onDone) => {
    const modal = document.getElementById('successModal');
    const modalContent = document.getElementById('modalContent');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = modal?.querySelector('p');

    if (modal && modalContent) {
      if (modalTitle && title) modalTitle.textContent = title;
      if (modalText && message) modalText.textContent = message;

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      // Trigger transition
      setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
        modal.querySelector('button')?.focus();
      }, 10);

      const closeBtn = modal.querySelector('button');
      const closeHandler = () => {
        modalContent.classList.add('scale-95', 'opacity-0');
        modalContent.classList.remove('scale-100', 'opacity-100');
        setTimeout(() => {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
          if (onDone) onDone();
        }, 300);
      };
      closeBtn?.addEventListener('click', closeHandler, { once: true });
      modal.addEventListener('click', (ev) => {
        if (ev.target === modal) closeHandler();
      }, { once: true });
    } else {
      alert(message || title);
      if (onDone) onDone();
    }
  };

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
          showSuccessModal(
            'Request Sent!',
            "Thank you for choosing BrightSmile. We've received your request and will call you shortly to confirm your appointment.",
            () => {
              form.reset();
              if (hiddenTime) hiddenTime.value = '';
              slotsContainer?.querySelectorAll('button[data-time]').forEach((b) => {
                b.classList.remove('border-brand-500', 'bg-brand-50', 'text-brand-500');
                b.classList.add('border-brand-100');
                b.setAttribute('aria-pressed', 'false');
              });
            }
          );

          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 1000);
      } else {
        let firstErrorField = document.getElementById(errors[0]);
        if (errors[0] === 'time') {
          firstErrorField = slotsContainer?.querySelector('button[data-time]');
        }
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
      const nameValid = cname && cname.value.trim().length >= 2;
      const messageValid = cmessage && cmessage.value.trim().length >= 5;

      setError('cname', !nameValid);
      setError('cemail', !emailValid);
      setError('cmessage', !messageValid);

      if (nameValid && emailValid && messageValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
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
          showSuccessModal(
            'Message Sent!',
            "Thank you for reaching out to BrightSmile. We've received your message and our team will get back to you shortly.",
            () => {
              contactForm.reset();
            }
          );
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 1000);
      } else {
        const firstError = !nameValid ? cname : (!emailValid ? cemail : cmessage);
        firstError?.focus();
      }
    });
  }

  const backToTop = document.createElement('button');
  backToTop.innerHTML = '↑';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.className = 'fixed bottom-8 right-8 w-12 h-12 bg-brand-500 text-white rounded-full shadow-xl shadow-brand-500/30 flex items-center justify-center text-2xl z-40 transition-all duration-300 opacity-0 translate-y-10 pointer-events-none hover:bg-brand-600 active:scale-95 focus:outline-none focus:ring-4 focus:ring-brand-500/50';
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    const isVisible = window.scrollY > 400;
    backToTop.classList.toggle('opacity-0', !isVisible);
    backToTop.classList.toggle('translate-y-10', !isVisible);
    backToTop.classList.toggle('pointer-events-none', !isVisible);
    backToTop.classList.toggle('opacity-100', isVisible);
    backToTop.classList.toggle('translate-y-0', isVisible);
    backToTop.classList.toggle('pointer-events-auto', isVisible);
  });

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
