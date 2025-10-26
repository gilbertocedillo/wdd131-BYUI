document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('focus', () => link.style.outline = '2px solid #ffc107');
    link.addEventListener('blur', () => link.style.outline = 'none');
  });
});
