document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.year').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  document.querySelectorAll('.card').forEach((card) => {
    const primaryLink = card.querySelector('a.read-more, a[href]');
    if (!primaryLink) return;

    const href = primaryLink.getAttribute('href');
    if (!href) return;

    card.classList.add('is-clickable');
    if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'link');
    const labelSource = card.querySelector('h3');
    if (labelSource && !card.getAttribute('aria-label')) {
      card.setAttribute('aria-label', labelSource.textContent.trim());
    }

    const goToCardLink = () => {
      const target = primaryLink.getAttribute('target');
      if (target === '_blank') {
        window.open(href, '_blank', 'noopener');
        return;
      }
      window.location.href = href;
    };

    card.addEventListener('click', (event) => {
      if (event.target.closest('a, button, input, textarea, select, label')) return;
      goToCardLink();
    });

    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      if (event.target.closest('a, button, input, textarea, select, label') && event.target !== card) return;
      event.preventDefault();
      goToCardLink();
    });
  });
});
