const modal = document.querySelector('.apartments .modal');
document.querySelector('.model-apart-open').addEventListener('click', () => {
    modal.classList.add('modal_active');
});

document.querySelector('.modal-close').addEventListener('click', () => {
    modal.classList.remove('modal_active');
});