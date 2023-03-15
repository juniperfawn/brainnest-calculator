const toggleBtn = document.getElementById('toggle__button');
const rootEl = document.documentElement;

toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('toggle__button--dark');
    rootEl.classList.toggle('darkModeRoot');

})