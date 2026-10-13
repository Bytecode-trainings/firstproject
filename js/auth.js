/**
 * Bytecode Trainings - Authentication Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const formTitle = document.getElementById('formTitle');
  const formSubtitle = document.getElementById('formSubtitle');

  // Tab Switcher
  if (tabLogin && tabRegister) {
    tabLogin.addEventListener('click', () => {
      tabLogin.classList.add('active');
      tabRegister.classList.remove('active');
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
      if (formTitle) formTitle.innerText = 'Welcome Back';
      if (formSubtitle) formSubtitle.innerText = 'Login to continue your learning journey';
    });

    tabRegister.addEventListener('click', () => {
      tabRegister.classList.add('active');
      tabLogin.classList.remove('active');
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
      if (formTitle) formTitle.innerText = 'Create an Account';
      if (formSubtitle) formSubtitle.innerText = 'Start mastering tech skills with expert mentors';
    });
  }

  // Password Visibility Toggles
  const toggleButtons = document.querySelectorAll('.toggle-pwd');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
        } else {
          input.type = 'password';
          btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
        }
      }
    });
  });

  // Handle Login Submission
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail')?.value.trim();
      const password = document.getElementById('loginPassword')?.value;
      const remember = document.getElementById('rememberMe')?.checked;

      if (!email || !password) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      // Simulated Login Success
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      submitBtn.innerText = 'Signing in...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;

        // Save demo session
        localStorage.setItem('bytecode_user', JSON.stringify({ email, isLoggedIn: true, remember }));

        showToast(`✨ Welcome back! Redirecting to Dashboard...`, 'success');
        
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1200);
      }, 900);
    });
  }

  // Handle Register Submission
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName')?.value.trim();
      const email = document.getElementById('regEmail')?.value.trim();
      const password = document.getElementById('regPassword')?.value;
      const course = document.getElementById('regCourse')?.value;

      if (!name || !email || !password) {
        showToast('Please fill out all registration fields.', 'error');
        return;
      }

      if (password.length < 6) {
        showToast('Password must be at least 6 characters.', 'error');
        return;
      }

      const submitBtn = registerForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      submitBtn.innerText = 'Creating account...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;

        localStorage.setItem('bytecode_user', JSON.stringify({ name, email, course, isLoggedIn: true }));
        showToast(`🎉 Registration successful, ${name}! Redirecting...`, 'success');

        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1200);
      }, 900);
    });
  }

  // Social Auth Buttons
  const socialBtns = document.querySelectorAll('.social-btn');
  socialBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const provider = btn.innerText.trim();
      showToast(`Connecting to ${provider}... Authentication simulation active!`, 'info');
      setTimeout(() => {
        localStorage.setItem('bytecode_user', JSON.stringify({ name: 'Learner', isLoggedIn: true }));
        window.location.href = 'index.html';
      }, 1000);
    });
  });
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
    <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
