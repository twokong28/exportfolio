const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  siteNav.classList.toggle('is-open', !isOpen);
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
  });
});

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');

if (contactForm && formStatus) {
  const nameInput = contactForm.querySelector('#name');
  const emailInput = contactForm.querySelector('#email');
  const messageInput = contactForm.querySelector('#message');
  const fields = [nameInput, emailInput, messageInput];

  contactForm.addEventListener('input', (event) => {
    const field = event.target;
    if (fields.includes(field)) {
      field.removeAttribute('aria-invalid');
      formStatus.textContent = '';
      formStatus.removeAttribute('data-state');
    }
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    emailInput.value = email;

    const invalidField = fields.find((field) => {
      field.removeAttribute('aria-invalid');
      if (!field.value.trim()) {
        field.setAttribute('aria-invalid', 'true');
        formStatus.textContent = field === nameInput
          ? '이름을 입력해 주세요.'
          : field === emailInput
            ? '이메일 주소를 입력해 주세요.'
            : '메시지를 입력해 주세요.';
        return true;
      }

      if (field === emailInput && field.validity.typeMismatch) {
        field.setAttribute('aria-invalid', 'true');
        formStatus.textContent = '올바른 이메일 주소를 입력해 주세요.';
        return true;
      }

      return false;
    });

    if (invalidField) {
      formStatus.dataset.state = 'error';
      invalidField.focus();
      return;
    }

    formStatus.dataset.state = 'success';
    formStatus.textContent = '입력 내용이 모두 확인되었습니다. 이 폼에서는 이메일이 전송되지 않습니다.';
  });
}
