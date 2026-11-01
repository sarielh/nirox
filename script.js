'use strict';
// This project is a static demonstration. No form data is transmitted or stored.
const menuButton = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-navigation]');
function closeMenu() {
  navigation?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'פתיחת תפריט');
}
menuButton?.addEventListener('click', () => {
  const opened = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(opened));
  menuButton.setAttribute('aria-label', opened ? 'סגירת תפריט' : 'פתיחת תפריט');
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation?.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!navigation?.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
});
window.matchMedia('(min-width: 681px)').addEventListener('change', closeMenu);
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
for (const form of document.querySelectorAll('[data-demo-form]')) {
  const inputs = form.querySelector('[data-form-fields]');
  const status = form.querySelector('[data-form-status]');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    // Static demo only: no fetch, email, storage, analytics, or external requests.
    inputs.hidden = true;
    status.hidden = false;
    status.focus();
    form.reset();
  });
  form.querySelector('[data-form-reset]')?.addEventListener('click', () => {
    status.hidden = true;
    inputs.hidden = false;
    form.querySelector('input')?.focus();
  });
}
