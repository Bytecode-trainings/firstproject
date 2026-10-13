/**
 * Bytecode Trainings - Main Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header & Scroll Effects
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = mobileToggle.querySelector('i') || mobileToggle;
      if (navLinks.classList.contains('open')) {
        mobileToggle.innerHTML = '✕';
      } else {
        mobileToggle.innerHTML = '☰';
      }
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.innerHTML = '☰';
      });
    });
  }

  // 3. Course Filter Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const courseCards = document.querySelectorAll('.course-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 5. Stat Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const runCounterAnimation = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      let count = 0;
      const speed = target / 40;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          stat.innerText = Math.floor(count) + suffix;
          requestAnimationFrame(updateCount);
        } else {
          stat.innerText = target.toLocaleString() + suffix;
        }
      };
      updateCount();
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        runCounterAnimation();
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.hero-stats-row');
  if (statsSection) {
    observer.observe(statsSection);
  }

  // 6. Enrollment Modal & Notification
  const enrollModal = document.getElementById('enrollModal');
  const openModalBtns = document.querySelectorAll('.btn-enroll-trigger');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalCourseName = document.getElementById('modalCourseTitle');
  const enrollForm = document.getElementById('enrollForm');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const courseTitle = btn.getAttribute('data-course') || 'Selected Course';
      if (modalCourseName) {
        modalCourseName.innerText = `Enroll in: ${courseTitle}`;
      }
      enrollModal?.classList.add('active');
    });
  });

  closeModalBtn?.addEventListener('click', () => {
    enrollModal?.classList.remove('active');
  });

  enrollModal?.addEventListener('click', (e) => {
    if (e.target === enrollModal) {
      enrollModal.classList.remove('active');
    }
  });

  if (enrollForm) {
    enrollForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('studentName')?.value || 'Student';
      enrollModal?.classList.remove('active');
      enrollForm.reset();
      showToast(`🎉 Congratulations ${name}! Your enrollment inquiry has been submitted. Our counselor will contact you shortly.`, 'success');
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showToast('Subscribed! You will receive weekly tech insights & batch alerts.', 'success');
        newsletterForm.reset();
      }
    });
  }
});

// Toast notification helper
function showToast(message, type = 'info') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
